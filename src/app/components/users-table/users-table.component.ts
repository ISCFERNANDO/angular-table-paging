import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/services/users/users.service';
import { finalize } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  title: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['firstName', 'lastName', 'title', 'email'];
  totalItems!: number;
  itemsPerPage: number = 10;
  users: User[] = [];
  isLoading: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers(1);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private loadUsers(pageIndex: number): void {
    this.isLoading = true;
    this.usersService
      .loadUsers(this.itemsPerPage, pageIndex)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((resp) => {
        this.totalItems = resp.total;
        this.users = resp.data;
        this.dataSource = new MatTableDataSource<User>(this.users);
      });
  }

  pageChangeHandler(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.loadUsers(event.pageIndex);
  }
}
