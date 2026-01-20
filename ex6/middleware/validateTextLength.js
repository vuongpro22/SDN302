// Middleware to ensure text field meets certain length requirements
const validateTextLength = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    // Check if text exists
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' });
    }
    
    // Define length requirements (can be customized)
    const MIN_LENGTH = 10; // Minimum characters required
    const MAX_LENGTH = 5000; // Maximum characters allowed
    
    // Check minimum length
    if (text.length < MIN_LENGTH) {
      return res.status(400).json({ 
        error: `Text must be at least ${MIN_LENGTH} characters long. Current length: ${text.length}` 
      });
    }
    
    // Check maximum length
    if (text.length > MAX_LENGTH) {
      return res.status(400).json({ 
        error: `Text must not exceed ${MAX_LENGTH} characters. Current length: ${text.length}` 
      });
    }
    
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error validating text length');
  }
};

module.exports = validateTextLength;
