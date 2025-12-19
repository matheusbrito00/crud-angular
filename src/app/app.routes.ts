import { Routes } from '@angular/router';

import { CourseFormComponent } from './courses/containers/course-form/course-form.component';
import { CoursesComponent } from './courses/containers/courses/courses.component';
import { CourseResolver } from './courses/guards/course.resolver';

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
    resolve: { course: CourseResolver },
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent,
    resolve: { course: CourseResolver },
  },
  { path: '**', redirectTo: '' },
];
