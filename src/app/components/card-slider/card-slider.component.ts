import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import AOS from 'aos';

register();

interface Movie {
  id: number;
  title: string;
  poster: string;
  rating: number;
  year: number;
  genre: string;
}
@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './card-slider.component.html',
  styleUrl: './card-slider.component.css',
})
export class CardSliderComponent implements OnInit {
  popularMovies: Movie[] = [
    {
      id: 1,
      title: 'The Dark Knight',
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      rating: 9.0,
      year: 2008,
      genre: 'Action, Crime, Drama',
    },
    {
      id: 2,
      title: 'Inception',
      poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      rating: 8.8,
      year: 2010,
      genre: 'Action, Sci-Fi, Thriller',
    },
    {
      id: 3,
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      rating: 8.6,
      year: 2014,
      genre: 'Adventure, Drama, Sci-Fi',
    },
    {
      id: 4,
      title: 'The Matrix',
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      rating: 8.7,
      year: 1999,
      genre: 'Action, Sci-Fi',
    },
    {
      id: 5,
      title: 'Pulp Fiction',
      poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      rating: 8.9,
      year: 1994,
      genre: 'Crime, Drama',
    },
  ];

  trendingMovies: Movie[] = [
    {
      id: 6,
      title: 'Avengers: Endgame',
      poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
      rating: 8.4,
      year: 2019,
      genre: 'Action, Adventure, Drama',
    },
    {
      id: 7,
      title: 'Spider-Man: No Way Home',
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      rating: 8.2,
      year: 2021,
      genre: 'Action, Adventure, Fantasy',
    },
    {
      id: 8,
      title: 'Dune',
      poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
      rating: 8.0,
      year: 2021,
      genre: 'Adventure, Drama, Sci-Fi',
    },
    {
      id: 9,
      title: 'Top Gun: Maverick',
      poster: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
      rating: 8.3,
      year: 2022,
      genre: 'Action, Drama',
    },
  ];

  newReleases: Movie[] = [
    {
      id: 10,
      title: 'Avatar: The Way of Water',
      poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      rating: 7.8,
      year: 2022,
      genre: 'Action, Adventure, Fantasy',
    },
    {
      id: 11,
      title: 'Black Panther: Wakanda Forever',
      poster: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
      rating: 7.5,
      year: 2022,
      genre: 'Action, Adventure, Drama',
    },
    {
      id: 12,
      title: 'The Batman',
      poster: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
      rating: 7.9,
      year: 2022,
      genre: 'Action, Crime, Drama',
    },
    {
      id: 13,
      title: 'Doctor Strange 2',
      poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
      rating: 7.2,
      year: 2022,
      genre: 'Action, Adventure, Fantasy',
    },
  ];

  breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  };

  constructor() {}

  ngOnInit() {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }

  goToMovie(movieId: number) {
    console.log(movieId);
  }
}
