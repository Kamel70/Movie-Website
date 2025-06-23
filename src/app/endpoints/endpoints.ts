export class EndPoints {
  static MOVIES: string = 'discover/movie';
  static MOVIES_ID = (movieID: string) => `movie/${movieID}`;
  static TV_SHOWS: string = 'discover/tv';
  static TV_SHOWS_ID = (tvID: string) => `tv/${tvID}`;
  static POPULAR_MOVIES: string = 'movie/popular';
  static POPULAR_TV_SHOWS: string = 'tv/popular';
  static UP_COMING_MOVIES: string = 'movie/upcoming';
  static TOP_Rated_MOVIES: string = 'movie/top_rated';
  static TOP_Rated_TV_SHOWS: string = 'tv/top_rated';
}
