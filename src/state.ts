// state.ts
import { atomWithStorage } from "jotai/utils";

export const locations = atomWithStorage<string[]>("locations", []);
