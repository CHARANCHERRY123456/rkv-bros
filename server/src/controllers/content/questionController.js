import Question from '../../models/content/Question.js';

// Create new question with admin's answer
export const createQuestion = async (req, res) => {
  try {
    const { text, options, adminAnswer } = req.body;
    
    const question = new Question({
      text,
      options: options.map(opt => ({ text: opt })),
      adminAnswer
    });

    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all questions with answer stats
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    
    // Add answer statistics to each question
    const questionsWithStats = await Promise.all(
      questions.map(async (question) => {
        const stats = await calculateAnswerStats(question._id);
        return {
          ...question.toObject(),
          stats
        };
      })
    );
    
    res.json(questionsWithStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Helper function to calculate answer statistics
const calculateAnswerStats = async (questionId) => {
  // In a real app, you would query user answers here
  // For this simplified version, we'll return mock data
  return {
    totalAnswers: 0,
    options: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
    }
  };
};