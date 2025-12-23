import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  readonly value = signal('');

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { _id, name, category } = this.route.snapshot.data['course'];

    this.form = this.fb.group({
      _id: [_id],
      name: [
        name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
        ],
      ],
      category: [category, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.courseService.save(this.form.value).subscribe(
        (result) => {
          this.onSuccess();
        },
        (error) => {
          this.onError();
        }
      );
    }
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Nome deve ter no mínimo ${requiredLength} caracteres`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 5;
      return `Nome deve ter no máximo ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', {
      duration: 3000,
    });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {
      duration: 3000,
    });
  }
}
