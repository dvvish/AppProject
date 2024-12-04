// globalVendorStore.ts
let selectedVendorId: number | null = null;

export const setSelectedVendorId = (id: number) => {
  selectedVendorId = id;
};

export const getSelectedVendorId = (): number | null => {
  return selectedVendorId;
};
