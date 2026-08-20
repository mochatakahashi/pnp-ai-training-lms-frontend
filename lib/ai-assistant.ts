/**
 * AI Assistant Utility for PNP LMS
 * Provides AI-generated clues for quiz questions and personalized progress recommendations.
 */

export interface AIProgressStats {
  coursesEnrolled: number;
  completedModules: number;
  hoursSpent: number;
  certificatesEarned: number;
  recentScores: { quizTitle: string; score: number }[];
}

/**
 * Generates a dynamic AI clue for a quiz question without revealing the answer.
 */
export function generateAIClue(questionText: string, contextExplanation: string): string {
  // In production, this call integrates with PNP AI Services / LLM API endpoint.
  return `💡 AI Clue: Focus on ${contextExplanation.toLowerCase()}`;
}

/**
 * Generates personalized AI recommendations based on student progress stats.
 */
export function generateAIRecommendations(stats: AIProgressStats): string[] {
  const recommendations: string[] = [];

  if (stats.completedModules < 3) {
    recommendations.push('Complete Module 1: Fundamentals of Artificial Intelligence to build a core foundation.');
  }

  const lowScores = stats.recentScores.filter((s) => s.score < 70);
  if (lowScores.length > 0) {
    recommendations.push(`Retake ${lowScores[0].quizTitle} to improve your passing score percentage.`);
  } else {
    recommendations.push('Explore advanced Crisis Management and De-escalation training.');
  }

  recommendations.push('Review PNP Ethical Standards (R.A. 6713) to prepare for final certification.');

  return recommendations;
}
