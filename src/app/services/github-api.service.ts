import { Injectable } from '@angular/core';
import { Githubuser } from '../interfaces/githubuser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';


@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private readonly baseURL: string = 'https://api.github.com/users/' // readonly -> somente leitura (Link da api que irá fazer a requisição)

  constructor(
    private http: HttpClient, // Objeto responsanvel por fazer as requisição HTTP no Angular -- Injeção de dependecia
    private snackbar: NotificationService
  ) { }

  //Método que recebe um usuário do do github e retorna os dados desse usuário
  public getUserService(username: string):Observable<Githubuser> {
    //Executando o método get, passando o link da api e o usuário,
    //informando o tipo de dados que será retornado desse usuário (Githubuser)
    return this.http.get<Githubuser>(`${this.baseURL}${username}`).pipe(
      //Método/função de tratamento de erro
      catchError((error: HttpErrorResponse) => {
        if(error.status == 404){
          this.snackbar.openSnackBar("Erro ao buscar o usuário!!!");
        }

        console.error(error); //Imprimindo o erro no console
        return EMPTY; //Observable vazio
      })
    );
    
  }
}
