<template>
  <div class="todos-m">
    <div class="circle-div">
      <!-- @click="deleteTodo(todo.key)" -->
      <button
      :key="todo.key" @click="deleteTodo(todo.key)"
        class="circle-button"
        :style="customBackground"
      ></button>
      <!-- @click="addBg = !addBg" -->

    </div>
    <div class="todos-title">
      <p>{{ todo.todo }}</p>
      <small>{{ todo.day }}</small>
    </div>
    <div class="whos">
      <small>{{ todo.whos }}</small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addBg: false,
    };
  },
  props: ["todo"],
  computed: {
    customBackground() {
      if (this.addBg) {
        return {
          backgroundColor: "red !important",
        };
      }
    },
  },
  methods: {
    deleteTodo(key) {
      this.addBg = !this.addBg
      if (this.addBg) {
        this.$emit("postKey", { key: key});
      } else {
        this.$emit("postKey", { key: null});
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.todos-m {
  display: flex;
  width: 100%;
  border: 1px solid #dfdfdf;
  padding: 14px 7px;
  margin-bottom: 20px;
  border-radius: 6px;
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

.whos small {
  text-transform: capitalize;
  padding: 5px 15px;
  border-radius: 5px;
  background-color: #f0f2f6;
  color: #1c1d20;
  overflow: hidden;
  font-weight: bold;
}

.all-todos {
  max-height: 400px;
  overflow-y: auto;
}

.completed-main {
  max-height: 144px;
  overflow-y: auto;
}

small {
  user-select: none;
}
</style>