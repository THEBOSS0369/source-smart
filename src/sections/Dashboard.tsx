"use client";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import React, { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  ValueAnimationTransition,
  useInView,
} from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Analyzing Requirements",
    description: "AI processes your procurement needs",
    status: "completed",
    icon: "🔍",
  },
  {
    id: 2,
    title: "Drafting RFQs",
    description: "Creating optimized request documents",
    status: "active",
    icon: "📝",
  },
  {
    id: 3,
    title: "Finding Suppliers",
    description: "Identifying best-match vendors",
    status: "pending",
    icon: "🏢",
  },
  {
    id: 4,
    title: "Price Negotiation",
    description: "AI-powered cost optimization",
    status: "pending",
    icon: "💰",
  },
  {
    id: 5,
    title: "Quality Assessment",
    description: "Evaluating supplier capabilities",
    status: "pending",
    icon: "⭐",
  },
  {
    id: 6,
    title: "Contract Review",
    description: "Legal and compliance checks",
    status: "pending",
    icon: "📋",
  },
  {
    id: 7,
    title: "Final Selection",
    description: "Optimal supplier recommendation",
    status: "pending",
    icon: "✅",
  },
];

const StepCard = ({
  step,
  index,
  isInView,
}: {
  step: (typeof steps)[number];
  index: number;
  isInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(60px 60px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  useEffect(() => {
    if (!cardRef.current || step.status !== "active") return;

    const { height, width } = cardRef.current?.getBoundingClientRect();
    const circumference = height * 2 + width * 2;

    const times = [
      0,
      width / circumference,
      (width + height) / circumference,
      (width * 2 + height) / circumference,
      1,
    ];
    const options: ValueAnimationTransition = {
      times,
      duration: 3,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [step.status]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 30,
        scale: isInView ? 1 : 0.95,
      }}
      transition={{
        delay: isInView ? index * 0.15 + 0.5 : 0,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`
        relative border rounded-xl p-4 backdrop-blur-sm transition-all duration-300
        ${
          step.status === "completed"
            ? "border-green-500/30 bg-green-500/5"
            : step.status === "active"
            ? "border-blue-400/50 bg-blue-500/10"
            : "border-white/15 bg-white/5"
        }
      `}
    >
      {step.status === "active" && (
        <motion.div
          style={{
            maskImage: maskImage,
          }}
          className="absolute inset-0 -m-px rounded-xl border border-blue-400"
        />
      )}

      <div className="flex items-start gap-3 relative">
        <div
          className={`
          w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
          ${
            step.status === "completed"
              ? "bg-green-500 text-white"
              : step.status === "active"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-white/70"
          }
        `}
        >
          {step.status === "completed" ? "✓" : step.id}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={`
            font-medium text-sm mb-1
            ${
              step.status === "completed" || step.status === "active"
                ? "text-white"
                : "text-white/70"
            }
          `}
          >
            {step.title}
          </h4>
          <p className="text-xs text-white/50 leading-relaxed">
            {step.description}
          </p>
        </div>

        <div className="text-lg opacity-60">{step.icon}</div>
      </div>

      {step.status === "active" && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-blue-400 font-medium">
              Processing...
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ProgressBar = ({
  currentStep,
  isInView,
}: {
  currentStep: number;
  isInView: boolean;
}) => {
  const progressPercentage = (currentStep / 7) * 100;

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{
        delay: isInView ? 0.6 : 0,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">
          Step {currentStep}
        </span>
        <span className="text-sm text-white/70">7 Steps</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${progressPercentage}%` : 0 }}
          transition={{
            duration: 1.2,
            delay: isInView ? 0.8 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full relative"
        >
          <div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full shadow-lg" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function DashboardPreview() {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatuses, setStepStatuses] = useState(() =>
    steps.map((step, index) => ({
      ...step,
      status: index === 0 ? "active" : "pending",
    }))
  );

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-progress through steps
  useEffect(() => {
    const stepDuration = 20000 / 7; // 60 seconds divided by 7 steps

    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = prev >= 7 ? 1 : prev + 1;

        // Update step statuses
        setStepStatuses((prevStatuses) =>
          prevStatuses.map((step, index) => ({
            ...step,
            status:
              index < nextStep - 1
                ? "completed"
                : index === nextStep - 1
                ? "active"
                : "pending",
          }))
        );

        return nextStep;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="container mx-auto px-5 lg:px-20">
        <motion.h2
          className="text-5xl md:text-6xl font-medium text-center tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Watch AI Work Its Magic
        </motion.h2>
        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{
            delay: isInView ? 0.2 : 0,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          See how our intelligent procurement assistant handles complex sourcing
          tasks automatically, from requirement analysis to final supplier
          selection.
        </motion.p>

        <motion.div
          className="mt-10 border border-white/20 p-6 rounded-xl"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 40,
            scale: isInView ? 1 : 0.98,
          }}
          transition={{
            delay: isInView ? 0.3 : 0,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* Dashboard Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{
              delay: isInView ? 0.4 : 0,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">
                Procurement Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-green-500 font-medium">
                  AI Active
                </span>
              </div>
            </div>
            <ProgressBar currentStep={currentStep} isInView={isInView} />
          </motion.div>

          {/* Main Status */}
          <motion.div
            className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{
              delay: isInView ? 0.5 : 0,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h4 className="text-white font-medium">
                  Absolutely! I'll analyze your requirements and find the best
                  suppliers. Let me get started...
                </h4>
              </div>
            </div>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stepStatuses.slice(0, 6).map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Final Step - Full Width */}
          <div className="mt-4">
            <StepCard step={stepStatuses[6]} index={6} isInView={isInView} />
          </div>

          {/* Dashboard Stats */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{
              delay: isInView ? 1.2 : 0,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {[
              {
                value: "$50,000",
                label: "Labor Costs Saved",
                color: "text-blue-400",
              },
              {
                value: "18%",
                label: "Cost Reduction",
                color: "text-green-500",
              },
              {
                value: "500",
                label: "New Suppliers Found",
                color: "text-blue-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg text-center bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 20,
                  scale: isInView ? 1 : 0.95,
                }}
                transition={{
                  delay: isInView ? 1.3 + index * 0.1 : 0,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Results Notice */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{
              delay: isInView ? 1.6 : 0,
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span>Results typically seen within first 30 days</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
