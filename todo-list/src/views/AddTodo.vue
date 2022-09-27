<template>
  <div class="todos">
    <div class="loading" v-if="showLoading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="mainDiv">
      <div class="header-todo">
        <h3 class="todo-title">AddTodo</h3>
      </div>
      <div class="alert alert-danger p-4" v-if="errorHand" role="alert">
        Pls do not leave blank!
      </div>
      <br />
      <div class="form-group">
        <label for="todo" class="labelPos" v-if="invisible.todo">Todo</label>
        <input
          type="text"
          class="form-control"
          required
          v-model.trim="todo"
          id="todo"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="date" class="labelPos" v-if="invisible.day">Day</label>
        <input
          type="text"
          class="form-control"
          required
          v-model.trim="day"
          id="date"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="whos" class="labelPos" v-if="invisible.whos">Whos</label>
        <input
          type="text"
          class="form-control"
          required
          v-model.trim="whos"
          id="whos"
        />
      </div>
      <br />
      <hr />
      <br />

      <button class="create-button" @click="addTodo">Create!</button>
    </div>
  </div>
</template>
  
  <script>
import { router } from "@/router/Index";
export default {
  data() {
    return {
      invisible: { todo: true, day: true, whos: true },
      todo: "",
      day: "",
      whos: "",
      errorHand: false,
      showLoading: false,
    };
  },
  watch: {
    todo(value) {
      if (value.length >= 1) {
        this.invisible.todo = false;
      }
    },
    day(value) {
      if (value.length >= 1) {
        this.invisible.day = false;
      }
    },
    whos(value) {
      if (value.length >= 1) {
        this.invisible.whos = false;
      }
    },
  },
  methods: {
    addTodo() {
      if (this.todo.length > 0 && this.day.length > 0 && this.whos.length > 0) {
        this.showLoading = true;
        this.$store.dispatch("addTodo", {
          todo: this.todo,
          day: this.day,
          whos: this.whos,
        });
        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        this.errorHand = true;
        setTimeout(() => {
          this.errorHand = false;
        }, 1500);
      }
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import url("../../loading.css");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
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

.form-control {
  padding-left: 10px;
}

.form-group {
  position: relative;
}

.labelPos {
  position: absolute;
  top: 8px;
  left: 11px;
  color: grey;
}
</style>
  
  