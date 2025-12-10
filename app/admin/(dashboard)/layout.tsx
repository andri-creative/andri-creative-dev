"use client";


import AdminNavbar from "./AdminNavbar";
export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <AdminNavbar />
            <main className="container mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
