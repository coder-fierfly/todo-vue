import { ref, onMounted, computed } from 'vue';
import { useTodoStore } from './store/todoStore';

export function useTodoLogic() {
    const todoStore = useTodoStore();
    const newTodoText = ref('');
    const editingTodo = ref(null as any);
    const editingText = ref('');

    const addTodo = () => {
        if (newTodoText.value.trim()) {
            todoStore.addTodo(newTodoText.value);
            newTodoText.value = '';
        }
    };

    const confirmRemoveTask = (todo: Todo) => {
        if (editingTodo.value && editingTodo.value.id === todo.id) {
            return;
        }
        console.log("Removing task with ID:", todo.id);
        todoStore.removeTodo(todo.id);
    };

    const updateTask = (id: number, newText: string) => {
        todoStore.editTodo(id, newText);
    };


    const toggleCompletion = (id: number) => {
        todoStore.toggleTodoCompletion(id);
    };

    const startEditing = (todo: any) => {
        editingTodo.value = todo;
        editingText.value = todo.text;
    };

    const saveEdit = () => {
        if (editingTodo.value) {
            todoStore.editTodo(editingTodo.value.id, editingText.value);
            editingTodo.value = null;
            editingText.value = '';
        }
    };

    onMounted(() => {
        todoStore.loadFromLocalStorage();
    });

    const activeTodos = computed(() => todoStore.activeTodos);
    const completedTodos = computed(() => todoStore.completedTodos);

    return {
        newTodoText,
        addTodo,
        confirmRemoveTask,
        updateTask,
        toggleCompletion,
        startEditing,
        saveEdit,
        editingTodo,
        editingText,
        activeTodos,
        completedTodos,
    };
}
