import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ImageLogo from "./ImageLogo";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ChevronDown 
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on window resize (if desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path || location === `/${path}`;
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Get initials from username
  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase();
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/students", label: "For Students" },
    { path: "/employee", label: "For Employees" },
    { path: "/employer", label: "For Employers" },
    { path: "/companies", label: "For Companies" },
    { path: "/pricing", label: "Pricing" }
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <ImageLogo width={120} height={55} />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={`font-medium py-2 ${isActive(link.path) ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.username}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {user.userType === "student" && (
                  <DropdownMenuItem asChild>
                    <Link href="/student-dashboard" className="cursor-pointer">
                      <span>Student Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.userType === "employer" && (
                  <DropdownMenuItem asChild>
                    <Link href="/employer" className="cursor-pointer">
                      <span>Employer Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.userType === "employee" && (
                  <DropdownMenuItem asChild>
                    <Link href="/employee" className="cursor-pointer">
                      <span>Employee Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth" className="text-primary font-medium">
                Login
              </Link>
              <Button asChild>
                <Link href="/auth">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-neutral-dark"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`font-medium py-2 ${isActive(link.path) ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col space-y-3 pt-2 border-t border-neutral-200">
            {user ? (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.username}</span>
                </div>
                
                <Link href="/profile" className="flex items-center space-x-2 text-neutral-dark hover:text-primary py-2">
                  <UserIcon size={16} />
                  <span>Profile</span>
                </Link>
                
                {user.userType === "student" && (
                  <Link href="/student-dashboard" className="py-2 text-neutral-dark hover:text-primary">
                    Student Dashboard
                  </Link>
                )}
                {user.userType === "employer" && (
                  <Link href="/employer" className="py-2 text-neutral-dark hover:text-primary">
                    Employer Dashboard
                  </Link>
                )}
                {user.userType === "employee" && (
                  <Link href="/employee" className="py-2 text-neutral-dark hover:text-primary">
                    Employee Dashboard
                  </Link>
                )}
                
                <Button 
                  variant="destructive" 
                  className="flex items-center justify-center" 
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth" className="text-primary font-medium py-2">
                  Login
                </Link>
                <Button asChild>
                  <Link href="/auth">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
