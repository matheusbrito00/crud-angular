import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { Course } from '../../model/course';

@Component({
  selector: 'app-table-courses',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CategoryPipe,
    MatButtonModule,
  ],
  templateUrl: './table-courses.component.html',
  styleUrl: './table-courses.component.scss',
})
export class TableCoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() courses!: Course[];
  coursesDataSource!: MatTableDataSource<Course>;

  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor() {}

  ngOnInit(): void {
    this.coursesDataSource = new MatTableDataSource(this.courses);
    this.coursesDataSource.paginator = this.paginator;
    this.coursesDataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.coursesDataSource.filter = filterValue.trim().toLowerCase();
    if (this.coursesDataSource.paginator) {
      this.coursesDataSource.paginator.firstPage();
    }
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(course: Course) {
    this.edit.emit(course);
  }

  onDelete(course: Course) {
    this.delete.emit(course);
  }
}
