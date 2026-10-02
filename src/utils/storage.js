// ==========================================
// EcoTrack Storage
// ==========================================

// ==========================================
// USER AUTHENTICATION
// ==========================================

export const getUsers = () => {
  const users = localStorage.getItem("ecoUsers");

  return users ? JSON.parse(users) : [];
};


export const registerUser = (user) => {
  const users = getUsers();

  const alreadyExists = users.some(
    (existingUser) =>
      existingUser.email.toLowerCase() ===
      user.email.toLowerCase()
  );

  if (alreadyExists) {
    return {
      success: false,
      message: "Email already registered!",
    };
  }

  users.push(user);

  localStorage.setItem(
    "ecoUsers",
    JSON.stringify(users)
  );

  return {
    success: true,
    message: "Registration successful!",
  };
};


export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (existingUser) =>
      existingUser.email.toLowerCase() ===
        email.toLowerCase() &&
      existingUser.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password!",
    };
  }

  localStorage.setItem(
    "ecoCurrentUser",
    JSON.stringify(user)
  );

  return {
    success: true,
    user: user,
  };
};


export const getCurrentUser = () => {
  const user =
    localStorage.getItem("ecoCurrentUser");

  return user ? JSON.parse(user) : null;
};


export const logoutUser = () => {
  localStorage.removeItem("ecoCurrentUser");
};


// ==========================================
// USER-SPECIFIC STORAGE KEY
// ==========================================

const getUserStorageKey = (type) => {
  const user = getCurrentUser();

  if (!user || !user.email) {
    return null;
  }

  return `${type}_${user.email.toLowerCase()}`;
};


// ==========================================
// CARBON FOOTPRINT DATA
// ==========================================

export const saveData = (data) => {
  const key = getUserStorageKey("ecoData");

  if (!key) {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(data)
  );
};


export const getData = () => {
  const key = getUserStorageKey("ecoData");

  if (!key) {
    return [];
  }

  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : [];
};


// ==========================================
// USER-SPECIFIC GOALS
// ==========================================

export const saveGoals = (goals) => {
  const key = getUserStorageKey("ecoGoals");

  if (!key) {
    return;
  }

  localStorage.setItem(
    key,
    JSON.stringify(goals)
  );
};


export const getGoals = () => {
  const key = getUserStorageKey("ecoGoals");

  if (!key) {
    return null;
  }

  const goals = localStorage.getItem(key);

  return goals ? JSON.parse(goals) : null;
};