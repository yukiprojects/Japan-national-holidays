// fetch-holidays.js
const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = 'AIzaSyBvshh5RfYd5Dcs04IoM8DSQnKpNlzGeGw';  // ここにGoogle APIキーを記入
const calendarId = 'ja.japanese#holiday@group.v.calendar.google.com';  // 祝日カレンダーID
const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    const events = data.items.map(event => ({
      title: event.summary,
      start: event.start.date,
      allDay: true
    }));
    fs.writeFileSync('2025-holidays.json', JSON.stringify(events, null, 2));
    console.log('祝日データを保存しました。');
  });
