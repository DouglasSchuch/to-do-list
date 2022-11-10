import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { List } from 'src/app/models/List';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { GeneralService } from 'src/app/services/general.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lists: List[] = [];
  selectedList: List | undefined = undefined;
  addList: boolean = false;
  formAdd: FormGroup | null = null;
  formEdit: FormGroup | null = null;

  constructor(
    private routeService: RouteService
    , private general: GeneralService
    , public fb: FormBuilder
    , private cdRef: ChangeDetectorRef
    , private app: AppComponent
  ) { }

  ngOnInit(): void {
    this.initialLoad();
  }

  initialLoad() {
    this.lists = this.general.user?.lists || [];
  }

  clickList(list: List) {
    this.addList = false;
    this.selectedList = list;
  }

  onLogout() {
    this.general.user = null;
    this.general.removeCookie('TOKEN');
  }

  onAddList() {
    this.addList = true;
    this.formAdd = this.fb.group({ name: ['']});
  }

  onRemoveList() {
    if (this.selectedList?.id) {
      this.routeService.removeList(this.selectedList.id).subscribe(() => {
        this.reloadBoard();
      });
    }
  }

  onCreateList() {
    const name = this.formAdd?.get('name')?.value;
    const user = this.general.getUser();
    if (name && user) {
      const list = new List(name, user);
      this.routeService.createList(list).subscribe(() => {
        this.reloadBoard();
      });
    }
  }

  onCreateTask() {
    this.formEdit = this.fb.group({ description: ['']});
  }

  onSaveTask() {
    const description = this.formEdit?.get('description')?.value;
    const user = this.general.getUser();
    if (description && user) {
      const list = new List(this.selectedList?.name || '', user, this.selectedList?.id)
      this.routeService.createTask(new Task(description, list)).subscribe(() => {
        this.reloadBoard(true);
      })
    }
  }

  onRemoveTask(id: number | null) {
    if (id) {
      this.routeService.removeTask(id).subscribe(() => {
        this.reloadBoard(true);
      });
    }
  }

  reloadBoard(isSelected: boolean = false) {
    this.routeService.getUserBoard().subscribe((user: User | null) => {
      this.general.user = user;
      this.initialLoad();
      if (isSelected) {
        const listSel: List | undefined = this.general.user?.lists.find((l: List) => l.id === this.selectedList?.id);
        this.selectedList = listSel;
      } else {
        this.selectedList = undefined;
      }
      this.addList = false;
      this.formEdit = null;
      this.cdRef.detectChanges();
    });
  }
}