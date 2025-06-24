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
}: {
  step: (typeof steps)[number];
  index: number;
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
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

const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  const progressPercentage = (currentStep / 7) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-white">
          Step {currentStep}
        </span>
        <span className="text-sm text-white/70">7 Steps</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full relative"
        >
          <div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full shadow-lg" />
        </motion.div>
      </div>
    </div>
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
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-5 lg:px-20">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Watch AI Work Its Magic
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
          See how our intelligent procurement assistant handles complex sourcing
          tasks automatically, from requirement analysis to final supplier
          selection.
        </p>

        <div className="mt-10 border border-white/20 p-6 rounded-xl ">
          {/* Dashboard Header */}
          <div className="mb-8">
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
            <ProgressBar currentStep={currentStep} />
          </div>

          {/* Main Status */}
          <div className="mb-8 p-4 rounded-lg bg-blue-500/10 border border-blue-400/30">
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
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {stepStatuses.slice(0, 6).map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </div>

          {/* Final Step - Full Width */}
          <div className="mt-4">
            <StepCard step={stepStatuses[6]} index={6} />
          </div>

          {/* Dashboard Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg text-center bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                $50,000
              </div>
              <div className="text-sm text-white/70">Labor Costs Saved</div>
            </div>
            <div className="p-4 rounded-lg text-center bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-green-500 mb-1">18%</div>
              <div className="text-sm text-white/70">Cost Reduction</div>
            </div>
            <div className="p-4 rounded-lg text-center bg-white/5 border border-white/10">
              <div className="text-2xl font-bold text-blue-400 mb-1">500</div>
              <div className="text-sm text-white/70">New Suppliers Found</div>
            </div>
          </div>

          {/* Results Notice */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-400">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span>Results typically seen within first 30 days</span>
          </div>
        </div>
      </div>
    </section>
  );
}
