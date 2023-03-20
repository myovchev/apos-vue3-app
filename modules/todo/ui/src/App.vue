<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { TodoStatusBar, TodoActionBar, TodoList } from "@myovchev/todo-vue3";
import { useAPI } from "./useAPI";

type Props = {
  todo: {
    _id: string;
    todos: {
      _id: string | number;
      text: string;
      completed: boolean;
    }[];
    updatedAt: string;
  };
};

// Props
const props = defineProps<Props>();

// Reactive todo piece
const todoStore = ref<Props["todo"]>(props.todo);

// API
const { get, update } = useAPI(todoStore);

// Polling inverval
const interval = ref();
onMounted(() => {
  interval.value = setInterval(get, 10 * 1000);
});
onUnmounted(() => {
  clearInterval(interval.value);
});

// Convert and send down
const todos = computed(() => {
  return todoStore.value.todos.map((todo) => {
    return {
      id: todo._id as string,
      text: todo.text,
      completed: todo.completed,
    };
  });
});

const completed = computed(() => {
  return todos.value.filter((todo) => todo.completed).length;
});

const total = computed(() => {
  return todos.value.length;
});

// add Todo
function onAddTodo(text: string) {
  todoStore.value.todos.push({
    _id: Math.random(),
    text,
    completed: false,
  });
  update();
}

// toggle Todo
function onToggleTodo(id: string) {
  const todo = todoStore.value.todos.find((t) => t._id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  update();
}
</script>

<template>
  <h4 class="mb-4 text-center">Current page Todo List (user only)</h4>
  <TodoStatusBar :completed="completed" :total="total" />
  <TodoActionBar @create="onAddTodo" />
  <TodoList :items="todos" @toggle="onToggleTodo" />
</template>
