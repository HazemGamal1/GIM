import { create } from "zustand"

export type Gym = {
    id: string,
    name: string,
    ownerId: string,
    isVisible: boolean
}
type Branch = {
    id: string,
    name: string,
    locationX: number,
    locationY: number,
    locationName: string,
    gymId: string,
    branchIsVisible: boolean
}
type GymStore = {
    selectedGym: Gym | null;
    selectedBranch: Branch | undefined;
    setSelectedGym: (gym : Gym) => void;
    setSelectedBranch: (branch : Branch) => void;
};

export const useGymStore = create<GymStore>((set) => ({
    selectedGym: null,
    selectedBranch: undefined,
    setSelectedGym: (gym) => set({ selectedGym: gym }),
    setSelectedBranch: (branch) => set({ selectedBranch : branch })
}));