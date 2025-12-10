import { Routes } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './courses/course-form/course-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses',
  },
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/new',
    component: CourseFormComponent,
  },
  { path: '**', redirectTo: '' },
];
