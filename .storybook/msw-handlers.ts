import { http, HttpResponse } from "msw";

export const mswHandlers = {
  issues: [
    http.get("/api/issues", () =>
      HttpResponse.json({
        items: [{ id: "1", title: "Test Issue", status: "OPEN" }],
      }),
    ),
  ],
  projects: [
    http.get("/api/projects", () =>
      HttpResponse.json({
        items: [{ id: "proj-1", name: "Frontend Refactor" }],
      }),
    ),
  ],
};
