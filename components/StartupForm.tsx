"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { startupSchema, TStartupSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";
import { savePitch } from "@/lib/actions";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const StartupForm = ({ startup }: any = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<TStartupSchema>({
    resolver: zodResolver(startupSchema),
    defaultValues: {
      title: startup?.title || "",
      description: startup?.description || "",
      category: startup?.category || "",
      link: startup?.image || "",
      pitch: startup?.pitch || "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (startupData: TStartupSchema) => {
    try {
      const result = await savePitch(startupData, startup?._id);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been saved successfully!",
          className: "bg-green-500",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
        className: "bg-red-500",
      });

      return {
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const onError = (errors: FieldErrors<TStartupSchema>) => {
    toast({
      title: "Error",
      description: "Please check your inputs and try again",
      variant: "destructive",
      className: "bg-red-500",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, onError)}
      className="startup-form"
    >
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          {...register("title")}
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {errors.title && (
          <p className="startup-form_error">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label"></label>
        <Textarea
          {...register("description")}
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          {...register("category")}
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          {...register("link")}
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
          defaultValue={startup?.image}
        />

        {errors.link && (
          <p className="startup-form_error">{errors.link.message}</p>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <Controller
          name="pitch"
          control={control}
          render={({ field: { onChange, value } }) => (
            <MDEditor
              value={value}
              onChange={(newValue) => onChange(newValue || "")}
              id="pitch"
              preview="edit"
              height={300}
              style={{ borderRadius: 20, overflow: "hidden" }}
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          )}
        />

        {errors.pitch && (
          <p className="startup-form_error">{errors.pitch.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-9 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
