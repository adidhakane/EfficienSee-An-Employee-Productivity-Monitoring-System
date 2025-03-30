const { MongoClient } = require('mongodb');

// Unique time patterns for each employee
const EMPLOYEE_TIME_PATTERNS = {
  sohamdeshmukh3000_at_gmail_dot_com: {
    start_range: { min: 9, max: 9.5 },   // 9:00 AM - 9:30 AM
    stop_range: { min: 17, max: 18 }     // 5:00 PM - 6:00 PM
  },
  employee2: {
    start_range: { min: 9.5, max: 10 }, // 9:30 AM - 10:00 AM
    stop_range: { min: 18, max: 19 }     // 6:00 PM - 7:00 PM
  },
  employee3: {
    start_range: { min: 9.2, max: 9.8 }, // 9:12 AM - 9:48 AM
    stop_range: { min: 17.5, max: 18.5 } // 5:30 PM - 6:30 PM
  },
  employee4: {
    start_range: { min: 9.1, max: 9.9 }, // 9:06 AM - 9:54 AM
    stop_range: { min: 17.8, max: 18.8 } // 5:48 PM - 6:48 PM
  },
  employee5: {
    start_range: { min: 9.4, max: 10 }, // 9:24 AM - 10:00 AM
    stop_range: { min: 18.2, max: 19 }   // 6:12 PM - 7:00 PM
  }
};

async function generateTimeSlots(employeePattern) {
  const dates = [];
  const startDate = new Date('2025-02-24');
  
  for(let i = 0; i < 29; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    // Generate random times within employee's pattern
    const startDecimal = employeePattern.start_range.min + 
      Math.random() * (employeePattern.start_range.max - employeePattern.start_range.min);
    const stopDecimal = employeePattern.stop_range.min + 
      Math.random() * (employeePattern.stop_range.max - employeePattern.stop_range.min);

    // Convert decimal hours to HH:mm format
    const start_time = 
      Math.floor(startDecimal).toString().padStart(2, '0') + ':' +
      Math.round((startDecimal % 1) * 60).toString().padStart(2, '0');
      
    const stop_time = 
      Math.floor(stopDecimal).toString().padStart(2, '0') + ':' +
      Math.round((stopDecimal % 1) * 60).toString().padStart(2, '0');

    dates.push({
      date: currentDate.toISOString().split('T')[0],
      start_time,
      stop_time
    });
  }
  return dates;
}

async function updateEmployeeCollection(client, employeeName) {
  const db = client.db();
  const collection = db.collection(employeeName);
  
  // Generate unique time slots for this employee
  const updates = await generateTimeSlots(EMPLOYEE_TIME_PATTERNS[employeeName]);
  
  // Create bulk operations
  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { date: update.date },
      update: { 
        $set: { 
          start_time: update.start_time,
          stop_time: update.stop_time
        } 
      }
    }
  }));

  // Execute bulk write
  const result = await collection.bulkWrite(bulkOps);
  console.log(`Updated ${result.modifiedCount} documents in ${employeeName}`);
  console.log(`Sample data for ${employeeName}:`, updates[0]);
}

async function main() {
  const uri = "mongodb+srv://bhishmadandekar:lHaWRxmTs0Ya8M1O@cluster0.dppci.mongodb.net/newEfficienSee_DB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    
    // Process each employee sequentially
    for(const employee of Object.keys(EMPLOYEE_TIME_PATTERNS)) {
      await updateEmployeeCollection(client, employee);
    }
    
  } finally {
    await client.close();
  }
}

main().catch(console.error);