import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, Upload, FileText, Award, BookOpen, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLocation } from "wouter";

export default function StudentDashboard() {
  const [resumeText, setResumeText] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  
  // CV Analysis query
  const { 
    data: cvAnalysis, 
    isLoading: cvAnalysisLoading, 
    isError: cvAnalysisError 
  } = useQuery({
    queryKey: ["/api/cv-analysis"],
    enabled: !!user,
    retry: false,
  });

  // Profile query to get user skills
  const { 
    data: profile, 
    isLoading: profileLoading 
  } = useQuery({
    queryKey: ["/api/profile"],
    enabled: !!user,
    retry: false,
  });

  // Submit CV Analysis mutation
  const cvAnalysisMutation = useMutation({
    mutationFn: async (data: { resumeText: string }) => {
      const res = await apiRequest("POST", "/api/cv-analysis", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cv-analysis"] });
      toast({
        title: "CV Analysis complete",
        description: "Your CV has been analyzed successfully.",
      });
      setResumeText("");
    },
    onError: (error: Error) => {
      toast({
        title: "Analysis failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitCV = () => {
    if (!resumeText.trim()) {
      toast({
        title: "Empty resume",
        description: "Please paste your resume text before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    cvAnalysisMutation.mutate({ resumeText });
  };

  if (!user) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="mt-2 text-muted-foreground">You need to be logged in to view your dashboard.</p>
          <Button onClick={() => navigate('/auth')} className="mt-4">
            Login or Register
          </Button>
        </div>
      </div>
    );
  }

  if (user.userType !== "student") {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="mt-2 text-muted-foreground">This dashboard is only available for student accounts.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Welcome to your personal dashboard. Track your progress and improve your skills.
      </p>

      <Tabs defaultValue="cv-analysis" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="cv-analysis" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            CV Analysis
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Recommended Courses
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>
        
        {/* CV Analysis Content */}
        <TabsContent value="cv-analysis">
          <div className="grid gap-8 md:grid-cols-2">
            {/* CV Input Card */}
            <Card>
              <CardHeader>
                <CardTitle>CV Analyzer</CardTitle>
                <CardDescription>
                  Paste your CV content to get personalized analysis and recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Paste your CV/Resume text here..."
                  className="min-h-[300px]"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSubmitCV} 
                  className="w-full"
                  disabled={cvAnalysisMutation.isPending}
                >
                  {cvAnalysisMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit for Analysis
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Analysis Results Card */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  Based on your CV, here are our findings and recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cvAnalysisLoading ? (
                  <div className="flex justify-center items-center min-h-[300px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : cvAnalysisError || !cvAnalysis ? (
                  <div className="min-h-[300px] flex flex-col justify-center items-center">
                    <p className="text-muted-foreground text-center mb-4">
                      No CV analysis found. Submit your CV to get personalized recommendations.
                    </p>
                    <FileText className="h-16 w-16 text-muted-foreground/50" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Extracted Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {cvAnalysis.extractedSkills?.map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Strengths</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {cvAnalysis.strengths?.map((strength: string, index: number) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {cvAnalysis.weaknesses?.map((weakness: string, index: number) => (
                          <li key={index}>{weakness}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Recommendations</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {cvAnalysis.recommendations?.map((recommendation: string, index: number) => (
                          <li key={index}>{recommendation}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Skills Content */}
        <TabsContent value="skills">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Skills</CardTitle>
                <CardDescription>
                  Skills from your profile and extracted from your CV.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profileLoading ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : !profile ? (
                  <Alert>
                    <AlertTitle>Profile not found</AlertTitle>
                    <AlertDescription>
                      Please complete your profile to track your skills.
                      <Button
                        variant="link"
                        className="p-0 h-auto font-normal"
                        onClick={() => navigate('/profile')}
                      >
                        Go to Profile
                      </Button>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-6">
                    {profile.skills && profile.skills.length > 0 ? (
                      <div>
                        <h3 className="font-semibold mb-2">Skills in Profile</h3>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill: string, index: number) => (
                            <Badge key={index} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No skills added to your profile yet.</p>
                    )}
                    
                    {cvAnalysis && cvAnalysis.extractedSkills?.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-2">Skills from CV</h3>
                        <div className="flex flex-wrap gap-2">
                          {cvAnalysis.extractedSkills.map((skill: string, index: number) => (
                            <Badge key={index} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {(!profile?.skills || profile.skills.length === 0) && 
                     (!cvAnalysis?.extractedSkills || cvAnalysis.extractedSkills.length === 0) && (
                      <div className="text-center py-8">
                        <Award className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          No skills found. Update your profile or submit your CV for analysis.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps</CardTitle>
                <CardDescription>
                  Based on job market trends, here are skills you might want to develop.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Recommended Skills to Learn</h3>
                    
                    {/* These would be dynamically generated based on user skills and market trends */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">React</span>
                          <span className="text-sm text-muted-foreground">High demand</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">TypeScript</span>
                          <span className="text-sm text-muted-foreground">Growing rapidly</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Data Analysis</span>
                          <span className="text-sm text-muted-foreground">Emerging field</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">UX Design</span>
                          <span className="text-sm text-muted-foreground">Complementary skill</span>
                        </div>
                        <Progress value={50} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Find Courses to Learn These Skills</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Courses Content */}
        <TabsContent value="courses">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Sample course cards - these would be fetched from an API */}
            <Card>
              <CardHeader>
                <CardTitle>Web Development Fundamentals</CardTitle>
                <CardDescription>
                  Learn HTML, CSS, and JavaScript basics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-sm font-medium">8 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Level:</span>
                    <span className="text-sm font-medium">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rating:</span>
                    <span className="text-sm font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Course</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>React.js for Beginners</CardTitle>
                <CardDescription>
                  Master modern React and build real projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-sm font-medium">10 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Level:</span>
                    <span className="text-sm font-medium">Intermediate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rating:</span>
                    <span className="text-sm font-medium">4.7/5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Course</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>TypeScript Deep Dive</CardTitle>
                <CardDescription>
                  Advanced TypeScript for professional developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Duration:</span>
                    <span className="text-sm font-medium">6 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Level:</span>
                    <span className="text-sm font-medium">Advanced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rating:</span>
                    <span className="text-sm font-medium">4.9/5</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Course</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Progress Content */}
        <TabsContent value="progress">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Career Progress</CardTitle>
                <CardDescription>
                  Track your learning journey and career development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Skills Development</h3>
                    <Progress value={45} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You've made progress on 45% of identified skill gaps.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Course Completion</h3>
                    <Progress value={20} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You've completed 20% of recommended courses.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Profile Strength</h3>
                    <Progress value={75} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Your profile is 75% complete. Add more details to improve your profile.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Job Readiness</CardTitle>
                <CardDescription>
                  Your preparedness for various career paths.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Frontend Developer</h3>
                    <Progress value={65} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You have 65% of skills required for this role.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Full Stack Developer</h3>
                    <Progress value={40} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      You need to develop backend skills to improve readiness.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">UX/UI Designer</h3>
                    <Progress value={25} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Consider taking design courses to pursue this path.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Job Recommendations</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}