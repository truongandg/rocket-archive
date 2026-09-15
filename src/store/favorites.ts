import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Collection } from "../types/collection";

interface LibraryState {
  favouriteRocketIds: number[];
  collections: Collection[];
  addFavouriteRocket: (rocketId: number) => void;
  removeFavouriteRocket: (rocketId: number) => void;
  toggleFavouriteRocket: (rocketId: number) => void;
  isFavouriteRocket: (rocketId: number) => boolean;
  createCollection: (name: string) => void;
  deleteCollection: (collectionId: string) => void;
  addRocketToCollection: (collectionId: string, rocketId: number) => void;
  removeRocketFromCollection: (collectionId: string, rocketId: number) => void;
}

const makeCollectionId = () =>
  `collection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      favouriteRocketIds: [],
      collections: [],

      addFavouriteRocket: (rocketId) =>
        set((state) =>
          state.favouriteRocketIds.includes(rocketId)
            ? state
            : { favouriteRocketIds: [...state.favouriteRocketIds, rocketId] },
        ),

      removeFavouriteRocket: (rocketId) =>
        set((state) => ({
          favouriteRocketIds: state.favouriteRocketIds.filter((id) => id !== rocketId),
        })),

      toggleFavouriteRocket: (rocketId) => {
        if (get().isFavouriteRocket(rocketId)) {
          get().removeFavouriteRocket(rocketId);
        } else {
          get().addFavouriteRocket(rocketId);
        }
      },

      isFavouriteRocket: (rocketId) => get().favouriteRocketIds.includes(rocketId),

      createCollection: (name) => {
        const trimmedName = name.trim();
        if (!trimmedName) return;

        set((state) => ({
          collections: [
            ...state.collections,
            { id: makeCollectionId(), name: trimmedName, rocketIds: [] },
          ],
        }));
      },

      deleteCollection: (collectionId) =>
        set((state) => ({
          collections: state.collections.filter(
            (collection) => collection.id !== collectionId,
          ),
        })),

      addRocketToCollection: (collectionId, rocketId) =>
        set((state) => ({
          collections: state.collections.map((collection) => {
            if (collection.id !== collectionId || collection.rocketIds.includes(rocketId)) {
              return collection;
            }

            return { ...collection, rocketIds: [...collection.rocketIds, rocketId] };
          }),
        })),

      removeRocketFromCollection: (collectionId, rocketId) =>
        set((state) => ({
          collections: state.collections.map((collection) =>
            collection.id === collectionId
              ? {
                  ...collection,
                  rocketIds: collection.rocketIds.filter((id) => id !== rocketId),
                }
              : collection,
          ),
        })),
    }),
    { name: "rocket-archive-storage" },
  ),
);
