"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bug, Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type UserRole = "GUEST" | "QA" | "DEV" | "PM" | "STAKEHOLDER" | "ADMIN";

interface NavbarProps {
  isAuthenticated: boolean;
  userRole?: UserRole;
  orgName?: string;
  userName?: string;
  userEmail?: string;
  userAvatarUrl?: string;
}

export function Navbar({
  isAuthenticated,
  userRole = "GUEST",
  orgName,
  userName = "User",
  userEmail,
  userAvatarUrl,
}: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation links based on authentication and role
  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { label: "Home", href: "/" },
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ];
    }

    const links = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Projects", href: "/projects" },
      { label: "Issues", href: "/issues" },
      { label: "Test Cases", href: "/test-cases" },
      { label: "Reports", href: "/reports" },
    ];

    // RBAC: Only Admin/QA/PM might see Audit Logs
    if (["ADMIN", "QA", "PM"].includes(userRole)) {
      links.push({ label: "Audit Logs", href: "/audit-logs" });
    }

    // RBAC: Dev-specific links
    if (userRole === "DEV") {
      links.push(
        { label: "Sprints", href: "/sprints" },
        { label: "Releases", href: "/releases" },
        { label: "API Docs", href: "/api-docs" },
      );
    }

    // RBAC: Only Admin sees Users and Settings
    if (userRole === "ADMIN") {
      links.push(
        { label: "Users", href: "/users" },
        { label: "Settings", href: "/settings" },
      );
    }

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-16 items-center px-4 md:px-8 max-w-screen-2xl mx-auto">
        {/* Left Section: Logo & Org Switcher */}
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="BugTrackerX Home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Bug className="h-5 w-5 text-primary" />
            </div>
            <span className="hidden font-semibold tracking-tight sm:inline-block text-lg">
              BugTrackerX
            </span>
          </Link>

          {isAuthenticated && orgName && (
            <div className="hidden md:flex items-center gap-2 ml-2">
              <span
                className="text-muted-foreground/40 text-lg font-light leading-none"
                aria-hidden="true"
              >
                /
              </span>
              <span className="text-sm font-medium bg-secondary/50 text-secondary-foreground px-2.5 py-1 rounded-md border shadow-sm">
                {orgName}
              </span>
            </div>
          )}
        </div>

        {/* Center Section: Desktop Nav Links */}
        <nav className="hidden md:flex justify-center items-center gap-4 lg:gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 transition-colors hover:text-foreground ${
                pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
          {isAuthenticated ? (
            <>
              {/* Search Placeholder */}
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                className="hidden md:flex rounded-full"
              >
                <Search className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
              </Button>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="rounded-full relative"
                  >
                    <Bell className="h-[1.1rem] w-[1.1rem] text-muted-foreground" />
                    <span
                      className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background"
                      aria-hidden="true"
                    ></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal flex justify-between items-center">
                    <span className="font-semibold">Notifications</span>
                    <span className="text-xs text-primary cursor-pointer hover:underline">
                      Mark all as read
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full bg-blue-500"
                          aria-hidden="true"
                        ></span>
                        <span className="font-medium text-sm">
                          Issue assigned to you
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-4">
                        Sarah Jenkins assigned BUG-142 to you.
                      </p>
                      <p className="text-xs text-muted-foreground pl-4 mt-1">
                        10 minutes ago
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full bg-green-500"
                          aria-hidden="true"
                        ></span>
                        <span className="font-medium text-sm">
                          Test Run Completed
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-4">
                        Release 2.1 UI Regression passed.
                      </p>
                      <p className="text-xs text-muted-foreground pl-4 mt-1">
                        2 hours ago
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer focus:bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full bg-muted"
                          aria-hidden="true"
                        ></span>
                        <span className="font-medium text-sm text-muted-foreground">
                          Mentioned in comment
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-4">
                        David Chen mentioned you in PRJ-99.
                      </p>
                      <p className="text-xs text-muted-foreground pl-4 mt-1">
                        Yesterday
                      </p>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-primary cursor-pointer font-medium text-sm p-3 focus:bg-muted/50">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    aria-label="User profile"
                    className="relative h-9 w-9 rounded-full ml-1 ring-offset-background transition-all hover:ring-2 hover:ring-primary/20"
                  >
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={userAvatarUrl} alt={userName} />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      {userEmail && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {userEmail}
                        </p>
                      )}
                      <p className="text-xs leading-none text-muted-foreground mt-1 capitalize inline-flex items-center">
                        <span
                          className="w-2 h-2 rounded-full bg-green-500 mr-2"
                          aria-hidden="true"
                        ></span>
                        {userRole.toLowerCase()} Role
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Preferences
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400 focus:bg-red-100 focus:text-red-700 dark:focus:bg-red-900/50 dark:focus:text-red-300 cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild className="rounded-full px-5">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open Mobile Menu"
                  className="rounded-full"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left mb-8 mt-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Bug className="h-5 w-5 text-primary" />
                    </div>
                    BugTrackerX
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-base font-medium transition-colors hover:text-primary py-2 px-4 rounded-md ${
                          pathname === link.href
                            ? "bg-primary/5 text-primary"
                            : "text-muted-foreground hover:bg-muted/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  {!isAuthenticated && (
                    <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-border/50">
                      <Button
                        variant="outline"
                        asChild
                        className="w-full justify-center h-11 rounded-full"
                      >
                        <Link
                          href="/login"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
