// fetch-holidays.js (node-fetch v3を使用)
import fetch from 'node-fetch'; // ESM形式でインポート
import fs from 'fs';

const API_KEY = 'あなたのAPIキー';  // ここにGoogle APIキーを記入
const calendarId = 'ja.japanese#holiday@group.v.calendar.google.com';  // 祝日カレンダーID
const year = new Date().getFullYear();  // 現在の年を取得
const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&timeMin=${year}-01-01T00:00:00Z&timeMax=${year + 1}-01-01T00:00:00Z`;

fetch(url) // Google Calendar APIを呼び出す
  .then(res => res.json())
  .then(data => {
    const events = data.items.map(event => ({
      title: event.summary,
      start: event.start.date,
      allDay: true
    }));
    
    const filename = `${year}-holidays.json`;  // 年ごとのファイル名
    fs.writeFileSync(filename, JSON.stringify(events, null, 2));
    console.log(`${filename} に祝日データを保存しました。`);
  });
