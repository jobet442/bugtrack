import * as dotenv from "dotenv";
dotenv.config({ path: ".env" }); // Load the environment variables from .env

import { sql } from "drizzle-orm";

async function setupTriggers() {
  const { db } = await import("../db");
  console.log("Creating audit log trigger function...");

  // 1. Create the PL/pgSQL function that will be executed by the triggers
  // It reads a transaction-local setting 'app.current_user_id' to know who made the change.
  // It also attempts to read 'app.current_ip_address'.
  await db.execute(sql`
    CREATE OR REPLACE FUNCTION audit_log_trigger_func()
    RETURNS TRIGGER AS $$
    DECLARE
      v_user_id uuid;
      v_ip_address varchar;
    BEGIN
      -- Attempt to get the user ID and IP address from current transaction settings
      -- This requires your app to set these variables before running a query!
      BEGIN
        v_user_id := current_setting('app.current_user_id', true)::uuid;
        v_ip_address := current_setting('app.current_ip_address', true);
      EXCEPTION WHEN OTHERS THEN
        v_user_id := NULL;
        v_ip_address := NULL;
      END;

      -- If we couldn't resolve a user ID but it's required by the schema, 
      -- we skip the audit log (or you could choose to RAISE EXCEPTION).
      IF v_user_id IS NOT NULL THEN
        IF (TG_OP = 'DELETE') THEN
          INSERT INTO audit_logs (user_id, action, entity, entity_id, ip_address)
          VALUES (v_user_id, 'DELETE', TG_TABLE_NAME, OLD.id, v_ip_address);
          RETURN OLD;
        ELSIF (TG_OP = 'UPDATE') THEN
          INSERT INTO audit_logs (user_id, action, entity, entity_id, ip_address)
          VALUES (v_user_id, 'UPDATE', TG_TABLE_NAME, NEW.id, v_ip_address);
          RETURN NEW;
        ELSIF (TG_OP = 'INSERT') THEN
          INSERT INTO audit_logs (user_id, action, entity, entity_id, ip_address)
          VALUES (v_user_id, 'INSERT', TG_TABLE_NAME, NEW.id, v_ip_address);
          RETURN NEW;
        END IF;
      END IF;

      RETURN COALESCE(NEW, OLD);
    END;
    $$ LANGUAGE plpgsql;
  `);

  console.log("Trigger function created successfully.");

  // 2. Define the tables we want to attach this trigger to
  const tablesToAudit = [
    "issues",
    "projects",
    "sprints",
    "comments",
    "attachments",
    "organizations",
  ];

  for (const tableName of tablesToAudit) {
    console.log(`Attaching trigger to table: ${tableName}...`);

    // Drop existing trigger to avoid duplicates if you run this multiple times
    await db.execute(
      sql.raw(
        `DROP TRIGGER IF EXISTS ${tableName}_audit_trigger ON ${tableName};`,
      ),
    );

    // Attach the trigger
    await db.execute(
      sql.raw(`
      CREATE TRIGGER ${tableName}_audit_trigger
      AFTER INSERT OR UPDATE OR DELETE ON ${tableName}
      FOR EACH ROW
      EXECUTE FUNCTION audit_log_trigger_func();
    `),
    );
  }

  console.log("All audit triggers created successfully!");
  process.exit(0);
}

setupTriggers().catch((err) => {
  console.error("Error setting up triggers:", err);
  process.exit(1);
});
