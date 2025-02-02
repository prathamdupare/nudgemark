
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/home-sidebar";
import { BookmarkList } from "@/components/bookmark-list";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1">
            <div className="flex flex-col gap-4 p-4 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">My Bookmarks</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage and review your saved bookmarks
                  </p>
                </div>
              </div>
              <BookmarkList />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
