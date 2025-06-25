"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  IoGlobeOutline,
  IoChatbubblesOutline,
  IoBarChartOutline,
} from "react-icons/io5";

const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1e40af] to-[#3b82f6] shadow-[0px_0px_12px_#3b82f6] ">
      <div className="absolute inset-0 ">
        <div className="rounded-lg border border-white/20 inset-0 absolute [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute-0 inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0_0_10px_rgb(59,130,246,.7)_inset] rounded-lg"></div>
      </div>
      <span>{props.children}</span>
    </button>
  );
};

const useRelativeMousePosition = (to: React.RefObject<HTMLElement>) => {
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

const features = [
  {
    id: 1,
    title: "InstaSource Crawler",
    description:
      "Discover top suppliers worldwide using our intelligent sourcing engine that analyzes millions of data points in real-time.",
    icon: IoGlobeOutline,
    badge: "FEATURE 1",
  },
  {
    id: 2,
    title: "SmartQuote Engine",
    description:
      "Streamline quote reviews, fast-track negotiations, and seal deals with ease using AI-powered comparison tools.",
    icon: IoChatbubblesOutline,
    badge: "FEATURE 2",
  },
  {
    id: 3,
    title: "ForecastPro Suite",
    description:
      "Use intelligent forecasts to stay ahead of demand and streamline your inventory with predictive analytics.",
    icon: IoBarChartOutline,
    badge: "FEATURE 3",
  },
];

const FeatureCard = ({
  feature,
  index,
  visible,
}: {
  feature: (typeof features)[0];
  index: number;
  visible: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, mouseY] = useRelativeMousePosition(
    cardRef as React.RefObject<HTMLElement>
  );

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px ${mouseY}px, black, transparent)`;
  const Icon = feature.icon;

  return (
    <div ref={cardRef} className="flex-shrink-0 w-80 lg:w-96">
      <motion.div
        initial={{ opacity: 0, x: 100, rotateY: 45 }}
        animate={
          visible
            ? {
                opacity: 1,
                x: 0,
                rotateY: 0,
              }
            : {
                opacity: 0,
                x: 100,
                rotateY: 45,
              }
        }
        transition={{
          duration: 0.8,
          delay: index * 0.2,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        className="relative group h-full"
        style={{ perspective: 1500 }}
      >
        <motion.div
          whileHover={{
            rotateY: -5,
            rotateX: 5,
            z: 50,
            scale: 1.02,
          }}
          className="relative h-full"
        >
          {/* Glass card background */}
          <div className="relative border border-white/15 rounded-xl p-6 h-full backdrop-blur-sm bg-black/20 overflow-hidden">
            {/* Default blue overlay */}
            <div className="absolute inset-0  bg-blend-overlay opacity-50 group-hover:opacity-0 transition duration-700 rounded-xl" />

            {/* Mouse-following blue overlay */}
            <motion.div
              className="absolute inset-0 bg-[rgb(30,64,175)] bg-blend-overlay opacity-0 group-hover:opacity-50 transition duration-700 rounded-xl"
              style={{
                maskImage: maskImage,
              }}
            />

            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />

            {/* Feature badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.4 + index * 0.1 }}
              className="inline-block mb-4 relative z-10"
            >
              <span className="text-xs rounded-full px-3 py-1 border border-white/20 backdrop-blur-3xl  text-white font-semibold">
                {feature.badge}
              </span>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={
                visible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }
              }
              transition={{
                type: "spring",
                duration: 0.8,
                delay: 0.6 + index * 0.1,
              }}
              className="mb-6 py-2 relative z-10"
            >
              <div className="w-12 h-12 border border-white/15 rounded-lg inline-flex items-center justify-center relative overflow-hidden">
                <Icon className="text-2xl relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="space-y-4 flex flex-col h-full relative z-20"
            >
              <h3 className="text-3xl font-semibold text-white tracking-tight">
                {feature.title}
              </h3>

              <p className="text-white/70 leading-relaxed font-semibold text-base flex-grow">
                {feature.description}
              </p>

              {/* <motion.a
                href="#"
                className="inline-flex items-center text-white font-medium hover:text-blue-300 transition-colors group mt-auto"
                whileHover={{ x: 5 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                Read more
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </motion.a> */}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function HorizontalCardStepper() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Main component visibility detection
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const visibleStep = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [0, features.length, features.length]
  );
  const [scrollStep, setScrollStep] = useState(0);

  useEffect(() => {
    const unsubscribe = visibleStep.on("change", (v) => {
      setScrollStep(Math.ceil(v));
    });
    return () => unsubscribe();
  }, [visibleStep]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="pt-[240px] relative md:py-36 overflow-hiddenpy-20"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.95,
        }}
        transition={{
          duration: 1.5,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="relative h-full w-full bg-black"
      >
        <div className="absolute bottom-0 left-0 right-16 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.8,
          }}
          transition={{
            duration: 2,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute left-1/2 top-[-25%] h-[700px] w-[700px] md:top-[-10%] md:h-[1000px] md:w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7)_0%,rgba(59,130,246,0.6)_25%,rgba(30,64,175,0.8)_50%,rgba(15,23,42,0.9)_75%,rgba(0,0,0,1)_100%)]
shadow-[0_0_60px_rgba(59,130,246,0.3),inset_0_0_60px_rgba(255,255,255,0.05),0_0_120px_rgba(59,130,246,0.15)]"
        ></motion.div>
      </motion.div>

      <section
        ref={sectionRef}
        className="py-20 md:py-24 relative text-white overflow-hidden"
      >
        <div className="container mx-auto px-5 lg:px-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 50,
            }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 30,
              }}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-5xl md:text-6xl font-medium tracking-tighter mb-5"
            >
              We Offer Nothing Short of the Best
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
              }}
              transition={{
                duration: 1,
                delay: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white/70 text-lg md:text-xl tracking-tight"
            >
              Discover our premium features designed to transform your business
              operations with cutting-edge AI technology.
            </motion.p>
          </motion.div>

          {/* Horizontal scrolling cards container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 40,
            }}
            transition={{
              duration: 1,
              delay: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            {/* Cards container */}
            <div className="flex justify-center gap-8 pb-8 overflow-x-auto scrollbar-hide">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  visible={index < scrollStep && isInView}
                />
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: isInView ? 1 : 0,
              y: isInView ? 0 : 30,
            }}
            transition={{
              duration: 0.8,
              delay: 1.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-center mt-20"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="relative py-3 px-6 rounded-lg font-medium text-lg bg-gradient-to-b from-[#1e40af] to-[#3b82f6] shadow-[0px_0px_12px_#3b82f6]">
                <div className="absolute inset-0">
                  <div className="rounded-lg border border-white/20 inset-0 absolute [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
                  <div className="rounded-lg border absolute-0 inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
                  <div className="absolute inset-0 shadow-[0_0_10px_rgb(59,130,246,.7)_inset] rounded-lg"></div>
                </div>
                <span className="flex items-center gap-2">
                  Request a Demo
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </motion.div>
  );
}
