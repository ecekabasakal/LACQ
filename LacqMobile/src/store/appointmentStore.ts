import { create } from 'zustand';

export interface Appointment {
  id: string;
  service: string;
  specialist: string;
  specialistTitle: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes: string;
}

interface AppointmentState {
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  cancelAppointment: (id: string) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  addAppointment: (apt) =>
    set((state) => ({ appointments: [apt, ...state.appointments] })),
  cancelAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, status: 'cancelled' as const } : a
      ),
    })),
}));