<template>
  <div class="todos">
    <div class="mainDiv">
      <div class="header-todo">
        <h3 class="todo-title">Todo</h3>
        <router-link
          class="create-button"
          v-if="process"
          to="/addTodo"
          tag="button"
          >Create Reminder</router-link
        >
        <button class="delete-button" @click="deleteTodo" v-else>
          Finish!
        </button>
      </div>

      <div class="all-todos">
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          @postKey="getTodoInfoForDelete($event)"
        />
      </div>

      <h3 class="completed-title">Completed</h3>
      <br />
      <div class="completed-main">
        <div
          class="todos-m todo-comp-m"
          v-for="completedTodo in completedTodos"
          :key="completedTodo.id"
        >
          <div class="circle-div">
            <button class="completed-button"></button>
          </div>
          <div class="todos-title">
            <p class="completed-line">{{ completedTodo.todo }}</p>
            <small class="completed-line">{{ completedTodo.day }}</small>
          </div>
          <div class="whos">
            <small>{{ completedTodo.whos }}</small>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from "../components/TodoView.vue";
export default {
  data() {
    return {
      process: true,
      todos: [
        // { todo: "sadsa", day: "Today", whos: "Personal" },
      ],
      deleteTodosKey: [],
      completedTodos: [],
    };
  },
  watch: {
    deleteTodosKey(values) {
      values.length > 0 ? (this.process = false) : (this.process = true);
    },
  },
  methods: {
    getTodoInfoForDelete(todoInfo) {
      if (todoInfo.key !== null) {
        this.deleteTodosKey.push(todoInfo.key);
      } else {
        this.deleteTodosKey.splice(
          this.deleteTodosKey.indexOf(todoInfo.key),
          1
        );
      }
    },
    deleteTodo() {
      this.$store.dispatch("deleteTodo", this.deleteTodosKey);
    },
  },
  components: { Todo },
  created() {
    this.$store.dispatch("initAuth");
    this.todos = this.$store.getters.getTodos;
    this.completedTodos = this.$store.getters.getCompletedTodos;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

#todos {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.mainDiv {
  width: 550px;
  padding: 20px;
  height: 700px;
  border: 1px solid #dfdfdf;
  border-radius: 5px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  background-color: #fff;
}

.todo-title {
  font-weight: lighter;
  color: #1c1d20;
  font-size: 1.4rem;
}

.header-todo {
  display: flex;
  margin-bottom: 25px;
  justify-content: space-between;
  align-items: center;
}

.create-button {
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  color: #f8f9fc;
  cursor: pointer;
  background-color: #3a3a3c;
  border: 1px solid black;
}

.delete-button {
  padding: 10px 15px;
  border-radius: 5px;
  outline: none;
  color: #f8f9fc;
  cursor: pointer;
  background-color: #044e13;
  border: 1px solid #006e16;
}

.todos-m {
  display: flex;
  width: 100%;
  border: 1px solid #dfdfdf;
  padding: 14px 7px;
  margin-bottom: 20px;
  border-radius: 6px;
  border-left: 6px solid #008875;
}

.circle-div {
  width: 10%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
}

.todos-title {
  height: 50px;
  width: 70%;
  background-color: #fff;
  color: #1c1d20;
  padding-left: 10px;
}

.todos-title p {
  font-weight: bold;
  font-size: 1.1rem;
}

.whos {
  height: 50px;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.circle-button {
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  border: 3px solid #ff3c31;
}

.completed-button {
  width: 25px;
  height: 25px;
  border: none;
  background-color: #fff;
  background-image: url(https://cdn-icons-png.flaticon.com/512/4436/4436481.png);
  background-size: cover;
}

.todo-comp-m {
  border-left: 6px solid grey;
}

.whos small {
  text-transform: capitalize;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: #f0f2f6;
  color: #1c1d20;
  overflow: hidden;
  font-weight: bold;
}

.completed-title {
  margin-top: 10px;
  font-size: 1rem;
}

.all-todos {
  max-height: 400px;
  overflow-y: auto;
}

.completed-main {
  max-height: 144px;
  overflow-y: auto;
}

.completed-main .todos-m {
  filter: blur(0.5px);
}

.completed-line {
  text-decoration: line-through;
}

small {
  user-select: none;
}
</style>

