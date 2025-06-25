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

const tabs = [
  {
    icon: "/assets/lottie/vroom.lottie",
    title: "User friendly dashboard",
    isNew: false,
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundSizeX: 150,
  },
  {
    icon: "/assets/lottie/click.lottie",
    title: "One click optimization",
    isNew: false,
    backgroundPositionX: 98,
    backgroundPositionY: 100,
    backgroundSizeX: 135,
  },
  {
    icon: "/assets/lottie/stars.lottie",
    title: "Smart keyword generator",
    isNew: true,
    backgroundPositionX: 100,
    backgroundPositionY: 27,
    backgroundSizeX: 177,
  },
];

// Chat simulation data
const chatScenario = [
  {
    id: 1,
    type: "ai",
    message:
      "I've analyzed your Revit project file for the Denver office tower. You need 400 tons of structural steel for Q2 delivery. Would you like me to start procurement?",
    avatar: "🤖",
  },
  {
    id: 2,
    type: "user",
    message:
      "Yes, prioritize suppliers with AISC certification and delivery by May 15th. Budget is $600k.",
    avatar: "👤",
  },
  {
    id: 3,
    type: "ai",
    message:
      "Perfect! I've contacted 47 qualified steel suppliers and completed initial negotiations. Here are your top 3 options:",
    avatar: "🤖",
    hasCards: true,
    cards: [
      {
        company: "SteelTech Industries",
        price: "$570K",
        savings: "Save 5.0%",
        details: "AISC certified • May 12 delivery • 99.1% quality score",
        highlight: true,
      },
      {
        company: "MetalCorp Global",
        price: "$580K",
        savings: "Save 3.3%",
        details: "AISC certified • May 10 delivery • 98.7% quality score",
      },
      {
        company: "Precision Steel Co",
        price: "$590K",
        savings: "Save 1.7%",
        details: "AISC certified • May 8 delivery • 99.3% quality score",
      },
    ],
  },
];

const ChatInterface = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const chatArea = chatAreaRef.current;
    if (chatArea && chatArea.scrollHeight > chatArea.clientHeight) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentStep]);

  const handleSendMessage = () => {
    if (currentStep < chatScenario.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep((prev) => Math.min(prev + 2, chatScenario.length - 1));
        setUserInput("");
        setIsTyping(false);
      }, 1500);
    } else {
      // Redirect to another website in a new tab when chat ends
      window.open("https://cal.com/sourcesmart/30min", "_blank");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setCurrentStep(0);
    setUserInput("");
    setIsTyping(false);
  };

  return (
    <div
      ref={containerRef}
      className="h-full  rounded-lg border border-white/10 flex flex-col relative overflow-hidden"
      // bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_30%,rgb(59,130,246,.1)_0%,transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_80%_70%,rgb(147,51,234,.08)_0%,transparent_50%)] pointer-events-none"></div>

      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-medium">SourceSmart AI</h3>
            <p className="text-white/60 text-xs">
              Intelligent Procurement Assistant
            </p>
          </div>
        </div>
        <button
          onClick={resetChat}
          className="text-white/60 hover:text-white/80 text-xs px-2 py-1 rounded border border-white/20 hover:border-white/30 transition-colors"
        >
          Reset Demo
        </button>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatAreaRef}
        className="flex-1 flex flex-col justify-end overflow-y-auto p-4 space-y-4"
      >
        {chatScenario.slice(0, currentStep + 1).map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex gap-3 ${
              message.type === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === "user"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              }`}
            >
              <span className="text-sm">{message.avatar}</span>
            </div>

            <div
              className={`max-w-[80%] ${
                message.type === "user" ? "text-right" : ""
              }`}
            >
              <div
                className={`rounded-2xl p-3 ${
                  message.type === "user"
                    ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
                    : "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30"
                } backdrop-blur-sm`}
              >
                <p className="text-white/90 text-sm leading-relaxed">
                  {message.message}
                </p>
              </div>

              {message.hasCards && message.cards && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 space-y-2"
                >
                  {message.cards.map((card, cardIndex) => (
                    <motion.div
                      key={cardIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + cardIndex * 0.1 }}
                      className={`rounded-xl p-3 border backdrop-blur-sm ${
                        card.highlight
                          ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/40 shadow-lg shadow-green-500/10"
                          : "bg-gradient-to-r from-slate-600/20 to-slate-700/20 border-slate-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">
                          {card.company}
                        </h4>
                        <div className="text-right">
                          <p className="text-white font-bold">{card.price}</p>
                          <p
                            className={`text-xs ${
                              card.highlight
                                ? "text-green-400"
                                : "text-blue-400"
                            }`}
                          >
                            {card.savings}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/70 text-xs">{card.details}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-sm">🤖</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 backdrop-blur-sm rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 backdrop-blur-sm bg-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              currentStep === 0
                ? "Yes, prioritize suppliers with AISC certification..."
                : "Ask SourceSmart AI anything..."
            }
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white focus:outline-none focus:border-blue-400/50 focus:bg-white/15 transition-all text-sm"
            disabled={isTyping}
          />
          <div className="relative">
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-all duration-200 flex items-center justify-center min-w-[40px]"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
            {currentStep === 0 && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 whitespace-nowrap"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.5,
                }}
              >
                {/* Chat bubble */}
                <motion.div
                  className="relative bg-white/20 backdrop-blur-6xl border border-white/20 rounded-2xl px-3 py-2 text-xs text-white shadow-lg"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="font-medium">Click me</span>
                  </div>

                  {/* Chat bubble tail */}
                  <div className="absolute top-full right-3 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white/10"></div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const featureTab = (
  tab: (typeof tabs)[number],
  index: number,
  isInView: boolean
) => {
  const tabRef = useRef<HTMLDivElement>(null);
  const dotLottieRef = useRef<DotLottieCommonPlayer>(null);

  const xPercentage = useMotionValue(0);
  const yPercentage = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;

  useEffect(() => {
    if (!tabRef.current || !isInView) return;
    const { height, width } = tabRef.current?.getBoundingClientRect();
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
      duration: 4,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    };

    animate(xPercentage, [0, 100, 100, 0, 0], options);
    animate(yPercentage, [0, 0, 100, 100, 0], options);
  }, [isInView]);

  const handleTabHover = () => {
    if (dotLottieRef.current === null) return;
    dotLottieRef.current.seek(0);
    dotLottieRef.current.play();
  };

  return (
    <motion.div
      ref={tabRef}
      onMouseEnter={handleTabHover}
      className="border border-white/15 flex p-2.5 rounded-xl gap-2.5 items-center lg:flex-1 lg:text-xl relative"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 30, scale: 0.95 }
      }
      transition={{
        duration: 0.6,
        delay: 0.8 + index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        style={{
          maskImage: maskImage,
        }}
        className="absolute inset-0 -m-px rounded-xl border border-[#0284c7] [mask-image:]"
      ></motion.div>
      <div className="h-12 w-12 border border-white/15 rounded-lg inline-flex items-center justify-center">
        <DotLottiePlayer
          ref={dotLottieRef}
          src={tab.icon}
          className="h-5 w-5"
          autoplay
        />
      </div>
      <div className="font-medium">{tab.title}</div>
      {tab.isNew && (
        <div className="text-xs rounded-full px-2 py-0.5 bg-[#0284c7] text-black font-semibold">
          new
        </div>
      )}
    </motion.div>
  );
};

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px -100px 0px",
    amount: 0.3,
  });

  return (
    <section className="py-20 md:py-24" ref={ref}>
      <div className="container mx-auto px-5 lg:px-20">
        {/* Main heading with staggered animation */}
        <motion.h2
          className="text-5xl md:text-6xl font-medium text-center tracking-tighter"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          Procurement on Autopilot
        </motion.h2>

        {/* Subtitle with slight delay */}
        <motion.p
          className="text-white/80 text-lg md:text-2xl max-w-2xl mx-auto tracking-tight text-center mt-5"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          SourceSmart AI drives Sourcing. You drive strategy.
        </motion.p>

        {/* Feature tabs with staggered entrance */}
        <motion.div
          className="mt-10 flex flex-col lg:flex-row gap-3"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.title}>
              {featureTab(tab, index, isInView)}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Chat interface container with final entrance */}
        <motion.div
          className="border border-white/20 p-2.5 rounded-xl mt-3"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.95 }
          }
          transition={{
            duration: 0.8,
            delay: 1.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <motion.div
            className="aspect-video border border-white/20 rounded-lg overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: 1.5,
            }}
          >
            <ChatInterface />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
