export type ProjectId = string;

export interface Project {
    id: string;
    name: string;
    description: string;
    location: string;
    imageUrl: string;  
    impact: string;
    supply: number;
  }
  