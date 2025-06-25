"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  IoAnalyticsOutline,
  IoSearchOutline,
  IoChatbubblesOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

// Utility function for className merging
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

// Process steps data
const PROCESS_STEPS = [
  {
    id: "step-1",
    title: "Data Integration",
    description:
      "SourceSmart AI reads Revit, AutoCAD, or SAP data to identify all procurement requirements with quantities, specs, and delivery dates",
    icon: IoAnalyticsOutline,
  },
  {
    id: "step-2",
    title: "Supplier Discovery",
    description:
      "Search and qualify 500K+ suppliers based on certifications, capacity, location and past performance for each requirement",
    icon: IoSearchOutline,
  },
  {
    id: "step-3",
    title: "Automated Negotiations",
    description:
      "SourceSmart AI negotiates pricing, delivery terms and contract conditions with multiple suppliers simultaneously",
    icon: IoChatbubblesOutline,
  },
  {
    id: "step-4",
    title: "Contract Ready",
    description:
      "Review AI recommendations with cost analysis, risk assessment and contract terms ready for signature",
    icon: IoDocumentTextOutline,
  },
];

const ProcurementStepper = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to step index (float)
  const stepIndexMotion = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0, 1, 2, 3, 4]
  );

  // State to store the current step index (integer)
  const [currentStep, setCurrentStep] = useState(0);
  useMotionValueEvent(stepIndexMotion, "change", (latest) => {
    setCurrentStep(Math.floor(latest));
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-24 min-h-screen">
      <div className="container mx-auto px-5 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Fixed content */}
          <div className="lg:sticky lg:top-20 lg:h-fit">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-medium tracking-tighter">
                Whether it's{" "}
                <span className="bg-[radial-gradient(100%_100%_at_top_left,white,rgba(191,219,254,0.95),rgba(59,130,246,0.9))] bg-clip-text text-transparent">
                  BIM files, ERP exports, or product specs.
                </span>{" "}
                SourceSmart AI identifies needs, suppliers, negotiates &
                delivers{" "}
                <span className="bg-[radial-gradient(100%_100%_at_top_left,white,rgba(191,219,254,0.95),rgba(59,130,246,0.9))] bg-clip-text text-transparent">
                  contract-ready outcomes.
                </span>
              </h2>

              {/* <p className="text-white/70 text-lg md:text-xl max-w-2xl tracking-tight leading-relaxed">
                SourceSmart AI identifies needs, suppliers, negotiates &
                delivers{" "}
                <span className="text-white font-medium">
                  contract-ready outcomes.
                </span>
              </p> */}
            </div>
          </div>

          {/* Right side - Stacked cards vertically */}
          <div className="flex flex-col  gap-8 min-h-[960px]">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              if (index <= currentStep) {
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="border border-white/20 p-8 rounded-xl w-full max-w-md bg-[linear-gradient(to_bottom_left,rgb(59,130,246,.3),black)] backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center text-2xl">
                              <Icon />
                            </div>
                            <div>
                              <h3 className="text-xl font-medium text-white">
                                {step.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-white/70 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className="text-2xl font-medium text-white/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcurementStepper;
