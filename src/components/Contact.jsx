// src/components/Contact.jsx
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Replace these with your EmailJS credentials (get them from .env)
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0dff78a';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_qg10p3t';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'zC9QMR227nyygMWbk';

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or contact directly via socials.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's <span className="gradient-text">Connect</span></h2>
          <p className="text-gray-300 max-w-2xl mx-auto">Have a project in mind? Let's work together and bring ideas to life.</p>
        </motion.div>

        <div className="glass-card p-8 md:p-10 max-w-2xl mx-auto">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="user_name" className="block text-gray-300 mb-2">Full Name *</label>
              <input type="text" id="user_name" name="user_name" required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition" />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-gray-300 mb-2">Email Address *</label>
              <input type="email" id="user_email" name="user_email" required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition" />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message *</label>
              <textarea id="message" name="message" rows="5" required className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-400 transition resize-none"></textarea>
            </div>
            
            {status.message && (
              <div className={`flex items-center gap-2 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                <span className="text-sm">{status.message}</span>
              </div>
            )}
            
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? 'Sending...' : <>Send Message <FiSend /></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;