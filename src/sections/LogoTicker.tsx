import acmeLogo from "@/assets/logo-acme.png";
import apexLogo from "@/assets/logo-apex.png";
import celestialLogo from "@/assets/logo-celestial.png";
import quantumLogo from "@/assets/logo-quantum.png";
import pulseLogo from "@/assets/logo-pulse.png";
import echoLogo from "@/assets/logo-echo.png";

export default function LogoTicker() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-5">
          <div className="flex-1 md:flex-none">
            <h2 className="text-white/70 text-md ">
              Trusted by top innovative teams
            </h2>
          </div>
          <div className="flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <div className="flex flex-none gap-14">
              {[
                acmeLogo,
                pulseLogo,
                echoLogo,
                celestialLogo,
                apexLogo,
                quantumLogo,
              ].map((logo) => (
                <img src={logo.src} key={logo.src} className="h-6 w-auto" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
