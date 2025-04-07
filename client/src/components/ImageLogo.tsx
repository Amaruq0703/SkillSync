import { FC } from "react";
import logoImg from "../assets/skillsync-logo.png";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const ImageLogo: FC<LogoProps> = ({ width, height, className = "" }) => {
  return (
    <img 
      src={logoImg} 
      alt="Skillsync Logo" 
      className={className}
      style={{ 
        width: width ? `${width}px` : "auto", 
        height: height ? `${height}px` : "auto" 
      }}
    />
  );
};

export default ImageLogo;