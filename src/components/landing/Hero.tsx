import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Threads from "@/components/Threads";
import TextPressure from "@/components/TextPressure";

const Hero = () => {
  return (
    <div className="w-full">
      
      {/* ================================
          SECTION 1 — WATERMELON INTRO
         ================================ */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[hsl(262,83%,58%)]/20 animate-pulse-slow">

  {/* ✨ TextPressure (FULL WIDTH – BEHIND) */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none"
  >
    <div className="w-full px-6">
      <TextPressure
        text="WATERMELLON"
        flex
        alpha={false}
        stroke={false}
        width
        weight
        italic
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={64}
      />
    </div>
  </motion.div>

  {/* 🍉 Watermelon Bounce Animation (FRONT) */}
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative z-10 mx-auto"
  >
    <div className="circular-watermelon">
      <div className="inner-circle"></div>
      <div className="stripes">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  </motion.div>

  {/* Scroll hint */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.3 }}
    className="absolute bottom-10 z-20 text-muted-foreground text-sm"
  >
  </motion.div>

</section>


      {/* ================================
          SECTION 2 — ORIGINAL HERO CONTENT
         ================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
          <div
            className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(262,83%,58%)]/20 blur-[100px] animate-pulse-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 z-0 pointer-events-none ">
          <Threads
            color={[0xC084FC, 0x60A5FA, 0x34D399]}
            amplitude={1}
            distance={-0.7}
            enableMouseInteraction
          />
        </div>

        <div className="container relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Real-time collaboration for modern teams
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              Organize work.{" "}
              <span className="gradient-text">Ship faster.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              BoardSync brings your team together with intuitive Kanban boards,
              real-time updates, and powerful collaboration tools.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/board">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/board">View Demo Board</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
