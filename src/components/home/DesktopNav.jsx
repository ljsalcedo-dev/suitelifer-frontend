import { useState, useEffect } from "react";
import logo_fs_full from "../../assets/logos/logo-fs-full.svg";
import { NavLink, useLocation } from "react-router-dom";

export default function DesktopNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const opacity = Math.min(lastScrollY / 70, 1);

  // Scroll event handler
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    // Show logo
    if (currentScrollY > 70) {
      setIsVisible(true);
    } else {
      // Hide logo
      setIsVisible(false);
    }
    // Save the new scroll position
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <div
        style={{
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        }}
        className={`fixed z-50 top-0 left-0 right-0 ${
          isVisible ? "shadow" : ""
        } flex justify-between items-center h-16 px-7 z-50 `}
      >
        {/* Navigation Links*/}
        <nav className={`flex justify-center items-end relative`}>
          {/* Logo */}
          <div className={`w-32 lg:ml-0 lg:mr-7 xl:ml-9 xl:mr-16 `}>
            <a href="/">
              <img className="object-cover" src={logo_fs_full} alt="Logo" />
            </a>
          </div>
          <div className="flex gap-9 xl:gap-14">
            <div className="">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative !no-underline text-dark text-md hover:text-[#007a8e] ${
                    isActive ? "active-class text-[#007a8e]" : ""
                  }transition-all duration-300 ease-in-out 
      
                before:absolute before:content-[''] before:w-1 before:h-1 
                before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
                before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
                
                hover:before:opacity-100 hover:before:translate-y-1 
                ${isActive ? "before:opacity-100 before:translate-y-1" : ""}
      `
                }
              >
                <>Home</>
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `relative !no-underline text-dark text-md hover:text-[#007a8e] ${
                    isActive ? "active-class text-[#007a8e]" : ""
                  } transition-all duration-300 ease-in-out 
      
                before:absolute before:content-[''] before:w-1 before:h-1 
                before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
                before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
                
                hover:before:opacity-100 hover:before:translate-y-1 
                ${isActive ? "before:opacity-100 before:translate-y-1" : ""}
      `
                }
              >
                About
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/careers"
                className={({ isActive }) => {
                  const isPathActive = location.pathname.startsWith("/careers");
                  return `relative !no-underline text-dark text-md hover:text-[#007a8e] 
      ${
        isPathActive ? "active-class text-[#007a8e]" : ""
      } transition-all duration-300 ease-in-out 

      before:absolute before:content-[''] before:w-1 before:h-1 
      before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
      before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
      
      hover:before:opacity-100 hover:before:translate-y-1 
      ${isPathActive ? "before:opacity-100 before:translate-y-1" : ""}`;
                }}
              >
                Careers
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/newsletter"
                className={({ isActive }) =>
                  `relative !no-underline text-dark text-md hover:text-[#007a8e] ${
                    isActive ? "active-class text-[#007a8e]" : ""
                  }transition-all duration-300 ease-in-out 
      
                before:absolute before:content-[''] before:w-1 before:h-1 
                before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
                before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
                
                hover:before:opacity-100 hover:before:translate-y-1 
                ${isActive ? "before:opacity-100 before:translate-y-1" : ""}
      `
                }
              >
                Newsletter
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/podcast"
                className={({ isActive }) =>
                  `relative !no-underline text-dark text-md hover:text-[#007a8e] ${
                    isActive ? "active-class text-[#007a8e]" : ""
                  }transition-all duration-300 ease-in-out 
      
                before:absolute before:content-[''] before:w-1 before:h-1 
                before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
                before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
                
                hover:before:opacity-100 hover:before:translate-y-1 
                ${isActive ? "before:opacity-100 before:translate-y-1" : ""}
      `
                }
              >
                Podcasts
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `relative !no-underline text-dark text-md hover:text-[#007a8e] ${
                    isActive ? "active-class text-[#007a8e]" : ""
                  }transition-all duration-300 ease-in-out 
      
                before:absolute before:content-[''] before:w-1 before:h-1 
                before:rounded-full before:bg-[#007a8e] before:left-1/2 before:-translate-x-1/2 
                before:bottom-[-6px] before:opacity-0 before:transition-all before:duration-300
                
                hover:before:opacity-100 hover:before:translate-y-1 
                ${isActive ? "before:opacity-100 before:translate-y-1" : ""}
      `
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
        </nav>
        <div></div>
      </div>
    </>
  );
}
