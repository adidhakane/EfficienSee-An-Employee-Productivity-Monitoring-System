const { MongoClient } = require('mongodb');

// const EMPLOYEE_TIME_PATTERNS = {
//   "sohamdeshmukh3000_at_gmail_dot_com": {
//     start_range: { min: 9, max: 9.5 },
//     stop_range: { min: 17, max: 18 }
//   },
//   "adityadhakane752_at_gmail_dot_com": {
//     start_range: { min: 9.5, max: 10 },
//     stop_range: { min: 18, max: 19 }
//   },
//   "pratham_dot_dattawade22_at_vit_dot_edu": {
//     start_range: { min: 9.2, max: 9.8 },
//     stop_range: { min: 17.5, max: 18.5 }
//   },
//   "shivamdhokane_at_gmail_dot_com": {
//     start_range: { min: 9.1, max: 9.9 },
//     stop_range: { min: 17.8, max: 18.8 }
//   },
//   "bhishmadandekar_at_gmail_dot_com": {
//     start_range: { min: 9.4, max: 10 },
//     stop_range: { min: 18.2, max: 19 }
//   }
// };

// function convertDecimalToTime(decimal) {
//   const totalSeconds = Math.round(decimal * 3600);
//   const hours = Math.floor(totalSeconds / 3600);
//   const remainingSeconds = totalSeconds % 3600;
//   const minutes = Math.floor(remainingSeconds / 60);
//   const seconds = remainingSeconds % 60;
  
//   return [
//     hours.toString().padStart(2, '0'),
//     minutes.toString().padStart(2, '0'),
//     seconds.toString().padStart(2, '0')
//   ].join(':');
// }

// function calculateTimeDiffernce(start, stop) {
//   const startSeconds = parseInt(start.split(':')[0]) * 3600 +
//                       parseInt(start.split(':')[1]) * 60 +
//                       parseInt(start.split(':')[2]);
//   const stopSeconds = parseInt(stop.split(':')[0]) * 3600 +
//                      parseInt(stop.split(':')[1]) * 60 +
//                      parseInt(stop.split(':')[2]);
//   const diffSeconds = stopSeconds - startSeconds;
//   return convertDecimalToTime(diffSeconds / 3600);
// }

// async function generateEmployeeDocuments(employeePattern) {
//   const documents = [];
//   const startDate = new Date('2025-03-25');
  
//   // Generate documents for 6 days (25-30 March)
//   for(let i = 0; i < 6; i++) {
//     const currentDate = new Date(startDate);
//     currentDate.setDate(startDate.getDate() + i);
    
//     // Generate work times
//     const startDecimal = employeePattern.start_range.min + 
//       Math.random() * (employeePattern.start_range.max - employeePattern.start_range.min);
//     const stopDecimal = employeePattern.stop_range.min + 
//       Math.random() * (employeePattern.stop_range.max - employeePattern.stop_range.min);

//     // Convert times
//     const start_time = convertDecimalToTime(startDecimal);
//     const stop_time = convertDecimalToTime(stopDecimal);
//     const elapsed_time = calculateTimeDiffernce(start_time, stop_time);

//     // Calculate active duration (80-90% of elapsed time)
//     const activePercent = 0.8 + (Math.random() * 0.1);
//     const activeSeconds = parseFloat(elapsed_time.split(':')[0]) * 3600 +
//                          parseFloat(elapsed_time.split(':')[1]) * 60 +
//                          parseFloat(elapsed_time.split(':')[2]);
//     const activeAdjusted = activeSeconds * activePercent;
//     const active_duration = convertDecimalToTime(activeAdjusted / 3600);

//     // Calculate inactive duration
//     const inactiveSeconds = activeSeconds - activeAdjusted;
//     const inactive_duration = convertDecimalToTime(Math.abs(inactiveSeconds) / 3600);

//     // Generate break data (max 2 hours)
//     const breakHours = Math.random() * 2;
//     const break_time = convertDecimalToTime(breakHours);
//     const break_counter = Math.floor(Math.random() * 10);

//     // Generate tab switches (80-150)
//     const tab_switched_count = (80 + Math.floor(Math.random() * 71)).toString();

//     documents.push({
//       date: currentDate.toISOString().split('T')[0],
//       start_time,
//       stop_time,
//       elapsed_time,
//       tab_switched_count,
//       active_duration,
//       inactive_duration,
//       break_time,
//       break_counter
//     });
//   }
//   return documents;
// }

// async function insertEmployeeData(client, employeeName) {
//   const db = client.db();
//   const collection = db.collection(employeeName);
  
//   try {
//     const documents = await generateEmployeeDocuments(EMPLOYEE_TIME_PATTERNS[employeeName]);
//     const result = await collection.insertMany(documents);
    
//     console.log(`Successfully inserted ${result.insertedCount} documents for ${employeeName}`);
//     console.log('Sample document:', documents[0]);
//     console.log('-----------------------------------');
    
//   } catch (error) {
//     console.error(`Error inserting documents for ${employeeName}:`, error.message);
//   }
// }

// async function main() {
//   const uri = "mongodb+srv://bhishmadandekar:lHaWRxmTs0Ya8M1O@cluster0.dppci.mongodb.net/newEfficienSee_DB?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB Atlas');
    
//     // Process each employee collection sequentially
//     const employees = Object.keys(EMPLOYEE_TIME_PATTERNS);
//     for(const employee of employees) {
//       await insertEmployeeData(client, employee);
//     }
    
//   } catch (error) {
//     console.error('Main error:', error);
//   } finally {
//     await client.close();
//     console.log('Connection closed');
//   }
// }
// In MongoDB Compass or shell, run:
function main(params) {
  const uri = "mongodb+srv://bhishmadandekar:lHaWRxmTs0Ya8M1O@cluster0.dppci.mongodb.net/newEfficienSee_DB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  const db = client.db();
db.getCollection('sohamdeshmukh3000_at_gmail_dot_com').findOne(
  { date: "2025-03-25" }, 
  { start_time: 1, stop_time: 1, _id: 0 }
)
}
  
main();