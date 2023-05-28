//Modelo de dados do usuário do github
export interface Githubuser {
    login: string,
    avatar_url: string,
    followers: number,
    following: number
    name: string,
    blog: string,
    location: string,
    email: string,
    bio: string,
    public_repos: string,
    html_url: string
}
