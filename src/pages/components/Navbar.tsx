// components/Navbar.tsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Check if mobile and handle scroll/resize events
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 1025) {
        setIsMobile(true); // Adjust breakpoint as needed
        console.log("tregger in true");
      } else {
        closeMenu();
        console.log("tregger in false");
      }
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
        console.log("tregger in false in resize");

        closeMenu();
      }
    };

    const handleScroll = () => {
      if (!isMobile && window.scrollY > 10) {
        // Only apply scroll effect if not mobile
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
  }, [isMobile]); // Add isMobile to dependency array

  const closeMenu = () => {
    setIsActive(false);
    document.body.style.overflow = "";
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    document.body.style.overflow = isActive ? "" : "hidden";
  };

  console.log("isActive", isActive);

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

  return (
    <header className="header " ref={navbarRef}>
      <motion.nav
        className="navbar"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div
          className="nav-brand"
          initial={{ opacity: 1 }}
          animate={{ opacity: isMobile ? 1 : isScrolled ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/">
            <Image
              src="assets\The Chimes Logo.svg"
              alt="Logo"
              width={100}
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
            {[
              "About Us",
              "Highlights",
              "Gallery",
              "Amenities",
              "Floor Plans",
              "Nearby",
            ].map((item, i) => (
              <motion.li
                key={item}
                className="nav-item"
                variants={menuItemVariants}
                custom={i}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="nav-link"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              </motion.li>
            ))}
            <motion.li className="nav-item mobile-button">
              <Link href="/login" className="nav-link">
                <button className="enquiry-button">Send Enquiry</button>
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>

        <div className="nav-actions">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isMobile ? 1 : isScrolled ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="nav-action"
          >
            <Image
              src="assets\music-icon.svg"
              alt="Logo"
              width={44}
              height={44}
            />
            <Link href="/login" className="nav-link">
              <button className="enquiry-button not-in-mobile">
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
    </header>
  );
}
