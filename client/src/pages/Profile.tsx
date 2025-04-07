import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";
import { useLocation } from "wouter";

// Student Profile Schema
const studentProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  education: z.string().optional().nullable(),
  graduationYear: z.coerce.number().optional().nullable(),
  university: z.string().optional().nullable(),
  skills: z.array(z.string()).optional().nullable(),
  interests: z.array(z.string()).optional().nullable(),
  bio: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
});

// Employer Profile Schema
const employerProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().optional().nullable(),
  size: z.string().optional().nullable(),
  website: z.string().url("Please enter a valid URL").optional().nullable(),
  location: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

// Employee Profile Schema
const employeeProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  position: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  companyId: z.number().optional().nullable(),
  skills: z.array(z.string()).optional().nullable(),
  yearsOfExperience: z.coerce.number().optional().nullable(),
  bio: z.string().optional().nullable(),
});

type StudentProfileFormValues = z.infer<typeof studentProfileSchema>;
type EmployerProfileFormValues = z.infer<typeof employerProfileSchema>;
type EmployeeProfileFormValues = z.infer<typeof employeeProfileSchema>;

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  
  // Profile query
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!user,
    retry: false,
  });

  // Initialize the appropriate form based on user type
  const studentForm = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      fullName: "",
      education: "",
      graduationYear: null,
      university: "",
      skills: [],
      interests: [],
      bio: "",
      resumeUrl: ""
    }
  });

  const employerForm = useForm<EmployerProfileFormValues>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      size: "",
      website: "",
      location: "",
      description: ""
    }
  });

  const employeeForm = useForm<EmployeeProfileFormValues>({
    resolver: zodResolver(employeeProfileSchema),
    defaultValues: {
      fullName: "",
      position: "",
      department: "",
      companyId: null,
      skills: [],
      yearsOfExperience: null,
      bio: ""
    }
  });

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile && user) {
      if (user.userType === "student") {
        studentForm.reset({
          fullName: profile.fullName || "",
          education: profile.education || "",
          graduationYear: profile.graduationYear,
          university: profile.university || "",
          skills: profile.skills || [],
          interests: profile.interests || [],
          bio: profile.bio || "",
          resumeUrl: profile.resumeUrl || ""
        });
      } else if (user.userType === "employer") {
        employerForm.reset({
          companyName: profile.companyName || "",
          industry: profile.industry || "",
          size: profile.size || "",
          website: profile.website || "",
          location: profile.location || "",
          description: profile.description || ""
        });
      } else if (user.userType === "employee") {
        employeeForm.reset({
          fullName: profile.fullName || "",
          position: profile.position || "",
          department: profile.department || "",
          companyId: profile.companyId,
          skills: profile.skills || [],
          yearsOfExperience: profile.yearsOfExperience,
          bio: profile.bio || ""
        });
      }
    }
  }, [profile, user]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("Not authenticated");
      const res = await apiRequest("POST", `/api/profile/update`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create initial profile mutation
  const createProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("Not authenticated");
      const res = await apiRequest("POST", `/api/register/${user.userType}/profile`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({
        title: "Profile created",
        description: "Your profile has been created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Creation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handlers
  const onStudentSubmit = (data: StudentProfileFormValues) => {
    // Convert string-based skills and interests to arrays
    const formattedData = {
      ...data,
      skills: data.skills || [],
      interests: data.interests || []
    };
    
    if (profile) {
      updateProfileMutation.mutate(formattedData);
    } else {
      createProfileMutation.mutate(formattedData);
    }
  };

  const onEmployerSubmit = (data: EmployerProfileFormValues) => {
    if (profile) {
      updateProfileMutation.mutate(data);
    } else {
      createProfileMutation.mutate(data);
    }
  };

  const onEmployeeSubmit = (data: EmployeeProfileFormValues) => {
    // Convert string-based skills to array
    const formattedData = {
      ...data,
      skills: data.skills || []
    };
    
    if (profile) {
      updateProfileMutation.mutate(formattedData);
    } else {
      createProfileMutation.mutate(formattedData);
    }
  };

  // Helper to convert comma-separated string to array and vice versa
  const stringToArray = (str: string) => str.split(',').map(item => item.trim()).filter(Boolean);
  const arrayToString = (arr: string[] | null) => arr ? arr.join(', ') : '';

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to view your profile.</p>
          <Button onClick={() => navigate('/auth')} className="mt-4">
            Login or Register
          </Button>
        </div>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <p className="text-muted-foreground mb-8">
        Complete your profile to get the most out of SkillSync.
      </p>

      {user.userType === "student" && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Student Profile</CardTitle>
            <CardDescription>
              Share your education, skills, and interests to get personalized job recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...studentForm}>
              <form onSubmit={studentForm.handleSubmit(onStudentSubmit)} className="space-y-4">
                <FormField
                  control={studentForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={studentForm.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <FormControl>
                          <Input placeholder="Bachelor's, Master's, etc." {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={studentForm.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <FormControl>
                          <Input placeholder="University name" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={studentForm.control}
                    name="graduationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Graduation Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2023" 
                            {...field} 
                            value={field.value || ''} 
                            onChange={(e) => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={studentForm.control}
                    name="resumeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://myresume.com/resume.pdf" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={studentForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills (comma-separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="JavaScript, React, Node.js" 
                          value={arrayToString(field.value)}
                          onChange={(e) => field.onChange(stringToArray(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={studentForm.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interests (comma-separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Web Development, Machine Learning" 
                          value={arrayToString(field.value)}
                          onChange={(e) => field.onChange(stringToArray(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={studentForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about yourself" 
                          rows={4} 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={updateProfileMutation.isPending || createProfileMutation.isPending}
                >
                  {(updateProfileMutation.isPending || createProfileMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {user.userType === "employer" && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>
              Share information about your company to attract the right talent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...employerForm}>
              <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-4">
                <FormField
                  control={employerForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employerForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input placeholder="Technology, Finance, etc." {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={employerForm.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <FormControl>
                          <Input placeholder="1-10, 11-50, 51-200, 201+" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employerForm.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={employerForm.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="London, UK" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={employerForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your company" 
                          rows={4} 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={updateProfileMutation.isPending || createProfileMutation.isPending}
                >
                  {(updateProfileMutation.isPending || createProfileMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {user.userType === "employee" && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Employee Profile</CardTitle>
            <CardDescription>
              Share your professional experience and skills to track your career development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...employeeForm}>
              <form onSubmit={employeeForm.handleSubmit(onEmployeeSubmit)} className="space-y-4">
                <FormField
                  control={employeeForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employeeForm.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={employeeForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="Engineering" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={employeeForm.control}
                    name="yearsOfExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="5" 
                            {...field} 
                            value={field.value || ''} 
                            onChange={(e) => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={employeeForm.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company ID</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter your company ID" 
                            {...field} 
                            value={field.value || ''} 
                            onChange={(e) => field.onChange(e.target.value === '' ? null : parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={employeeForm.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills (comma-separated)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="JavaScript, React, Node.js" 
                          value={arrayToString(field.value)}
                          onChange={(e) => field.onChange(stringToArray(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={employeeForm.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your professional background" 
                          rows={4} 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={updateProfileMutation.isPending || createProfileMutation.isPending}
                >
                  {(updateProfileMutation.isPending || createProfileMutation.isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Profile
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}