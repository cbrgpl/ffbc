export interface CleanupContract {
  cleanup: () => void;
}

export interface CleanupableStore extends CleanupContract {
  $id: string;
}

const cleanupableStores: CleanupableStore[] = [];

export const registerCleanupableStore = (store: CleanupableStore) => {
  cleanupableStores.push(store);
};

export const cleanupStores = () => {
  cleanupableStores.forEach((store) => store.cleanup());
};
