import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { Trash } from "lucide-react";

interface DeleteProjectProps {
    id: number;
}

const DeleteProject = ({ id }: DeleteProjectProps) => {
    const { data, setData, delete: destroy, processing, errors } = useForm();

    const confirmFormDeletion = (id: number) => {
        destroy(
            route("projects.destroy", {
                id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {},
                onFinish: () => {},
            }
        );
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full flex gap-1 items-center justify-start"
                >
                    <Trash size={16} className="text-destructive" /> Borrar
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        ¿Estás absolutamente seguro?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente tu proyecto y eliminará tus datos del
                        servidore.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button
                            disabled={processing}
                            onClick={() => confirmFormDeletion(id)}
                        >
                            Sí, eliminar cuenta
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteProject;
