import { Component } from '@angular/core';
import { SegmentControlComponent } from '../../components/segment-control/segment-control.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-movies',
  imports: [SegmentControlComponent, MovieListComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {}
