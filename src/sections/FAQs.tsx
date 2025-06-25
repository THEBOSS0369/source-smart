"use client";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    question: "What kind of material or Service can SourceSmart help Source?",
    answer:
      "SourceSmart is versatile and can assist in sourcing a wide range of direct and indirect materials, components, and services across various industries, including manufacturing, automotive, industrial equipment, electronics, and more. If you have specific sourcing needs, we recommend discussing them with us during a demo.",
  },
  {
    question: "How Secure is my company's data with SourceSmart?",
    answer:
      "Security is our top priority. We use state-of-the-art encryption and comply with the best industry practices to ensure that your data is stored securely and accessed only by authorized users.",
  },
  {
    question: "Do you Integrate with the existing EPRs?",
    answer:
      "Yes, SourceSmart integrates seamlessly with major ERP systems to ensure smooth data flow and operations.",
  },
  {
    question: " What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and various other payment methods depending on your location. Please contact our support team for more information on accepted payment methods in your region.",
  },
];

const AccordionItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      key={question}
      className="py-7 border-b border-white/30"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center ">
        <span className="flex-1 text-lg font-bold">{question}</span>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: "16px" }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQs = () => {
  return (
    <div className="bg-black text-white bg-gradient-to-b from-black to-[#1e3a8a] py-[72px] sm:py-24">
      <div className="mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl sm:max-w-[648px] mx-auto font-medium tracking-tighter">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
          {items.map(({ question, answer }) => (
            <AccordionItem question={question} answer={answer} key={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};
