'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useForm, ValidationError } from '@formspree/react'

const budgetOptions = [
  '$50 - $100',
  '$100 - $500',
  '$500 - $1,000',
  '$1,000 - $5,000',
]

const projectTypes = [
  'Content Campaign',
  'Brand Partnership',
  'Product Launch',
  'Long-term Collaboration',
  'Other',
]

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef, { once: true, margin: '-100px' })
  
  const [state, handleSubmit] = useForm('mjglazjr')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})

  const isFieldActive = (field: string) => focusedField === field || !!fieldValues[field]

  if (state.succeeded) {
    return (
      <section 
        id="contact"
        className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48 flex items-center justify-center"
      >
        <motion.div
          className="text-center px-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-full border border-white/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h2 
            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            Request Received
          </h2>
          <p className="mt-6 text-white/60 text-lg max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. We&apos;ll review your partnership request and get back to you within 48 hours.
          </p>
        </motion.div>
      </section>
    )
  }

  return (
    <motion.section 
      ref={containerRef}
      id="contact"
      className="relative min-h-screen w-full bg-black overflow-hidden py-32 md:py-48"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-white/[0.01] rounded-full blur-2xl" />
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>07</span>
      </div>
      <div className="absolute top-8 right-8 text-[10px] tracking-[0.3em] text-white/30 z-20">
        <span>CONTACT</span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase">Partnership</span>
          <h2 
            className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
            style={{ fontFamily: 'Monument Extended, sans-serif' }}
          >
            Let&apos;s Create
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-white/60 text-lg leading-relaxed">
            Ready to collaborate? Share your vision and let&apos;s build something extraordinary together.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name & Brand Row */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <motion.label
                  className="absolute left-0 transition-all duration-300 pointer-events-none text-white/40"
                  animate={{ 
                    top: isFieldActive('name') ? -24 : 16,
                    fontSize: isFieldActive('name') ? '12px' : '14px',
                    opacity: isFieldActive('name') ? 0.6 : 0.4,
                  }}
                >
                  Your Name *
                </motion.label>
                <input
                  type="text"
                  name="name"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFieldValues(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-2 text-red-400 text-sm" />
              </div>

              <div className="relative">
                <motion.label
                  className="absolute left-0 transition-all duration-300 pointer-events-none text-white/40"
                  animate={{ 
                    top: isFieldActive('brand') ? -24 : 16,
                    fontSize: isFieldActive('brand') ? '12px' : '14px',
                    opacity: isFieldActive('brand') ? 0.6 : 0.4,
                  }}
                >
                  Brand / Company *
                </motion.label>
                <input
                  type="text"
                  name="brand"
                  required
                  onFocus={() => setFocusedField('brand')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => setFieldValues(prev => ({ ...prev, brand: e.target.value }))}
                  className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                />
                <ValidationError prefix="Brand" field="brand" errors={state.errors} className="mt-2 text-red-400 text-sm" />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <motion.label
                className="absolute left-0 transition-all duration-300 pointer-events-none text-white/40"
                animate={{ 
                  top: isFieldActive('email') ? -24 : 16,
                  fontSize: isFieldActive('email') ? '12px' : '14px',
                  opacity: isFieldActive('email') ? 0.6 : 0.4,
                }}
              >
                Email Address *
              </motion.label>
              <input
                type="email"
                name="email"
                required
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFieldValues(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/50 transition-colors"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-2 text-red-400 text-sm" />
            </div>

            {/* Project Type */}
            <div>
              <label className="block text-white/40 text-sm mb-4">Project Type *</label>
              <div className="flex flex-wrap gap-3">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-3 text-sm tracking-wide border rounded-full transition-all duration-300 ${
                      selectedType === type
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input type="hidden" name="projectType" value={selectedType} />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-white/40 text-sm mb-4">Budget Range</label>
              <div className="flex flex-wrap gap-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget}
                    type="button"
                    onClick={() => setSelectedBudget(budget)}
                    className={`px-5 py-3 text-sm tracking-wide border rounded-full transition-all duration-300 ${
                      selectedBudget === budget
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
              <input type="hidden" name="budget" value={selectedBudget} />
            </div>

            {/* Message */}
            <div className="relative">
              <motion.label
                className="absolute left-0 transition-all duration-300 pointer-events-none text-white/40"
                animate={{ 
                  top: isFieldActive('message') ? -24 : 16,
                  fontSize: isFieldActive('message') ? '12px' : '14px',
                  opacity: isFieldActive('message') ? 0.6 : 0.4,
                }}
              >
                Tell us about your project *
              </motion.label>
              <textarea
                name="message"
                required
                rows={4}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFieldValues(prev => ({ ...prev, message: e.target.value }))}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-white/50 transition-colors resize-none"
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-2 text-red-400 text-sm" />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={state.submitting}
              className="group relative w-full md:w-auto px-12 py-5 bg-white text-black font-semibold tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {state.submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Partnership Request
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  )
}
