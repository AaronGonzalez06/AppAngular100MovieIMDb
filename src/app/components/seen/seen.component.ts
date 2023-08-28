import { Component,OnInit } from '@angular/core';
import { MovieTop } from 'src/app/services/movieTop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-seen',
  templateUrl: './seen.component.html',
  styleUrls: ['./seen.component.sass'],
  providers: [MovieTop]
})
export class SeenComponent implements OnInit {
  
  public movieTop: any[];
  public movieTopAux: any[];
  public p: number;
  public movieDato: any;
  public videoUrl:SafeResourceUrl;
  public movieSearch:string;
  public resultadosMovie: number;
  public showDiv:boolean;
  public isLinkDisabledPending:boolean;
  public isLinkDisabledSeen:boolean;

  checkboxes = [
    { label: 'Drama', checked: false },
    { label: 'Crime', checked: false },
    { label: 'Action', checked: false },
    { label: 'Biography', checked: false },
    { label: 'History', checked: false },
    { label: 'Adventure', checked: false },
    { label: 'Sci-Fi', checked: false },
    { label: 'Fantasy', checked: false },
    { label: 'Romance', checked: false },
    { label: 'Western', checked: false },
    { label: 'Comedy', checked: false },
    { label: 'War', checked: false },
    { label: 'Thriller', checked: false },
    { label: 'Mystery', checked: false },
    { label: 'Animation', checked: false },
    { label: 'Family', checked: false },
    { label: 'Music', checked: false },
    { label: 'Horror', checked: false },
  ];

  constructor(
    private _MovieTopService: MovieTop,
    private sanitizer: DomSanitizer
  ){
    this.movieTop = [];
    this.movieTopAux = [];
    this.p = 1;
    this.videoUrl = '';
    this.movieSearch = '';
    this.resultadosMovie = 100;
    this.showDiv = true;
    this.isLinkDisabledPending = false;
    this.isLinkDisabledSeen = false;
  }

  ngOnInit(): void {
      const seen: string | null = localStorage.getItem('seen');
      let arraySeen = seen !== null ? JSON.parse(seen): null;
      const movieTopData: string | null = localStorage.getItem('movieTop');
      this.movieTop = movieTopData !== null ? JSON.parse(movieTopData) : null;
      const filteredMovies = this.movieTop.filter(item => arraySeen.includes(item.id));
      this.movieTop = filteredMovies;
      this.movieTopAux = filteredMovies;
      this.resultadosMovie = filteredMovies.length;
      //aside
      const movie = this.movieTop.filter(item => item.id === arraySeen[0]);
      console.log("🚀 ~ file: seen.component.ts:64 ~ SeenComponent ~ ngOnInit ~ movie:", movie)
      this.movieDato = movie;
      console.log("🚀 ~ file: seen.component.ts:65 ~ SeenComponent ~ ngOnInit ~ this.movieDato:", this.movieDato)
      //validar pending
      let arraypendingVerify: string | null = localStorage.getItem('pending');
      let pendingVerify: any[] = arraypendingVerify !== null ? JSON.parse(arraypendingVerify) : null;
      let pendingVerifyLength: number | null = pendingVerify === null ? null : pendingVerify.length;
      if(pendingVerifyLength === null  || pendingVerifyLength == 0){
        this.isLinkDisabledPending = true;
      }
      //validar seen
      let arrayseenVerify: string | null = localStorage.getItem('seen');
      let seenVerify: any[] = arrayseenVerify !== null ? JSON.parse(arrayseenVerify) : null;
      let seengVerifyLength: number | null = seenVerify === null ? null : seenVerify.length;
      if(seengVerifyLength === null  || seengVerifyLength == 0){
        this.isLinkDisabledSeen = true;
      }
    }

  movieId(id:string){
    const movie = this.movieTop.filter(item => item.id === id);
    this.movieDato = movie;

  }

  searchMovie(){
    const filterByName = (array: any[], name: string): any[] => {
      return array.filter(item => item.title.toLowerCase().includes(name.toLowerCase()));
    };
    let movieTop: any[] = this.movieTop;
    this.movieTop = this.movieTopAux;
    if(this.movieSearch.length == 0){
      this.movieTop = this.movieTopAux;
      this.resultadosMovie = this.movieTop.length;
    }else if(this.movieSearch.length > 3){
      const filteredItems = filterByName(this.movieTop, this.movieSearch);
      this.movieTop = filteredItems;
      if(this.movieTop.length === 0){
        alert("No result with");
        this.movieTop = movieTop;
        this.resultadosMovie = this.movieTop.length;
      }else{
        this.resultadosMovie = this.movieTop.length;
      }
    }
  }

  searchCategory(){
    let category:any[] = [];
    this.movieTop = this.movieTopAux;
    let nothingCheckBox: boolean = true
    for (let checkbox of this.checkboxes) {
      if (checkbox.checked) {
        category.push(checkbox.label);
        nothingCheckBox = false;
      }
    }
    this.movieTop = this.movieTop.filter(item => category.some(desiredGenre => item.genre.includes(desiredGenre)));
    this.resultadosMovie = this.movieTop.length;
    
    if(this.movieTop.length == 0){
      this.showDiv = false;
    }else{
    this.showDiv = true;
    }

    if(nothingCheckBox){
      this.movieTop = this.movieTopAux;
      this.resultadosMovie = this.movieTop.length;
      this.showDiv = true;
    }

  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

