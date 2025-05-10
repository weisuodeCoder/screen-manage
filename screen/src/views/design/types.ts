import { ReactNode } from "react";

export interface L_R_PropsImpl {
  slotList: [SlotListImpl, SlotListImpl, SlotListImpl];
}

export interface SlotListImpl {
  title: string;
  subtitle: string;
  slot: ReactNode;
}
