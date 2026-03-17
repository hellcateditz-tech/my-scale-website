import { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Effects } from '@react-three/drei';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import * as THREE from 'three';

import heroImg        from './img1.svg';
import deviceImg      from './img2.svg';
import whyBgImg       from './img3.svg';
import dashboardImg   from './img4.svg';
import learningImg    from './img5.svg';
import phonesImg      from './img6.svg';
import statueImg      from './img7.svg';
import mentorsImg     from './img8.svg';
import toolsImg       from './img9.svg';
import becomeLeftImg  from './Group_482323.png';
import whoCanApplyImg from './Group_482300.png';
import mentorsFullImg from './mentors.png';
import becomeCardImg  from './Group_482487.png';
import statueNewImg   from './statue_new.svg';
import highIncomeImg  from './MacBook_Pro_16__-_6.svg';
import hiringLogosImg from './Hiring_LOgos.svg';

extend({ UnrealBloomPass });

const A = {
  hero: heroImg, device: deviceImg, whyBg: whyBgImg,
  dashboard: dashboardImg, learning: learningImg, phones: phonesImg,
  statue: statueImg, mentors: mentorsImg, tools: toolsImg,
  becomeLeft: becomeLeftImg, whoApply: whoCanApplyImg,
  mentorsFull: mentorsFullImg, becomeCard: becomeCardImg,
  statueNew: statueNewImg, highIncome: highIncomeImg, hiringLogos: hiringLogosImg,
};

/* ─── DATA ──────────────────────────────────────────────────── */
const NAV = [
  { label: "Home", href: "#home" }, { label: "Why Us", href: "#why" },
  { label: "Program", href: "#program" }, { label: "Mentors", href: "#mentors" },
  { label: "Projects", href: "#projects" },
];
const STATS = [
  { v: "2000+", l: "Students Enrolled" }, { v: "95%", l: "Placement Rate" },
  { v: "₹8 LPA", l: "Avg. Package" }, { v: "50+", l: "Live Projects" },
];
const WHY_CARDS = [
  { icon: "🎯", title: "Quality Education", desc: "Expertly crafted curriculum built by designers at top product companies." },
  { icon: "🛠️", title: "Mentorship Support", desc: "1-on-1 sessions with working designers. Feedback that actually helps you grow." },
  { icon: "💰", title: "High Pay Jobs", desc: "UI/UX is India's hottest skill. We get you from learner to earner, fast." },
];
const CURRICULUM = [
  { week: "Week 1–2",   topic: "Design Fundamentals & Visual Principles", tag: "Foundation" },
  { week: "Week 3–4",   topic: "Figma Deep Dive & Component Systems",     tag: "Tools" },
  { week: "Week 5–6",   topic: "User Research & Information Architecture", tag: "Research" },
  { week: "Week 7–8",   topic: "Prototyping & Micro-interactions",         tag: "Advanced" },
  { week: "Week 9–10",  topic: "Real Client Project Execution",            tag: "Live Work" },
  { week: "Week 11–12", topic: "Portfolio Building & Placement Prep",      tag: "Career" },
];
const CURRICULUM_DETAILS = {
  "Week 1–2": ["Color theory & visual hierarchy","Typography systems","Layout & grid principles","Design psychology basics"],
  "Week 3–4": ["Figma components & variants","Auto-layout mastery","Design system creation","Collaborative workflows"],
  "Week 5–6": ["User interviews & surveys","Persona creation","Card sorting & sitemaps","Journey mapping"],
  "Week 7–8": ["Interactive prototyping","Micro-animation principles","Usability testing","Figma smart animate"],
  "Week 9–10": ["Real client brief walkthrough","Agile design process","Stakeholder presentations","Iteration & revisions"],
  "Week 11–12": ["Case study writing","Portfolio curation","LinkedIn & Behance setup","Mock interview prep"],
};
const BREAKDOWN_STEPS = [
  { num:"1", label:"STEP 1:  THINK CLEARLY", body:"Build strong fundamentals and understand how real problems are solved.", sub:"Learn the reasoning behind every decision before touching the screen.", extra:"Covers design principles, user psychology, color theory, and typography — the building blocks every great designer must master." },
  { num:"2", label:"STEP 2:  BUILD IN REAL-TIME", body:"Work on live, structured projects with mentor guidance.", sub:"Apply concepts through execution, feedback, and iteration.", extra:"Weekly live sessions with mentor feedback, real client briefs, and peer reviews that simulate a real studio environment." },
  { num:"3", label:"STEP 3:  BECOME INDUSTRY-READY", body:"Refine your work to professional standards.", sub:"Present, defend, and improve your projects like a real designer.", extra:"Portfolio reviews, mock interviews, LinkedIn optimization, and placement support until you land your first design role." },
];
const INCOME = [
  { v:"₹18 LPA", l:"Max Package" }, { v:"40%", l:"YoY Demand" }, { v:"500+", l:"Hiring Partners" },
];
const TOOLS = ["Figma","Framer","Adobe XD","Miro","Maze","Notion","Zeplin","Lottie","Protopie","Webflow","Principle","Overflow","Hotjar","UserTesting"];
const PROJECTS = [
  { name:"FinTech App Redesign",  type:"Mobile UI",     color:"#FF9500", desc:"Redesigned a payments app for 2M+ users, boosting task completion by 34%." },
  { name:"E-Commerce Dashboard", type:"Web UX",         color:"#1D8E42", desc:"Built a real-time analytics dashboard for an e-commerce startup." },
  { name:"Travel Booking App",   type:"Mobile UI",      color:"#4A6FA5", desc:"End-to-end travel app with multi-step booking flow & microanimations." },
  { name:"Health & Wellness App",type:"Product Design", color:"#9B59B6", desc:"Designed onboarding & habit-tracking for a health-tech MVP." },
];
const BLOCKS = [
  { t:"Switch Your Playlist",         i:"🎵", tip:"A change in music rewires your creative focus." },
  { t:"Don't Fret, Think To One Idea",i:"💡", tip:"Constraint breeds creativity. Start with one concept." },
  { t:"Start Replacing Good Ideas",   i:"🔄", tip:"Don't hold onto your first idea. Keep iterating." },
  { t:"Change Your Environment",      i:"🌱", tip:"New surroundings spark new perspectives." },
];

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}
function Reveal({ children, className="", delay=0, style={} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay:`${delay}ms`, ...style }}
      className={`transition-all duration-700 ${vis?"opacity-100 translate-y-0":"opacity-0 translate-y-10"} ${className}`}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PARTICLE SYSTEM v7 — Premium Glowing Dots & Smooth Scatter
════════════════════════════════════════════════════════════ */

const ParticleSwarm = ({ mouseRef }) => {
  const meshRef = useRef();
  const { camera } = useThree();
  const count = 60000; // Increased to 60k for a dense, premium look
  const speedMult = 1.0;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const pColor = useMemo(() => new THREE.Color(), []);
  const color = pColor; 
  
  const positions = useMemo(() => {
     const pos = [];
     for(let i=0; i<count; i++) pos.push(new THREE.Vector3((Math.random()-0.5)*150, (Math.random()-0.5)*150, (Math.random()-0.5)*150));
     return pos;
  }, []);

  // Use toneMapped: false so colors > 1.0 create a glowing bloom effect
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), []);
  
  // Icosahedron with a small radius renders as a perfect low-poly "dot" or sphere
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.12, 0), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speedMult;

    // Convert mouse screen coordinates to 3D world space
    const vec = new THREE.Vector3(mouseRef.current.x, mouseRef.current.y, 0.5);
    vec.unproject(camera);
    const dir = vec.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const mousePos = camera.position.clone().add(dir.multiplyScalar(distance));

    for (let i = 0; i < count; i++) {
        // --- 3D SET SQUARE MATH ---
        const sizeVal = 80;
        const thickVal = 8;
        const depthVal = 10;
        const rotVal = 0.5;
        
        const u = (i * 137.0313) % 1.0;
        const v = (i * 269.1057) % 1.0;
        const w = (i * 313.1991) % 1.0;
        
        const segment = i % 3;
        
        const triHeight = sizeVal;
        const triWidth = sizeVal * 0.57735;
        const hypLen = Math.sqrt(triWidth * triWidth + triHeight * triHeight);
        
        const T = thickVal;
        const dx1 = T * (hypLen + triWidth) / triHeight;
        const dy2 = T * (hypLen + triHeight) / triWidth;
        
        const xRight = triWidth - dx1;
        const yTop = triHeight - dy2;
        
        let px = 0.0;
        let py = 0.0;
        const pz = (w - 0.5) * depthVal;
        
        if (segment === 0) {
            const yOut = u * triHeight;
            const yIn = T + u * (yTop - T);
            px = v * T;
            py = yOut + v * (yIn - yOut);
        } else if (segment === 1) {
            const xOut = u * triWidth;
            const xIn = T + u * (xRight - T);
            px = xOut + v * (xIn - xOut);
            py = v * T;
        } else {
            const xOut = triWidth - u * triWidth;
            const yOut = u * triHeight;
            const xIn = xRight - u * (xRight - T);
            const yIn = T + u * (yTop - T);
            
            px = xOut + v * (xIn - xOut);
            py = yOut + v * (yIn - yOut);
        }
        
        px -= triWidth * 0.333;
        py -= triHeight * 0.333;
        
        const t = time * 0.5 * rotVal;
        const cT = Math.cos(t);
        const sT = Math.sin(t);
        
        const rx = px * cT - pz * sT;
        const rz = px * sT + pz * cT;
        
        const cT2 = Math.cos(t * 0.7);
        const sT2 = Math.sin(t * 0.7);
        const ry = py * cT2 - rz * sT2;
        const finalZ = py * sT2 + rz * cT2;

        // --- SMOOTH RANDOM SCATTER LOGIC ---
        let tx = rx;
        let ty = ry;
        let tz = finalZ;

        const dMx = tx - mousePos.x;
        const dMy = ty - mousePos.y;
        const dMz = tz - mousePos.z;
        const distToMouse = Math.sqrt(dMx*dMx + dMy*dMy + dMz*dMz);
        
        const blastRadius = 35.0; 

        // Pseudo-random vector for organic scatter
        const randomX = (u * 2.0 - 1.0);
        const randomY = (v * 2.0 - 1.0);
        const randomZ = (w * 2.0 - 1.0);
        
        if (distToMouse < blastRadius && distToMouse > 0.01) {
             // Smooth falloff curve for a premium, non-jarring effect
             const falloff = 1.0 - (distToMouse / blastRadius);
             const force = Math.pow(falloff, 2.0) * 30.0; 
             
             // Blend outward radial push with organic randomness
             tx += (randomX * 0.6 + (dMx / distToMouse) * 0.4) * force;
             ty += (randomY * 0.6 + (dMy / distToMouse) * 0.4) * force;
             tz += randomZ * force;
        }

        target.set(tx, ty, tz);
        
        // --- PREMIUM GOLDEN-ORANGE COLOR ---
        const highlight = Math.max(0.0, Math.sin(rx * 0.1) * Math.cos(ry * 0.1 + time));
        const edgeBright = (w < 0.1 || w > 0.9 || v < 0.05 || v > 0.95) ? 0.3 : 0.0;
        
        // Softer, sophisticated color profile
        const baseR = 1.0;
        const baseG = 0.45; 
        const baseB = 0.05;
        
        // Reduced intensity for subtle, elegant glow
        const intensity = 0.8 + (highlight * 0.6) + edgeBright;
        
        color.setRGB(baseR * intensity, baseG * intensity, baseB * intensity);

        // Update Position, Scale & Color
        positions[i].lerp(target, 0.1);
        dummy.position.copy(positions[i]);
        
        // Add random size variation to dots to make them look organic
        const dotScale = 0.4 + (u * 0.8); 
        dummy.scale.set(dotScale, dotScale, dotScale);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, pColor);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} />
  );
};

function Scene({ mouseRef }) {
  return (
    <>
      <ParticleSwarm mouseRef={mouseRef} />
      <OrbitControls
        autoRotate={false}
        enableZoom={false} enablePan={false}
        enableDamping dampingFactor={0.06}
        maxPolarAngle={Math.PI*0.64} minPolarAngle={Math.PI*0.36}
      />
    </>
  );
}

/* ─── HERO WRAPPER ──────────────────────────────────────────── */
function HeroBtn({ href, children, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        fontFamily:"'Bricolage Grotesque',sans-serif", textDecoration:'none',
        fontWeight:800, fontSize:'0.9rem', padding:'0.8rem 2.2rem',
        borderRadius:'9999px', transition:'all 0.2s', display:'inline-block',
        ...(primary ? {
          background: hov?'#d96800':'#FF7A00', color:'#fff',
          boxShadow: hov?'0 0 50px rgba(255,122,0,0.75)':'0 0 28px rgba(255,122,0,0.45)',
          transform: hov?'scale(1.05)':'scale(1)',
        } : {
          background: hov?'rgba(255,255,255,0.1)':'transparent', color:'#fff',
          border:'1.5px solid rgba(255,255,255,0.35)',
          transform: hov?'scale(1.05)':'scale(1)',
        }),
      }}>
      {children}
    </a>
  );
}

function ParticleHero() {
  const mouseRef     = useRef({ x:9999, y:9999 });
  const containerRef = useRef();

  const onMM = (e) => {
    const r = containerRef.current?.getBoundingClientRect(); if(!r) return;
    mouseRef.current = { x:((e.clientX-r.left)/r.width)*2-1, y:-((e.clientY-r.top)/r.height)*2+1 };
  };

  return (
    <div ref={containerRef} onMouseMove={onMM}
      onMouseLeave={()=>{ mouseRef.current={x:9999,y:9999}; }}
      style={{ width:'100%', height:'100vh', background:'#000', cursor:'crosshair', position:'relative' }}>

      {/* Overlay text — sits above canvas */}
      <div style={{
        position:'absolute', inset:0, zIndex:10, pointerEvents:'none',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        textAlign:'center', padding:'0 24px',
      }}>
        <div style={{
          pointerEvents:'all',
          display:'inline-flex', alignItems:'center', gap:'8px',
          background:'rgba(255,122,0,0.12)', border:'1px solid rgba(255,122,0,0.4)',
          color:'#FF9A3C', fontSize:'12px', fontWeight:700,
          padding:'6px 18px', borderRadius:'9999px', marginBottom:'20px',
          fontFamily:"'Bricolage Grotesque',sans-serif",
        }}>
          🚀 India's #1 UI/UX Bootcamp
        </div>
        <h1 style={{
          fontFamily:"'Bricolage Grotesque',sans-serif", color:'#fff', fontWeight:900,
          fontSize:'clamp(2.4rem,5.5vw,4.2rem)', lineHeight:1.1, marginBottom:'14px',
          textShadow:'0 2px 40px rgba(0,0,0,0.5)',
        }}>
          Where{' '}<span style={{ color:'#FF7A00', textShadow:'0 0 40px rgba(255,122,0,0.6)' }}>Imagination</span>
          <br/>Creates Real Change
        </h1>
        <p style={{
          fontFamily:"'Bricolage Grotesque',sans-serif", color:'rgba(255,255,255,0.5)',
          fontSize:'clamp(0.85rem,1.5vw,1rem)', maxWidth:'420px', lineHeight:1.65, marginBottom:'26px',
        }}>
          UI/UX Mastery Through Real Projects, Expert Guidance, And Measurable Results.
        </p>
        <p style={{ fontFamily:"'Bricolage Grotesque',sans-serif", color:'rgba(255,255,255,0.2)', fontSize:'11px', marginBottom:'22px' }}>
          Hover over the shape to burst particles apart
        </p>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', justifyContent:'center', pointerEvents:'all' }}>
          <HeroBtn href="#why" primary>Learn More →</HeroBtn>
          <HeroBtn href="#enroll">Enroll Now</HeroBtn>
        </div>
      </div>

      {/* Scroll nudge */}
      <div style={{
        position:'absolute', bottom:'24px', left:'50%', transform:'translateX(-50%)',
        color:'rgba(255,255,255,0.28)', fontSize:'11px', zIndex:10, pointerEvents:'none',
        fontFamily:"'Bricolage Grotesque',sans-serif",
        animation:'pscroll 2s ease-in-out infinite',
      }}>
        <style>{`@keyframes pscroll{0%,100%{opacity:.3;transform:translateX(-50%) translateY(0)}50%{opacity:.7;transform:translateX(-50%) translateY(5px)}}`}</style>
        scroll to explore ↓
      </div>

      {/* Three.js Canvas - Tweaked Bloom Effects */}
      <Canvas
        camera={{ position:[0,0,100], fov:55 }}
        style={{ position:'absolute', inset:0 }}
        gl={{ antialias:false, powerPreference:'high-performance', alpha:false }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 0.01]} />
        <Scene mouseRef={mouseRef} />
        <Effects disableGamma>
            {/* Reduced strength by ~60% and added a threshold for a softer, premium glow */}
            <unrealBloomPass threshold={0.25} strength={0.8} radius={0.6} />
        </Effects>
      </Canvas>
    </div>
  );
}

/* ─── MAIN WEBSITE ──────────────────────────────────────────── */
export default function MyScaleWebsite() {
  const ff = { fontFamily:"'Bricolage Grotesque',sans-serif" };
  const [menu,         setMenu]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeCurr,   setActiveCurr]   = useState(null);
  const [activeStep,   setActiveStep]   = useState(null);
  const [activeProject,setActiveProject]= useState(null);
  const [activeBlock,  setActiveBlock]  = useState(null);
  const [toolSearch,   setToolSearch]   = useState(""); // eslint-disable-line
  const [enrollForm,   setEnrollForm]   = useState({ name:"", email:"", phone:"" });
  const [enrolled,     setEnrolled]     = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filteredTools = TOOLS.filter(t => t.toLowerCase().includes(toolSearch.toLowerCase())); // eslint-disable-line

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden scroll-smooth" style={ff}>

      {/* ══ NAVBAR ══ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur shadow-md py-3" : "bg-transparent py-4"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-0.5">
            <span className="text-xl font-black text-orange-500">My</span>
            <span className={`text-xl font-black ${scrolled?"text-gray-900":"text-white"}`}>Scale</span>
            <span className="ml-1">⚡</span>
          </a>
          <ul className="hidden md:flex gap-7 text-sm font-medium">
            {NAV.map(l=>(
              <li key={l.label}>
                <a href={l.href} className={`transition-colors hover:text-orange-500 ${scrolled?"text-gray-600":"text-white/80"}`}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#enroll" className="hidden md:inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md transition-all hover:scale-105">
            Get Started →
          </a>
          <button onClick={()=>setMenu(!menu)} className={`md:hidden text-xl p-1 ${scrolled?"text-gray-700":"text-white"}`}>{menu?"✕":"☰"}</button>
        </div>
        {menu && (
          <div className={`md:hidden border-t px-6 py-5 flex flex-col gap-4 ${scrolled?"bg-white":"bg-black/90"}`}>
            {NAV.map(l=>(
              <a key={l.label} href={l.href} className={`text-sm font-medium hover:text-orange-500 ${scrolled?"text-gray-700":"text-white/80"}`} onClick={()=>setMenu(false)}>{l.label}</a>
            ))}
            <a href="#enroll" className="bg-orange-500 text-white font-bold px-5 py-2.5 rounded-full text-center text-sm" onClick={()=>setMenu(false)}>Get Started</a>
          </div>
        )}
      </nav>

      {/* ══ PARTICLE HERO ══ */}
      <section id="home"><ParticleHero /></section>

      {/* ══ STATS BAR ══ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {STATS.map(s=>(
            <div key={s.l} className="group cursor-default">
              <div className="text-2xl font-black text-orange-500 group-hover:scale-110 transition-transform inline-block">{s.v}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ WHY MYSCALE ══ */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Why <span className="text-orange-500">MyScale?</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">Because Creativity Deserves Direction. At MyScale, Ideas Don't Just Stay On Paper — They Evolve, Grow, And Turn Into Real Experiences.</p>
              <div className="grid grid-cols-3 gap-6 mb-10 border-t border-gray-100 pt-8">
                {[{v:"15,000+",l:"Active UI/UX roles in India today"},{v:"₹8 LPA avg",l:"Average yearly salary for UI/UX designers"},{v:"₹36 LPA+",l:"Top salary potential for senior UI/UX roles"}].map(s=>(
                  <div key={s.l} className="group cursor-default">
                    <div className="text-lg font-black text-orange-500 group-hover:scale-105 transition-transform inline-block">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-1 leading-tight">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                {WHY_CARDS.map(w=>(
                  <div key={w.title} className="flex gap-4 p-4 rounded-xl hover:bg-orange-50 transition-colors cursor-default group">
                    <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{w.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{w.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={150}><img src={A.whyBg} alt="Why MyScale" className="w-full rounded-3xl"/></Reveal>
          </div>
        </div>
      </section>

      {/* ══ BECOME ══ */}
      <section className="py-20 bg-gray-50">
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 40px" }}>
          <Reveal>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"60px", alignItems:"center" }}>
              <img src={A.becomeLeft} alt="Become a designer" style={{ width:"100%", borderRadius:"20px" }} />
              <div>
                <p style={{ color:"#888", fontSize:"12px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"16px" }}>BECOME A DESIGNER</p>
                <h2 style={{ ...ff, fontWeight:900, fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1.2, color:"#1a1a1a", marginBottom:"20px" }}>From Zero To<br/><span style={{ color:"#F5A623" }}>Hired Designer</span><br/>In 12 Weeks</h2>
                <ul style={{ listStyle:"none", padding:0, margin:"0 0 28px 0", display:"flex", flexDirection:"column", gap:"12px" }}>
                  {["Live Classes + Interactive Workshops","1-On-1 Mentorship With Industry Experts","Real-World Projects & Portfolio Reviews"].map(item=>(
                    <li key={item} style={{ display:"flex", alignItems:"center", gap:"10px", fontSize:"13px", fontWeight:700, color:"#1a1a1a" }}>
                      <span style={{ width:"18px", height:"18px", borderRadius:"50%", background:"#F5A623", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", color:"#fff", flexShrink:0 }}>●</span>{item}
                    </li>
                  ))}
                </ul>
                <a href="#enroll" style={{ display:"inline-flex", alignItems:"center", gap:"10px", border:"1.5px solid #ddd", borderRadius:"999px", padding:"8px 16px 8px 20px", fontSize:"13px", fontWeight:600, color:"#1a1a1a", textDecoration:"none" }}>
                  Enroll Now
                  <span style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#F5A623", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"13px" }}>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WHO CAN APPLY ══ */}
      <section className="py-20 bg-white">
        <div style={{ maxWidth:"1000px", margin:"0 auto", padding:"0 40px" }}>
          <div style={{ textAlign:"center", marginBottom:"40px" }}>
            <div style={{ ...ff, fontWeight:900, fontSize:"clamp(1.8rem,3vw,2.6rem)", lineHeight:1.2, color:"#1a1a1a" }}>
              <span style={{ color:"#22A55B" }}>Ready To Dive In?</span><br/>Here's Who Can Apply!
            </div>
            <p style={{ color:"#666", fontSize:"14px", marginTop:"14px", lineHeight:1.6 }}>Whether You're A Passionate Beginner Or A Seasoned Pro,<br/>If You're Eager To Grow, You Might Be Exactly Who We Need.</p>
          </div>
          <Reveal><img src={A.whoApply} alt="Who can apply" style={{ width:"100%", display:"block", borderRadius:"20px" }} /></Reveal>
        </div>
      </section>

      {/* ══ CURRICULUM ══ */}
      <section id="program" className="relative overflow-hidden bg-gray-900">
        <img src={A.learning} alt="What are you learning" className="w-full pointer-events-none"/>
        <div className="py-20 max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">12-Week Curriculum</span>
            <h2 className="text-4xl font-black text-white mt-2">The Complete Learning Path</h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm">Click any module to see what you'll learn.</p>
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CURRICULUM.map((c,i)=>(
                <div key={i} onClick={()=>setActiveCurr(activeCurr===i?null:i)}
                  className={`group rounded-2xl border transition-all duration-300 cursor-pointer ${activeCurr===i?"bg-orange-500 border-orange-400 shadow-xl shadow-orange-900/30":"bg-white/5 border-white/10 hover:bg-orange-500 hover:border-orange-400"}`}>
                  <div className="p-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block transition-colors ${activeCurr===i?"bg-orange-400 text-white":"bg-orange-500/20 group-hover:bg-orange-400 text-orange-400 group-hover:text-white"}`}>{c.tag}</span>
                    <div className={`text-xs mb-1 ${activeCurr===i?"text-orange-100":"text-gray-500 group-hover:text-orange-100"}`}>{c.week}</div>
                    <div className="font-bold text-white text-sm leading-snug">{c.topic}</div>
                    {activeCurr===i&&<ul className="mt-4 space-y-1.5">{CURRICULUM_DETAILS[c.week]?.map(d=><li key={d} className="flex items-center gap-2 text-xs text-orange-100"><span className="w-1.5 h-1.5 rounded-full bg-orange-200 flex-shrink-0"/>{d}</li>)}</ul>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ MENTORS ══ */}
      <section id="mentors" style={{ background:"#0D0D0D", padding:"80px 40px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"48px" }}>
              <p style={{ color:"#F5A623", fontSize:"12px", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"12px" }}>THE TEAM</p>
              <h2 style={{ ...ff, fontWeight:900, fontSize:"clamp(2rem,4vw,3rem)", color:"#fff", marginBottom:"16px" }}>Meet The <span style={{ color:"#F5A623" }}>Creative Minds</span></h2>
              <p style={{ color:"#aaa", fontSize:"15px", lineHeight:1.7, maxWidth:"560px", margin:"0 auto" }}>Gain Expert Mentorship To Craft A Career-Defining Body Of Work That Gets You Noticed, Not Stuck In Theory.</p>
            </div>
          </Reveal>
          <Reveal><img src={A.mentorsFull} alt="Meet the mentors" style={{ width:"100%", display:"block", borderRadius:"16px" }}/></Reveal>
        </div>
      </section>

      {/* ══ PROGRAM BREAKDOWN ══ */}
      <section style={{ background:"#0D0D0D", padding:"60px 0 80px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 60px" }}>
          <Reveal>
            <div style={{ marginBottom:"40px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#F5A623" }}/>
                <span style={{ color:"#888", fontSize:"10px", fontWeight:700, letterSpacing:"2.5px", textTransform:"uppercase" }}>YOUR ROADMAP</span>
              </div>
              <h2 style={{ ...ff, fontWeight:900, fontSize:"clamp(1.6rem,2.5vw,2.2rem)", lineHeight:1.15, color:"#fff", marginBottom:"6px" }}>MyScale <span style={{ color:"#F5A623" }}>Program Breakdown</span></h2>
              <p style={{ color:"#666", fontSize:"13px", marginBottom:"18px" }}>Your Journey With MyScale</p>
              <a href="#enroll" style={{ display:"inline-flex", alignItems:"center", gap:"10px", border:"1px solid #444", borderRadius:"999px", padding:"7px 8px 7px 18px", textDecoration:"none" }}>
                <span style={{ color:"#fff", fontSize:"12px", fontWeight:600 }}>Sign Up Now & Start</span>
                <div style={{ width:"26px", height:"26px", borderRadius:"50%", background:"#F5A623", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:"13px" }}>→</div>
              </a>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px" }}>
            <Reveal style={{ height:"100%" }}><img src={A.statueNew} alt="Program statue" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", borderRadius:"14px", minHeight:"380px" }}/></Reveal>
            <Reveal delay={150}>
              <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%" }}>
                {BREAKDOWN_STEPS.map((step,i)=>(
                  <div key={step.num} onClick={()=>setActiveStep(activeStep===i?null:i)}
                    style={{ display:"flex", gap:"16px", alignItems:"flex-start", padding:i===0?"0 0 28px 0":i===1?"28px 0":"28px 0 0 0", borderBottom:i<2?"1px solid #222":"none", cursor:"pointer" }}>
                    <span style={{ ...ff, fontSize:"3.2rem", fontWeight:900, color:activeStep===i?"#F5A623":"#444", lineHeight:1, flexShrink:0, width:"52px", marginTop:"-4px", transition:"color 0.2s" }}>{step.num}</span>
                    <div style={{ width:"100%" }}>
                      <div style={{ color:"#F5A623", fontSize:"10px", fontWeight:800, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"8px" }}>{step.label}</div>
                      <p style={{ color:"#ccc", fontSize:"13px", lineHeight:1.7, margin:0 }}>{step.body} <span style={{ color:"#666" }}>{step.sub}</span></p>
                      {activeStep===i&&<div style={{ marginTop:"12px", padding:"12px 16px", background:"#1a1a1a", borderRadius:"10px", borderLeft:"3px solid #F5A623" }}><p style={{ color:"#aaa", fontSize:"12px", lineHeight:1.7, margin:0 }}>{step.extra}</p></div>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* High Income */}
          <Reveal delay={200}>
            <div style={{ marginTop:"64px", borderTop:"1px solid #1f1f1f", paddingTop:"56px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"340px 1fr", gap:"60px", alignItems:"center", marginBottom:"48px" }}>
                <img src={A.highIncome} alt="High Income Skill" style={{ width:"100%", display:"block" }}/>
                <div>
                  <p style={{ color:"#888", fontSize:"12px", marginBottom:"10px" }}>Design Is No Longer Low-Paying</p>
                  <h3 style={{ ...ff, fontWeight:900, fontSize:"clamp(1.6rem,2.4vw,2.2rem)", color:"#fff", lineHeight:1.2, marginBottom:"16px" }}>Design Is A <span style={{ color:"#F5A623" }}>High-Income Skill</span></h3>
                  <p style={{ color:"#666", fontSize:"13px", lineHeight:1.8, marginBottom:"28px", maxWidth:"460px" }}>Top Designers Earn <span style={{ color:"#F5A623", fontWeight:700 }}>₹30–60 LPA+</span> By Solving Real Product Problems, Building Scalable Systems, And Driving Growth — Not Just Designing Screens.</p>
                  <div style={{ display:"flex", gap:"40px" }}>
                    {INCOME.map(inc=>(
                      <div key={inc.l}>
                        <div style={{ ...ff, color:"#F5A623", fontWeight:900, fontSize:"1.5rem", lineHeight:1 }}>{inc.v}</div>
                        <div style={{ color:"#666", fontSize:"11px", marginTop:"4px" }}>{inc.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ overflow:"hidden", position:"relative", borderTop:"1px solid #1a1a1a", paddingTop:"32px" }}>
                <div style={{ position:"absolute", left:0, top:0, bottom:0, width:"80px", background:"linear-gradient(to right,#0D0D0D,transparent)", zIndex:2, pointerEvents:"none" }}/>
                <div style={{ position:"absolute", right:0, top:0, bottom:0, width:"80px", background:"linear-gradient(to left,#0D0D0D,transparent)", zIndex:2, pointerEvents:"none" }}/>
                <div style={{ display:"flex", gap:"0", animation:"marquee 28s linear infinite", width:"max-content" }}>
                  {[1,2].map(n=><img key={n} src={A.hiringLogos} alt="Hiring companies" style={{ height:"40px", display:"block", opacity:0.85, flexShrink:0 }}/>)}
                </div>
                <style>{`@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ BOOTCAMP FOR EVERYONE ══ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Inclusive Learning</span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">A UI/UX Bootcamp <span className="text-orange-500">Made For Everyone</span></h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal><img src={A.phones} alt="Learn on any device" className="w-full drop-shadow-xl"/></Reveal>
            <Reveal delay={150}>
              <h3 className="text-2xl font-black text-gray-900 mb-5 leading-tight">Live sessions with<br/>real-world insights</h3>
              <p className="text-gray-500 leading-relaxed mb-7 text-sm">Our live classes are designed for deep learning — not passive watching. Expect interactive Q&As, design critiques, and hands-on problem solving every session.</p>
              <ul className="space-y-3 mb-8">
                {["Weekend & weekday batches available","Session recordings for every class","1-on-1 doubt clearing included","Private Slack community access","Career counselling + mock interviews"].map(f=>(
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-700 group cursor-default">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold group-hover:bg-green-500 group-hover:text-white transition-colors">✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#enroll" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 text-sm">Start Learning Today →</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-14">
            <span className="text-orange-500 font-bold text-sm uppercase tracking-widest">Real Work</span>
            <h2 className="text-4xl font-black mt-2">Student <span className="text-orange-500">Projects</span></h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROJECTS.map((p,i)=>(
              <Reveal key={p.name} delay={i*80}>
                <div onClick={()=>setActiveProject(activeProject===i?null:i)} className="rounded-2xl border border-gray-200 hover:border-orange-300 overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-32 flex items-center justify-center text-white font-black text-lg" style={{ background:p.color }}>{p.type}</div>
                  <div className="p-5">
                    <div className="font-bold text-sm text-gray-900">{p.name}</div>
                    {activeProject===i&&<p className="text-xs text-gray-500 mt-2">{p.desc}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CREATIVE BLOCKS ══ */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal className="text-center mb-12">
            <span className="text-orange-400 font-bold text-sm uppercase tracking-widest">Mindset Training</span>
            <h2 className="text-4xl font-black mt-2">Creative Blocks? <span className="text-orange-400">We Have The Map.</span></h2>
            <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm">Every designer hits a wall. We teach systems and mindsets to break through it.</p>
          </Reveal>
          <Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
              {BLOCKS.map((b,i)=>(
                <div key={b.t} onClick={()=>setActiveBlock(activeBlock===i?null:i)}
                  className={`rounded-2xl p-6 border transition-all cursor-pointer text-center ${activeBlock===i?"bg-orange-500 border-orange-400 scale-105 shadow-xl shadow-orange-900/30":"bg-white/5 hover:bg-white/10 border-white/10 hover:border-orange-500/40 hover:-translate-y-1"}`}>
                  <div className="text-4xl mb-4">{b.i}</div>
                  <div className="font-bold text-white text-sm">{b.t}</div>
                  {activeBlock===i&&<p className="text-orange-100 text-xs mt-3 pt-3 border-t border-orange-400">{b.tip}</p>}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="text-center">
            <div className="max-w-2xl mx-auto space-y-1">
              <p className="text-xl md:text-2xl font-black text-gray-300">break design barriers daily.</p>
              <p className="text-xl md:text-2xl font-black"><span className="text-white">We </span><span className="text-orange-400">build creators, not followers.</span></p>
              <p className="text-xl md:text-2xl font-black text-gray-300">think bold, design louder,</p>
              <p className="text-xl md:text-2xl font-black text-orange-400">craft skills that scale.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ ENROLL CTA ══ */}
      <section id="enroll" className="relative py-32 bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-300/20 rounded-full blur-3xl pointer-events-none"/>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-bold px-5 py-2 rounded-full mb-8">🎯 Enroll Now & Get Instant Access For Lifetime</div>
            <h2 className="text-4xl md:text-5xl font-black mb-5 leading-tight">Ready to Start Your<br/>Design Career?</h2>
            <p className="text-orange-100 text-base mb-10 max-w-xl mx-auto leading-relaxed">Join 500+ students who transformed their careers with MyScale. Seats fill fast — secure yours before the batch closes.</p>
            {enrolled ? (
              <div className="bg-white/20 border border-white/30 rounded-2xl p-8 max-w-md mx-auto mb-8">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-black mb-2">You're on the list!</h3>
                <p className="text-orange-100 text-sm">We'll contact you within 24 hours to confirm your seat.</p>
              </div>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md mx-auto mb-8 text-left">
                <h3 className="text-lg font-black mb-5 text-center">Reserve Your Seat</h3>
                <div className="space-y-4">
                  {[{ph:"Your full name",key:"name",type:"text"},{ph:"Email address",key:"email",type:"email"},{ph:"Phone number",key:"phone",type:"tel"}].map(f=>(
                    <input key={f.key} type={f.type} placeholder={f.ph} value={enrollForm[f.key]}
                      onChange={e=>setEnrollForm({...enrollForm,[f.key]:e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-orange-200 text-sm focus:outline-none focus:border-white"/>
                  ))}
                  <button onClick={()=>{if(enrollForm.name&&enrollForm.email)setEnrolled(true);}}
                    className="w-full bg-white text-orange-500 font-black py-4 rounded-xl hover:scale-105 transition-all shadow-xl text-base">
                    Enroll Now — ₹24,999
                  </button>
                </div>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="#enroll" className="bg-white text-orange-500 font-black px-10 py-5 rounded-full hover:scale-105 transition-all shadow-xl text-base">Enroll Now — ₹24,999</a>
              <a href="#enroll" className="border-2 border-white/50 hover:bg-white/10 text-white font-semibold px-10 py-5 rounded-full transition-all text-base">Talk to Counsellor</a>
            </div>
            <p className="text-orange-200 text-sm">🔒 Secure payment · 7-day money back · EMI from ₹2,499/mo</p>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-gray-950 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-0.5 mb-4">
                <span className="text-2xl font-black text-orange-500">My</span>
                <span className="text-2xl font-black text-white">Scale</span>
                <span className="text-lg ml-1">⚡</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">India's #1 UI/UX design bootcamp. Building job-ready designers since 2022.</p>
              <div className="flex gap-3 mt-5">
                {["𝕏","in","▶","📷"].map((icon,i)=>(
                  <a key={i} href="#home" className="w-8 h-8 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center text-xs transition-colors">{icon}</a>
                ))}
              </div>
            </div>
            {[{t:"Program",ls:["Curriculum","Mentors","Projects","Placement"]},{t:"Company",ls:["About Us","Blog","Careers","Contact"]},{t:"Support",ls:["FAQ","Terms","Privacy","Refund Policy"]}].map(col=>(
              <div key={col.t}>
                <div className="font-bold text-white mb-4 text-sm">{col.t}</div>
                <ul className="space-y-2.5">
                  {col.ls.map(l=><li key={l}><a href="#home" className="text-sm text-gray-500 hover:text-orange-400 transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <span>© 2025 MyScale. All rights reserved.</span>
            <span className="text-orange-500 font-semibold">Made with ❤️ for designers everywhere</span>
          </div>
        </div>
      </footer>

    </div>
  );
}