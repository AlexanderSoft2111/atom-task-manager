export interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string | Date;
}
