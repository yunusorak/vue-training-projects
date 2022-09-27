<template>
  <div id="app" class="container">
    <h2>qrcode.vue:</h2>
    <hr />
    <br />
    <div class="row">
      <div class="col-md-12"></div>
      <div class="col-md-2 target__url__box">
        <label for="targetURL">Target URL:</label>
      </div>
      <div class="col-md-10">
        <textarea
          type="text"
          id="targetURL"
          v-model="value"
          class="form-control"
          rows="3"
        />
      </div>
      <div class="col-md-2 target__url__box mt-4">
        <label>Size:</label>
      </div>
      <div class="col-md-8 mt-4 form-range-box">
        <input
          type="range"
          min="100"
          max="800"
          step="20"
          v-model="size"
          class="form-range"
        />
      </div>
      <div class="col-auto mt-4">
        <span>{{ size }}</span>
      </div>
      <div class="col-md-2 target__url__box mt-4">
        <label for="margin" class="text-muted">Margin:</label>
      </div>
      <div class="col-md-8 mt-4 form-range-box">
        <input
          type="range"
          id="margin"
          v-model="margin"
          min="0"
          max="10"
          disabled
          step="1"
          class="form-range"
        />
      </div>
      <div class="col-auto mt-4 text-muted"><span>0</span></div>

      <div class="col-md-2 target__url__box mt-4">
        <label for="level">Level:</label>
      </div>

      <div class="col-md-10 mt-4">
        <div class="form-group">
          <select class="form-control" v-model="level" id="level">
            <option>L</option>
            <option>M</option>
            <option>H</option>
            <option>Q</option>
          </select>
        </div>
      </div>

      <div class="col-md-2 target__url__box mt-3">
        <label for="renderAs">renderAs:</label>
      </div>

      <div class="col-md-10 mt-3">
        <div class="form-group">
          <select class="form-control" v-model="renderAs" id="renderAs">
            <option selected>svg</option>
            <option>canvas</option>
          </select>
        </div>
      </div>

      <div class="col-md-2 target__url__box mt-3">
        <label>Background:</label>
      </div>

      <div class="col-md-10 mt-3 background-box">
        <input type="color" v-model="qrBg" />
      </div>

      <div class="col-md-2 target__url__box mt-3">
        <label>Foreground:</label>
      </div>

      <div class="col-md-10 mt-3 background-box">
        <input type="color" v-model="qrForeBg" />
      </div>

      <div class="col-md-2 target__url__box mt-3">
        <label>QR_CODE:</label>
      </div>

      <div class="col-md-10 mt-3 background-box">
        <qrcode-vue
          :value="value"
          :margin="margin"
          :size="size"
          :level="level"
          :renderAs="renderAs"
          :background="qrBg"
          :foreground="qrForeBg"
        ></qrcode-vue>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Qrcodevue from "@wishknish/qrcode.vue";
export default {
  name: "App",
  components: {
    qrcodeVue: Qrcodevue,
  },
  data() {
    return {
      value: "https://example.com",
      size: 100,
      margin: 0,
      level: "H",
      renderAs: "canvas",
      qrBg: "#ffffff",
      qrForeBg: "#000000",
    };
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.target__url__box {
  display: flex;
  justify-content: left;
  align-items: center;
}
@media screen and (min-width: 1200px) {
  #app {
    width: 40% !important;
  }
}

.form-range {
  width: 100%;
  height: 1.5rem;
  padding: 0;
  background-color: transparent;
}

.form-range-box {
  display: flex;
  justify-content: left;
}

.form-range-box span {
  padding-left: 10px;
}

.background-box {
  display: flex;
  justify-content: left;
}
</style>
