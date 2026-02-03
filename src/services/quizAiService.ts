interface QuizGenerationResult {
    title: string;
    course: string;
    duration: number;
    passingScore: number;
    questions: Array<{
        id: number;
        question: string;
        options: string[];
        correctAnswer: number;
        points: number;
    }>;
}

// Fallback simulation for quiz generation
const simulateQuizGeneration = (prompt: string): QuizGenerationResult => {
    console.log('Using fallback simulation mode for quiz');
    
    // Extract topic from prompt
    const words = prompt.split(' ').slice(0, 5).join(' ');
    const title = words.length > 50 ? words.substring(0, 47) + '...' : words;
    
    // Detect course type
    let course = 'webdev';
    if (prompt.toLowerCase().includes('calculus') || prompt.toLowerCase().includes('math')) course = 'calculus';
    else if (prompt.toLowerCase().includes('biology') || prompt.toLowerCase().includes('science')) course = 'biology';
    
    // Generate 5 questions
    const questions = [
        {
            id: 1,
            question: `What is the main concept in ${prompt}?`,
            options: [
                'Fundamental principles and theories',
                'Advanced applications only',
                'Historical context',
                'None of the above'
            ],
            correctAnswer: 0,
            points: 10
        },
        {
            id: 2,
            question: `Which of the following is most important when studying ${prompt}?`,
            options: [
                'Understanding core concepts',
                'Memorizing formulas',
                'Practical application',
                'All of the above'
            ],
            correctAnswer: 3,
            points: 10
        },
        {
            id: 3,
            question: `How would you apply knowledge from ${prompt}?`,
            options: [
                'Through hands-on practice',
                'By reading textbooks',
                'Through discussion',
                'By watching videos'
            ],
            correctAnswer: 0,
            points: 10
        },
        {
            id: 4,
            question: `What is a key challenge in learning ${prompt}?`,
            options: [
                'Complex terminology',
                'Abstract concepts',
                'Practical application',
                'Time management'
            ],
            correctAnswer: 1,
            points: 10
        },
        {
            id: 5,
            question: `Which skill is most developed through ${prompt}?`,
            options: [
                'Critical thinking',
                'Memory retention',
                'Speed reading',
                'Note-taking'
            ],
            correctAnswer: 0,
            points: 10
        }
    ];
    
    return {
        title: `${title} Quiz`,
        course,
        duration: 45,
        passingScore: 70,
        questions
    };
};

export const generateQuizWithAI = async (prompt: string): Promise<QuizGenerationResult> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
        console.warn('No API key found, using fallback simulation');
        return simulateQuizGeneration(prompt);
    }

    console.log('Using OpenAI GPT API for quiz generation');

    const systemPrompt = `You are an expert quiz creator. Based on the user's topic, generate a comprehensive quiz.

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just pure JSON):
{
    "title": "Quiz title (max 60 characters)",
    "course": "one of: calculus, biology, webdev",
    "duration": 45,
    "passingScore": 70,
    "questions": [
        {
            "id": 1,
            "question": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0,
            "points": 10
        }
    ]
}

Generate 5 questions. Each question should have 4 options. correctAnswer is the index (0-3) of the correct option.`;

    try {
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
                        content: `User's quiz topic: ${prompt}`
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
        
        const quizData = JSON.parse(text);
        
        // Validate the response structure
        if (!quizData.title || !quizData.course || !Array.isArray(quizData.questions)) {
            throw new Error('Invalid response structure from AI');
        }
        
        return quizData;
    } catch (error) {
        console.error('AI Generation Error:', error);
        
        // Check if it's a quota error and fallback to simulation
        const errorMessage = error instanceof Error ? error.message : '';
        if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('rate limit')) {
            console.warn('API quota exceeded, falling back to simulation mode');
            return simulateQuizGeneration(prompt);
        }
        
        throw new Error(error instanceof Error ? error.message : 'Failed to generate quiz. Please try again or check your API key.');
    }
};
