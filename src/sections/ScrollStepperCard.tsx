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
    icon: "🌐",
    badge: "FEATURE 1",
  },
  {
    id: 2,
    title: "SmartQuote Engine",
    description:
      "Streamline quote reviews, fast-track negotiations, and seal deals with ease using AI-powered comparison tools.",
    icon: "💬",
    badge: "FEATURE 2",
  },
  {
    id: 3,
    title: "ForecastPro Suite",
    description:
      "Use intelligent forecasts to stay ahead of demand and streamline your inventory with predictive analytics.",
    icon: "📊",
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
              <span className="text-xs rounded-full px-2 py-0.5 bg-[#3b82f6] text-white font-semibold">
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
              className="mb-6 relative z-10"
            >
              <div className="w-12 h-12 border border-white/15 rounded-lg inline-flex items-center justify-center relative overflow-hidden">
                <span className="text-2xl relative z-10">{feature.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/20 to-transparent" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="space-y-4 flex flex-col h-full relative z-10"
            >
              <h3 className="text-xl font-medium text-white tracking-tight">
                {feature.title}
              </h3>

              <p className="text-white/70 leading-relaxed text-sm flex-grow">
                {feature.description}
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-2"
              >
                <Button>Explore feature</Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function HorizontalCardStepper() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <div className="pt-[240px]">
      <div className="relative h-full w-full bg-black">
        <div className="absolute bottom-0 left-0 right-16 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {/* <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div> */}
        <div className="absolute left-1/2 top-[-10%] h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]   "></div>
      </div>

      <section
        ref={sectionRef}
        className="py-20 md:py-24 relative  text-white overflow-hidden"
      >
        <div className="container mx-auto px-5 lg:px-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium tracking-tighter mb-5">
              We Offer Nothing Short of the Best
            </h2>
            <p className="text-white/70 text-lg md:text-xl tracking-tight">
              Discover our premium features designed to transform your business
              operations with cutting-edge AI technology.
            </p>
          </motion.div>

          {/* Horizontal scrolling cards container */}
          <div className="relative">
            {/* Progress indicator */}
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1e40af] to-[#3b82f6] rounded-full"
                  style={{ width: `${(scrollStep / features.length) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Cards container */}
            <div className="flex gap-8 pb-8 overflow-x-auto scrollbar-hide">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.id}
                  feature={feature}
                  index={index}
                  visible={index < scrollStep}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
    </div>
  );
}
