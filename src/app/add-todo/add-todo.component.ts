import {AfterViewInit, Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators} from '@angular/forms';
import {TodoService} from '../todo.service';
import {Todos} from '../ToDos';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit, AfterViewInit {
  addForm;
  addFormControl;
  todos = null;
  todo = null;
  constructor(  private todoService: TodoService ,
                private formBuilder: FormBuilder,
                private router: Router,
                private location: Location,
                private route: ActivatedRoute
  ) {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      urgency: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.addFormControl = new FormControl('', Validators.required);
    // get the todo with the id

    // this.todo = this.todoService.getTodo(this.route.snapshot.paramMap.get('id'));
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.todoService.getTodo(this.route.snapshot.paramMap.get('id')).subscribe(value => {
        this.todo = value;
      });
    });
  }

  // add new or edit a todo
  onSubmit(todo) {
    if (todo.name === '' || todo.description === '' || todo.urgency === '') {
      return;
    }
    todo.done = false;
    if (!this.todo){
      this.todos = this.todoService.getTodos().subscribe(todos => this.todos = todos);
      todo.id = this.todos.length + 1;
      this.todoService.addTodo(todo);
    }else{
      todo.id = this.route.snapshot.paramMap.get('id');
      this.todoService.editTodo(todo);
    }
    this.router.navigate(['/']);
  }

  goBack(): void{
    this.location.back();
  }

}
