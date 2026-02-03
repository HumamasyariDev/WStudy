interface CourseGenerationResult {
    title: string;
    description: string;
    category: string;
    duration: string;
    thumbnail: string;
    modules: Array<{
        id: number;
        title: string;
        lessons: number;
    }>;
}

// Fallback simulation mode when API is unavailable
const simulateAIGeneration = (prompt: string): CourseGenerationResult => {
    console.log('Using fallback simulation mode');
    
    // Extract keywords from prompt for smart generation
    const lowerPrompt = prompt.toLowerCase();
    
    // Detect category
    let category = 'technology';
    if (lowerPrompt.includes('math') || lowerPrompt.includes('calculus') || lowerPrompt.includes('algebra')) category = 'mathematics';
    else if (lowerPrompt.includes('science') || lowerPrompt.includes('physics') || lowerPrompt.includes('chemistry') || lowerPrompt.includes('biology')) category = 'science';
    else if (lowerPrompt.includes('language') || lowerPrompt.includes('english') || lowerPrompt.includes('spanish') || lowerPrompt.includes('french')) category = 'language';
    else if (lowerPrompt.includes('art') || lowerPrompt.includes('design') || lowerPrompt.includes('music') || lowerPrompt.includes('painting')) category = 'arts';
    else if (lowerPrompt.includes('history') || lowerPrompt.includes('historical')) category = 'history';
    
    // Generate title from first few words
    const words = prompt.split(' ').slice(0, 8).join(' ');
    const title = words.length > 60 ? words.substring(0, 57) + '...' : words;
    
    // Generate modules based on prompt content
    const modules = [
        { id: 1, title: 'Introduction and Fundamentals', lessons: 5 },
        { id: 2, title: 'Core Concepts and Theory', lessons: 6 },
        { id: 3, title: 'Advanced Techniques', lessons: 7 },
        { id: 4, title: 'Practical Applications', lessons: 6 },
        { id: 5, title: 'Projects and Assessment', lessons: 4 }
    ];
    
    // Generate thumbnail URL using Picsum Photos with 16:9 aspect ratio (YouTube style)
    // 1280x720 is standard YouTube thumbnail size
    const categorySeeds: Record<string, string> = {
        'mathematics': 'math-equations-formulas',
        'science': 'science-laboratory-research',
        'language': 'language-books-learning',
        'technology': 'technology-coding-computer',
        'arts': 'art-creative-design',
        'history': 'history-ancient-books'
    };
    
    const seed = categorySeeds[category] || 'education-learning';
    const thumbnail = `https://picsum.photos/seed/${seed}/1280/720`;
    
    return {
        title,
        description: `This comprehensive course covers ${prompt}. Students will learn fundamental concepts, practical applications, and advanced techniques through engaging lessons and hands-on projects.`,
        category,
        duration: '8 weeks',
        thumbnail,
        modules
    };
};

export const generateCourseWithAI = async (prompt: string): Promise<CourseGenerationResult> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    console.log('API Key exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    
    if (!apiKey) {
        console.warn('No API key found, using fallback simulation');
        return simulateAIGeneration(prompt);
    }

    console.log('Using OpenAI GPT API');

    const systemPrompt = `You are an expert educational course designer. Based on the user's course idea, generate a comprehensive course structure.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):
{
    "title": "Course title (max 60 characters)",
    "description": "Detailed course description (2-3 sentences)",
    "category": "one of: mathematics, science, language, technology, arts, history",
    "duration": "e.g., 8 weeks, 12 weeks, 6 months",
    "modules": [
        {
            "id": 1,
            "title": "Module title",
            "lessons": 5
        }
    ]
}

Generate 4-6 modules with logical progression. Each module should have 3-8 lessons.`;

    try {
        // Use OpenAI API
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: `User's course idea: ${prompt}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 2048,
                response_format: { type: 'json_object' }
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        
        const text = data.choices?.[0]?.message?.content;
        
        if (!text) {
            throw new Error('No response text from AI');
        }
        
        console.log('AI Response received:', text.substring(0, 100));
        
        // Parse JSON response
        const courseData = JSON.parse(text);
        
        // Validate the response structure
        if (!courseData.title || !courseData.description || !courseData.category || !courseData.duration || !Array.isArray(courseData.modules)) {
            throw new Error('Invalid response structure from AI');
        }
        
        // Generate thumbnail URL using Picsum Photos with 16:9 aspect ratio (YouTube style)
        const categorySeeds: Record<string, string> = {
            'mathematics': 'math-equations-formulas',
            'science': 'science-laboratory-research',
            'language': 'language-books-learning',
            'technology': 'technology-coding-computer',
            'arts': 'art-creative-design',
            'history': 'history-ancient-books'
        };
        
        const seed = categorySeeds[courseData.category] || 'education-learning';
        courseData.thumbnail = `https://picsum.photos/seed/${seed}/1280/720`;
        
        return courseData;
    } catch (error) {
        console.error('AI Generation Error:', error);
        
        // Check if it's a quota error and fallback to simulation
        const errorMessage = error instanceof Error ? error.message : '';
        if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('rate limit')) {
            console.warn('API quota exceeded, falling back to simulation mode');
            return simulateAIGeneration(prompt);
        }
        
        throw new Error(error instanceof Error ? error.message : 'Failed to generate course. Please try again or check your API key.');
    }
};
