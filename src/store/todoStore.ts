import { defineStore } from 'pinia';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [] as Todo[],
    }),
    actions: {
        addTodo(text: string) {
            const newTodo: Todo = {
                id: Date.now(),
                text,
                completed: false,
            };
            this.todos.push(newTodo);
            this.saveToLocalStorage();
        },
        removeTodo(id: number) {
            console.log("removeTodo in store, ID:", id);
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();
        },
        toggleTodoCompletion(id: number) {
            const todo = this.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                this.saveToLocalStorage();
            }
        },
        editTodo(id: number, newText: string) {
            const todo = this.todos.find((todo) => todo.id === id);
            if (todo) {
                todo.text = newText;
                this.saveToLocalStorage();
            }
        },
        loadFromLocalStorage() {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                this.todos = JSON.parse(savedTodos);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
    },
    getters: {
        activeTodos: (state) => state.todos.filter(todo => !todo.completed),
        completedTodos: (state) => state.todos.filter(todo => todo.completed),
    },
});
