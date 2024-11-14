const path = (prefix: string, route: string) => `${prefix}${route}`;

const PROTECTED_ROUTES_ROOT = "/";

const PUBLIC_ROUTES_ROOT = "/auth/";

export const paths = {
  root: PROTECTED_ROUTES_ROOT,
  home: {
    root: path(PROTECTED_ROUTES_ROOT, "home"),
    detail: {
      path: path(PROTECTED_ROUTES_ROOT, "notes/:noteId"),
      view: (noteId: string) => path(PROTECTED_ROUTES_ROOT, `notes/${noteId}`),
    },
  },
  notes: path(PROTECTED_ROUTES_ROOT, "notes"),
  favorites: path(PROTECTED_ROUTES_ROOT, "favorites"),
  auth: {
    root: PUBLIC_ROUTES_ROOT,
    login: path(PUBLIC_ROUTES_ROOT, "login"),
    register: path(PUBLIC_ROUTES_ROOT, "register"),
  },
};
