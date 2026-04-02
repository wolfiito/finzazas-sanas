import { create } from 'zustand';

interface UIState {
  isAddTransactionModalOpen: boolean;
  openAddTransactionModal: () => void;
  closeAddTransactionModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAddTransactionModalOpen: false,
  openAddTransactionModal: () => set({ isAddTransactionModalOpen: true }),
  closeAddTransactionModal: () => set({ isAddTransactionModalOpen: false }),
}));
