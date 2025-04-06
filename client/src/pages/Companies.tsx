import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  UserSearch, 
  LineChart, 
  Check,
  Users
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Companies = () => {
  // Sample pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      description: "For small businesses and startups",
      price: "$199",
      period: "/month",
      features: [
        "Up to 5 active job postings",
        "Basic candidate matching",
        "10 direct candidate contacts per month",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Professional",
      description: "For growing companies",
      price: "$499",
      period: "/month",
      features: [
        "Up to 15 active job postings",
        "Advanced candidate matching",
        "50 direct candidate contacts per month",
        "Team skill gap analysis",
        "Priority email & chat support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "",
      features: [
        "Unlimited job postings",
        "Premium candidate matching",
        "Unlimited candidate contacts",
        "Advanced workforce planning",
        "API integration",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  // Sample candidates
  const candidates = [
    {
      name: "Alexander Mitchell",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      role: "Senior Java Developer with 4 years experience in Spring and microservices architecture",
      match: 98,
      skills: [
        { name: "Java Development", matched: true },
        { name: "Spring Framework", matched: true },
        { name: "RESTful APIs", matched: true },
        { name: "AWS", matched: true },
        { name: "Microservices", matched: false }
      ]
    },
    {
      name: "Rebecca Johnson",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      role: "Java Backend Engineer with extensive Spring Boot and API development experience",
      match: 92,
      skills: [
        { name: "Java Development", matched: true },
        { name: "Spring Framework", matched: true },
        { name: "RESTful APIs", matched: true },
        { name: "Docker", matched: false },
        { name: "Limited AWS", matched: false, warning: true }
      ]
    },
    {
      name: "David Chen",
      image: "https://randomuser.me/api/portraits/men/29.jpg",
      role: "Full Stack Developer strong in Java microservices and cloud technologies",
      match: 85,
      skills: [
        { name: "Java Development", matched: true },
        { name: "Basic Spring", matched: false, warning: true },
        { name: "RESTful APIs", matched: true },
        { name: "AWS", matched: true },
        { name: "Docker", matched: true }
      ]
    }
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl font-bold mb-6">For Employers and Companies</h1>
              <p className="text-neutral-700 text-lg mb-8">
                Transform your talent acquisition strategy with AI-powered matching that 
                connects you with the perfect candidates for your specific needs.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Start Recruiting</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <img 
                src="https://images.unsplash.com/photo-1611267254323-4db7b39c732c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Business team meeting" 
                className="w-full rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
        
        {/* Company Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">How Skillsync Benefits Employers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Reduce Time-to-Hire</h3>
                <p className="text-neutral-700">
                  Our AI-powered matching reduces the time spent reviewing unsuitable candidates 
                  by 65%, accelerating your hiring process.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <UserSearch className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Find Hidden Talent</h3>
                <p className="text-neutral-700">
                  Discover candidates with non-traditional backgrounds who have the exact skills 
                  you need but might be overlooked in conventional recruiting.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <LineChart className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Improve Retention</h3>
                <p className="text-neutral-700">
                  Companies using Skillsync report 34% higher employee retention rates due to 
                  better skills alignment and job satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Talent Matching Preview */}
        <div className="bg-neutral-50 p-8 rounded-xl mb-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-bold mb-4">Precision Talent Matching</h2>
              <p className="text-neutral-700 mb-6">
                Our intelligent algorithm finds candidates that perfectly match your 
                requirements based on skills, experience, and potential.
              </p>
              
              <Card className="mb-6">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Sample Job Requirements</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Primary Skills (Required)</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Java Development</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Spring Framework</span>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">RESTful APIs</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Secondary Skills (Preferred)</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">AWS</span>
                        <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">Docker</span>
                        <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded-full">Microservices</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Experience Level</h4>
                      <span className="text-sm">3-5 years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <p className="text-sm text-neutral-500">
                Our algorithm considers over 100 data points beyond the obvious skill 
                keywords to ensure true compatibility.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <Card className="overflow-hidden">
                <div className="bg-primary/80 text-white p-4">
                  <h3 className="font-bold text-lg">Top Candidate Matches</h3>
                </div>
                
                <div>
                  {candidates.map((candidate, index) => (
                    <div key={index} className={`border-b border-neutral-200 p-4 ${index === candidates.length - 1 ? 'border-b-0' : ''}`}>
                      <div className="flex items-start">
                        <img 
                          src={candidate.image} 
                          alt={`${candidate.name} profile`} 
                          className="w-12 h-12 rounded-full mr-4" 
                        />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h4 className="font-bold">{candidate.name}</h4>
                            <span className={`${
                              candidate.match > 95 ? 'bg-green-500' : 
                              candidate.match > 80 ? 'bg-primary' : 
                              'bg-amber-500'
                            } text-white text-xs py-1 px-3 rounded-full`}>
                              {candidate.match}% Match
                            </span>
                          </div>
                          <p className="text-sm text-neutral-700 mb-3">{candidate.role}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {candidate.skills.map((skill, skillIndex) => (
                              <span 
                                key={skillIndex} 
                                className={`text-xs px-2 py-1 rounded-full ${
                                  skill.matched 
                                    ? 'bg-green-500/10 text-green-600' 
                                    : skill.warning
                                      ? 'bg-amber-500/10 text-amber-600'
                                      : 'bg-neutral-100 text-neutral-700'
                                }`}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex justify-end">
                            <Button size="sm">View Profile</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Workforce Planning */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strategic Workforce Planning</h2>
            <p className="text-neutral-700 text-lg max-w-2xl mx-auto">
              Beyond recruitment, Skillsync helps you build a future-ready workforce through 
              skill gap analysis and development planning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Team Skill Analysis</h3>
                <p className="text-neutral-700 mb-8">
                  Identify skill gaps within your teams and departments to target recruitment 
                  and upskilling initiatives.
                </p>
                
                <div>
                  <div className="relative pt-1 mb-8">
                    <h4 className="font-medium mb-3">Engineering Team Skill Coverage</h4>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">Frontend Development</span>
                        <span className="text-sm font-medium">Strong</span>
                      </div>
                      <Progress value={92} className="h-2" indicatorClassName="bg-green-500" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">Backend Development</span>
                        <span className="text-sm font-medium">Strong</span>
                      </div>
                      <Progress value={88} className="h-2" indicatorClassName="bg-green-500" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">DevOps</span>
                        <span className="text-sm font-medium">Moderate</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">Cloud Architecture</span>
                        <span className="text-sm font-medium">Needs Improvement</span>
                      </div>
                      <Progress value={35} className="h-2" indicatorClassName="bg-red-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">Machine Learning</span>
                        <span className="text-sm font-medium">Gap</span>
                      </div>
                      <Progress value={12} className="h-2" indicatorClassName="bg-red-500" />
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Recommended Actions:</h4>
                    <ul className="space-y-1 text-sm text-neutral-700">
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 h-4 w-4" />
                        <span>Prioritize hiring for Cloud Architecture skills</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 h-4 w-4" />
                        <span>Develop training program for existing staff in DevOps</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 h-4 w-4" />
                        <span>Consider partnering with ML specialists for upcoming projects</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Future-Ready Workforce Planning</h3>
                <p className="text-neutral-700 mb-8">
                  Prepare your organization for industry changes with data-driven insights 
                  about emerging skills and technologies.
                </p>
                
                <div>
                  <div className="mb-8">
                    <h4 className="font-medium mb-3">Emerging Skills in Your Industry</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">AI Ethics</h5>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">High Priority</span>
                        </div>
                        <p className="text-sm text-neutral-700">Critical for responsible AI implementation</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">Quantum Computing</h5>
                          <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-full">Long-term</span>
                        </div>
                        <p className="text-sm text-neutral-700">Emerging technology with future applications</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">Cybersecurity</h5>
                          <span className="text-xs bg-red-500/10 text-red-600 px-2 py-0.5 rounded-full">Urgent</span>
                        </div>
                        <p className="text-sm text-neutral-700">Critical for data protection compliance</p>
                      </div>
                      
                      <div className="bg-neutral-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium">Sustainability</h5>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">High Priority</span>
                        </div>
                        <p className="text-sm text-neutral-700">Growing importance in all industries</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 pt-6">
                    <h4 className="font-medium mb-3">Workforce Evolution Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="w-24 flex-shrink-0 pt-1">
                          <span className="text-sm font-medium">Now</span>
                        </div>
                        <div className="flex-1 bg-neutral-50 p-2 rounded-md">
                          <p className="text-sm">Focus on cloud migration and security enhancement</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-24 flex-shrink-0 pt-1">
                          <span className="text-sm font-medium">6-12 Months</span>
                        </div>
                        <div className="flex-1 bg-neutral-50 p-2 rounded-md">
                          <p className="text-sm">Develop AI implementation capacity and data governance</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-24 flex-shrink-0 pt-1">
                          <span className="text-sm font-medium">1-2 Years</span>
                        </div>
                        <div className="flex-1 bg-neutral-50 p-2 rounded-md">
                          <p className="text-sm">Build advanced analytics and automation capabilities</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-24 flex-shrink-0 pt-1">
                          <span className="text-sm font-medium">3-5 Years</span>
                        </div>
                        <div className="flex-1 bg-neutral-50 p-2 rounded-md">
                          <p className="text-sm">Prepare for emerging technologies like quantum computing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Pricing Plans */}
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Plans and Pricing</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              Flexible options to match your company's recruitment and workforce development needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`border rounded-lg overflow-hidden relative ${
                  plan.popular ? 'border-2 border-primary' : 'border-neutral-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs py-1 px-3 rounded-bl">
                    Popular
                  </div>
                )}
                <div className={`${plan.popular ? 'bg-primary/10' : 'bg-neutral-50'} p-6`}>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-neutral-700 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-neutral-700 ml-1">{plan.period}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 h-4 w-4" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Transform Your Talent Strategy</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join leading companies using Skillsync to build their future-ready workforce.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Create Company Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="#">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
