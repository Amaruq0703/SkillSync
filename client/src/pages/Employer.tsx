import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Briefcase, 
  GraduationCap, 
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BarChart2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Employer = () => {
  // Sample company data
  const companyName = "TechGrowth Solutions";
  
  // Sample employee training data
  const employeeTraining = [
    {
      name: "Sarah Johnson",
      position: "Senior Developer",
      department: "Engineering",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      coursesAssigned: 3,
      coursesCompleted: 2,
      overallProgress: 75,
      courses: [
        { name: "Advanced Machine Learning", progress: 100, status: "completed" },
        { name: "Leadership in Tech", progress: 100, status: "completed" },
        { name: "Cloud Architecture", progress: 25, status: "in-progress" }
      ]
    },
    {
      name: "Michael Chen",
      position: "Product Manager",
      department: "Product",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      coursesAssigned: 4,
      coursesCompleted: 1,
      overallProgress: 40,
      courses: [
        { name: "Strategic Product Management", progress: 100, status: "completed" },
        { name: "UX Fundamentals", progress: 60, status: "in-progress" },
        { name: "Agile Leadership", progress: 25, status: "in-progress" },
        { name: "Data-Driven Decision Making", progress: 0, status: "not-started" }
      ]
    },
    {
      name: "Jessica Williams",
      position: "Marketing Specialist",
      department: "Marketing",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      coursesAssigned: 2,
      coursesCompleted: 2,
      overallProgress: 100,
      courses: [
        { name: "Digital Marketing Analytics", progress: 100, status: "completed" },
        { name: "Content Strategy", progress: 100, status: "completed" }
      ]
    },
    {
      name: "David Miller",
      position: "Junior Developer",
      department: "Engineering",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      coursesAssigned: 3,
      coursesCompleted: 0,
      overallProgress: 15,
      courses: [
        { name: "Backend Development with Node.js", progress: 35, status: "in-progress" },
        { name: "Database Design", progress: 10, status: "in-progress" },
        { name: "Testing and CI/CD", progress: 0, status: "not-started" }
      ]
    }
  ];

  // Sample job listing data
  const jobListings = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "London (Hybrid)",
      posted: "2 days ago",
      applicants: 12,
      matches: 5,
      status: "active"
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      posted: "1 week ago",
      applicants: 24,
      matches: 8,
      status: "active"
    },
    {
      title: "Data Scientist",
      department: "Data",
      location: "Berlin",
      posted: "3 weeks ago",
      applicants: 18,
      matches: 6,
      status: "active"
    }
  ];

  // Sample candidate matches
  const candidateMatches = [
    {
      name: "Alexander Mitchell",
      position: "Senior Developer",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      match: 95,
      keySkills: ["Node.js", "React", "AWS", "Typescript"],
      experience: "7 years"
    },
    {
      name: "Emily Parker",
      position: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      match: 92,
      keySkills: ["UI Design", "User Research", "Figma", "Design Systems"],
      experience: "5 years"
    },
    {
      name: "Robert Zhang",
      position: "Data Scientist",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      match: 88,
      keySkills: ["Python", "Machine Learning", "Data Visualization", "SQL"],
      experience: "4 years"
    }
  ];

  // Departmental skills gap data
  const departmentSkillGaps = [
    {
      department: "Engineering",
      skillsNeeded: ["Cloud Architecture", "AI/ML Engineering", "DevOps"],
      currentCoverage: 65
    },
    {
      department: "Design",
      skillsNeeded: ["Design Systems", "3D Modeling", "Motion Design"],
      currentCoverage: 70
    },
    {
      department: "Marketing",
      skillsNeeded: ["SEO", "Content Marketing", "Social Media Analytics"],
      currentCoverage: 85
    },
    {
      department: "Product",
      skillsNeeded: ["Agile Leadership", "Market Research", "Product Analytics"],
      currentCoverage: 60
    }
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Employer Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
          <p className="text-neutral-700">
            {companyName} - Manage your employees' skills development and recruitment
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Total Employees</h3>
                <Users className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">124</p>
              <p className="text-sm text-neutral-700">Active team members</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Active Courses</h3>
                <GraduationCap className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">18</p>
              <p className="text-sm text-neutral-700">Assigned training</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Open Positions</h3>
                <Briefcase className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">{jobListings.length}</p>
              <p className="text-sm text-neutral-700">Active job listings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Skill Coverage</h3>
                <BarChart2 className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">76%</p>
              <p className="text-sm text-neutral-700">Across all departments</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="employees" className="mb-16">
          <TabsList className="mb-8">
            <TabsTrigger value="employees">Employee Training</TabsTrigger>
            <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            <TabsTrigger value="skillgaps">Skill Gaps</TabsTrigger>
          </TabsList>
          
          {/* Employee Training Tab */}
          <TabsContent value="employees">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Employee Training Progress</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Assign Courses</Button>
                  <Button variant="outline" size="sm">Generate Report</Button>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-neutral-50 border-b">
                        <th className="text-left py-3 px-4 font-medium text-neutral-700">Employee</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-700">Position</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-700">Department</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-700">Courses</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-700">Progress</th>
                        <th className="text-left py-3 px-4 font-medium text-neutral-700"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {employeeTraining.map((employee, index) => (
                        <tr key={index} className="hover:bg-neutral-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="mr-2">
                                <AvatarImage src={employee.image} alt={employee.name} />
                                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{employee.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-neutral-700">{employee.position}</td>
                          <td className="py-3 px-4 text-neutral-700">{employee.department}</td>
                          <td className="py-3 px-4">
                            <span className="font-medium">{employee.coursesCompleted}</span>
                            <span className="text-neutral-500">/{employee.coursesAssigned}</span>
                          </td>
                          <td className="py-3 px-4 w-1/5">
                            <div className="flex items-center">
                              <Progress value={employee.overallProgress} className="h-2 w-full mr-3" />
                              <span className="font-medium whitespace-nowrap">{employee.overallProgress}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Popular Courses</h2>
                <Button variant="outline" size="sm">Browse Course Library</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold">Leadership in Tech Teams</h3>
                      </div>
                      <p className="text-neutral-700 text-sm mb-3">
                        Develop essential leadership skills for managing technical teams effectively.
                      </p>
                      <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                        <span>24 employees enrolled</span>
                        <span>8 hours</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Assign Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold">Cloud Architecture Fundamentals</h3>
                      </div>
                      <p className="text-neutral-700 text-sm mb-3">
                        Master the principles of designing and implementing cloud-based systems.
                      </p>
                      <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                        <span>18 employees enrolled</span>
                        <span>12 hours</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Assign Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <GraduationCap className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold">Data-Driven Decision Making</h3>
                      </div>
                      <p className="text-neutral-700 text-sm mb-3">
                        Learn how to leverage data analytics to inform strategic business decisions.
                      </p>
                      <div className="flex justify-between items-center text-sm text-neutral-500 mb-4">
                        <span>15 employees enrolled</span>
                        <span>10 hours</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Assign Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Recruitment Tab */}
          <TabsContent value="recruitment">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Job Listings */}
              <div className="md:col-span-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Active Jobs</h2>
                  <Button variant="outline" size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {jobListings.map((job, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 border-b bg-neutral-50 flex justify-between">
                        <h3 className="font-bold">{job.title}</h3>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {job.status === 'active' ? 'Active' : 'Closed'}
                        </span>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-700">Department:</span>
                            <span className="font-medium">{job.department}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-700">Location:</span>
                            <span className="font-medium">{job.location}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-700">Posted:</span>
                            <span className="font-medium">{job.posted}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm mb-4">
                          <div>
                            <span className="text-neutral-700">Applicants: </span>
                            <span className="font-medium">{job.applicants}</span>
                          </div>
                          <div>
                            <span className="text-neutral-700">Matches: </span>
                            <span className="font-medium">{job.matches}</span>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {/* Top Candidate Matches */}
              <div className="md:col-span-2">
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Top Candidate Matches</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
                      <input 
                        type="text" 
                        placeholder="Search candidates" 
                        className="pl-10 h-9 rounded-md border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {candidateMatches.map((candidate, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row">
                            <div className="flex items-start sm:w-1/3 mb-4 sm:mb-0">
                              <Avatar className="mr-3 h-12 w-12">
                                <AvatarImage src={candidate.image} alt={candidate.name} />
                                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-bold">{candidate.name}</h3>
                                <p className="text-neutral-700 text-sm">{candidate.position}</p>
                                <p className="text-neutral-500 text-sm">{candidate.experience} experience</p>
                              </div>
                            </div>
                            
                            <div className="sm:w-1/3 mb-4 sm:mb-0">
                              <h4 className="text-sm font-medium mb-2">Key Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {candidate.keySkills.map((skill, skillIndex) => (
                                  <span 
                                    key={skillIndex} 
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="sm:w-1/3 flex flex-col items-end justify-between">
                              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                                {candidate.match}% Match
                              </div>
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">View Profile</Button>
                                <Button size="sm">Contact</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="text-center mt-12">
                  <h3 className="text-xl font-bold mb-3">Need to find more qualified candidates?</h3>
                  <p className="text-neutral-700 mb-6 max-w-lg mx-auto">
                    Use our AI-powered talent matching to discover candidates with the exact skills you need.
                  </p>
                  <Button>Find More Candidates</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Skill Gaps Tab */}
          <TabsContent value="skillgaps">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-6">Skill Coverage by Department</h2>
                
                <div className="space-y-6">
                  {departmentSkillGaps.map((dept, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-bold mb-2">{dept.department}</h3>
                        <div className="mb-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-neutral-700">Current Skill Coverage</span>
                            <span className="text-sm font-medium">{dept.currentCoverage}%</span>
                          </div>
                          <Progress 
                            value={dept.currentCoverage} 
                            className="h-2" 
                            indicatorClassName={
                              dept.currentCoverage > 80 ? "bg-green-500" : 
                              dept.currentCoverage > 60 ? "bg-primary" : 
                              "bg-amber-500"
                            }
                          />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Key Skill Gaps:</h4>
                          <ul className="space-y-1">
                            {dept.skillsNeeded.map((skill, skillIndex) => (
                              <li key={skillIndex} className="flex items-start text-sm">
                                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                                <span>{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Workforce Development Plan</h2>
                
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg">Priority Skills to Develop</h3>
                      <Button variant="outline" size="sm">Download Full Report</Button>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Cloud Architecture</h4>
                            <p className="text-sm text-neutral-700">Critical for engineering department</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Courses</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">AI/ML Engineering</h4>
                            <p className="text-sm text-neutral-700">High demand skill in your industry</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Courses</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">Agile Leadership</h4>
                            <p className="text-sm text-neutral-700">Gap identified in product department</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Courses</Button>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h4 className="font-medium text-primary mb-2">Recommendations:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>Prioritize Cloud Architecture training for Engineering team</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>Consider hiring specialists in AI/ML or upskill current employees</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <span>Develop Agile leadership capabilities across all departments</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center bg-neutral-50 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-3">Let us help you build a future-ready workforce</h3>
                  <p className="text-neutral-700 mb-6 max-w-lg mx-auto">
                    Our AI-powered skill planning tools can help you identify gaps, develop talent, and stay ahead of industry trends.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button variant="outline">Schedule Consultation</Button>
                    <Button>
                      <span>Start Planning</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Call to Action */}
        <div className="bg-primary text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to transform your workforce?</h2>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Upgrade to our premium employer plan to access advanced workforce analytics, unlimited job postings, and personalized learning paths for your employees.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary" asChild>
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employer;