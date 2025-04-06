import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileSearch, 
  Lightbulb, 
  Link2, 
  UserSearch, 
  BarChart2, 
  BookOpen,
  Check
} from "lucide-react";

// Feature category filter options
type CategoryFilter = "all" | "students" | "companies" | "matching";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: Exclude<CategoryFilter, "all">;
  tags: string[];
}

const Features = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const features: Feature[] = [
    {
      icon: <FileSearch size={48} className="text-primary" />,
      title: "AI-Powered CV Analysis",
      description: "Our AI examines your resume to identify your skills, experience levels, and potential areas for improvement.",
      category: "students",
      tags: ["For Students", "AI Technology"]
    },
    {
      icon: <Lightbulb size={48} className="text-primary" />,
      title: "Personalized Skill Recommendations",
      description: "Get tailored suggestions for skills to develop based on your career goals and current job market demands.",
      category: "students",
      tags: ["For Students", "Career Development"]
    },
    {
      icon: <Link2 size={48} className="text-primary" />,
      title: "Intelligent Job Matching",
      description: "Our algorithm connects students with opportunities that align with their skills, preferences, and career trajectory.",
      category: "matching",
      tags: ["For Students", "For Companies"]
    },
    {
      icon: <UserSearch size={48} className="text-primary" />,
      title: "Advanced Talent Search",
      description: "Find qualified candidates with specific skill sets, experience levels, and educational backgrounds.",
      category: "companies",
      tags: ["For Companies", "Recruitment"]
    },
    {
      icon: <BarChart2 size={48} className="text-primary" />,
      title: "Workforce Skill Gap Analysis",
      description: "Identify skill gaps within your organization and find talent to address those specific needs.",
      category: "companies",
      tags: ["For Companies", "Workforce Planning"]
    },
    {
      icon: <BookOpen size={48} className="text-primary" />,
      title: "Learning Resource Recommendations",
      description: "Access curated courses, tutorials, and resources to develop the skills you need for your desired career.",
      category: "students",
      tags: ["For Students", "Education"]
    }
  ];

  const filteredFeatures = features.filter(feature => 
    activeCategory === "all" || feature.category === activeCategory
  );

  const handleCategoryChange = (category: CategoryFilter) => {
    setActiveCategory(category);
  };

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
          <p className="text-neutral-700 text-lg max-w-2xl mx-auto">
            Discover how Skillsync helps students and companies create perfect matches through innovative technology.
          </p>
        </div>
        
        {/* Feature Categories */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange("all")}
            >
              All Features
            </Button>
            <Button
              variant={activeCategory === "students" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange("students")}
            >
              For Students
            </Button>
            <Button
              variant={activeCategory === "companies" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange("companies")}
            >
              For Companies
            </Button>
            <Button
              variant={activeCategory === "matching" ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryChange("matching")}
            >
              Matching Tech
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-neutral-700 mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className={`text-xs px-3 py-1 rounded-full ${
                          tag === "For Students" 
                            ? "bg-primary/10 text-primary" 
                            : tag === "For Companies"
                              ? "bg-orange-500/10 text-orange-500"
                              : "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Technology Showcase */}
        <div className="bg-neutral-50 p-8 rounded-xl mt-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-3">Our Technology</h2>
            <p className="text-neutral-700">Powered by advanced AI and machine learning algorithms</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Skills Detection Engine</h3>
              <p className="text-neutral-700 mb-3">Our Natural Language Processing algorithms can:</p>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Extract and classify skills from resumes and job descriptions</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Determine skill levels based on context and experience</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Identify correlations between skills and industry requirements</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Adapt to emerging skills and changing industry needs</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Matching Algorithm</h3>
              <p className="text-neutral-700 mb-3">Our proprietary matching system:</p>
              <ul className="space-y-2 text-neutral-700">
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Uses a multi-dimensional vector space for precise matching</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Considers both hard skills and soft skills in matching</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Incorporates career trajectory and growth potential</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-500 mr-2 mt-1 h-5 w-5" />
                  <span>Continuously improves through machine learning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
