import React from "react";

export const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6] shadow-[0px_0px_12px_#3b82f6] ">
      <div className="absolute inset-0 ">
        <div className="rounded-lg border border-white/20 inset-0 absolute [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute-0 inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0_0_10px_rgb(59,130,246,.7)_inset] rounded-lg"></div>
      </div>
      <span>{props.children}</span>
    </button>
  );
};
