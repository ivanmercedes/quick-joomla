import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import InputError from "./InputError";

const AddNewProject = () => {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route("projects.store"), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Exito",
                    description: "Proyecto agregado correctamente",
                });

                reset();
                setOpen(false);
            },
        });
    };

    return (
        <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className=" gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Agregar proyecto
                            </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Agregando nuevo proyecto</DialogTitle>
                            <DialogDescription>
                                Escriba el nombre del proyecto que desea agregar
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 grid-rows-2  items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Nombre
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data?.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="col-span-3"
                                    />
                                    <InputError
                                        message={
                                            errors?.name
                                                ? "El nombre de la base de datos ya existe. Por favor, elige otro."
                                                : undefined
                                        }
                                        className="col-span-4"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button disabled={processing} type="submit">
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AddNewProject;
