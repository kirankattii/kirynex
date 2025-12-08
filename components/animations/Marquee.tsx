// "use client";
// import { motion } from "framer-motion";

// interface MarqueeProps {
//   text: string;
//   speed?: number; // higher = faster
//   direction?: "left" | "right";
//   className?: string;
// }

// export const Marquee = ({
//   text,
//   speed = 50,
//   direction = "left",
//   className = "",
// }: MarqueeProps) => {
//   const directionMultiplier = direction === "left" ? -1 : 1;

//   return (
//     <div className={`overflow-hidden whitespace-nowrap w-full py-6 ${className}`}>
//       <motion.div
//         className="inline-flex gap-16 font-bold uppercase text-[6rem] md:text-[10rem] tracking-tighter text-transparent stroke-white/40 select-none"
//         style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
//         animate={{ x: [`0%`, `${directionMultiplier * 100}%`] }}
//         transition={{
//           x: {
//             repeat: Infinity,
//             repeatType: "loop",
//             ease: "linear",
//             duration: speed,
//           },
//         }}
//       >
//         {/* Repeat text multiple times to make smooth infinite loop */}
//         {[...Array(6)].map((_, i) => (
//           <span key={i} className="flex items-center gap-8">
//             {text} <span className="text-blue-600">●</span>
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// };


"use client";
import { motion } from "framer-motion";

interface MarqueeProps {
  text: string;
  speed?: number; // Duration in seconds for one complete cycle (higher = slower)
  direction?: "left" | "right";
  className?: string;
}

export const Marquee = ({
  text,
  speed = 20, // Adjusted default for better readability
  direction = "left",
  className = "",
}: MarqueeProps) => {
  
  // We double the content to ensure a seamless loop. 
  // We need enough text repeats to cover the screen width at least once per block.
  // Given the huge font size, repeating 4 times per block is usually safe.
  const content = (
    <div className="flex items-center gap-16 flex-shrink-0 pr-16">
      {[...Array(4)].map((_, i) => (
        <span key={i} className="flex items-center gap-8">
          {text} <span className="text-blue-600">●</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden flex select-none w-full py-6 bg-black ${className}`}>
      {/* We render two identical motion divs side-by-side.
         They slide together. When the first one moves out of view (-100%), 
         it instantly resets to 0, creating the illusion of infinity.
      */}
      <motion.div
        className="flex font-bold uppercase text-[6rem] md:text-[10rem] tracking-tighter text-transparent stroke-white/40 whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {content}
      </motion.div>

      <motion.div
        className="flex font-bold uppercase text-[6rem] md:text-[10rem] tracking-tighter text-transparent stroke-white/40 whitespace-nowrap"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {content}
      </motion.div>
    </div>
  );
};