import { Check, X, Star, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero animations
            const badge = heroRef.current?.querySelector('.badge');
            if (badge) {
                gsap.fromTo(badge,
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)",
                        scrollTrigger: { trigger: heroRef.current, start: "top 80%" }
                    }
                );
            }

            const heading = heroRef.current?.querySelector('h2');
            if (heading) {
                gsap.fromTo(heading,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.2,
                        scrollTrigger: { trigger: heroRef.current, start: "top 80%" }
                    }
                );
            }

            // Pricing cards stagger
            const cards = cardsRef.current?.children;
            if (cards) {
                gsap.fromTo(cards,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
                        scrollTrigger: { trigger: cardsRef.current, start: "top 75%" }
                    }
                );
            }

            // FAQ items - now handled by Framer Motion
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const plans = [
        {
            name: 'Free',
            price: '0',
            period: 'forever',
            description: 'Perfect for getting started',
            features: [
                { text: 'Access to 50+ free courses', included: true },
                { text: 'Basic quizzes and assessments', included: true },
                { text: 'Community forum access', included: true },
                { text: 'Mobile app access', included: true },
                { text: 'Certificate of completion', included: false },
                { text: 'Priority support', included: false },
            ],
            bg: 'bg-white',
            borderColor: 'border border-gray-200',
            buttonBg: 'bg-[#191A23] text-white hover:bg-[#2a2b3a]',
            popular: false,
        },
        {
            name: 'Pro',
            price: '19',
            period: 'per month',
            description: 'For serious learners',
            features: [
                { text: 'Access to 1000+ premium courses', included: true },
                { text: 'Advanced quizzes and projects', included: true },
                { text: 'Priority community support', included: true },
                { text: 'Certificate of completion', included: true },
                { text: 'Priority email support', included: true },
                { text: 'Offline downloads', included: true },
            ],
            bg: 'bg-[#B9FF66]',
            borderColor: '',
            buttonBg: 'bg-[#191A23] text-white hover:bg-[#2a2b3a]',
            popular: true,
        },
        {
            name: 'Enterprise',
            price: '99',
            period: 'per month',
            description: 'For teams and organizations',
            features: [
                { text: 'Unlimited access to all courses', included: true },
                { text: 'Custom learning paths', included: true },
                { text: 'Dedicated account manager', included: true },
                { text: '24/7 priority support', included: true },
                { text: 'Offline downloads', included: true },
                { text: 'Advanced analytics & reporting', included: true },
            ],
            bg: 'bg-[#191A23]',
            borderColor: '',
            buttonBg: 'bg-[#B9FF66] text-[#191A23] hover:bg-[#a3eb5b]',
            textWhite: true,
            popular: false,
        },
    ];

    const faqs = [
        {
            question: 'Can I switch plans anytime?',
            answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
        },
        {
            question: 'Is there a free trial for paid plans?',
            answer: 'Yes, we offer a 14-day free trial for both Pro and Enterprise plans. No credit card required.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
        },
        {
            question: 'Can I get a refund?',
            answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
        },
    ];

    return (
        <section ref={sectionRef} id="pricing" className="bg-white relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-40 right-10 w-96 h-96 bg-[#B9FF66]/30 rounded-full blur-3xl" />
                <div className="absolute bottom-40 left-10 w-80 h-80 bg-[#191A23]/10 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <div ref={heroRef} className="py-16 md:py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="badge inline-flex items-center gap-2 px-4 py-2 bg-[#B9FF66]/20 rounded-full mb-6 opacity-0">
                            <Sparkles className="w-5 h-5 text-[#191A23]" />
                            <span className="text-sm font-bold text-[#191A23]">Flexible Plans</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#191A23] mb-6 font-geist opacity-0">
                            Simple, <span className="bg-[#B9FF66] px-3 rounded-lg inline-block transform hover:scale-105 transition-transform">Transparent</span> Pricing
                        </h2>
                        <p className="text-base md:text-xl text-gray-600 leading-relaxed font-geist">
                            Choose the perfect plan for your learning journey. All plans include access to our community and mobile apps.
                        </p>
                    </div>
                </div>
            </div>

            {/* Pricing Cards - Clean Design */}
            <div className="pb-16 md:pb-24 relative">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-4">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`${plan.bg} ${plan.borderColor} rounded-2xl p-8 relative opacity-0
                                          hover:-translate-y-2 transition-all duration-300 ease-out
                                          ${plan.popular ? 'md:-mt-4 md:mb-4 shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#191A23] text-[#B9FF66] px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-[#B9FF66]" />
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className={`text-xl font-bold mb-1 font-geist ${plan.textWhite ? 'text-white' : 'text-[#191A23]'}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`text-sm font-geist ${plan.textWhite ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <span className={`text-5xl font-bold font-geist ${plan.textWhite ? 'text-white' : 'text-[#191A23]'}`}>
                                        ${plan.price}
                                    </span>
                                    <span className={`text-sm font-geist ${plan.textWhite ? 'text-gray-400' : 'text-gray-500'}`}>
                                        /{plan.period}
                                    </span>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className={`w-5 h-5 flex-shrink-0 ${plan.textWhite ? 'text-[#B9FF66]' : 'text-[#191A23]'}`} />
                                            ) : (
                                                <X className="w-5 h-5 flex-shrink-0 text-gray-400" />
                                            )}
                                            <span className={`text-sm font-geist ${feature.included ? (plan.textWhite ? 'text-white' : 'text-[#191A23]') : 'text-gray-400'}`}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/signup"
                                    className={`block w-full py-3 rounded-lg font-semibold text-center 
                                              transition-all duration-200 ease-out
                                              hover:scale-[1.02] active:scale-[0.98]
                                              ${plan.buttonBg}`}
                                >
                                    Get Started
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section - Accordion Style */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="py-12 md:py-16 bg-[#191A23] relative overflow-hidden"
                style={{ scrollMarginTop: '100px' }}
            >
                <div ref={faqRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8" style={{ contain: 'layout' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                        className="text-center mb-8 md:mb-10"
                    >
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 font-geist">
                            Frequently Asked <span className="text-[#B9FF66]">Questions</span>
                        </h3>
                        <p className="text-white/60 font-geist">
                            Everything you need to know about WStudy
                        </p>
                    </motion.div>

                    <div className="space-y-3" style={{ minHeight: '500px' }}>
                        {faqs.map((faq, index) => (
                            <FAQItem 
                                key={index} 
                                faq={faq} 
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

// FAQ Accordion Item - Original Clean Design with Smooth Animations
const FAQItem = ({ faq, index, isOpen, onToggle }: { 
    faq: { question: string; answer: string }, 
    index: number,
    isOpen: boolean,
    onToggle: () => void
}) => {
    const handleClick = () => {
        const scrollY = window.scrollY;
        onToggle();
        requestAnimationFrame(() => {
            window.scrollTo(0, scrollY);
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            <motion.div
                animate={{
                    backgroundColor: isOpen ? '#B9FF66' : 'rgba(255, 255, 255, 0.05)',
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl overflow-hidden border border-white/10 shadow-lg"
                whileHover={{ 
                    borderColor: 'rgba(185, 255, 102, 0.4)',
                    y: -2,
                    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
            >
                <motion.button
                    onClick={handleClick}
                    className="w-full p-5 md:p-6 flex items-center justify-between text-left"
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                >
                    <div className="flex items-center gap-4 flex-1">
                        <motion.div
                            animate={{
                                backgroundColor: isOpen ? '#191A23' : '#B9FF66',
                                scale: isOpen ? 1.05 : 1,
                            }}
                            transition={{ 
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="flex-shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center font-bold text-base md:text-lg shadow-md"
                        >
                            <motion.span
                                animate={{
                                    color: isOpen ? '#B9FF66' : '#191A23',
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {index + 1}
                            </motion.span>
                        </motion.div>

                        <motion.h4
                            animate={{ 
                                color: isOpen ? '#191A23' : '#FFFFFF',
                            }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="text-base md:text-lg font-semibold font-geist pr-4"
                        >
                            {faq.question}
                        </motion.h4>
                    </div>
                    
                    <motion.div
                        animate={{ 
                            rotate: isOpen ? 180 : 0,
                        }}
                        transition={{ 
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1]
                        }}
                        className="flex-shrink-0"
                    >
                        <motion.div
                            animate={{
                                backgroundColor: isOpen ? '#191A23' : 'rgba(185, 255, 102, 0.15)',
                            }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center shadow-md"
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <motion.path
                                    d="M4.5 6.75L9 11.25L13.5 6.75"
                                    stroke={isOpen ? '#B9FF66' : '#B9FF66'}
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.button>
                
                <motion.div
                    initial={false}
                    animate={{
                        maxHeight: isOpen ? 1000 : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                        maxHeight: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.4, delay: isOpen ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="overflow-hidden border-t border-[#191A23]/10"
                >
                    <div className="px-5 md:px-6 py-5 md:py-6">
                        <div className="flex gap-3">
                            <div className="flex-shrink-0 w-0.5 bg-[#191A23]/20 rounded-full" />
                            
                            <p className="text-[#191A23]/90 font-geist leading-relaxed text-sm md:text-base">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default PricingSection;
