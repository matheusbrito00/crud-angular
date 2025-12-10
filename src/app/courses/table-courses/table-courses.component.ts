import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

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

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
