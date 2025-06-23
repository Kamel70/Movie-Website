import { Component } from '@angular/core';
import { TvShowListComponent } from '../../components/tv-show-list/tv-show-list.component';

@Component({
  selector: 'app-tv-shows',
  imports: [TvShowListComponent],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css',
})
export class TvShowsComponent {}
