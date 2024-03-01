import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoBody: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getMyTodos().subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (!this.newTodoBody.trim()) {
      return;
    }

    const todo = {
      body: this.newTodoBody,
      is_completed: false,
    };

    this.todoService.createTodo(todo).subscribe((newTodo) => {
      this.todos.push(newTodo);
      this.newTodoBody = '';
    });
  }
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((updatedTodo) => {
      const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => (this.todos = this.todos.filter((todo) => todo.id !== id)),
      error: (err) => console.error(err),
    });
  }
}
