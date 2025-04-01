import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const App = () => {
  const styles = {
    layout: {
      container: "min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100",
      section: "container mx-auto px-6 py-20 text-center",
      statsBar: "bg-white py-8 shadow-sm",
      featureGrid: "grid grid-cols-1 md:grid-cols-3 gap-10",
      ctaSection: "bg-blue-600 text-white py-20",
    },
    text: {
      heading1: "text-4xl md:text-5xl font-bold text-gray-800 mb-6",
      heading2: "text-3xl font-bold text-center text-gray-800 mb-16",
      heading3: "text-xl font-semibold text-gray-800 mb-3",
      paragraph: "text-xl text-gray-600 max-w-2xl mx-auto mb-10",
      smallText: "text-gray-600 mt-2",
      accentText: "text-blue-600",
      ctaText: "text-3xl md:text-4xl font-bold mb-6",
      ctaSubtext: "text-xl text-blue-100 max-w-2xl mx-auto mb-10",
    },
    components: {
      featureCard: "bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow",
      iconContainer: "w-14 h-14 rounded-lg flex items-center justify-center mb-6",
      divider: "hidden md:block h-12 w-px bg-gray-200",
      statsItem: "text-3xl font-bold text-blue-600",
      starIcon: "w-5 h-5 text-yellow-400",
    },
    buttons: {
      primary: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all flex items-center justify-center gap-2",
      secondary: "bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md transition-all inline-block",
      outline: "bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all inline-block hover:bg-white hover:bg-opacity-10",
    },
    animations: {
      hoverScale: { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } },
      hoverLift: { whileHover: { y: -5 } },
      fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
      }
    }
  };

  return (
    <div className={styles.layout.container}>
      {/* Hero Section */}
      <section className={styles.layout.section}>
        <motion.div {...styles.animations.fadeInUp}>
          <h1 className={styles.text.heading1}>
            Connect <span className={styles.text.accentText}>Securely</span> with Encryption
          </h1>
          <p className={styles.text.paragraph}>
            Experience seamless, end-to-end encrypted messaging that protects your conversations without compromising speed.
          </p>
          
          <motion.div {...styles.animations.hoverScale} className="inline-block">
            <Link to="/chat" className={styles.buttons.primary}>
              Start Secure Chatting Now →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <div className={styles.layout.statsBar}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-center">
            <div>
              <p className={styles.components.statsItem}>22,861+</p>
              <p className={styles.text.smallText}>Encrypted Conversations</p>
            </div>
            <div className={styles.components.divider}></div>
            <div>
              <div className="flex justify-center items-center gap-1">
                <p className={styles.components.statsItem}>4.8</p>
                <span className="text-gray-400">/5</span>
              </div>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={styles.components.starIcon} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className={styles.text.smallText}>Trustpilot Rating</p>
            </div>
            <div className={styles.components.divider}></div>
            <div>
              <p className={styles.components.statsItem}>99.9%</p>
              <p className={styles.text.smallText}>Uptime Reliability</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <h2 className={styles.text.heading2}>
          Secure <span className={styles.text.accentText}>Features</span> for Peace of Mind
        </h2>
        
        <div className={styles.layout.featureGrid}>
          {/* Feature 1 */}
          <motion.div 
            {...styles.animations.hoverLift}
            className={styles.components.featureCard}
          >
            <div className={`${styles.components.iconContainer} bg-blue-100`}>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className={styles.text.heading3}>Military-Grade Encryption</h3>
            <p className={styles.text.smallText}>
              AES-256 and RSA-2048 encryption ensure your messages stay private. Even we can't read them.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            {...styles.animations.hoverLift}
            className={styles.components.featureCard}
          >
            <div className={`${styles.components.iconContainer} bg-purple-100`}>
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className={styles.text.heading3}>Self-Destructing Messages</h3>
            <p className={styles.text.smallText}>
              Set expiration times for sensitive messages. They'll disappear automatically after reading.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            {...styles.animations.hoverLift}
            className={styles.components.featureCard}
          >
            <div className={`${styles.components.iconContainer} bg-green-100`}>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 className={styles.text.heading3}>Secure File Sharing</h3>
            <p className={styles.text.smallText}>
              Send documents, photos, and videos with the same level of encryption as your messages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.layout.ctaSection}>
        <div className="container mx-auto px-6 text-center">
          <h2 className={styles.text.ctaText}>Ready to Experience Secure Chatting?</h2>
          <p className={styles.text.ctaSubtext}>
            Join thousands who trust ChatSecure for their private communications.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/register" className={styles.buttons.secondary}>
                Create Free Account
              </Link>
            </motion.div>
            <motion.div {...styles.animations.hoverScale}>
              <Link to="/login" className={styles.buttons.outline}>
                Existing User? Login
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;