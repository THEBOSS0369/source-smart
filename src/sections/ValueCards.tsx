"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  IoCashOutline,
  IoRocketOutline,
  IoTrendingUpOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";

const WhiteButton = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-4 rounded-lg font-medium text-xl text-black bg-gradient-to-b from-[#ffffff] to-[#e5e7eb] shadow-[0px_0px_12px_rgba(255,255,255,0.5)] ">
      <div className="absolute inset-0 ">
        <div className="rounded-lg border border-black/10 inset-0 absolute [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute-0 inset-0 border-black/20 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0_0_10px_rgba(255,255,255,0.8)_inset] rounded-lg"></div>
      </div>
      <span>{props.children}</span>
    </button>
  );
};

const cards = [
  {
    id: "value-1",
    title: "Massive Cost Reduction",
    description:
      "Achieve substantial cost reductions across your procurement portfolio. Gain a clear financial advantage and boost your bottom line.",
    icon: IoCashOutline,
    gradient: "from-blue-800 to-blue-900",
  },
  {
    id: "value-2",
    title: "Skip Manual Tasks",
    description:
      "Eliminate tedious manual procurement tasks and reclaim countless hours and focus their expertise on strategic growth, not paperwork.",
    icon: IoRocketOutline,
    gradient: "from-blue-800 to-blue-900",
  },
  {
    id: "value-3",
    title: "Outsmart Your Competition",
    description:
      "Gain predictive intelligence to anticipate market shifts. Transform procurement into your strategic competitive advantage.",
    icon: IoTrendingUpOutline,
    gradient: "from-blue-800 to-blue-900",
  },
];

export default function ValueCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      className="py-20 md:py-24 bg-black bg-gradient-to-b from-[#1e3a8a] to-black"
      ref={sectionRef}
    >
      <div className="container mx-auto px-5 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-white mb-4">
            The Value You <span className="text-blue-500">Unlock</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Conquer Procurement Complexity
          </p>
          <div className="mt-4">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400/60 to-purple-400/80 bg-clip-text text-transparent">
              Unlock True Power
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ y: index === 1 ? y : 0 }}
              >
                <div className="relative  backdrop-blur-lg group-hover:backdrop-blur-3xl border border-white/30 rounded-2xl p-8 h-full overflow-hidden group-hover:border-white/40 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    {/* Value badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium text-white/80 mb-6">
                      VALUE {index + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <span className="w-8 h-8 text-white flex items-center justify-center">
                        <Icon />
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                      {card.title}
                    </h3>

                    <p className="text-white/70 text-base leading-relaxed mb-6">
                      {card.description}
                    </p>

                    {/* Learn more link */}
                    <motion.button
                      className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors group/link"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      Learn more
                      <span style={{ marginLeft: '0.5rem' }}>
                        <IoArrowForwardOutline size="1rem" />
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WhiteButton>Meet Founding Team</WhiteButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
