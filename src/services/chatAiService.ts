export const generateChatResponse = async (userMessage: string, conversationHistory: Array<{role: string, content: string}>): Promise<string> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    console.log('🔑 API Key check:', {
        exists: !!apiKey,
        length: apiKey?.length,
        prefix: apiKey?.substring(0, 7)
    });
    
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
        console.warn('⚠️ No valid API key found, using fallback responses');
        console.log('💡 Set VITE_OPENAI_API_KEY in .env file and restart dev server');
        return getFallbackResponse(userMessage);
    }

    const systemPrompt = `You are a helpful customer service assistant for WStudy, an online learning platform. 

Your role:
- Answer questions about courses, pricing, and platform features
- Be friendly, professional, and concise
- Provide accurate information about WStudy
- Guide users to relevant sections of the website

WStudy Information:
- Offers courses in: Programming, Design, Business, Mathematics, Science, Languages, and more
- Pricing: Free Trial, Monthly Plan ($29/month), Annual Plan ($290/year - Save 17%)
- Features: Interactive courses, expert instructors, certificates, progress tracking, quizzes
- Contact: info@wstudy.com, Phone: 555-567-8901
- Address: 1234 Main St, Jakarta, Indonesia

Keep responses brief (2-3 sentences max) and helpful.`;

    console.log('🤖 Calling OpenAI API...');
    
    try {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: userMessage }
        ];

        console.log('📤 Sending request to OpenAI:', {
            model: 'gpt-4o-mini',
            messageCount: messages.length
        });

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: messages,
                temperature: 0.7,
                max_tokens: 200
            })
        });

        console.log('📥 API Response status:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API Error:', errorData);
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const aiResponse = data.choices?.[0]?.message?.content;
        
        console.log('✅ AI Response received:', aiResponse?.substring(0, 50) + '...');
        
        if (!aiResponse) {
            throw new Error('No response from AI');
        }
        
        return aiResponse;
    } catch (error) {
        console.error('❌ Chat AI Error:', error);
        
        // Fallback to simple responses on error
        const errorMessage = error instanceof Error ? error.message : '';
        if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('rate limit')) {
            console.warn('⚠️ API quota exceeded, using fallback responses');
        }
        
        return getFallbackResponse(userMessage);
    }
};

const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
        return 'Hello! 👋 Welcome to WStudy. How can I assist you today?';
    }
    if (lowerMessage.includes('course') || lowerMessage.includes('kursus')) {
        return 'We offer a wide variety of courses! 📚\n\nYou can browse our courses by clicking the "Courses" button above, or visit our Courses section on the website. We have courses in programming, design, business, and more!';
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('harga') || lowerMessage.includes('pricing')) {
        return 'Our pricing is very competitive! 💰\n\nWe offer flexible plans:\n• Free Trial - Try before you buy\n• Monthly Plan - $29/month\n• Annual Plan - $290/year (Save 17%)\n\nClick "Pricing" above to see full details!';
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('bantuan') || lowerMessage.includes('support')) {
        return 'I\'m here to help! 🤝\n\nYou can:\n• Ask me questions about our courses\n• Learn about pricing plans\n• Get contact information\n• Browse our FAQ section\n\nWhat would you like to know?';
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('kontak')) {
        return 'You can reach us at:\n\n📧 Email: info@wstudy.com\n📱 Phone: 555-567-8901\n📍 Address: 1234 Main St, Jakarta, Indonesia\n\nWe typically respond within 24 hours!';
    }
    if (lowerMessage.includes('thank') || lowerMessage.includes('terima kasih')) {
        return 'You\'re welcome! 😊 Is there anything else I can help you with?';
    }
    
    return 'Thanks for your message! 😊\n\nI can help you with:\n• Course information\n• Pricing details\n• Contact information\n• General support\n\nFeel free to ask me anything!';
};
