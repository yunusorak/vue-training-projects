<template>
  <div class="main-div">
    <div class="loading" :style="isLoading">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row mt-5">
        <div class="col-lg-6 col-md-12 dataExplanation">
          {{ getBaseStuff.explanation }}
        </div>

        <div class="col-lg-6 col-md-12">
          <textarea
            class="form-control"
            rows="13"
            v-model="translateData.text"
          ></textarea>
          <br />
          <p class="previewTranslation">
            {{ translateData.text }}
          </p>
          <button class="submit" @click="submitTranlate">Gönder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getBaseStuff"]),
    isLoading() {
      if (this.savedCheckButton) {
        return { display: "block" };
      } else {
        return { display: "none" };
      }
    },
  },
  created() {
    this.$store.dispatch("getNasaDayApi");
  },
  data() {
    return {
      translateData: {
        text: null,
        // translateDate: new Date(),
      },
      savedCheckButton: false,
      // isLoading: { display: "none" },
    };
  },
  methods: {
    submitTranlate() {
      if (confirm("Çeviri İşlemi Sonlanacaktır. Emin misiniz?")) {
        this.savedCheckButton = true;
        setTimeout(() => {
          this.$store.dispatch("addTranslateToDatabase", this.translateData);
        }, 500);
      }
    },
  },
  // watch: {
  //   savedCheckButton() {
  //     if (this.savedCheckButton == false) {
  //       this.isLoading = { display: "none" };
  //     } else {
  //       this.isLoading = { display: "block" };
  //       console.log("deneme");
  //     }
  //   },
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=BhuTuka+Expanded+One&family=Poppins&display=swap");
@import url("../../loading.css");
* {
  font-family: "BhuTuka Expanded One", cursive;
  color: #646464;
}

body {
  background-color: #181818 !important;
}

.dataExplanation {
  font-weight: bolder;
  font-size: 1.2rem;
  color: wheat;
}

textarea {
  resize: none;
  font-family: sans-serif;
  color: white !important;
  font-size: 1.2rem;
  font-weight: bolder;
  background-color: #2b2b2b !important;
}

.previewTranslation {
  font-weight: bold;
  user-select: none;
  color: #3c40c6;
}

.submit {
  padding: 20px 92px;
  font-weight: bold;
}
</style>
