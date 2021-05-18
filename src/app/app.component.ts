import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  [x: string]: any;
  public employees: Employee[];

  ngOnInit() {
    this.getEmployees();
  }

  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }



  public onEditEmployee(editForm: NgForm): void {
    this.employeeService.updateEmployee(editForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
  const container = document.getElementById('main-container');

  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');

  if(mode === 'add') {
  button.setAttribute('data-target', '#addModal');
}
if (mode === 'edit') {
  button.setAttribute('data-target', '#editModal');
}
if (mode === 'delete') {
  button.setAttribute('data-target', '#deleteModal');
}
container.appendChild(button);
button.click();
  }
}