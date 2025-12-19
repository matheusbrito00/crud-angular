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
      // delay(1500),
    );
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.API}/${id}`);
  }

  save(course: Partial<Course>) {
    if (course._id) {
      return this.update(course);
    } else {
      return this.create(course);
    }
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.API}/${id}`)
      .pipe(first());
  }

  private create(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.API, course).pipe(first());
  }

  private update(course: Partial<Course>): Observable<Course> {
    return this.http
      .put<Course>(`${this.API}/${course._id}`, course)
      .pipe(first());
  }
}
