export const useQuizStore = () => {
  const api = useApi();
  
  // State
  const quizList = useState<any[]>('quizList', () => []);
  const currentQuiz = useState<any>('currentQuiz', () => null);
  const currentAttempt = useState<any>('currentAttempt', () => null);
  const answers = useState<Record<number, any>>('quizAnswers', () => ({}));
  const timeRemaining = useState<number>('timeRemaining', () => 0);
  const isSubmitting = useState<boolean>('isQuizSubmitting', () => false);

  // Actions
  const fetchQuizzes = async (courseId: number | string) => {
    try {
      const response: any = await api(`/courses/${courseId}/quizzes`);
      quizList.value = response;
      return response;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  };

  const fetchQuiz = async (quizId: number | string) => {
    try {
      const response: any = await api(`/quizzes/${quizId}`);
      currentQuiz.value = response;
      return response;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }
  };

  const createQuiz = async (courseId: number | string, data: any) => {
    try {
      const response: any = await api(`/instructor/courses/${courseId}/quizzes`, {
        method: 'POST',
        body: data
      });
      await fetchQuizzes(courseId);
      return response;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  };

  const updateQuiz = async (quizId: number | string, data: any) => {
    try {
      const response: any = await api(`/instructor/quizzes/${quizId}`, {
        method: 'PUT',
        body: data
      });
      return response;
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  };

  const deleteQuiz = async (quizId: number | string, courseId: number | string) => {
    try {
      await api(`/instructor/quizzes/${quizId}`, { method: 'DELETE' });
      await fetchQuizzes(courseId);
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  };

  const startQuiz = async (quizId: number | string) => {
    try {
      const response: any = await api(`/quizzes/${quizId}/attempts/start`, { method: 'POST' });
      currentAttempt.value = response.attempt;
      currentQuiz.value = response.quiz;
      
      // Initialize answers state
      answers.value = {};
      if (response.attempt.student_answers) {
        response.attempt.student_answers.forEach((sa: any) => {
          answers.value[sa.question_id] = {
            answer_id: sa.answer_id,
            answer_text: sa.answer_text
          };
        });
      }

      // Initialize timer if duration is set
      if (response.quiz.duration_minutes) {
        timeRemaining.value = response.quiz.duration_minutes * 60;
      }
      
      return response;
    } catch (error) {
      console.error('Error starting quiz:', error);
      throw error;
    }
  };

  const saveAnswer = async (attemptId: number | string, questionId: number, data: any) => {
    try {
      const response = await api(`/attempts/${attemptId}/answers`, {
        method: 'POST',
        body: {
          question_id: questionId,
          ...data
        }
      });
      answers.value[questionId] = data;
      return response;
    } catch (error) {
      console.error('Error saving answer:', error);
      throw error;
    }
  };

  const submitQuiz = async (attemptId: number | string) => {
    isSubmitting.value = true;
    try {
      const response: any = await api(`/attempts/${attemptId}/submit`, { method: 'POST' });
      isSubmitting.value = false;
      return response;
    } catch (error) {
      isSubmitting.value = false;
      console.error('Error submitting quiz:', error);
      throw error;
    }
  };

  const fetchResult = async (attemptId: number | string) => {
    try {
      const response: any = await api(`/attempts/${attemptId}/result`);
      return response;
    } catch (error) {
      console.error('Error fetching result:', error);
      throw error;
    }
  };

  const fetchHistory = async (quizId: number | string) => {
    try {
      const response: any = await api(`/quizzes/${quizId}/attempts/history`);
      return response;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  };

  const fetchAttempts = async (quizId: number | string) => {
    try {
      const response: any = await api(`/instructor/quizzes/${quizId}/attempts`);
      return response;
    } catch (error) {
      console.error('Error fetching instructor attempts:', error);
      throw error;
    }
  };

  const fetchMyQuizAttempts = async () => {
    try {
      const response: any = await api(`/my-quiz-attempts`);
      return response;
    } catch (error) {
      console.error('Error fetching my quiz attempts:', error);
      throw error;
    }
  };

  return {
    quizList,
    currentQuiz,
    currentAttempt,
    answers,
    timeRemaining,
    isSubmitting,
    fetchQuizzes,
    fetchQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    startQuiz,
    saveAnswer,
    submitQuiz,
    fetchResult,
    fetchHistory,
    fetchAttempts,
    fetchMyQuizAttempts
  };
};
