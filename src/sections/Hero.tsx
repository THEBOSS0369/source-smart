"use client";
import { Button } from "@/components/Button";
import { WhiteButton } from "@/components/WhiteButton";
import starsBg from "@/assets/stars.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  return (
    <div>
      <motion.section
        ref={sectionRef}
        className="h-[492px] md:h-[800px] flex items-center overflow-hidden relative [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] "
        style={{ backgroundImage: `url(${starsBg.src})`, backgroundPositionY }}
        animate={{ backgroundPositionX: starsBg.width }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 130,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(75%_75%_at_center_center,rgb(59,130,246,.5)_15%,rgb(3,7,18,.5)_78%,transparent)] "></div>
        {/* Start Planet */}
        <div className="absolute h-64 w-64 md:h-96 md:w-96 lg:h-[500px] lg:w-[500px]   bg-purple-500 rounded-full mt-1 border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(50%_50%_at_16.8%_18.3%,white,rgb(147,197,253)_37.7%,rgb(15,23,42))] shadow-[-20px_-20px_50px_rgb(255,255,255,.5),-20px_-20px_80px_rgb(255,255,255,.1),0_0_50px_rgb(59,130,246)] "></div>
        {/* End Planet */}
        {/* Start Ring 1  */}
        <motion.div
          // style={{ translateY: "-50%", translateX: "-50%" }}
          animate={{ rotate: "1turn" }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute h-[344px] w-[344px] md:h-[580px] md:w-[580px] lg:h-[680px] lg:w-[680px] border border-white opacity-20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 top-0 left-1/2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="inline-flex items-center justify-center absolute h-5 w-5 top-1/2 left-full border border-white  rounded-full -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white h-2 w-2 rounded-full"></div>
          </div>
        </motion.div>
        {/* End Ring 1  */}

        {/* Start Ring 2  */}
        <motion.div
          // style={{ translateY: "-50%", translateX: "-50%" }}
          animate={{ rotate: "-1turn" }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute h-[444px] w-[444px] md:h-[780px] md:w-[780px] lg:h-[880px] lg:w-[880px] rounded-full border border-white/20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed "
        ></motion.div>
        {/* End Ring 2  */}

        {/* Start Ring 3  */}
        <motion.div
          animate={{ rotate: "1turn" }}
          transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
          className="absolute h-[544px] w-[544px] md:h-[980px] md:w-[980px] lg:h-[1080px] lg:w-[1080px]  rounded-full border border-white opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute h-2 w-2 top-1/2 left-0 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute h-2 w-2 top-1/2 left-full bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </motion.div>
        {/* End Ring 3  */}

        <div className="container mx-auto px-5 lg:px-20 relative ">
          {/* <div className="absolute top-[-40%] left-1/2 -translate-x-1/2 z-10">
            <a
              href="#"
              className="border py-2 px-4 rounded-full border-blue-400/50 bg-blue-400/10 backdrop-blur-3xl inline-flex gap-3 text-xs sm:text-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              <span className="bg-[linear-gradient(to_right,#ffffff,#e0f2fe,#bfdbfe)] text-transparent bg-clip-text [-webkit-background-clip:text] font-semibold">
                World's Smartest Sourcing Platform
              </span>
            </a>
          </div> */}

          <div className="absolute top-[-17%] sm:top-[-40%] left-1/2 -translate-x-1/2 z-10">
            <a
              href="#"
              className="border py-2 px-4 rounded-full border-blue-400/50 bg-blue-400/10 backdrop-blur-3xl inline-flex gap-3 text-xs sm:text-sm md:text-xl font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300"
            >
              <span className="whitespace-nowrap bg-[linear-gradient(to_right,#ffffff,#e0f2fe,#bfdbfe)] text-transparent bg-clip-text [-webkit-background-clip:text] font-semibold">
                World's Smartest Sourcing Platform
              </span>
            </a>
          </div>

          <h1
            className="text-3xl md:text-[64px] md:leading-none mx-auto pb-2 mt-16 md:mt-16 font-semibold tracking-tighter bg-white bg-[radial-gradient(100%_100%_at_top_left,white,white,rgb(30,64,175,.5))] 
 bg-clip-text text-transparent text-center"
          >
            Stop Overspending on
            <br />{" "}
            <span className="md:text-[72px] font-bold">
              {" "}
              Every. Single. Purchase.
            </span>
          </h1>
          {/* <p className="text-lg md:text-xl lg:text-[32px] text-white/70 mt-5 text-center max-w-xl lg:max-w-none mx-auto">
          Stop Overspending on Every. Single. Purchase.
        </p> */}
          <p className="text-sm sm:text-xl text-white/70 mt-5 text-center max-w-xl mx-auto">
            Our AI finds better suppliers, negotiates lower prices, and cuts
            your procurement time by 90%. While you sleep.
          </p>
          <div className="flex  justify-center gap-4 mt-10">
            <Button>Watch Demo</Button>
            <WhiteButton>Get Started Free</WhiteButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
