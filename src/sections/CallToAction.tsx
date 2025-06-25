"use client";
import { Button } from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useInView,
} from "framer-motion";
import { RefObject, useEffect, useRef } from "react";
import Image from "next/image";
import sourceSmartLogo from "@/assets/loge_image.png";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosition = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top);
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return [mouseX, mouseY];
};

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  // Fix type error: useRelativeMousePosition expects RefObject<HTMLElement>
  // borderedDivRef is RefObject<HTMLDivElement>, which is assignable to HTMLElement
  // So, we can cast it as RefObject<HTMLElement>
  const [mouseX, mouseY] = useRelativeMousePosition(
    borderedDivRef as RefObject<HTMLElement>
  );
  // const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

  const imageMask = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section className="py-20 md:py-36" ref={sectionRef}>
      <div className="container mx-auto px-5 lg:px-20">
        <motion.div
          ref={borderedDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 60,
            scale: isInView ? 1 : 0.95,
            backgroundPositionX: starsBg.width,
          }}
          transition={{
            opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
            y: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
            scale: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
            backgroundPositionX: {
              repeat: Infinity,
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            backgroundPositionY,
            backgroundImage: `url(${starsBg.src})`,
          }}
        >
          <div
            className="absolute inset-0 bg-[rgb(30,64,175)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div>
          <motion.div
            className="absolute inset-0 bg-[rgb(30,64,175)] bg-blend-overlay opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage: imageMask,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>
          <div className="relative">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
                scale: isInView ? 1 : 0.8,
              }}
              transition={{
                delay: isInView ? 0.3 : 0,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <Image
                src={sourceSmartLogo}
                alt="SourceSmart Logo"
                width={100}
                height={100}
              />
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl mt-8 max-w-3xl mx-auto tracking-tighter text-center font-medium"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
              transition={{
                delay: isInView ? 0.5 : 0,
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              The only platform you need to automate your{" "}
              <motion.span
                className="font-semibold bg-[radial-gradient(100%_100%_at_top_left,white,rgba(191,219,254,0.95),rgba(59,130,246,0.9))] bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.9,
                }}
                transition={{
                  delay: isInView ? 0.8 : 0,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                end-to-end
              </motion.span>{" "}
              procurement process.
            </motion.h2>
            <motion.p
              className="text-center text-lg md:text-xl max-w-sm mx-auto text-white/70 px-4 mt-5 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{
                delay: isInView ? 0.7 : 0,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Achieve clear, impactful results without the complexity.
            </motion.p>

            {/* <div className="flex justify-center mt-8">
              <Button>Schedule Demo</Button>
            </div> */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
              transition={{
                delay: isInView ? 1.1 : 0,
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <motion.p
                className="text-center text-xl md:text-xl font-semibold mb-1 text-white/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{
                  delay: isInView ? 1.2 : 0,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                CRAFTED BY PROFESSIONALS FROM
              </motion.p>
              <div className="flex flex-row items-center justify-center gap-12 md:gap-24">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 30,
                    scale: isInView ? 1 : 0.8,
                  }}
                  transition={{
                    delay: isInView ? 1.3 : 0,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <Image
                    src={require("@/assets/company/microsoft.webp")}
                    alt="Microsoft Logo"
                    width={160}
                    height={80}
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 30,
                    scale: isInView ? 1 : 0.8,
                  }}
                  transition={{
                    delay: isInView ? 1.4 : 0,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <Image
                    src={require("@/assets/company/amazon.webp")}
                    alt="Amazon Logo"
                    width={140}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    y: isInView ? 0 : 30,
                    scale: isInView ? 1 : 0.8,
                  }}
                  transition={{
                    delay: isInView ? 1.5 : 0,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <Image
                    src={require("@/assets/company/boeing.webp")}
                    alt="Boeing Logo"
                    width={140}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
