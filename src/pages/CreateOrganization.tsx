"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trash2, Upload } from "lucide-react";


// -------------------------
// ZOD Schema
// -------------------------
const orgSchema = z.object({
  orgName: z.string().min(2, "Organization name is required"),
  email: z.string().email("Invalid contact email"),
  website: z.string().optional(),
  description: z.string().optional(),
  logo: z.any().optional(),
  members: z.array(
    z.object({
      email: z.string().email("Invalid email"),
    })
  ),
});

type OrgForm = z.infer<typeof orgSchema>;

export default function OrganizationRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const form = useForm<OrgForm>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      orgName: "",
      email: "",
      website: "",
      description: "",
      logo: null,
      members: [{ email: "" }], // default 1 member field
    },
  });

  // dynamic members field
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const onSubmit = async (data: OrgForm) => {
    setLoading(true);

    try {
      console.log("Organization Registered:", data);

      // Redirect after success
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload preview
  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register Your Organization
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              {/* --------------------------
                  LOGO UPLOAD
              --------------------------- */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Logo</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer">
                          <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                            {logoPreview ? (
                              <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Upload className="w-8 h-8 text-muted-foreground" />
                            )}
                          </div>

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                field.onChange(file);
                                handleLogoUpload(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ORG NAME */}
              <FormField
                control={form.control}
                name="orgName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organization Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. BoardSync Technologies" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONTACT EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. contact@boardsync.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* WEBSITE */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourcompany.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Brief description about your organization..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* -------------------------------------
                    MEMBER EMAIL FIELDS
              -------------------------------------- */}
              <div className="space-y-4">
                <FormLabel className="text-lg font-medium">Team Members</FormLabel>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <FormField
                      control={form.control}
                      name={`members.${index}.email`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="member@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ email: "" })}
                >
                  + Add Member
                </Button>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register Organization"}
              </Button>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
