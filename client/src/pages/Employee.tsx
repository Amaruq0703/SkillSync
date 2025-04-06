import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Award, 
  Clock, 
  ChevronRight,
  BarChart,
  CheckCircle2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Employee = () => {
  // Sample courses for the employee
  const assignedCourses = [
    {
      title: "Advanced Data Analysis",
      company: "Your Company",
      progress: 78,
      dueDays: 7,
      description: "Learn advanced techniques for analyzing and visualizing complex datasets.",
      modules: 8,
      completed: 6
    },
    {
      title: "Project Management Fundamentals",
      company: "Your Company",
      progress: 35,
      dueDays: 14,
      description: "Master the core principles of effective project management.",
      modules: 6,
      completed: 2
    },
    {
      title: "Leadership in Tech Teams",
      company: "Your Company",
      progress: 90,
      dueDays: 3,
      description: "Develop essential leadership skills for technical team environments.",
      modules: 5,
      completed: 4
    }
  ];

  // Sample skill progress data
  const skillProgress = [
    { skill: "Technical Skills", level: "Advanced", percentage: 85 },
    { skill: "Project Management", level: "Intermediate", percentage: 65 },
    { skill: "Leadership", level: "Developing", percentage: 45 },
    { skill: "Communication", level: "Advanced", percentage: 90 }
  ];

  // Sample achievements
  const achievements = [
    {
      title: "Fast Learner",
      description: "Completed 3 courses in your first month",
      date: "March 2025"
    },
    {
      title: "Technical Expert",
      description: "Achieved 90%+ in all technical assessments",
      date: "February 2025"
    },
    {
      title: "Team Collaborator",
      description: "Participated in 5 group learning sessions",
      date: "January 2025"
    }
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Employee Dashboard Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
          <p className="text-neutral-700">
            Track your learning progress and skills development
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Assigned Courses</h3>
                <BookOpen className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">{assignedCourses.length}</p>
              <p className="text-sm text-neutral-700">Active courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Overall Progress</h3>
                <BarChart className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">68%</p>
              <p className="text-sm text-neutral-700">Across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Achievements</h3>
                <Award className="text-primary h-5 w-5" />
              </div>
              <p className="text-3xl font-bold">{achievements.length}</p>
              <p className="text-sm text-neutral-700">Badges earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Assigned Courses</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {assignedCourses.map((course, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{course.title}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        course.dueDays <= 3 
                          ? 'bg-red-100 text-red-800' 
                          : course.dueDays <= 7 
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {course.dueDays} days left
                      </div>
                    </div>
                    <p className="text-sm text-neutral-500 mb-3">Assigned by {course.company}</p>
                    <p className="text-neutral-700 mb-3">{course.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{course.completed} of {course.modules} modules completed</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm">Course Details</Button>
                    <Button size="sm">Continue</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Skills Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Skill Progress</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{skill.skill}</h3>
                        <span className="text-sm">{skill.level}</span>
                      </div>
                      <Progress 
                        value={skill.percentage} 
                        className="h-2 mb-1" 
                        indicatorClassName={
                          skill.percentage > 80 ? "bg-green-500" : 
                          skill.percentage > 60 ? "bg-primary" : 
                          skill.percentage > 40 ? "bg-amber-500" : 
                          "bg-red-500"
                        }
                      />
                      <div className="flex justify-between text-xs text-neutral-500">
                        <span>Current: {skill.percentage}%</span>
                        <span>Target: 100%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-6">View Detailed Assessment</Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Recent Achievements</h2>
            <Card>
              <CardContent className="p-6">
                <div className="divide-y">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`${index > 0 ? 'pt-4' : ''} ${index < achievements.length - 1 ? 'pb-4' : ''}`}>
                      <div className="flex">
                        <div className="mr-4 mt-1">
                          <div className="bg-primary/10 rounded-full p-2">
                            <Award className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-base">{achievement.title}</h3>
                          <p className="text-neutral-700 text-sm mb-1">{achievement.description}</p>
                          <p className="text-neutral-500 text-xs">Achieved: {achievement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-6">View All Achievements</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recommended Learning */}
        <div className="bg-neutral-50 rounded-xl p-8 mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recommended For You</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 rounded-full p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">Advanced Machine Learning</h3>
                      <span className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">New</span>
                    </div>
                    <p className="text-neutral-700 text-sm mb-1">Builds on your data analysis skills</p>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>12 hours</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-primary/10 rounded-full p-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold">Strategic Leadership</h3>
                      <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-1">Popular</span>
                    </div>
                    <p className="text-neutral-700 text-sm mb-1">Next step in your leadership journey</p>
                    <div className="flex items-center text-xs text-neutral-500">
                      <Clock className="h-3 w-3 mr-1" /> 
                      <span>8 hours</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-neutral-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to advance your career?</h2>
          <p className="text-neutral-700 mb-6 max-w-2xl mx-auto">
            Explore more courses and develop the skills that will take your career to the next level.
          </p>
          <Button asChild size="lg">
            <Link href="/features">Explore More Courses</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Employee;