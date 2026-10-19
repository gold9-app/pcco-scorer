"use client";

import { useSyncExternalStore } from "react";

/**
 * 3D 무대와 DOM 이 공유하는 아주 작은 상태 — 노트북 열림 여부.
 * (HeroSection 의 안내 문구, Laptop 의 스프링, TetrisWell 의 첫 블록 낙하가 이 값을 본다)
 */
type StageState = { open: boolean };

let state: StageState = { open: false };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export const stageStore = {
  get: () => state,
  setOpen(open: boolean) {
    if (state.open === open) return;
    state = { ...state, open };
    emit();
  },
  toggleOpen() {
    stageStore.setOpen(!state.open);
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

export function useStage(): StageState {
  return useSyncExternalStore(stageStore.subscribe, stageStore.get, stageStore.get);
}
