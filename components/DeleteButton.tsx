"use client";

import { Trash, X } from "lucide-react";
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
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { deletePitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }: { id: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deletePitch(id);

    if (result.status === "SUCCESS") {
      setIsDialogOpen(false);
      router.push("/");
    }
  };
  return (
    <>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <AlertDialogCancel className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this startup? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsDialogOpen(false)}
              className="border-black text-black"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-black text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteButton;
