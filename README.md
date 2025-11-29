# Online Voting System

A **web-based online voting platform** that allows students to securely cast votes for elections. This system provides a user-friendly interface for voters and a management system for administrators to manage elections and view real-time results.

---
# Features
- **User Authentication:** Secure login for students and administrators.
- **Election Management:** Admins can create and manage elections.
- **Voting:** Students can vote only once per election.
- **Real-Time Results:** Votes are counted in real-time and displayed to admins.
- **Secure Data Storage:** Votes and user data are stored securely using MongoDB.

## **Tech Stack**
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Version Control:** Git & GitHub  
---
**Installation**
1. **Clone the repository**
bash
git clone https://github.com/Murali-R-123/Online-voting-system.git
cd Online-voting-system

2. Install dependencies
bash
Copy code
npm install
3. Set up MongoDB
Ensure MongoDB is installed and running locally.
Default database URL (in server.js):
js
Copy code
mongodb://localhost:27017/onlineVotingDB
4. Start the server
bash
Copy code
node server.js
5. Open in browser
Navigate to http://localhost:3000

## Usage
For Students:
*Register or log in.
*Cast votes for active elections.
*Confirm vote submission.
For Admins:
*Log in using admin credentials.
*Create, edit, or delete elections.
*View real-time vote counts.

### **Contributing**
Contributions are welcomed!!
1)Fork the repository
2)Create a feature branch:
git checkout -b feature/YourFeature
3)Commit your changes:
git commit -m "<your added feature>"
4)Push to the branch:
git push origin feature/YourFeature
5)Open a Pull Request

###**Contact**
Author: R Muralidharan
Email: rmurali132006@gmail.com
GitHub: https://github.com/Murali-R-123
