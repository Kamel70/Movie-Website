import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

interface Movie {
  id: number;
  title: string;
  poster: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [
    {
      id: 1,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      id: 2,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      id: 3,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    },
    {
      id: 4,
      title: 'Avengers: Endgame',
      poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    },
    {
      id: 5,
      title: 'The Matrix',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    },
    {
      id: 6,
      title: 'Pulp Fiction',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    },
  ];

  autoplayConfig = {
    delay: 3000,
    disableOnInteraction: false,
  };

  paginationConfig = {
    clickable: true,
  };

  constructor() {}

  ngOnInit() {
    // Component initialization
  }

  goToMovie(movieId: number) {
    console.log(`Navigating to movie with ID: ${movieId}`);
  }
}
