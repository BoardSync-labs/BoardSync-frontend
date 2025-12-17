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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { organizationService } from "@/services/organizationService";
import { useToast } from "@/hooks/use-toast";

// Updated ZOD Schema
const orgSchema = z.object({
  name: z.string().min(3, "Organization name must be at least 3 characters").max(50, "Organization name must be less than 50 characters"),
  invitations: z.array(
    z.object({
      email: z.string().email("Invalid email address"),
    })
  ).optional(),
});

type OrgForm = z.infer<typeof orgSchema>;

export default function OrganizationRegister() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<OrgForm>({
    resolver: zodResolver(orgSchema),
    defaultValues: {
      name: "",
      invitations: [{ email: "" }], // Start with one email field
    },
  });

  // Dynamic invitations field array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "invitations",
  });

  const onSubmit = async (data: OrgForm) => {
    setLoading(true);

    try {
      // Filter out empty email addresses
      const validInvitations = (data.invitations || [])
        .filter(invitation => invitation.email.trim() !== "")
        .map(invitation => ({
          email: invitation.email.trim(),
          role: "employee" as const // Default role for all invites
        }));

      const organizationData = {
        name: data.name.trim(),
        invitations: validInvitations,
      };

      console.log("Submitting organization data:", organizationData);

      const response = await organizationService.createOrganization(organizationData);

      if (response.success) {
        toast({
          title: "Organization Created! 🎉",
          description: `${response.data.name} has been successfully created. Invitations have been sent to team members.`,
        });

        // Show invitation results
        const invitationResults = response.data.invitations;
        if (invitationResults && invitationResults.length > 0) {
          const successCount = invitationResults.filter(inv => inv.status === 'invitation_sent' || inv.status === 'added_existing_user').length;
          const failCount = invitationResults.length - successCount;

          toast({
            title: "Invitation Summary",
            description: `${successCount} invitations sent successfully${failCount > 0 ? `, ${failCount} failed` : ''}.`,
            variant: failCount > 0 ? "destructive" : "default",
          });
        }

        // Redirect to admin dashboard
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Organization creation error:", err);
      
      let errorMessage = "Failed to create organization. Please try again.";
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }

      toast({
        title: "Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addInvitationField = () => {
    append({ email: "" });
  };

  const removeInvitationField = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background to-muted/20">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <CardTitle className="text-2xl font-bold">
              Create Organization
            </CardTitle>
          </div>
          <p className="text-muted-foreground">
            Set up your organization and invite team members to collaborate.
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* Organization Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Organization Name *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. BoardSync Technologies" 
                        {...field}
                        disabled={loading}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Team Member Invitations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-base font-semibold">
                    Invite Team Members (Optional)
                  </FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInvitationField}
                    disabled={loading}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                  Invited members will receive an email with instructions to join your organization as employees.
                </p>

                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-3">
                      <FormField
                        control={form.control}
                        name={`invitations.${index}.email`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="member@example.com" 
                                {...field}
                                disabled={loading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInvitationField(index)}
                          disabled={loading}
                          className="shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {fields.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <p className="text-sm">No team members to invite.</p>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addInvitationField}
                      className="mt-2"
                    >
                      Add first member
                    </Button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Creating Organization..." : "Create Organization"}
                </Button>
              </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}