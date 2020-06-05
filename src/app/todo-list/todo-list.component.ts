import { Component, OnInit } from '@angular/core';

import {Todo} from '../Todo';
import {TodoService} from '../todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];


  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  toggleDone(id){
    this.todoService.toggleTodo(id);
  }

  onDelete(id): void{
    this.todoService.deleteTodo(id);
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  searchTodo(name){
    this.todoService.searchTodo(name).subscribe(todos => this.todos = todos);
  }
}
