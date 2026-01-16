"use client";
import * as React from "react";
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Sidebar state ---------------- */

type SidebarState = {
  openMobile: boolean;
  setOpenMobile: (v: boolean) => void;

  collapsed: boolean;
  setCollapsed: (v: boolean) => void;

  toggleMobile: () => void;
  toggleCollapsed: () => void;
};

const SidebarContext = React.createContext<SidebarState | null>(null);

export function Home({
  defaultCollapsed = false,
  children,
}: {
  defaultCollapsed?: boolean;
  children: React.ReactNode;
}) {
  const [openMobile, setOpenMobile] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  const value = React.useMemo(
    () => ({
      openMobile,
      setOpenMobile,
      collapsed,
      setCollapsed,
      toggleMobile: () => setOpenMobile((v) => !v),
      toggleCollapsed: () => setCollapsed((v) => !v),
    }),
    [openMobile, collapsed]
  );

  // Escape closes mobile drawer
  React.useEffect(() => {
    if (!openMobile) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMobile(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openMobile]);

  // Lock scroll on mobile open
  React.useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx)
    throw new Error("useSidebar must be used within <SidebarProvider />");
  return ctx;
}

/* ---------------- Icons (inline) ---------------- */

const Icon = {
  Chat: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </svg>
  ),
  Folder: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  ),
  Star: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 17.3 18.2 21l-1.6-7 5.4-4.7-7.1-.6L12 2 9.1 8.7 2 9.3 7.4 14l-1.6 7L12 17.3Z" />
    </svg>
  ),
  Search: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  Settings: (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a7.9 7.9 0 0 0 .1-6l2-1.2-2-3.4-2.3 1a8 8 0 0 0-5.2-2.1L11.5 1h-4L7 3.3A8 8 0 0 0 1.8 5.4l-2.3-1-2 3.4L-.5 9a7.9 7.9 0 0 0 .1 6l-2 1.2 2 3.4 2.3-1A8 8 0 0 0 7 20.7L7.5 23h4l.5-2.3a8 8 0 0 0 5.2-2.1l2.3 1 2-3.4L19.5 15l-.1 0Z" />
    </svg>
  ),
};

/* ---------------- Sidebar primitives ---------------- */

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <aside
      data-collapsed={collapsed ? "true" : "false"}
      className={cn(
        "relative h-full border-r bg-background flex flex-col",
        "transition-[width] duration-200 ease-in-out will-change-[width]",
        collapsed ? "w-16" : "w-80"
      )}
      aria-label="Sidebar"
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-2">{children}</div>;
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 px-2 pb-2 overflow-auto">{children}</div>;
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return <div className="p-2 border-t">{children}</div>;
}

export function SidebarSeparator() {
  return <div className="h-px my-2 bg-border" aria-hidden="true" />;
}

export function SidebarRail() {
  const { collapsed, toggleCollapsed } = useSidebar();
  return (
    <button
      type="button"
      onClick={toggleCollapsed}
      className={cn(
        "hidden lg:block absolute inset-y-0 -right-2 w-4 cursor-col-resize group"
      )}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-pressed={collapsed}
      title={collapsed ? "Expand" : "Collapse"}
    >
      <span
        className={cn(
          "absolute top-24 left-1/2 -translate-x-1/2",
          "h-10 w-6 rounded-md border bg-background shadow-sm grid place-items-center",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        )}
      >
        {collapsed ? "›" : "‹"}
      </span>
    </button>
  );
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-1">{children}</ul>;
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function SidebarMenuButton({
  icon,
  label,
  subtitle,
  href = "#",
  badge,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  href?: string;
  badge?: string;
  isActive?: boolean;
}) {
  const { collapsed } = useSidebar();

  return (
    <a
      href={href}
      className={cn(
        "group flex items-start gap-2 rounded-md px-2 py-2",
        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
        isActive && "bg-muted"
      )}
      title={collapsed ? label : undefined}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-foreground">
        {icon}
      </span>

      {/* label block (animated) */}
      <span
        className={cn(
          "min-w-0 flex-1",
          "transition-all duration-200 ease-in-out",
          collapsed
            ? "opacity-0 -translate-x-1 max-w-0 pointer-events-none"
            : "opacity-100 translate-x-0 max-w-[28rem]"
        )}
      >
        <span className="block text-sm font-medium truncate">{label}</span>
        {subtitle ? (
          <span className="block text-xs truncate text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </span>

      {/* badge (animated) */}
      {badge ? (
        <span
          className={cn(
            "ml-auto mt-0.5 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground",
            "transition-all duration-200 ease-in-out",
            collapsed
              ? "opacity-0 scale-95 max-w-0 overflow-hidden"
              : "opacity-100 scale-100"
          )}
        >
          {badge}
        </span>
      ) : null}
    </a>
  );
}

/* ---------------- Demo data ---------------- */

type RailItem = { label: string; icon: React.ReactNode; badge?: string };

const EXPANDED_ITEMS: RailItem[] = [
  { label: "Chats", icon: Icon.Chat, badge: "12" },
  { label: "Projects", icon: Icon.Folder },
  { label: "Favorites", icon: Icon.Star, badge: "4" },
  { label: "Search", icon: Icon.Search },
  { label: "Settings", icon: Icon.Settings },
];

// Intentionally MORE items when collapsed to stress the UI.
// Think of this as “power user quick launch”.
const COLLAPSED_ITEMS: RailItem[] = [
  { label: "Chats", icon: Icon.Chat, badge: "12" },
  { label: "Projects", icon: Icon.Folder },
  { label: "Favorites", icon: Icon.Star, badge: "4" },
  { label: "Search", icon: Icon.Search },
  { label: "Settings", icon: Icon.Settings },
  // extra rail-only shortcuts
  {
    label: "Pinned",
    icon: <span className="w-4 text-center">📌</span>,
    badge: "9",
  },
  { label: "Recents", icon: <span className="w-4 text-center">🕘</span> },
  {
    label: "Mentions",
    icon: <span className="w-4 text-center">@"</span>,
    badge: "3",
  },
  { label: "Archive", icon: <span className="w-4 text-center">🗄️</span> },
  { label: "Billing", icon: <span className="w-4 text-center">💳</span> },
  { label: "Admin", icon: <span className="w-4 text-center">🛡️</span> },
];

/* ---------------- The app sidebar ---------------- */

export function AppSidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  const railItems = collapsed ? COLLAPSED_ITEMS : EXPANDED_ITEMS;

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Header row: logo + title + toggle */}
        <div className="flex items-center gap-2 px-2 py-1">
          <div
            className={cn(
              "grid h-9 w-9 place-items-center rounded-md bg-muted font-semibold",
              collapsed && "sr-only"
            )}
          >
            AI
          </div>

          {/* Title fades out in collapsed mode */}
          <SidebarTitle title="Your App" subtitle="Workspace" />

          {/* 1) Explicit toggle inside sidebar */}
          <button
            type="button"
            onClick={toggleCollapsed}
            className={cn(
              "ml-auto hidden lg:inline-flex h-9 w-9 items-center justify-center rounded-md",
              "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>

        <SidebarSeparator />

        {/* Rail/menu section (shows more items when collapsed) */}
        <SidebarMenu>
          {railItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isActive={item.label === "Chats"}
                subtitle={
                  !collapsed && item.label === "Chats"
                    ? "Streaming + tool output"
                    : undefined
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>

      {/* 3) Expanded “main” content area that fills height and scrolls */}
      <SidebarContent>
        {!collapsed ? <ExpandedScrollableList /> : <CollapsedHint />}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted">
          <div className="grid w-8 h-8 text-xs font-semibold rounded-full bg-muted place-items-center">
            B
          </div>
          <SidebarTitle title="Bryce" subtitle="Signed in" />
          <span
            className={cn(
              "ml-auto text-xs text-muted-foreground",
              collapsed && "sr-only"
            )}
          >
            ⌄
          </span>
        </div>
      </SidebarFooter>

      {/* Rail edge toggle (desktop), optional but nice */}
      <SidebarRail />
    </Sidebar>
  );
}

function SidebarTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "min-w-0",
        "transition-all duration-200 ease-in-out",
        collapsed
          ? "opacity-0 -translate-x-1 max-w-0 overflow-hidden"
          : "opacity-100 translate-x-0 max-w-[28rem]"
      )}
    >
      <div className="text-sm font-semibold truncate">{title}</div>
      {subtitle ? (
        <div className="text-xs truncate text-muted-foreground">{subtitle}</div>
      ) : null}
    </div>
  );
}

function ExpandedScrollableList() {
  // Big list to test scroll + layout + performance
  const rows = React.useMemo(
    () =>
      Array.from({ length: 250 }).map((_, i) => ({
        id: `row-${i + 1}`,
        title: `Conversation ${i + 1}`,
        preview: `This is a preview snippet for item ${i + 1}...`,
      })),
    []
  );

  return (
    <div className="flex flex-col h-full">
      {/* sticky search/filter row */}
      <div className="sticky top-0 z-10 pb-2 bg-background">
        <div className="flex items-center gap-2 px-2 pt-2">
          <div className="relative flex-1">
            <input
              className={cn(
                "w-full rounded-md border bg-background px-3 py-2 text-sm",
                "focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              placeholder="Search conversations…"
            />
          </div>
          <button className="px-3 text-sm border rounded-md h-9 hover:bg-muted">
            Filter
          </button>
        </div>
      </div>

      {/* scroll list */}
      <div className="flex-1 pr-1 mt-2 overflow-auto">
        <div className="space-y-1">
          {rows.map((r) => (
            <button
              key={r.id}
              className={cn(
                "w-full rounded-md px-2 py-2 text-left",
                "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
              )}
              type="button"
            >
              <div className="text-sm font-medium truncate">{r.title}</div>
              <div className="text-xs truncate text-muted-foreground">
                {r.preview}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollapsedHint() {
  return (
    <div className="px-2 pt-3 text-xs text-muted-foreground">
      Collapsed mode: rail-only. Expand to see scrollable content.
    </div>
  );
}

/* ---------------- Full layout demo (desktop + mobile) ---------------- */

export function SidebarLayout() {
  const { openMobile, setOpenMobile, toggleMobile } = useSidebar();

  return (
    <div className="w-full h-screen bg-background text-foreground">
      <header className="flex items-center h-12 gap-2 px-3 border-b">
        {/* mobile open */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md lg:hidden h-9 w-9 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          onClick={toggleMobile}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <div className="text-sm font-semibold">Your Chat App</div>
      </header>

      <div className="flex h-[calc(100vh-3rem)]">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="p-4 border rounded-lg">
              Main content area.
              <div className="text-xs text-muted-foreground">
                Stress test: collapse/expand should be smooth; expanded list
                should scroll.
              </div>
            </div>
            <div className="p-4 border rounded-lg">More content…</div>
          </div>
        </main>
      </div>

      {/* Mobile drawer */}
      {openMobile && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 lg:hidden"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar"
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85%] bg-background shadow-xl">
            <AppSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Page component
 * ------------------------------------------------------------------------------------------------- */

export default function Page() {
  return (
    <Home>
      <SidebarLayout />
    </Home>
  );
}
