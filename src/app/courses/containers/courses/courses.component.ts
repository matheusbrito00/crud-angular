import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { TableCoursesComponent } from '../../components/table-courses/table-courses.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

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
  courses$: Observable<Course[]> | null = null;
  readonly dialog = inject(MatDialog);

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  onError(errorMsg: string) {
    this.dialog.open(ModalComponent, {
      data: {
        title: 'Erro',
        content: errorMsg,
      },
    });
  }

  refresh() {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar a lista de cursos.');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  openDeleteDialog(course: Course) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Atenção',
        content:
          'Tem certeza que deseja deletar o curso "' +
          course.name +
          '"? Essa ação é irreversível.',
        action: 'Deletar',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.onDelete(course);
      }
    });
  }

  onDelete(course: Course) {
    this.coursesService.delete(course._id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso deletado com sucesso!', 'X', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      () => {
        this.onError('Erro ao tentar remover curso.');
      }
    );
  }
}
