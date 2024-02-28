const registerVotes = async (req, res) => {
  res.json({ message: 'Votes registered successfully' });
}

const getJrvInfo = async (req, res) => {
  res.json({ message: 'JRV information retrieved successfully' });
}

module.exports = {  
  registerVotes,
  getJrvInfo
};