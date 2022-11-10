export interface IToDo {
  id: number;
  name: string;
  completed: boolean;
}

export type ResponseData = {
  next: string;
  total: number;
  data: IToDo[];
};
