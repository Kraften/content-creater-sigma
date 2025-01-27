import { create } from "zustand";
import { SECTION } from "../constants/constants";
import { EDIT_SECTION } from "./../constants/constants";

const initialUserState = {
  selectedStep: SECTION.NONE,
  selectedEditSection: EDIT_SECTION.NONE,

  user: {
    firstName: "Johannes ",
    lastName: "Kraft",
    occupation: "Software Engineer",
    hobby: "Climbing",
  },
};
const userStore = create((set) => ({
  ...initialUserState,

  // Only one modal should be open at a time, thats why we close all modals before opening a new one.
  updateSelectedStep: (selectedStep) =>
    set(() => ({
      selectedEditSection: EDIT_SECTION.NONE,
      selectedStep: selectedStep,
    })),

  // Only one modal should be open at a time, thats why we close all modals before opening a new one.
  updateSelectedEditSection: (selectedEditSection) =>
    set(() => ({
      selectedStep: SECTION.NONE,
      selectedEditSection: selectedEditSection,
    })),

  setUser: (updatedFields) =>
    set((state) => ({
      user: { ...state.user, ...updatedFields },
    })),
}));

export default userStore;
