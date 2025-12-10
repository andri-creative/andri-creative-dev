"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    HamburgerMenuIcon,
    Cross1Icon,
    DashboardIcon,
    ImageIcon,
    BookmarkIcon,
    FileTextIcon,
    ExitIcon,
} from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function AdminNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        router.push("/admin");
    };

    const navItems = [
        {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: <DashboardIcon className="w-5 h-5" />,
        },
        {
            name: "Album",
            href: "/admin/album",
            icon: <ImageIcon className="w-5 h-5" />,
        },
        {
            name: "Project",
            href: "/admin/project",
            icon: <BookmarkIcon className="w-5 h-5" />,
        },
        {
            name: "Sertifikat",
            href: "/admin/sertifikat",
            icon: <FileTextIcon className="w-5 h-5" />,
        },
    ];

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/90 backdrop-blur-md shadow-lg"
                    : "bg-white border-b"
                }`}
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center space-x-2"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">A</span>
                        </div>
                        <span className="text-xl font-semibold text-gray-800">
                            AdminPanel
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${pathname === item.href
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        ))}

                        {/* Logout Button Desktop */}
                        <button
                            onClick={handleLogout}
                            className="ml-4 flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <ExitIcon className="w-5 h-5" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
                            <DropdownMenu.Trigger asChild>
                                <button
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Toggle menu"
                                >
                                    {isOpen ? (
                                        <Cross1Icon className="w-6 h-6 text-gray-700" />
                                    ) : (
                                        <HamburgerMenuIcon className="w-6 h-6 text-gray-700" />
                                    )}
                                </button>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    className="min-w-[200px] bg-white rounded-xl shadow-xl p-2 mt-2 mr-4 border"
                                    align="end"
                                    sideOffset={5}
                                >
                                    {navItems.map((item) => (
                                        <DropdownMenu.Item key={item.name} asChild>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors cursor-pointer ${pathname === item.href
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-gray-700 hover:bg-gray-100"
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.icon}
                                                <span className="font-medium">{item.name}</span>
                                            </Link>
                                        </DropdownMenu.Item>
                                    ))}

                                    <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />

                                    <DropdownMenu.Item asChild>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        >
                                            <ExitIcon className="w-5 h-5" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    </div>
                </div>
            </div>
        </nav>
    );
}