import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  template: `
  <div class="page">
    <h2>404! Page Not Found</h2>
    <p>The requested page does not exist.</p>
  </div>
`,
styles: [
  ` 
    h2{
      font-size : 5rem;
      margin : 0px;
    }
    p{
      margin : 0px;
      font-size : 1.5rem;
    }

    .page {
      color : white;
      text-align: center;
      margin-top: 10%;
    }
  `
]
})
export class PageNotFoundComponent {

}
