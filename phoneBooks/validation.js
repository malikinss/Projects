// Validate email address format
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Validate phone number (digits only, no plus sign)
const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{10,15}$/; // 10 to 15 digits
  return phoneRegex.test(phone);
};

// Validate date format (DD/MM/YYYY)
const validateDate = (date) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // DD/MM/YYYY
  if (!dateRegex.test(date)) return false;

  const [day, month, year] = date.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);

  return (
    dateObj.getFullYear() === year &&
    dateObj.getMonth() === month - 1 &&
    dateObj.getDate() === day
  );
};

// Validate name and last name (only letters and spaces)
const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
};

module.exports = {
    validateEmail,
    validatePhone,
    validateDate,
    validateName
};
