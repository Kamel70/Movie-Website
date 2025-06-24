import { Component, Input } from '@angular/core';
import { IMovie } from '../../interfaces/movie';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent, NgxPaginationModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  itemsPerPage: number = 20;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 500;
  @Input() movies: IMovie[] = [];
  @Input() loading: boolean = false;
  @Input() onPageChange!: (page: number) => void;
}
