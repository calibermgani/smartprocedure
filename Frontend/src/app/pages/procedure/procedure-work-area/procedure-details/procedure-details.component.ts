import { HttpBackend, HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';

interface MainTab {
  "tabs": string,
  "id": number,
  "template":string
  "content":string,
  "removable":boolean,
  "disabled":boolean,
  "subtabs": string,
}

interface SubTab {
  "id": number,
  "subtabs": string
}


@Component({
  selector: 'app-procedure-details',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.scss']
})
export class ProcedureDetailsComponent implements OnInit {

  @Input() StageValue: any;
  mainTabsValue: any = [];
  subTabs: any[] = [];
  header_viewOnlymode: any[] = [];
  isFirstOpen: boolean = false;
  value?: string;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<MainTab>('assets/json/main-tabs.json').subscribe((res: any) => {
      this.mainTabsValue = res;
      console.log("res", res);

      for(let i=0;i<res.length;i++)
      {
        if (res[i].subtabs) {
          this.subTabs.push(res[i].subtabs);
        }
      }
      console.log(this.subTabs);
    });

    this.http.get('assets/json/viewOnlyMode.json').subscribe((res: any) => {
      this.header_viewOnlymode = res;
    })
  }

  CloseViewOnlyMode() {
    document.body.classList.toggle('selva');
  }
  open() {
    window.alert('Hi You have opened the testing modal')
  }
}
