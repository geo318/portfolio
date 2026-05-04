"use client";

import { create } from "zustand";

type ScanModeState = {
	enabled: boolean;
	toggle: () => void;
};

export const useScanMode = create<ScanModeState>((set) => ({
	enabled: false,
	toggle: () => set((state) => ({ enabled: !state.enabled })),
}));
