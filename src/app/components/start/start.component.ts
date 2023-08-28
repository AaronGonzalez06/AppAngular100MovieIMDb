import { Component,OnInit } from '@angular/core';
import { MovieTop } from 'src/app/services/movieTop.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass'],
  providers: [MovieTop]
})
export class StartComponent implements OnInit {
  
  public movieTop: any[];
  public movieTopAux: any[];
  public p: number;
  public movieDato: any;
  public videoUrl:SafeResourceUrl;
  public movieSearch:string;
  public resultadosMovie: number;
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
    this.isLinkDisabledPending = false;
    this.isLinkDisabledSeen = false;
  }

  ngOnInit(): void {
    if(!localStorage.getItem('movieTop')){
      this.movie();
      this.movieId("top1");
      this.isLinkDisabledPending = true;
      this.isLinkDisabledSeen = true;
    }else{
      //this.movieId("top1");
      const datos: string | null = localStorage.getItem('movieTop');
      const datosMovie: string | null = localStorage.getItem('movie');
      this.movieTop = datos !== null ? JSON.parse(datos) : null;
      this.movieTopAux = datos !== null ? JSON.parse(datos) : null;
      this.movieDato = datosMovie !== null ? JSON.parse(datosMovie) : null;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieDato.trailer);
      console.log("🚀 ~ file: start.component.ts:36 ~ StartComponent ~ ngOnInit ~ this.movieDato:", this.movieDato)
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
  }

  movie(){
    this._MovieTopService.movieTop().subscribe(
      response => {
          localStorage.setItem('movieTop',JSON.stringify(response));
          this.movieTop = response;
          this.movieTopAux = response;
      },
      error =>{
        console.log(error);
      }
    )
  }

  movieId(id:string){
    console.log(id);
    this._MovieTopService.movieId(id).subscribe(
      response => {
          localStorage.setItem('movie',JSON.stringify(response));
          this.movieDato = response;
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.movieDato.trailer);
      },
      error =>{
        console.log(error);
      }
    ) 
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
    if(nothingCheckBox){
      this.movieTop = this.movieTopAux;
      this.resultadosMovie = 100;
    }

  }

  pending(id:string){
    if(localStorage.getItem('pending')){
      const pendingMovie: string | null = localStorage.getItem('pending');
      let newPending = pendingMovie !== null ? JSON.parse(pendingMovie) : null;
      newPending.push(id);
      localStorage.setItem('pending',JSON.stringify(newPending));
    }else{
      let newItem:string[] = [];
      newItem.push(id)
      localStorage.setItem('pending',JSON.stringify(newItem));
    }
    this.isLinkDisabledPending = false;
  }

  seen(id:string){
    if(localStorage.getItem('seen')){
      const seenMovie: string | null = localStorage.getItem('seen');
      let newPending = seenMovie !== null ? JSON.parse(seenMovie) : null;
      newPending.push(id);
      localStorage.setItem('seen',JSON.stringify(newPending));
    }else{
      let newItem:string[] = [];
      newItem.push(id)
      localStorage.setItem('seen',JSON.stringify(newItem));
    }
    this.isLinkDisabledSeen = false;
    //en un caso de que este ahí
    const pendingMovie: string | null = localStorage.getItem('pending');
      let deletePending = pendingMovie !== null ? JSON.parse(pendingMovie) : null;
      let index = deletePending.indexOf(id);
      if (index !== -1) {
          deletePending.splice(index, 1);
      }
      localStorage.setItem('pending',JSON.stringify(deletePending)); 
  }
  
  ifPendding(id:string):boolean{
    if(localStorage.getItem('pending')){
      const arr: string | null = localStorage.getItem('pending');
      let pendding:any[] = arr !== null ? JSON.parse(arr) : null;
      console.log("🚀 ~ file: start.component.ts:168 ~ StartComponent ~ ifPendding ~ pendding.some(item => item.includes(id)):", pendding.some(item => item.includes(id)))
      return pendding.some(item => item.includes(id));
    }
    return false;
  }

  ifSeen(id:string):boolean{
    if(localStorage.getItem('seen')){
      const arr: string | null = localStorage.getItem('seen');
      let seen:any[] = arr !== null ? JSON.parse(arr) : null;
      return seen.some(item => item.includes(id));
    }
    return false;
    
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
