import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  repos = [];
  hosts = [];
  newRepo = new Repo("", "", 1);

  constructor(private http: Http) {
    http.get("http://localhost:3001/v1/user/1/repos")
      .map(res => res.json())
      .subscribe(repos => {
        for (let repo of repos) {
          http.get("http://localhost:3001/v1/repo/" + repo.id + "/tags")
            .map(res => res.json())
            .subscribe(tags => repo.tags = tags)
        }
        this.repos = repos;
      });
    http.get("http://localhost:3001/v1/hosts")
      .map(res => res.json())
      .subscribe(hosts => this.hosts = hosts)
  }

  submitRepo() {
    this.http.post("http://localhost:3001/v1/user/1/repos", this.newRepo)
      .map(res => res.json())
      .subscribe(repo => this.repos.push(repo));
  }
}

export class Repo {

  constructor(
    public name: string,
    public owner: string,
    public host_id: number
  ) { }

}