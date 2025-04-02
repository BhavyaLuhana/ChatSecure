import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const App = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Modern gradient colors
  const gradients = {
    primary: "bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900",
    secondary: "bg-gradient-to-br from-pink-600 to-purple-700",
    accent: "bg-gradient-to-r from-cyan-400 to-blue-500"
  };

  const styles = {
    layout: {
      container: `min-h-screen text-gray-100 ${gradients.primary}`,
      section: "container mx-auto px-6 py-28 text-center",
      featureSection: "container mx-auto px-6 py-20",
      ctaSection: "py-32 relative overflow-hidden"
    },
    text: {
      heading1: "text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500",
      heading2: "text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 inline-block",
      heading3: "text-2xl font-semibold mb-3",
      paragraph: "text-lg text-gray-300 max-w-2xl mx-auto mb-10",
      smallText: "text-gray-400 mt-2",
      ctaText: "text-4xl md:text-5xl font-bold mb-6",
      ctaSubtext: "text-xl text-blue-200 max-w-2xl mx-auto mb-10",
    },
    components: {
      featureCard: "bg-gray-900 bg-opacity-50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm",
      chatBubble: "bg-gray-800 rounded-3xl p-6 max-w-md mx-auto text-left",
      iconContainer: "w-16 h-16 rounded-xl flex items-center justify-center mb-6 mx-auto",
      navPill: "px-6 py-2 rounded-full cursor-pointer transition-all",
      floatingPhone: "absolute -right-20 -bottom-20 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-20"
    },
    buttons: {
      primary: `${gradients.accent} hover:opacity-90 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition-all flex items-center justify-center gap-2`,
      secondary: "bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-10 rounded-full border border-gray-600 transition-all",
      glow: "relative overflow-hidden group"
    },
    animations: {
      hoverScale: { 
        whileHover: { scale: 1.05 }, 
        whileTap: { scale: 0.95 },
        transition: { type: "spring", stiffness: 400, damping: 10 }
      },
      float: {
        y: [0, -15, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }
      },
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 }
      }
    }
  };

  const features = [
    {
      title: "End-to-End Encryption",
      description: "Messages are encrypted before they leave your device and can only be decrypted by the intended recipient.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Disappearing Messages",
      description: "Set timers for your messages to automatically delete after being read.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "Realtime Chat",
      description: "Lightning fast messaging with read receipts and typing indicators.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      color: "from-green-400 to-teal-500"
    }
  ];

  return (
    <div className={styles.layout.container}>
      {/* Hero Section */}
      <section className={styles.layout.section}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.text.heading1}>
            Chat Differently
          </h1>
          <p className={styles.text.paragraph}>
            The next generation of private messaging with cutting-edge encryption and sleek design.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/chat" className={`${styles.buttons.primary} ${styles.buttons.glow}`}>
                Start Chatting Free
              </Link>
            </motion.div>
            
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/features" className={styles.buttons.secondary}>
                See Features
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating phone mockup */}
        <motion.div 
          className="mt-20 mx-auto w-64 h-128 bg-gray-900 rounded-4xl border-8 border-gray-800 shadow-2xl overflow-hidden relative"
          {...styles.animations.float}
        >
          <div className="absolute top-0 left-0 w-full h-8 bg-gray-800"></div>
          <div className="p-4 h-full flex flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto">
              {/* Sample chat messages */}
              <div className="bg-blue-600 rounded-2xl rounded-bl-none p-3 w-3/4">
                <p>Hey! Check out this new secure chat app</p>
              </div>
              <div className="bg-gray-700 rounded-2xl rounded-br-none p-3 w-3/4 ml-auto">
                <p>Looks awesome! Is it really secure?</p>
              </div>
              <div className="bg-blue-600 rounded-2xl rounded-bl-none p-3 w-3/4">
                <p>Military-grade encryption 🔒</p>
              </div>
            </div>
            <div className="mt-4 bg-gray-800 rounded-full p-2 flex items-center">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="flex-1 bg-transparent outline-none px-3 text-sm"
              />
              <button className="text-blue-400 p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className={styles.layout.featureSection}>
        <h2 className={styles.text.heading2}>
          Why ChatSecure?
        </h2>
        
        {/* Feature selector */}
        <div className="flex justify-center gap-2 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${styles.components.navPill} ${
                activeFeature === index 
                  ? `${gradients.secondary} text-white shadow-lg` 
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveFeature(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {feature.title}
            </motion.div>
          ))}
        </div>

        {/* Active feature display */}
        <motion.div 
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.components.featureCard}
        >
          <div className={`${styles.components.iconContainer} bg-gradient-to-br ${features[activeFeature].color}`}>
            {features[activeFeature].icon}
          </div>
          <h3 className={styles.text.heading3}>{features[activeFeature].title}</h3>
          <p className={styles.text.smallText}>{features[activeFeature].description}</p>
        </motion.div>

        {/* Chat bubbles demo */}
        <motion.div 
          className="mt-20 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.components.chatBubble}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
              <div>
                <p className="font-semibold">Alex</p>
                <p className="text-xs text-gray-500">Today, 2:45 PM</p>
              </div>
            </div>
            <p>Just sent you the encrypted files. They'll self-destruct after you view them!</p>
          </div>
          
          <div className={`${styles.components.chatBubble} ml-auto bg-gradient-to-br ${gradients.accent}`}>
            <p>Got them! This encryption is next-level 🔥</p>
            <div className="flex items-center justify-end mt-3 gap-1">
              <span className="text-xs text-blue-100">Delivered</span>
              <svg className="w-4 h-4 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className={styles.layout.ctaSection}>
        <div className={styles.components.floatingPhone}></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h2 
            className={styles.text.ctaText}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Join?
          </motion.h2>
          <motion.p 
            className={styles.text.ctaSubtext}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Over 2 million users trust ChatSecure for their private conversations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/register" className={`${styles.buttons.primary} ${styles.buttons.glow}`}>
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-md"></span>
              </Link>
            </motion.div>
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/login" className={styles.buttons.secondary}>
                Existing User? Login
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default App;