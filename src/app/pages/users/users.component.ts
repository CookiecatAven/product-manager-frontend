import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatCard, MatCardContent } from '@angular/material/card';
import { UserControllerService, UserShowDto } from '../../openapi-client';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'pm-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTable,
    MatCardContent,
    MatCard,
    MatHeaderRow,
    MatRow, MatCell,
    MatHeaderCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef, MatButton],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: UserShowDto[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'isAdmin'];

  constructor(private userController: UserControllerService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userController.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error: Error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  promoteUserToAdmin(userId: number) {
    this.userController.promoteUser(userId).subscribe({
      next: () => {
        this.loadUsers(); // Neu laden nach Änderung
      },
      error: (error: Error) => {
        console.error('Error promoting user:', error);
      }
    });
  }
}
