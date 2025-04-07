import { Link } from "wouter";
import ImageLogo from "./ImageLogo";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <ImageLogo width={60} height={20} className="mr-2" />
            </div>
            <p className="text-white/70 mb-4">
              Empowering students and companies to create perfect skill matches.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white" aria-label="Instagram">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/70 hover:text-white">Home</Link></li>
              <li><Link href="/features" className="text-white/70 hover:text-white">Features</Link></li>
              <li><Link href="/students" className="text-white/70 hover:text-white">For Students</Link></li>
              <li><Link href="/companies" className="text-white/70 hover:text-white">For Companies</Link></li>
              <li><a href="#" className="text-white/70 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Career Guides</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Skill Development</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Recruitment Tips</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Industry Insights</a></li>
              <li><a href="#" className="text-white/70 hover:text-white">Success Stories</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="mr-2 mt-1 w-5 h-5 text-white/70" />
                <span className="text-white/70">support@skillsync.edu</span>
              </li>
              <li className="flex items-start">
                <Phone className="mr-2 mt-1 w-5 h-5 text-white/70" />
                <span className="text-white/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 w-5 h-5 text-white/70" />
                <span className="text-white/70">
                  123 Innovation Drive<br />
                  Tech District, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {year} Skillsync. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/70 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-white/70 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-white/70 hover:text-white text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
