import { Injectable } from '@angular/core';
import {Todos} from './ToDos';
import {Todo} from './Todo';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = Todos;
  todo: Todo;
  filteredTodo: Todo[];
  index: number;
  constructor() { }

  getTodos(): Observable<Todo[]>{
    return of(this.todos);
  }

  getTodo(id): Observable<Todo>{
    return of(this.todos[id - 1]);
  }

  addTodo(todo){
    this.todos.push(todo);
  }

  // find the todo and change the status whether done or not.
  toggleTodo(id){
    this.index = Todos.findIndex(x => x.id === id);
    this.todo = Todos.find(x => x.id === id);
    this.todo.done = !this.todo.done;
    this.todos[this.index] = this.todo;
  }

  deleteTodo(id): Observable<Todo[]>{
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todos.forEach((todo, index) => todo.id = index + 1);
    return of(this.todos);
  }

  editTodo(todo){
    this.todos[todo.id - 1] = todo;
  }

  searchTodo(name): Observable<Todo[]>{
    this.filteredTodo = this.todos.filter(todo => todo.name.toLowerCase().includes(name));
    return of(this.filteredTodo);
  }
}
