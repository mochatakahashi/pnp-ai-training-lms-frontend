# PNP LMS - AI Assistant Integration Guide

## Overview
This document outlines the complete architecture for integrating Artificial Intelligence (AI) into the **PNP AI Literacy Platform**. AI capabilities provide dynamic hints/clues during quizzes, personalized learning recommendations on the officer dashboard, and AI study assistance during module review.

---

## 1. AI Quiz Clue Generator

### Objective
Provide officers with educational clues when they select an incorrect answer during module quizzes—**without revealing the correct answer choice**.

### Specifications
- **Trigger**: Officer submits an incorrect answer choice.
- **Strict Rule**: Never expose `correctAnswer` or highlight the correct choice in green.
- **Output**: `💡 Clue: [Explanation hint guiding the officer to review and reason through the topic]`.
- **API Endpoint**: `POST /api/ai/quiz-clue`
- **Helper Utility**: [lib/ai-assistant.ts](file:///c:/Users/Rodmina%20Jhoy%20Ibe/Downloads/pnp-ai-training-lms-frontend/lib/ai-assistant.ts)

---

## 2. AI Personalized Progress Recommendations

### Objective
Dynamically recommend next learning steps, review topics, and exam retakes on the **Officer Dashboard** under "Recommended Next Steps" based on real-time activity and quiz scores.

### Specifications
- **Input Parameters**:
  - Enrolled modules count
  - Completed modules & quiz scores
  - Hours spent
  - Certificate status
- **Output**: Array of 3 actionable, prioritized learning recommendations.
- **API Endpoint**: `POST /api/ai/recommendations`
- **Helper Function**: `generateAIRecommendations(stats)` in [lib/ai-assistant.ts](file:///c:/Users/Rodmina%20Jhoy%20Ibe/Downloads/pnp-ai-training-lms-frontend/lib/ai-assistant.ts)

---

## 3. Strict AI Chatbot Availability Rules

### Objective
Ensure academic integrity by restricting AI Chatbot usage during quizzes and final assessments.

### Integrity Rules
1. **Module Review Mode (`activeTab === 'content'`)**:
   - **AI Chatbot Enabled**: Officers can click "Ask AI Assistant" to ask questions about reading material.
2. **Module Quiz Mode (`activeTab === 'quiz'`)**:
   - **AI Chatbot Disabled & Omitted**: The chatbot widget is automatically hidden to prevent officers from using AI to get quiz answers.
3. **Final Assessment Mode (`activeTab === 'exam'`)**:
   - **AI Chatbot Disabled & Omitted**: The chatbot widget is completely removed during the final assessment exam.

---

## 4. Environment & Security Roadmap
- **API Key Storage**: Server-side environment variables (`process.env.PNP_AI_API_KEY`).
- **Data Privacy**: No Officer Personally Identifiable Information (PII) is sent to external LLMs. Only sanitized question IDs and scores are processed.
