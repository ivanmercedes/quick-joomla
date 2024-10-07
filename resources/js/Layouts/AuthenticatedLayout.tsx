import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Link } from "@inertiajs/react";
import { Home, PanelLeft } from "lucide-react";

interface AuthenticatedProps {
    user?: any;
    children: React.ReactNode;
}

export default function Authenticated({ user, children }: AuthenticatedProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href={route("dashboard")}
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <svg
                            className="h-6 w-6 transition-all  group-hover:scale-110"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            id="joomla"
                        >
                            <g
                                fill="none"
                                stroke="#fff"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            >
                                <path d="M20.42 16.66a4.44 4.44 0 0 0-1.27-4L18.5 12l.65-.65a4.44 4.44 0 0 0 1.27-4 3 3 0 1 0-3.76-3.76 4.44 4.44 0 0 0-4 1.27L12 5.5l-.65-.65a4.44 4.44 0 0 0-4-1.27 3 3 0 1 0-3.77 3.76 4.44 4.44 0 0 0 1.27 4l.65.66-.65.65a4.44 4.44 0 0 0-1.27 4 3 3 0 1 0 3.76 3.76 4.44 4.44 0 0 0 4-1.27l.66-.64.65.65a4.44 4.44 0 0 0 4 1.27 3 3 0 1 0 3.76-3.76Zm-6.54-9.54a2.12 2.12 0 1 1 3 3l-.13.13-3-3ZM15 12l-3 3-3-3 3-3Zm-7.88-1.88a2.12 2.12 0 0 1 3-3l.13.13-3 3Zm3 6.76a2.12 2.12 0 1 1-3-3l.13-.13 3 3Zm5.26.62a2.12 2.12 0 0 1-1.5-.62l-.13-.13 3-3 .13.13a2.12 2.12 0 0 1-1.5 3.62Z"></path>
                                <path d="m12 5.5-1.75 1.75M5.5 12l1.75 1.75M12 18.5l1.75-1.75M18.5 12l-1.75-1.75M7.25 10.25 9 12M10.25 16.75 12 15M16.75 13.75 15 12M12 9l1.75-1.75"></path>
                            </g>
                        </svg>
                        <span className="sr-only">Quick Joomla</span>
                    </Link>
                    {/* <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip> */}
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href={route("dashboard")}
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <svg
                                        className="h-6 w-6 transition-all  group-hover:scale-110"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        id="joomla"
                                    >
                                        <g
                                            fill="none"
                                            stroke="#fff"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path d="M20.42 16.66a4.44 4.44 0 0 0-1.27-4L18.5 12l.65-.65a4.44 4.44 0 0 0 1.27-4 3 3 0 1 0-3.76-3.76 4.44 4.44 0 0 0-4 1.27L12 5.5l-.65-.65a4.44 4.44 0 0 0-4-1.27 3 3 0 1 0-3.77 3.76 4.44 4.44 0 0 0 1.27 4l.65.66-.65.65a4.44 4.44 0 0 0-1.27 4 3 3 0 1 0 3.76 3.76 4.44 4.44 0 0 0 4-1.27l.66-.64.65.65a4.44 4.44 0 0 0 4 1.27 3 3 0 1 0 3.76-3.76Zm-6.54-9.54a2.12 2.12 0 1 1 3 3l-.13.13-3-3ZM15 12l-3 3-3-3 3-3Zm-7.88-1.88a2.12 2.12 0 0 1 3-3l.13.13-3 3Zm3 6.76a2.12 2.12 0 1 1-3-3l.13-.13 3 3Zm5.26.62a2.12 2.12 0 0 1-1.5-.62l-.13-.13 3-3 .13.13a2.12 2.12 0 0 1-1.5 3.62Z"></path>
                                            <path d="m12 5.5-1.75 1.75M5.5 12l1.75 1.75M12 18.5l1.75-1.75M18.5 12l-1.75-1.75M7.25 10.25 9 12M10.25 16.75 12 15M16.75 13.75 15 12M12 9l1.75-1.75"></path>
                                        </g>
                                    </svg>
                                    <span className="sr-only">
                                        Quick Joomla
                                    </span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="relative ml-auto flex-1 md:grow-0"></div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                {user.name[0]}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={route("profile.edit")}>Perfil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Salir
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
