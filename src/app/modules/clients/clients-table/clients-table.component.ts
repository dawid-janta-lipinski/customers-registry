import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Client } from 'app/modules/core/models/client.model';
import { ClientsService } from 'app/modules/core/services/clients.service';
import { merge, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
})
export class ClientsTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'nr',
    'firstname',
    'surname',
    'email',
    'phone',
    'address',
    'postcode',
    'buttons',
  ];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalCount = 0;

  constructor(private clientsService: ClientsService) {}
  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          const pageIndex = this.paginator.pageIndex + 1;
          const itemsPerPage = this.paginator.pageSize;
          const sortDirection = this.sort.direction;
          const sortColumnName = this.sort.active;
          return this.clientsService.getClients(
            pageIndex,
            itemsPerPage,
            sortDirection,
            sortColumnName,
          );
        }),
        map((data) => {
          this.totalCount = data.totalCount;
          return data.clients;
        }),
      )
      .subscribe((clients) => {
        this.dataSource = new MatTableDataSource<Client>(clients);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
