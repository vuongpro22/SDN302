// Middleware to validate the format of the date field
const validateDate = async (req, res, next) => {
  try {
    const { date } = req.body;
    
    // Check if date exists
    if (!date) {
      return res.status(400).json({ error: 'Date field is required' });
    }
    
    // Validate date format (YYYY-MM-DD)
    // Regular expression to match YYYY-MM-DD format
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (!dateFormatRegex.test(date)) {
      return res.status(400).json({ 
        error: 'Invalid date format. Date must be in YYYY-MM-DD format (e.g., 2024-03-03)' 
      });
    }
    
    // Additional validation: Check if the date is a valid date
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid date value' });
    }
    
    // Check if the parsed date matches the input (prevents dates like 2024-13-45)
    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    if (parsedDate.getFullYear() !== year || 
        parsedDate.getMonth() !== month - 1 || 
        parsedDate.getDate() !== day) {
      return res.status(400).json({ error: 'Invalid date value' });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error validating date format');
  }
};

module.exports = validateDate;
