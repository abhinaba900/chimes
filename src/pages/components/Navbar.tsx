// components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AudioPlayer from "../home/hooks/AudioPlayer ";
import SendEnquiryPopup from "./SendEnquiryPopup";
import { useAuthContext } from "../AuthContext/AuthContext";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const {selectedNav, setSelectedNav }= useAuthContext();


  // Check if mobile and handle scroll/resize events
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 1025);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleResize = () => {
      checkIfMobile();
      if (window.innerWidth > 1025) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      if (!isMobile && window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const closeMenu = () => {
    setIsActive(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    document.body.style.overflow = isActive ? "" : "hidden";
  };

  const scrollToSection = (id: string) => {
    setSelectedNav(id);
    closeMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.4,
        delay: i * 0.07,
      },
    }),
  };

  const menuContainerVariants = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  // Navigation items with their corresponding IDs
  const navItems = [
    { name: "About Us", id: "about-us" },
    { name: "Highlights", id: "highlights" },
    { name: "Gallery", id: "gallery" },
    { name: "Amenities", id: "amenities" },
    { name: "Floor Plans", id: "floor-plans" },
    { name: "Nearby", id: "nearby" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);


  return (
    <header className="header" ref={navbarRef}>
      <motion.nav
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div className="nav-brand" initial={{ opacity: 1 }}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src="assets\The Chimes Logo.svg"
              alt="Logo"
              width={150}
              height={100}
              className="logo"
            />
          </Link>
        </motion.div>

        <motion.div
          className={`nav-menu ${isActive ? "active" : ""}`}
          initial={false}
        >
          <motion.ul
            className="nav-list"
            variants={menuContainerVariants}
            initial="closed"
            animate={isActive ? "open" : "closed"}
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.id}
                className={`nav-item `}
                variants={menuItemVariants}
                custom={i}
              >
                <button
                  className={`nav-link cursor-pointer ${selectedNav === item.id ? "active-link" : ""}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
              </motion.li>
            ))}
            <motion.li className="nav-item mobile-button">
              <Link href="#" className="nav-link">
                <button
                  className="enquiry-button"
                  onClick={() => {
                    setIsOpen(true);
                    closeMenu();
                  }}
                >
                  Send Enquiry
                </button>
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>

        <div className="nav-actions">
          <motion.div initial={{ opacity: 1 }} className="nav-action">
            <AudioPlayer />
            <Link href="#" className="nav-link">
              <button
                className="enquiry-button not-in-mobile"
                onClick={() => setIsOpen(true)}
              >
                Send Enquiry
              </button>
            </Link>
          </motion.div>

          <motion.div
            className={`nav-toggle ${isActive ? "nav-active" : ""}`}
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      <SendEnquiryPopup open={isOpen} setOpen={setIsOpen} />
    </header>
  );
}
