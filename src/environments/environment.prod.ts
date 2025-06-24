export const environment = {
  production: true,
  apiKey: (window as any).env.API_KEY, // For development only
  tmdbBaseUrl: 'https://api.themoviedb.org/3/',
};
