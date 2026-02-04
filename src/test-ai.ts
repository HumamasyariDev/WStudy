// Test script to verify AI API integration
import { generateChatResponse } from './services/chatAiService';

async function testAI() {
    console.log('=== Testing AI Chat Service ===');
    console.log('Environment:', import.meta.env.MODE);
    console.log('API Key exists:', !!import.meta.env.VITE_OPENAI_API_KEY);
    console.log('API Key length:', import.meta.env.VITE_OPENAI_API_KEY?.length);
    console.log('API Key prefix:', import.meta.env.VITE_OPENAI_API_KEY?.substring(0, 10));
    
    try {
        const response = await generateChatResponse('Hello, what courses do you offer?', []);
        console.log('✅ AI Response:', response);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testAI();
