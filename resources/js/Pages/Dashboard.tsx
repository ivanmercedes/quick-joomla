import AddNewProject from "@/Components/AddNewProject";
import DeleteProject from "@/Components/DeleteProject";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";

type Project = {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: number;
};

interface DashboardProps {
    auth: any;
    projects: Project[];
}

export default function Dashboard({ auth, projects }: DashboardProps) {
    console.log(projects);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <AddNewProject />

            <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                    <CardTitle>Proyectos</CardTitle>
                    <CardDescription>
                        Crear un nuevo proyecto Joomla con configuraciones
                        preconfiguradas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Creación
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">
                                        {project.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {format(
                                            new Date(project.created_at),
                                            "yyyy-MM-dd hh:mm a"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Toggle menu
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Acciones
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    Descargar proyecto zip
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Descargar base de datos
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <DeleteProject
                                                        id={project.id}
                                                    />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
