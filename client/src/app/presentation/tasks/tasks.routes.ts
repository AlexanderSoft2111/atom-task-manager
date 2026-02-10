import { Routes } from '@angular/router';
import { TaskListPage } from './pages/task-list-page/task-list-page';
export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];
