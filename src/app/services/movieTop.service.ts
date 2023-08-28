import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MovieTop {
    constructor(
        public _http: HttpClient
    ){
    }

    movieTop():Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('X-RapidAPI-Key', '02e2c7be6cmsh1a8ef466d363fe4p1cfa9ajsn7bb9490e5bf0')
            .set('X-RapidAPI-Host', 'imdb-top-100-movies.p.rapidapi.com');
            return this._http.get('https://imdb-top-100-movies.p.rapidapi.com/', { headers: headers });    
    }

    movieId(idMovie: string):Observable<any>{
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('X-RapidAPI-Key', '02e2c7be6cmsh1a8ef466d363fe4p1cfa9ajsn7bb9490e5bf0')
            .set('X-RapidAPI-Host', 'imdb-top-100-movies.p.rapidapi.com');
            return this._http.get('https://imdb-top-100-movies.p.rapidapi.com/'+idMovie, { headers: headers });    
    }
}
