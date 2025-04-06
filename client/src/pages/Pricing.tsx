import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const studentPlan = {
    name: "Student Plan",
    description: "Perfect for students and recent graduates",
    price: {
      monthly: "£5",
      annually: "£50"
    },
    savings: "Save £10 with annual billing",
    features: [
      { included: true, text: "Full access to course library" },
      { included: true, text: "Personalized skill recommendations" },
      { included: true, text: "Job matching with top companies" },
      { included: true, text: "CV/Resume analysis and optimization" },
      { included: true, text: "Access to skill assessments" },
      { included: false, text: "Priority support" }
    ]
  };

  const companyPlans = [
    {
      name: "Starter",
      description: "For small businesses and startups",
      price: {
        monthly: "£200",
        annually: "£2,000"
      },
      savings: "Save £400 with annual billing",
      features: [
        { included: true, text: "Up to 10 employees" },
        { included: true, text: "Basic skill gap analysis" },
        { included: true, text: "Course assignments" },
        { included: true, text: "Job posting & candidate matching" },
        { included: false, text: "Advanced analytics" },
        { included: false, text: "Custom learning paths" },
        { included: false, text: "API access" },
        { included: false, text: "Dedicated account manager" }
      ]
    },
    {
      name: "Professional",
      popular: true,
      description: "For growing companies",
      price: {
        monthly: "£500",
        annually: "£5,000"
      },
      savings: "Save £1,000 with annual billing",
      features: [
        { included: true, text: "Up to 50 employees" },
        { included: true, text: "Advanced skill gap analysis" },
        { included: true, text: "Course assignments & tracking" },
        { included: true, text: "Job posting & candidate matching" },
        { included: true, text: "Advanced analytics dashboard" },
        { included: true, text: "Custom learning paths" },
        { included: false, text: "API access" },
        { included: false, text: "Dedicated account manager" }
      ]
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: {
        monthly: "Custom",
        annually: "Custom"
      },
      features: [
        { included: true, text: "Unlimited employees" },
        { included: true, text: "Advanced skill gap analysis" },
        { included: true, text: "Course assignments & tracking" },
        { included: true, text: "Job posting & candidate matching" },
        { included: true, text: "Advanced analytics dashboard" },
        { included: true, text: "Custom learning paths" },
        { included: true, text: "API access" },
        { included: true, text: "Dedicated account manager" }
      ]
    }
  ];

  // Sample FAQ data
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 14-day free trial for all company plans. Student plans come with a 30-day money-back guarantee."
    },
    {
      question: "How does the student pricing work?",
      answer: "Our student plan is available to all enrolled students with a valid .edu email address or other proof of enrollment."
    },
    {
      question: "What happens when I add more employees than my plan allows?",
      answer: "If you exceed your employee limit, we'll notify you to upgrade to a more suitable plan. There's a 10% buffer period to give you time to decide."
    }
  ];

  return (
    <div className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Pricing Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-neutral-700 text-lg max-w-2xl mx-auto mb-8">
            Choose the plan that best fits your needs, whether you're a student looking to accelerate your career or a company building a skilled workforce.
          </p>
          
          <Tabs defaultValue="student" className="max-w-md mx-auto">
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="student">For Students</TabsTrigger>
              <TabsTrigger value="company">For Companies</TabsTrigger>
            </TabsList>
            
            <div className="mt-4 flex items-center justify-center space-x-4">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-primary" : "text-neutral-500"}`}>Monthly</span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${billingCycle === "annually" ? "bg-primary" : "bg-neutral-300"}`}
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annually" : "monthly")}
                aria-checked={billingCycle === "annually"}
                role="switch"
              >
                <span 
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${billingCycle === "annually" ? "translate-x-6" : "translate-x-1"}`} 
                />
              </button>
              <span className={`text-sm ${billingCycle === "annually" ? "text-primary" : "text-neutral-500"}`}>
                Annually <span className="text-green-600 font-medium">(Save up to 20%)</span>
              </span>
            </div>
            
            <TabsContent value="student" className="mt-8">
              <div className="max-w-md mx-auto">
                <Card className="overflow-hidden">
                  <CardHeader className="bg-primary/5 p-6">
                    <h2 className="text-2xl font-bold mb-1">{studentPlan.name}</h2>
                    <p className="text-neutral-700">{studentPlan.description}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div className="flex items-end">
                        <span className="text-4xl font-bold">{studentPlan.price[billingCycle]}</span>
                        <span className="text-neutral-700 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                      </div>
                      {billingCycle === "annually" && (
                        <p className="text-green-600 text-sm mt-1">{studentPlan.savings}</p>
                      )}
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {studentPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          ) : (
                            <X className="h-5 w-5 text-neutral-300 mr-2 mt-0.5" />
                          )}
                          <span className={feature.included ? "text-neutral-800" : "text-neutral-500"}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="bg-neutral-50 p-6">
                    <Button className="w-full" asChild>
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="company" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {companyPlans.map((plan, index) => (
                  <Card key={index} className={`overflow-hidden relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-sm font-medium rounded-bl-lg">
                        Most Popular
                      </div>
                    )}
                    <CardHeader className={`${plan.popular ? 'bg-primary/10' : 'bg-neutral-50'} p-6`}>
                      <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
                      <p className="text-neutral-700">{plan.description}</p>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <div className="flex items-end">
                          <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                          {plan.price[billingCycle] !== "Custom" && (
                            <span className="text-neutral-700 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
                          )}
                        </div>
                        {billingCycle === "annually" && plan.savings && (
                          <p className="text-green-600 text-sm mt-1">{plan.savings}</p>
                        )}
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            {feature.included ? (
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            ) : (
                              <X className="h-5 w-5 text-neutral-300 mr-2 mt-0.5" />
                            )}
                            <span className={feature.included ? "text-neutral-800" : "text-neutral-500"}>
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="bg-neutral-50 p-6">
                      {plan.name === "Enterprise" ? (
                        <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                          Contact Sales
                        </Button>
                      ) : (
                        <Button className="w-full" asChild variant={plan.popular ? "default" : "outline"}>
                          <Link href="/signup">Get Started</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Features Comparison */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Compare All Features</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-neutral-50 border-b">
                  <th className="text-left py-4 px-6 font-medium text-neutral-700">Feature</th>
                  <th className="text-center py-4 px-6 font-medium text-neutral-700">Student</th>
                  <th className="text-center py-4 px-6 font-medium text-neutral-700">Company Starter</th>
                  <th className="text-center py-4 px-6 font-medium text-neutral-700">Company Professional</th>
                  <th className="text-center py-4 px-6 font-medium text-neutral-700">Company Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-6 font-medium">Users</td>
                  <td className="py-3 px-6 text-center">1</td>
                  <td className="py-3 px-6 text-center">Up to 10</td>
                  <td className="py-3 px-6 text-center">Up to 50</td>
                  <td className="py-3 px-6 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Skill Analysis</td>
                  <td className="py-3 px-6 text-center">Personal only</td>
                  <td className="py-3 px-6 text-center">Basic</td>
                  <td className="py-3 px-6 text-center">Advanced</td>
                  <td className="py-3 px-6 text-center">Custom</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Course Library</td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Course Creation</td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Recruitment Tools</td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center">Basic</td>
                  <td className="py-3 px-6 text-center">Advanced</td>
                  <td className="py-3 px-6 text-center">Enterprise-grade</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Analytics Dashboard</td>
                  <td className="py-3 px-6 text-center">Personal</td>
                  <td className="py-3 px-6 text-center">Basic</td>
                  <td className="py-3 px-6 text-center">Advanced</td>
                  <td className="py-3 px-6 text-center">Custom</td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Job Matching</td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">API Access</td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium">Priority Support</td>
                  <td className="py-3 px-6 text-center"><X className="h-5 w-5 text-neutral-300 mx-auto" /></td>
                  <td className="py-3 px-6 text-center">Email</td>
                  <td className="py-3 px-6 text-center">Email & Chat</td>
                  <td className="py-3 px-6 text-center">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-neutral-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary rounded-xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students and companies already using Skillsync to accelerate their careers and build future-ready workforces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;