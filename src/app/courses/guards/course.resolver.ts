import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params && route.params['id']) {
      return this.coursesService.getCourseById(route.params['id']);
    }

    return of({ _id: '', name: '', category: '' });
  }
}
