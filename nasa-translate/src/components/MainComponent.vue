<template>
  <div class="main container-fluid">
    <div class="header">
      <h4 class="nasa-api-text">
        <router-link to="/ceviri" tag="p" class="text-center text-white">
          <span>{{ getBaseStuff.date }}</span>
          <span> nasa</span>-api
        </router-link>
      </h4>

      <div class="languages-div">
        <span
          @click="changeTheLang(true)"
          class="language"
          :class="{ active: selectedLanguage == true }"
        >
          ENG
        </span>
        <span
          @click="changeTheLang(false)"
          class="language"
          :class="{ active: !selectedLanguage }"
        >
          TR
        </span>
        <!-- <div class="choose-language">
          <li class="text-right">TR</li>
        </div> -->
      </div>
    </div>
    <br />
    <hr />
    <h2 class="title-nasa">{{ getBaseStuff.title }}</h2>
    <p class="description-nasa">{{ getBaseStuff.explanation }}</p>
    <div class="mx-auto image-div mt-5">
      <!-- :style="{
        'background-image': `url(${baseStuff.image})`,
      }" -->
      <img :src="getBaseStuff.hdurl" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getBaseStuff"]),
  },
  data() {
    return {
      selectedLanguage: true,
    };
  },
  created() {
    this.$store.dispatch("getNasaDayApi");
  },
  methods: {
    changeTheLang(info) {
      if (info == true) {
        this.selectedLanguage = true;
      } else {
        this.selectedLanguage = false;
      }
    },
  },
  watch: {
    selectedLanguage(value) {
      if (value == false) {
        this.$store.dispatch("getTranslateDatabase");
      } else {
        this.$store.commit("getOriginalText");
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=BhuTuka+Expanded+One&family=Poppins&display=swap");

* {
  font-family: "BhuTuka Expanded One", cursive;
  color: #646464;
}
.nasa-api-text {
  font-weight: bold;
}
.nasa-api-text span:nth-child(2) {
  color: #005fff;
}
.title-nasa {
  font-weight: bold;
}
.description-nasa {
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}
.image-div {
  width: 100%;
  height: 750px;
  background-position: center;
  background-size: contain;
  background-color: #eeeeee;
  padding: 15px 0;
  border-radius: 20px;
  margin-bottom: 35px;
}
.image-div img {
  padding: 0 15px;
  width: 100%;
  object-fit: contain;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

/* .choose-language li {
  position: relative;
  border-radius: 5px;
  list-style-type: none;
}

.choose-language li::before {
  content: "-";
  position: absolute;
  left: 4px;
  font-weight: bold;
}

.choose-language li:hover{
  background-color: #ededed;
  cursor:pointer;
} */

.language {
  font-weight: bold;
  cursor: pointer;
  padding: 7px;
  border-radius: 5px;
  user-select: none;
}

.language:hover {
  background-color: #ededed;
}

.active {
  background-color: black;
  color: white;
}
.active:hover {
  background-color: black;
}

.languages-div {
  display: flex;
  row-gap: 5px;
  flex-direction: column;
}
</style>