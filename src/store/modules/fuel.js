import FuelService from "../../services/FuelService.js";
import moment from "moment";

export const namespaced = true;

export const state = {
  fuels: [],
  lastUpdatedFuels: [],
  lastFuelsUpdatedDate: null,
    isLoading: false
};

export const mutations = {
  SET_FUELS(state, fuels) {
    state.fuels = fuels;
  },
  SET_FUELS_UPDATED_DATE(state, lastDate) {
    state.lastFuelsUpdatedDate = lastDate;
  },
  SET_LAST_UPDATED_FUELS(state, fuels) {
    state.lastUpdatedFuels = fuels;
  },
  SET_LOADING(state, isLoading){
      state.isLoading = isLoading
  }
};

export const actions = {
  fetchFuels({ commit, getters }) {
    let fuels = getters.fuels;

    if (fuels.length > 0) {
      commit("SET_FUELS", fuels);
    } else {
      FuelService.getFuels()
        .then(response => {
          const replaceCommaFromCurrency = response.data.replace(
            /"RD\$"/g,
            '"RD$",'
          );

          const replaceCommmaFormTime = replaceCommaFromCurrency.replace(
            /000,/g,
            "000"
          );

          const fuels = JSON.parse(replaceCommmaFormTime);

          const date = new Date(
            Math.max.apply(
              null,
              fuels.map(fuel => new Date(fuel.date))
            )
          );

          const lastDate = moment(date).format("M/D/YYYY");

          const lastFuelsUpdated = fuels.filter(fuel => {
            return fuel.date === lastDate;
          });

          commit("SET_FUELS", fuels);
          commit("SET_FUELS_UPDATED_DATE", lastDate);
          commit("SET_LAST_UPDATED_FUELS", lastFuelsUpdated);
          commit("SET_LOADING", true)

        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};

export const getters = {
  fuels: state => {
    return state.fuels;
  },
  getFuelByDate: state => {
    return state.fuels.filter(item => item.date === "7/19/2019");
  }
};
