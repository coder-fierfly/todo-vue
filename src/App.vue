<template>
  <div class="todo-app">
    <h1>To-Do List</h1>
    <div class="input-group">
      <input v-model="newTodoText" maxlength="200" placeholder="Введите задачу" @keyup.enter="addTodo"/>
      <button @click="addTodo">Добавить</button>
    </div>

    <h2>Активные задачи</h2>
    <ul>
      <TodoItem
          v-for="todo in activeTodos"
          :key="todo.id"
          :todo="todo"
          :removeTask="confirmRemoveTask"
          :updateTask="updateTask"
          :toggleCompletion="toggleCompletion"
      />
    </ul>

    <h2>Завершенные задачи</h2>
    <ul>
      <TodoItem
          v-for="todo in completedTodos"
          :key="todo.id"
          :todo="todo"
          :removeTask="confirmRemoveTask"
          :updateTask="updateTask"
          :toggleCompletion="toggleCompletion"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import {useTodoLogic} from './useTodoLogic';
import TodoItem from './components/TodoItem.vue';

export default {
  components: {TodoItem},
  setup() {
    return useTodoLogic();
  },
};
</script>
