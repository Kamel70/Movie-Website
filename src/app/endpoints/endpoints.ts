export class EndPoints {
  static MOVIES: string = 'discover/movie';
  static MOVIES_ID = (movieID: string) => `movie/${movieID}`;
  static TV_SHOWS: string = 'discover/tv';
  static TV_SHOWS_ID = (tvID: string) => `tv/${tvID}`;
  static POPULAR_MOVIES: string = 'movie/popular';
  static POPULAR_TV_SHOWS: string = 'tv/popular';
}
