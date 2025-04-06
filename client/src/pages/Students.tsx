import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  File, 
  LineChart, 
  MapPin, 
  DollarSign,
  Check
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Students = () => {
  // Sample job matches for display
  const jobMatches = [
    {
      matchPercentage: 92,
      matchType: "High Match",
      tag: "Perfect Fit",
      tagColor: "bg-green-500",
      title: "Junior Data Analyst",
      company: "TechCorp Solutions",
      location: "New York (Remote Option)",
      salary: "$65,000 - $75,000",
      skills: ["Python", "SQL", "Data Visualization"],
      match: "Matches 8 of your key skills including Python, SQL, and data analysis."
    },
    {
      matchPercentage: 78,
      matchType: "Good Match",
      tag: "Strong Potential",
      tagColor: "bg-primary",
      title: "Business Intelligence Analyst",
      company: "Global Finance Inc.",
      location: "Chicago, IL",
      salary: "$70,000 - $85,000",
      skills: ["Tableau", "SQL", "Excel"],
      match: "Matches 6 of your key skills. Skill gap in Tableau can be addressed with training."
    },
    {
      matchPercentage: 64,
      matchType: "Stretch Match",
      tag: "Growth Opportunity",
      tagColor: "bg-amber-500",
      title: "Marketing Analytics Specialist",
      company: "Brand Innovators LLC",
      location: "Remote",
      salary: "$60,000 - $72,000",
      skills: ["Google Analytics", "Data Analysis", "Marketing"],
      match: "Your data skills transfer well. Opportunity to develop marketing expertise."
    }
  ];

  // Sample skill analysis
  const skillAnalysis = [
    { skill: "Technical Skills", level: "Strong", percentage: 85 },
    { skill: "Communication Skills", level: "Needs Improvement", percentage: 45 },
    { skill: "Leadership Experience", level: "Moderate", percentage: 65 }
  ];

  // Recommended skills
  const recommendedSkills = [
    { 
      name: "SQL Database Management", 
      description: "High demand in your target industry", 
      icon: "database" 
    },
    { 
      name: "Project Management", 
      description: "Complements your technical skills", 
      icon: "customer-service" 
    },
    { 
      name: "Public Speaking", 
      description: "Addresses gap in your profile", 
      icon: "presentation" 
    }
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl font-bold mb-6">For Students and Graduates</h1>
              <p className="text-neutral-700 text-lg mb-8">
                Turn your academic achievements into professional success with personalized 
                guidance and opportunities matched to your unique profile.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Create Your Profile</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Student using laptop" 
                className="w-full rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
        
        {/* Student Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How Skillsync Benefits Students</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* CV Analysis Section */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <File className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Smart CV Analysis</h3>
                    <p className="text-neutral-700">
                      Understand exactly how recruiters see your profile and how you compare 
                      to other candidates in your field.
                    </p>
                  </div>
                </div>
                
                <div className="border border-neutral-200 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-3">Sample CV Analysis</h4>
                  <div className="space-y-3">
                    {skillAnalysis.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-neutral-700">{item.skill}</span>
                          <span className="text-sm font-medium">{item.level}</span>
                        </div>
                        <Progress 
                          value={item.percentage} 
                          className="h-2" 
                          indicatorClassName={
                            item.percentage > 75 ? "bg-green-500" : 
                            item.percentage > 50 ? "bg-primary" : 
                            "bg-amber-500"
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-neutral-500 italic">
                  Our algorithm analyzes 50+ dimensions of your CV to provide a comprehensive assessment.
                </p>
              </CardContent>
            </Card>
            
            {/* Skill Development */}
            <Card className="bg-white">
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <LineChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Personalized Skill Development</h3>
                    <p className="text-neutral-700">
                      Get customized recommendations to build the specific skills employers 
                      in your target industry are looking for.
                    </p>
                  </div>
                </div>
                
                <div className="border border-neutral-200 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-3">Your Recommended Skills</h4>
                  <div className="space-y-4">
                    {recommendedSkills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <div className="text-primary">
                            {skill.icon === "database" && <div className="h-5 w-5">DB</div>}
                            {skill.icon === "customer-service" && <div className="h-5 w-5">PM</div>}
                            {skill.icon === "presentation" && <div className="h-5 w-5">PS</div>}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium">{skill.name}</h5>
                          <p className="text-sm text-neutral-700">{skill.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-neutral-500 italic">
                  Recommendations update as you develop new skills and as industry demands evolve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Job Matching Preview */}
        <div className="bg-neutral-50 p-8 rounded-xl mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">AI-Powered Job Matching</h2>
            <p className="text-neutral-700">
              Get connected with opportunities that are perfect for your unique skill profile
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {jobMatches.map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`${
                  job.matchPercentage > 85 ? "bg-green-500/10" : 
                  job.matchPercentage > 70 ? "bg-primary/10" : 
                  "bg-amber-500/10"
                } p-3 flex justify-between items-center`}>
                  <span className="font-medium">{job.matchType} ({job.matchPercentage}%)</span>
                  <span className={`${job.tagColor} text-white text-xs py-1 px-2 rounded-full`}>
                    {job.tag}
                  </span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                  <p className="text-neutral-500 text-sm mb-3">{job.company}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-2 h-4 w-4 text-neutral-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <DollarSign className="mr-2 h-4 w-4 text-neutral-500" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-neutral-700 mb-4">
                    {job.match}
                  </div>
                  <Button className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Success Path */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-10">Your Path to Career Success</h2>
          
          <div className="relative max-w-3xl mx-auto">
            {/* Timeline (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-8 rounded-full bg-primary text-white font-bold">1</div>
                <div className="md:w-5/12 md:ml-auto p-5 bg-white rounded-lg shadow-md relative">
                  <div className="md:hidden w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">1</div>
                  <h3 className="font-bold text-lg mb-2">Create Your Profile</h3>
                  <p className="text-neutral-700">Upload your CV and complete your profile to unlock personalized recommendations.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-8 rounded-full bg-primary text-white font-bold">2</div>
                <div className="md:w-5/12 md:mr-auto p-5 bg-white rounded-lg shadow-md relative">
                  <div className="md:hidden w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">2</div>
                  <h3 className="font-bold text-lg mb-2">Review Your Analysis</h3>
                  <p className="text-neutral-700">Gain insights about your strengths, weaknesses, and how you compare to other candidates.</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-8 rounded-full bg-primary text-white font-bold">3</div>
                <div className="md:w-5/12 md:ml-auto p-5 bg-white rounded-lg shadow-md relative">
                  <div className="md:hidden w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">3</div>
                  <h3 className="font-bold text-lg mb-2">Develop Your Skills</h3>
                  <p className="text-neutral-700">Follow your personalized skill development plan with recommended resources and courses.</p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-8 rounded-full bg-primary text-white font-bold">4</div>
                <div className="md:w-5/12 md:mr-auto p-5 bg-white rounded-lg shadow-md relative">
                  <div className="md:hidden w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center mb-3">4</div>
                  <h3 className="font-bold text-lg mb-2">Match with Opportunities</h3>
                  <p className="text-neutral-700">Get connected with jobs and companies that align with your skills and career goals.</p>
                </div>
              </div>
              
              {/* Success */}
              <div className="relative">
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-2 w-8 h-8 rounded-full bg-green-500 text-white font-bold">
                  <Check className="h-5 w-5" />
                </div>
                <div className="md:w-5/12 md:ml-auto p-5 bg-white rounded-lg shadow-md relative">
                  <div className="md:hidden w-8 h-8 rounded-full bg-green-500 text-white font-bold flex items-center justify-center mb-3">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Launch Your Career</h3>
                  <p className="text-neutral-700">Start your professional journey with confidence, knowing you're well-prepared for success.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've found their perfect career path with Skillsync.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/signup">Create Free Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Students;
