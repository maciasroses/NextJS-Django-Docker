export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  users: User[];
  categories: Category[];
  location: Location;
  title: string;
  description: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface EventListProps {
  results: Event[];
  total_pages: number;
}

export interface EventIdProps {
  params: { lng: string; id: string };
}

export interface BaseLangPageProps {
  params: {
    lng: string;
  };
}

export interface RegisterStateProps {
  message: string;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
}

export interface LoginStateProps {
  message: string;
  errors: {
    email?: string;
    password?: string;
  };
}

export interface SearchParams {
  q?: string;
  category?: string;
  location?: string;
  page?: string;
}
