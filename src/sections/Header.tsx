"use client";
import MenuIcon from "@/assets/icon-menu.svg";
import { Button } from "@/components/Button";
import { motion } from "framer-motion";
import Image from "next/image";
import logeImage from "@/assets/loge_image.png";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      }}
      className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 backdrop-blur md:backdrop-blur-none"
    >
      <div className="container mx-auto px-5 lg:px-20">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: 0.4,
          }}
          className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl sm:max-w-2xl md:max-w-4xl mx-auto md:backdrop-blur"
        >
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.6,
            }}
            className="flex items-center gap-2"
          >
            <Image
              src={logeImage}
              alt="Logo"
              width={30}
              height={30}
              className="w-auto object-contain"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: 0.8,
              }}
              className="text-white font-semibold text-lg [text-shadow:0_0_15px_rgba(255,255,255,0.5)]"
              // className="text-white font-semibold text-lg [text-shadow:0_0_5px_rgba(255,255,255,1),_0_0_15px_rgba(255,255,255,0.6)]"
              // className="text-white font-semibold text-lg [text-shadow:0_0_20px_rgba(255,255,255,0.4)]"
              // className="text-white font-semibold text-lg [text-shadow:0_0_8px_rgba(255,255,255,0.8)]"
            >
              SourceSmart
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.7,
            }}
            className="hidden md:block"
          >
            <nav className="flex gap-8">
              {["Features", "Benefits", "Platform", "FAQ", "Contact"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.8 + index * 0.1,
                    }}
                    className="text-white/70 hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.6,
            }}
            className="flex items-center gap-4"
          >
            <Button>Schedule Demo</Button>
            <MenuIcon className="md:hidden" />
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  );
}
