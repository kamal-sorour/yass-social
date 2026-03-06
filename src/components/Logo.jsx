import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Logo({ className = "", size = "md", to = "/" }) {
  const sizes = {
    sm: "h-24",
    md: "h-28",
    lg: "h-32",
  };

  return (
    <Link
      to={to}
      className={`inline-flex items-center ${sizes[size]} ${className}`}
    >
      <img
        src={logo}
        alt="Yass"
        className={`${sizes[size]} w-auto object-contain`}
      />
    </Link>
  );
}