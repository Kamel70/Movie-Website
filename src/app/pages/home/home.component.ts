import { Component } from '@angular/core';
import { SegmentControlComponent } from '../../components/segment-control/segment-control.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-home',
  imports: [SegmentControlComponent, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
