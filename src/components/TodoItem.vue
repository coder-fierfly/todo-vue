<template>
  <li>
    <div class="task-content">
      <input type="checkbox" :checked="todo.completed" @change="toggleCompletion(todo.id)"/>

      <template v-if="isEditing">
        <input v-model="editingText" @keyup.enter="saveEdit" @blur="saveEdit"/>
      </template>
      <template v-else>
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
      </template>
    </div>

    <div>
      <div v-if="!todo.completed">
        <button v-if="isEditing" @click="saveEdit">Сохранить</button>
        <button v-else @click="startEditing">Изменить</button>
      </div>
      <button v-if="!isEditing" class="delete" @click="confirmRemoveTask">Удалить</button>
    </div>
  </li>
</template>

<script lang="ts">
import {compile, defineComponent, ref} from 'vue';

export default defineComponent({
  methods: {compile},
  props: {
    todo: {
      type: Object,
      required: true,
    },
    removeTask: {
      type: Function,
      required: true,
    },
    updateTask: {
      type: Function,
      required: true,
    },
    toggleCompletion: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isEditing = ref(false);
    const editingText = ref(props.todo.text);

    const startEditing = () => {
      isEditing.value = true;
      editingText.value = props.todo.text;
    };

    const saveEdit = () => {
      if (editingText.value.trim()) {
        props.updateTask(props.todo.id, editingText.value);
        isEditing.value = false;
      }
    };

    const confirmRemoveTask = () => {
      props.removeTask(props.todo);
    };

    return {
      isEditing,
      editingText,
      startEditing,
      saveEdit,
      confirmRemoveTask,
    };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
