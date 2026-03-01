# Google Sheets RSVP Integration Setup

Follow these steps to connect your RSVP form to Google Sheets:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it something like "Wedding RSVP Responses"
3. In the first row, add these headers (exactly as shown):
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Attendance`
   - F1: `Meal Selection`
   - G1: `Dietary Restrictions`
   - H1: `Plus One`
   - I1: `Plus One Name`
   - J1: `Plus One Meal Selection`
   - K1: `Message`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Open the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Append a new row with the form data
    // Columns: Timestamp | Name | Email | Phone | Attendance |
    //          Meal Selection | Dietary Restrictions |
    //          Plus One | Plus One Name | Plus One Meal Selection | Message
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attendance || '',
      data.mealSelection || '',
      data.dietaryRestrictions || '',
      data.plusOne || '',
      data.plusOneName || '',
      data.plusOneMealSelection || '',
      data.message || ''
    ]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ready', message: 'RSVP endpoint is active' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (Ctrl+S or Cmd+S)
4. Name the project (e.g., "Wedding RSVP Handler")

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: "Wedding RSVP Form Handler"
   - **Execute as**: "Me (your email)"
   - **Who has access**: "Anyone" (important for the form to work)
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts to grant permissions
6. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

## Step 4: Update Your Website Code

1. Open `src/app/components/RSVPForm.tsx`
2. Find this line near the top:
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL` with your actual Web App URL from Step 3

## Step 5: Test the Integration

1. Run your website locally
2. Fill out the RSVP form and submit
3. Check your Google Sheet - a new row should appear with the submission data

## Troubleshooting

### Form submits but no data appears in the sheet:
- Make sure the Web App is deployed with "Anyone" access
- Check that you copied the correct Web App URL (ends with `/exec`)
- Verify the Apps Script is saved and deployed after any changes

### Authorization issues:
- When deploying, make sure to authorize the script to access your Google Sheets
- If you get a "This app isn't verified" warning, click "Advanced" → "Go to [Project Name] (unsafe)"

### Need to update the script:
- After making changes to the Apps Script, you must create a **new deployment** for changes to take effect
- Go to **Deploy → Manage deployments → Create new deployment**

## Email Notifications (Optional)

To receive email notifications for new RSVPs, add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Append row
    // Columns: Timestamp | Name | Email | Phone | Attendance |
    //          Meal Selection | Dietary Restrictions |
    //          Plus One | Plus One Name | Plus One Meal Selection | Message
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.attendance || '',
      data.mealSelection || '',
      data.dietaryRestrictions || '',
      data.plusOne || '',
      data.plusOneName || '',
      data.plusOneMealSelection || '',
      data.message || ''
    ]);

    // Send email notification
    var plusOneInfo = data.plusOne === 'yes'
      ? `Plus One: Yes\n      Plus One Name: ${data.plusOneName || 'N/A'}\n      Plus One Meal: ${data.plusOneMealSelection || 'N/A'}`
      : 'Plus One: No';

    var emailBody = `
      New RSVP Received!

      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      Attendance: ${data.attendance === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}
      Meal Selection: ${data.mealSelection || 'N/A'}
      Dietary Restrictions: ${data.dietaryRestrictions || 'None'}
      ${plusOneInfo}
      Message: ${data.message || 'No message'}

      Submitted at: ${data.timestamp}
    `;

    // Replace with your email address
    MailApp.sendEmail({
      to: "your-email@example.com",
      subject: `Wedding RSVP: ${data.name} - ${data.attendance === 'yes' ? 'Attending' : 'Not Attending'}`,
      body: emailBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Remember to replace `your-email@example.com` with your actual email address!
