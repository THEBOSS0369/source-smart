"use client";

import React from "react";
import { AnimatedBeamDemo } from "@/components/ui/demo";

export default function TechStack() {
  return (
    <section className="bg-black text-white bg-gradient-to-b from-black to-[#1e3a8a] py-[72px] sm:py-24">
      <div className="container mx-auto px-5 lg:px-20">
        <h2 className="text-5xl md:text-6xl font-medium text-center tracking-tighter">
          Integrates with Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Entire Tech Stack
          </span>
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto tracking-tight text-center mt-5">
          Connect SourceSmart to your BIM software, ERP systems, and project
          management tools. Our AI reads your project data and automates
          procurement across your entire workflow.
        </p>

        <div className="mt-16 md:mt-20">
          <div className="border border-white/20 p-6 md:p-8 rounded-xl bg-gradient-to-br from-slate-950/50 via-blue-950/30 to-slate-900/50 backdrop-blur-sm">
            <div className="relative">
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_30%,rgb(59,130,246,.08)_0%,transparent_50%)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[radial-gradient(30%_30%_at_80%_70%,rgb(147,51,234,.06)_0%,transparent_50%)] pointer-events-none"></div>

              {/* AnimatedBeamDemo container */}
              <div className="relative z-10 min-h-[400px] md:min-h-[500px] flex items-center justify-center">
                <AnimatedBeamDemo />
              </div>
            </div>
          </div>
        </div>

        {/* Integration highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5m14 14H5"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">BIM Integration</h3>
            <p className="text-white/60 text-sm">
              Seamlessly connect with Revit, AutoCAD, and other BIM tools to
              extract project specifications automatically.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">ERP Systems</h3>
            <p className="text-white/60 text-sm">
              Integrate with SAP, Oracle, and other enterprise systems for
              unified procurement workflows.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">Real-time Sync</h3>
            <p className="text-white/60 text-sm">
              Keep all your tools synchronized with real-time data updates and
              automated notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
