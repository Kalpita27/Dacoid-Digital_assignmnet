export const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    // Get the first and last days of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    // Generate an array of dates for the month
    const days = [];
    for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
      days.push(new Date(day));
    }
  
    return days;
  };
  
  export const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  export const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };