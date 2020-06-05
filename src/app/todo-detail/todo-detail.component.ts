import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  @Input() todo;
  @Output() toggleDone = new EventEmitter();
  @Output() deleteTodo = new EventEmitter();
  constructor( private route: ActivatedRoute,
               private router: Router,) { }

  ngOnInit(): void {
  }
  done(id){
    this.toggleDone.emit(id);
  }
  delete(id){
    this.deleteTodo.emit(id);
  }
  editTodo(id){
    this.router.navigate(['/editTodo', { id }]);
  }
}
