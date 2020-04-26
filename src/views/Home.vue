<template>
  <div class="home">
    <template v-if="!isLoading">
      <v-skeleton-loader v-for="(item, index) in 10" :key="index" height="60" type="list-item-avatar-two-line">
      </v-skeleton-loader>
    </template>

    <v-list v-else two-line subheader>
      <v-subheader inset>Last update</v-subheader>

      <v-list-item
        v-for="(item, index) in lastFuels"
        :key="index"
        @click="() => {}"
      >
        <v-list-item-avatar>
          <v-icon
            class="grey lighten-1 white--text"
            v-text="folder.icon"
          ></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle
            v-text="item.currency + ' ' + item.price"
          ></v-list-item-subtitle>
          <v-list-item-subtitle v-text="item.date"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    // FuelCard
  },
  data() {
    return {
      folder: [{ icon: "folder" }]
    };
  },
  computed: {
    ...mapState({
      lastFuels: state => state.fuel.lastUpdatedFuels,
      isLoading: state => state.fuel.isLoading
    })
  }
};
</script>

<style lang="scss"></style>
