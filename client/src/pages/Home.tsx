import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  CloudUpload, 
  Lightbulb, 
  UserRound, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Computer Science Student",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "Skillsync helped me identify skill gaps in my resume and connected me with a tech startup that perfectly matched my career goals. I'm now working in my dream job!"
  },
  {
    name: "Michael Chen",
    title: "HR Director, TechGrowth Inc.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote: "As a fast-growing company, finding talent with the right skills is critical. Skillsync's matching algorithm has transformed our recruitment process, saving us time and improving hire quality."
  },
  {
    name: "Priya Patel",
    title: "Business Administration Graduate",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "The skill recommendations from Skillsync helped me focus my learning. Within weeks, I had improved my analytics skills and landed a data-driven marketing role!"
  }
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Accelerate Your Career Journey
              </h1>
              <p className="text-lg text-neutral-700 mb-8">
                Skillsync bridges the gap between student potential and industry needs 
                with AI-powered skill matching and personalized career guidance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg">
                  <Link href="/students">For Students</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/companies">For Companies</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-10">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Students collaborating" 
                className="w-full rounded-lg shadow-xl" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-primary text-4xl font-bold mb-2">94%</div>
              <p className="text-neutral-700">of students find relevant opportunities within 3 months</p>
            </div>
            <div className="text-center">
              <div className="text-primary text-4xl font-bold mb-2">10K+</div>
              <p className="text-neutral-700">companies actively recruiting on our platform</p>
            </div>
            <div className="text-center">
              <div className="text-primary text-4xl font-bold mb-2">85%</div>
              <p className="text-neutral-700">hiring success rate for companies using Skillsync</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Skillsync Works</h2>
            <p className="text-neutral-700 text-lg max-w-2xl mx-auto">
              Our platform creates perfect matches between talented students and forward-thinking companies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CloudUpload className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Upload Your CV</h3>
                <p className="text-neutral-700">
                  Our AI analyzes your experience, education, and skills to build your talent profile.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Get Recommendations</h3>
                <p className="text-neutral-700">
                  Receive personalized skill development plans and job matches based on your profile.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <UserRound className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Connect with Companies</h3>
                <p className="text-neutral-700">
                  Companies looking for your unique skill set can contact you directly for opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-neutral-50">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} profile`} 
                      className="w-12 h-12 rounded-full mr-4" 
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-neutral-500 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-neutral-700">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Accelerate Your Career?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies already benefiting from Skillsync's AI-powered skill matching platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
