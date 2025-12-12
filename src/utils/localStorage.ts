interface User {
  name: string;
  email: string;
  password: string;
}

interface Donation {
  id: string;
  food: string;
  quantity: number;
  location: string;
  lat: number;
  lng: number;
  expiry: string;
  image?: string;
  date: string;
  claimed: boolean;
}

interface VolunteerEvent {
  id: string;
  event: string;
  description: string;
  date: string;
  location: string;
  joined: boolean;
}

interface AppData {
  user: User | null;
  donations: Donation[];
  volunteers: VolunteerEvent[];
}

const STORAGE_KEY = "foodSaverData";

const defaultData: AppData = {
  user: null,
  donations: [],
  volunteers: [
    {
      id: "1",
      event: "Community Food Drive",
      description: "Help distribute food to local communities",
      date: "2025-10-20",
      location: "Chennai Community Center",
      joined: false,
    },
    {
      id: "2",
      event: "Food Collection Campaign",
      description: "Collect surplus food from restaurants",
      date: "2025-10-22",
      location: "T. Nagar Area",
      joined: false,
    },
    {
      id: "3",
      event: "Weekend Kitchen Volunteer",
      description: "Help prepare meals for the homeless",
      date: "2025-10-25",
      location: "Anna Nagar Kitchen",
      joined: false,
    },
  ],
};

export const loadData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  saveData(defaultData);
  return defaultData;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getUser = (): User | null => {
  return loadData().user;
};

export const setUser = (user: User | null) => {
  const data = loadData();
  data.user = user;
  saveData(data);
};

export const getDonations = (): Donation[] => {
  return loadData().donations;
};

export const addDonation = (donation: Omit<Donation, "id" | "date" | "claimed">) => {
  const data = loadData();
  const newDonation: Donation = {
    ...donation,
    id: Date.now().toString(),
    date: new Date().toISOString(),
    claimed: false,
  };
  data.donations.unshift(newDonation);
  saveData(data);
  return newDonation;
};

export const claimDonation = (id: string) => {
  const data = loadData();
  const donation = data.donations.find((d) => d.id === id);
  if (donation) {
    donation.claimed = true;
    saveData(data);
  }
};

export const getVolunteers = (): VolunteerEvent[] => {
  return loadData().volunteers;
};

export const toggleVolunteerJoin = (id: string) => {
  const data = loadData();
  const event = data.volunteers.find((v) => v.id === id);
  if (event) {
    event.joined = !event.joined;
    saveData(data);
  }
};

export const getStats = () => {
  const data = loadData();
  const totalDonations = data.donations.length;
  const mealsSaved = data.donations.reduce((sum, d) => sum + d.quantity, 0);
  const co2Reduced = Math.round(mealsSaved * 2.5);
  const activeVolunteers = data.volunteers.filter((v) => v.joined).length;
  
  return {
    totalDonations,
    mealsSaved,
    co2Reduced,
    activeVolunteers,
  };
};
