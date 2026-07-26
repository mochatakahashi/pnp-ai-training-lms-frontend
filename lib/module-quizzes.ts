export interface ModuleQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const MODULE_QUIZZES: Record<string, { title: string; questions: ModuleQuizQuestion[] }> = {
  mod1: {
    title: 'Introduction to Ethics Quiz',
    questions: [
      {
        id: 'mod1_q1',
        question: 'What is the main foundation of professional policing according to the PNP Code of Conduct?',
        options: [
          'Maximizing department revenue',
          'Ethical conduct and public trust',
          'Strict military rank escalation',
          'Speed of patrol operations',
        ],
        correctAnswer: 1,
        explanation: 'Ethical conduct and preserving public trust form the essential foundation of professional policing in the PNP.',
      },
      {
        id: 'mod1_q2',
        question: 'Which element defines professional ethics for PNP law enforcement officers?',
        options: [
          'Personal preferences over legal standards',
          'Standardized moral conduct guidelines specific to law enforcement',
          'Informal rules passed verbally between officers',
          'Political party affiliations',
        ],
        correctAnswer: 1,
        explanation: 'Professional ethics establish formal, standardized moral conduct guidelines tailored for law enforcement officers.',
      },
      {
        id: 'mod1_q3',
        question: 'What primary objective does adhering to the PNP Ethical Standards serve?',
        options: [
          'Ensuring personal promotion',
          'Fostering community trust, respect, and rule of law',
          'Decreasing paperwork requirements',
          'Eliminating administrative reviews',
        ],
        correctAnswer: 1,
        explanation: 'Adhering to ethical standards ensures sustained public respect, community trust, and upholding the rule of law.',
      },
    ],
  },
  mod2: {
    title: 'Decision Making & Ethical Dilemmas Quiz',
    questions: [
      {
        id: 'mod2_q1',
        question: 'What is the FIRST step in the PNP Ethical Decision-Making Framework when confronting a dilemma?',
        options: [
          'Take immediate physical action',
          'Identify the core issue and ethical conflict',
          'Consult local media sources',
          'Issue an official press release',
        ],
        correctAnswer: 1,
        explanation: 'The first step is clearly identifying the core issue and understanding what makes the situation ethically challenging.',
      },
      {
        id: 'mod2_q2',
        question: 'Before choosing a course of action during an ethical dilemma, an officer must:',
        options: [
          'Follow personal instinct without gathering facts',
          'Gather all relevant facts, context, and legal standards',
          'Wait 24 hours regardless of emergency status',
          'Delegate the decision to junior personnel',
        ],
        correctAnswer: 1,
        explanation: 'Officers must collect thorough factual information and consult applicable laws and PNP regulations before deciding.',
      },
      {
        id: 'mod2_q3',
        question: 'How should conflicting duties (e.g. loyalty to a colleague vs. reporting a violation) be evaluated?',
        options: [
          'Personal friendship always overrides official duty',
          'Official PNP Code of Conduct and legal obligation take precedence',
          'Ignore the conflict until forced to respond',
          'Flips a coin to remain neutral',
        ],
        correctAnswer: 1,
        explanation: 'Legal duty, constitutional rights, and official PNP standards always take precedence over personal loyalties.',
      },
    ],
  },
  mod3: {
    title: 'Accountability and Transparency Quiz',
    questions: [
      {
        id: 'mod3_q1',
        question: 'Which practice best demonstrates transparency in law enforcement operations?',
        options: [
          'Withholding public information during non-classified matters',
          'Clear, accurate, and truthful documentation of official incidents',
          'Altering reports to avoid public criticism',
          'Restricting internal audit access',
        ],
        correctAnswer: 1,
        explanation: 'Accurate, truthful incident recording and open official reporting build transparency in law enforcement.',
      },
      {
        id: 'mod3_q2',
        question: 'What does accountability require of every PNP officer when an error or violation occurs?',
        options: [
          'Accepting responsibility and subjecting oneself to proper review',
          'Blaming external factors or equipment failure',
          'Concealing the error from squad commanders',
          'Resigning immediately without reporting details',
        ],
        correctAnswer: 0,
        explanation: 'Accountability requires officers to take responsibility for actions and accept established administrative review.',
      },
      {
        id: 'mod3_q3',
        question: 'What is the role of Internal Affairs Service (IAS) in maintaining accountability?',
        options: [
          'Conducting independent investigations into officer misconduct',
          'Managing public relations campaigns',
          'Handling routine traffic enforcement',
          'Procuring tactical equipment',
        ],
        correctAnswer: 0,
        explanation: 'The PNP IAS is tasked with investigating administrative offenses and officer misconduct to enforce accountability.',
      },
    ],
  },
  mod4: {
    title: 'Case Studies in Police Ethics Quiz',
    questions: [
      {
        id: 'mod4_q1',
        question: 'In a scenario where an officer is offered a gift or gratuity by a local business owner, what is the correct ethical response?',
        options: [
          'Accept the gift if it is under 1,000 pesos',
          'Politely decline the gift in accordance with anti-graft policies',
          'Accept the gift and share it with squad members',
          'Demand a larger donation for the station fund',
        ],
        correctAnswer: 1,
        explanation: 'PNP personnel must refuse gratuities or bribes to prevent conflicts of interest and uphold Republic Act 6713.',
      },
      {
        id: 'mod4_q2',
        question: 'If an officer witnesses a peer using excessive force during an arrest, what is their immediate ethical duty?',
        options: [
          'Intervene to stop excessive force and report the incident',
          'Walk away to avoid involvement',
          'Assist the peer in using additional force',
          'Keep quiet to preserve unit solidarity',
        ],
        correctAnswer: 0,
        explanation: 'Officers have a mandatory duty to intervene against excessive force and report incidents to superiors.',
      },
    ],
  },
  mod5: {
    title: 'Professional Development Quiz',
    questions: [
      {
        id: 'mod5_q1',
        question: 'Why is continuous ethics and AI technology training required for modern police officers?',
        options: [
          'To satisfy basic attendance requirements',
          'To adapt to evolving societal, legal, and technological standards of justice',
          'To reduce active patrol hours',
          'Because criminal laws change daily',
        ],
        correctAnswer: 1,
        explanation: 'Ongoing training ensures officers remain competent in emerging legal, technological, and ethical challenges.',
      },
      {
        id: 'mod5_q2',
        question: 'What outcome is expected upon completing the PNP Ethics and Conduct program?',
        options: [
          'Exemption from future performance evaluations',
          'Demonstrated mastery of ethical standards and readiness for final certification',
          'Automatic promotion to next rank',
          'Transfer to administrative division',
        ],
        correctAnswer: 1,
        explanation: 'Completion demonstrates readiness for final assessment and application of high ethical standards in service.',
      },
    ],
  },
};
