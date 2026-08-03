let onSelectCallback: ((item: any) => void) | null = null;

export const searchManager = {
  setOnSelect: (fn: (item: any) => void) => {
    onSelectCallback = fn;
  },
  getOnSelect: () => onSelectCallback,
};
