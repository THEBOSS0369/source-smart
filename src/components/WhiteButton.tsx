import React from "react";

export const WhiteButton = (props: React.PropsWithChildren) => {
  return (
    <button className="relative py-2 px-3 rounded-lg font-medium text-sm text-black bg-gradient-to-b from-[#ffffff] to-[#e5e7eb] shadow-[0px_0px_12px_rgba(255,255,255,0.5)] ">
      <div className="absolute inset-0 ">
        <div className="rounded-lg border border-black/10 inset-0 absolute [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute-0 inset-0 border-black/20 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0_0_10px_rgba(255,255,255,0.8)_inset] rounded-lg"></div>
      </div>
      <span>{props.children}</span>
    </button>
  );
};
