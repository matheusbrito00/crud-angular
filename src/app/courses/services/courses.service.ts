import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, take, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/api/courses';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API).pipe(
      first(),
      delay(1500),
      tap((courses) => console.log(courses))
    );
  }

  save(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.API, course).pipe(first());
  }
}
