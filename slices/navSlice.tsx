import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../redux/store";

// interface PokemonDetail {
//   types: [
//     {
//       slot: number;
//       type: {
//         name: string;
//         url: string;
//       };
//     }
//   ];
//   sprites: {
//     front_default: string;
//   };
//   name: string;
//   stats: [
//     {
//       base_stat: number;
//     }
//   ];
// }

// interface Pokemons {
//   name: string;
//   url: string;
// }

// interface PokemonDetailState {
//   pokemonDetails: Pokemons[];
// }

const initialState = {
  isModalOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

type RootState = ReturnType<typeof store.getState>;

export const { setIsModalOpen } = navSlice.actions;

export const selectModalOpen = (state: RootState) => state.nav.isModalOpen;

export default navSlice.reducer;
