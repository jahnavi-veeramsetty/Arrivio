import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- YOUR IMAGE IMPORTS ---
import communityImg1 from '../../assets/communityImg1.jpeg';
import communityImg2 from '../../assets/communityImg2.jpeg';
import communityImg3 from '../../assets/communityImg3.jpeg';
import communityImg4 from '../../assets/communityImg4.jpeg';
import communityImg5 from '../../assets/communityImg5.jpeg';
import communityImg6 from '../../assets/communityImg6.jpeg';
import communityImg7 from '../../assets/communityImg7.jpeg';
import communityImg8 from '../../assets/communityImg8.jpeg';

import communityBg from '../../assets/communityBg.png'; 

// --- DATA ---
const BUBBLE_DATA = [
  // 🌿 CLUB CHATS — POSITIVE & FRIENDLY

  { type: "text", name: "Aarav", content: "The hiking club last weekend was amazing 😍" },
  { type: "text", name: "Maya", content: "Right?? The sunrise view was totally worth it 🌄" },

  { type: "text", name: "Rohan", content: "Dance club starts in a few days yayyyyy 💃✨" },
  { type: "text", name: "Sana", content: "I’m so excited!! Been waiting for this 😭🩰" },

  { type: "text", name: "Kabir", content: "Anyone joining the photography club this time?" },
  { type: "text", name: "Ishita", content: "Me! I want to learn night photography 🌙📸" },

  { type: "text", name: "Neha", content: "Yoga club on the terrace today 🧘‍♀️" },
  { type: "text", name: "Arjun", content: "Count me in. I need some calm after the week 😌" },

  { type: "text", name: "Zoya", content: "Sunday brunch this week? 🥞☕" },
  { type: "text", name: "Rahul", content: "Yes please! I missed the last one 😭" },

  { type: "text", name: "Aditi", content: "Book club picked a new novel 📚✨" },
  { type: "text", name: "Varun", content: "Niceee, I’ll join this time for sure" },

  { type: "text", name: "Farhan", content: "Game night in the lounge tonight 🎮" },
  { type: "text", name: "Pooja", content: "Yesss I’m bringing snacks 🍿" },

  { type: "text", name: "Liam", content: "Anyone up for evening walks?" },
  { type: "text", name: "Ananya", content: "That sounds lovely 🌿 I’m in" },

  // 📸 IMAGES — unchanged
  { type: "image", content: communityImg1 },
  { type: "image", content: communityImg2 },
  { type: "image", content: communityImg3 },
  { type: "image", content: communityImg4 },
  { type: "image", content: communityImg5 },
  { type: "image", content: communityImg6 },
  { type: "image", content: communityImg7 },
  { type: "image", content: communityImg8 },
];


const CommunityBanner = () => {
  const [bubbles, setBubbles] = useState([]);

  // --- SPAWN LOGIC ---
  const spawnBubble = useCallback(() => {
    const id = Date.now() + Math.random();
    const data = BUBBLE_DATA[Math.floor(Math.random() * BUBBLE_DATA.length)];
    const side = Math.random() > 0.5 ? "left" : "right";
    const rotation = Math.random() * 10 - 5; 
    const scale = Math.random() * 0.2 + 0.8;

    let top, left;
    let validPosition = false;
    let attempts = 0;

    while (!validPosition && attempts < 50) {
      attempts++;
      top = Math.random() * 60 + 20; 
      left = Math.random() * 60 + 20; 
      const inCenterWidth = left > 25 && left < 75;
      const inCenterHeight = top > 30 && top < 70;
      if (!(inCenterWidth && inCenterHeight)) validPosition = true;
    }

    if (validPosition) {
      const newBubble = { id, ...data, side, rotation, scale, top, left };
      setBubbles(prev => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== id));
      }, 1500);
    }
  }, []);

  // --- ANIMATION LOOP ---
  useEffect(() => {
    let timer;
    const loop = () => {
      const delay = Math.random() * 1000 + 1500; 
      spawnBubble();
      timer = setTimeout(loop, delay);
    };
    timer = setTimeout(loop, 1000);
    return () => clearTimeout(timer);
  }, [spawnBubble]);

  return (
    <section className="relative w-full h-[32rem] sm:h-[40rem] bg-[#EAE8E4] overflow-hidden flex items-center justify-center">
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <img
          src={communityBg}
          alt="Community Vibe"
          className="w-full h-full object-cover blur-sm opacity-90 grayscale-[30%]"
        />
        <div className="absolute inset-0 bg-[#EAE8E4] mix-blend-color opacity-30"></div>
      </div>

      <div className="absolute inset-0 bg-radial-gradient from-[#F5F5F0]/60 to-transparent opacity-70 pointer-events-none z-10"></div>
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-multiply z-10"
        style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#EAE8E4] to-transparent z-10 pointer-events-none"></div>

      {/* --- CENTER TEXT --- */}
      <div className="z-30 text-center px-6 pointer-events-none relative">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-8 h-[1px] bg-[#2C3E30]"></div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C3E30] font-sans">
            The Community
          </span>
          <div className="w-8 h-[1px] bg-[#2C3E30]"></div>
        </div>

        <div className="relative z-30">

        {/* WHITE SHADING — behind text only */}
        <div className="absolute inset-0 bg-[#EAE8E4]/95 blur-3xl rounded-full scale-150 z-0"></div>

        {/* TEXT — above shading */}
        <p className="relative z-10 font-serif text-4xl sm:text-6xl lg:text-7xl text-[#1A1A1A] leading-tight">
            Life happens <br />
            <span className="italic text-[#2C3E30]">together.</span>
        </p>

        </div>

      </div>

      {/* --- CHAT BUBBLES --- */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: bubble.scale, y: 0, rotate: bubble.rotation }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
              style={{
                top: `${bubble.top}%`,
                left: `${bubble.left}%`,
                position: 'absolute',
                x: "-50%",
                y: "-50%",
              }}
              className={`
                max-w-[200px] sm:max-w-[260px] shadow-xl backdrop-blur-md border border-white/30
                ${bubble.type === 'image' ? 'p-0 bg-transparent rounded-[20px]' : 'px-5 py-3 rounded-[24px] text-sm font-medium leading-snug'}
                ${bubble.type !== 'image' && bubble.side === 'left' ? 'bg-[#F5F5F0]/90 text-[#1A1A1A] rounded-bl-none' : ''}
                ${bubble.type !== 'image' && bubble.side === 'right' ? 'bg-[#2C3E30]/90 text-[#EAE8E4] rounded-br-none' : ''}
              `}
            >
              {bubble.type === 'image' ? (
                <img
                src={bubble.content}
                alt="Moment"
                className="
                    w-[130px] h-[150px] sm:w-[160px] sm:h-[180px]
                    object-cover
                    rounded-[18px]
                    shadow-2xl
                    bg-black
                "
                style={{
                    transform: `rotate(${bubble.rotation * 1.5}deg) scale(1.05)`
                }}
                />

              ) : (
                <div className="flex flex-col gap-1">
                  <span
                    className={`text-[11px] font-semibold tracking-wide
                      ${bubble.side === 'left'
                        ? 'text-[#1A1A1A]/60'
                        : 'text-[#EAE8E4]/70'}
                    `}
                  >
                    {bubble.name}
                  </span>

                  <p>{bubble.content}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CommunityBanner;
