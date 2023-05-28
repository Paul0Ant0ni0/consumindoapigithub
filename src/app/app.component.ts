import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubApiService } from './services/github-api.service';
import { Githubuser } from './interfaces/githubuser';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //Criando um grupo e validando os campos
  public formGroup: FormGroup = this.fb.group({
    username: ['', Validators.required],
  });

  // Usuário inicialmente nulo, irá armazemar os dados do usuário da api
  public user!: Githubuser;
  public listUsers: Githubuser[] = []; // lista de usuário vazia

  constructor(
    private fb: FormBuilder,
    private githubService: GithubApiService, // Service responsável por fazer requisição a api do github
    private dialog: MatDialog // Injetando o componente de modal na parte lógica da aplicação
  ) { }

  //Ao inicilizar a tela é executado esse método
  ngOnInit(): void {
    this.getListUsers(); // Executando o método de listar os usuários
    
  }


  //Método de recuperar o usuário e efetuando a requisião http
  public getUser(): void {
    const username = this.formGroup.get('username')?.value // recuperando o nome de usuário que foi digitado no input html


    if (username != undefined) {
      this.githubService.getUserService(username).subscribe(user => { // Recuperando o usuário que retorna da api
        this.user = user; // Atribuindo o usuário
        this.listUsers?.push(this.user); // adicionado o usuário na lista
        this.saveListUsers(this.listUsers); // Salvando a lista atualizada
      })
      
    }

  }

  //Método para armazenar a lista de usuários no localStorage
  public saveListUsers(listUsers: Githubuser[]): void {
    //Adicionado uma lista no localStorage
    //JON.stringify() -> converte um tipo (Objeto, Array, number e etx...) para string
    localStorage.setItem("listUsers", JSON.stringify(listUsers));
  }


  //Método para pegar a lista de usuários do localStorage
  public getListUsers(): void {
    //Validando se possui uma lista/item no localStorage
    if (localStorage.length > 0) {

      //Armazenando na variavel e convertendo o tipo 
      // JSON.parse() -> converte para string
      // as string -> converte para string, eveitando um valor nulo
      const listUsers: any = JSON.parse(localStorage.getItem("listUsers") as string);
      // Convertando de string para Githubuser[]
      const conversao: Githubuser[] = listUsers as Githubuser[];
      // Pegando do array e jogano no outro
      this.listUsers = [...conversao];
    }
    //console.log(this.listUsers);
  }

  //Método para deletar o usuário da lista
  public deletUser(user: Githubuser): void {
    //Recuperando e armazenando a posição do usuário da lista
    const indexItem: number = this.listUsers.indexOf(user);
    //Removendo o usuário da lista
    this.listUsers.splice(indexItem, 1);
    //Atualizando a lista
    this.saveListUsers(this.listUsers);
  }

  public getDetails(user: Githubuser): void{
    this.dialog.open(DetailsComponent, {
      width: "650px",
      data: user
    })
  }

}
