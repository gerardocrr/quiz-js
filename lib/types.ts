export interface Questions {
  id: string;
  question: string;
}

export interface Answers {
  id: string;
  answer: string;
  is_correct: string;
}

export interface Users {
  id: string;
  questions: number;
  time: number;
  image_url: string;
  name: string;
  points: number;
}
