import { Outlet, Link, createRootRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { trackPageView, trackTimeSpent, trackScrollDepth } from "@/lib/analytics";

function RootComponent() {
  const location = useLocation();

  // ─── PAGE VIEW & TIME ON PAGE TRACKING ──────────────────────────────────────
  const currentPathRef = useRef(location.pathname);
  const activeTimeStartRef = useRef(Date.now());
  const accumulatedTimeRef = useRef(0);
  const isPageVisibleRef = useRef(true);

  // Send the page_time_spent event and reset tracking
  const reportTimeSpent = (path: string) => {
    let activeTime = accumulatedTimeRef.current;
    if (isPageVisibleRef.current) {
      activeTime += Date.now() - activeTimeStartRef.current;
    }
    const durationSeconds = Math.round(activeTime / 1000);
    if (durationSeconds > 0) {
      trackTimeSpent(path, durationSeconds);
    }
    // Reset for the new page
    accumulatedTimeRef.current = 0;
    activeTimeStartRef.current = Date.now();
  };

  useEffect(() => {
    // 1. Log initial page view
    trackPageView(location.pathname);
  }, []); // Only once on initial mount

  useEffect(() => {
    // 2. Track route changes for page views & time spent
    if (location.pathname !== currentPathRef.current) {
      // Report time spent on the PREVIOUS path
      reportTimeSpent(currentPathRef.current);
      // Update current path ref
      currentPathRef.current = location.pathname;
      // Log new page view
      trackPageView(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Track Tab Visibility changes (user switches tabs or minimizes browser)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Just went hidden: accumulate active time up to now
        if (isPageVisibleRef.current) {
          accumulatedTimeRef.current += Date.now() - activeTimeStartRef.current;
          isPageVisibleRef.current = false;
        }
      } else {
        // Just came back active: reset start timer
        activeTimeStartRef.current = Date.now();
        isPageVisibleRef.current = true;
      }
    };

    // Track tab close/unload
    const handleBeforeUnload = () => {
      reportTimeSpent(currentPathRef.current);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // ─── SCROLL DEPTH TRACKING ──────────────────────────────────────────────────
  useEffect(() => {
    const path = location.pathname;
    const firedThresholds = new Set<number>();

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable <= 0) return; // Not scrollable

      const scrollPercentage = Math.round((scrollTop / totalScrollable) * 100);

      // Check thresholds: 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100];
      for (const threshold of thresholds) {
        if (scrollPercentage >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold);
          trackScrollDepth(path, threshold);
        }
      }
    };

    // Throttle scroll events for performance
    let scrollTimeout: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll();
          scrollTimeout = null;
        }, 300); // Check depth every 300ms of scrolling
      }
    };

    window.addEventListener("scroll", throttledScroll);
    // Call initial check in case page is small or loaded mid-scroll
    setTimeout(handleScroll, 500); // Delay slightly to ensure content is layouted

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [location.pathname]);

  return <Outlet />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

