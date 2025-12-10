import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of } from 'rxjs';

import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { TableCoursesComponent } from './table-courses/table-courses.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    TableCoursesComponent,
    MatCardModule,
    MatToolbarModule,
    LoaderComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {
  courses$!: Observable<Course[]>;
  readonly dialog = inject(MatDialog);

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError((error) => {
        this.dialog.open(ModalComponent, {
          data: {
            title: 'Erro',
            content: 'Erro ao carregar a lista de cursos.',
          },
        });
        console.log(error);
        return of([]);
      })
    );
  }
}
