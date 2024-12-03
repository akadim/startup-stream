"use client";

import { Pencil } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/startup/${id}/edit`);
      }}
      className="bg-transparent"
    >
      <Pencil />
    </Button>
  );
};

export default EditButton;
