import {Pipe, PipeTransform} from '@angular/core';
import {Todo} from './todo';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], search: string = ''): Todo[] {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter(todo => {
      return todo.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

}
