// fetch-holidays.mjs (node-fetch v3を使用)
import fetch from 'node-fetch'; // ESM形式でインポート
import fs from 'fs';

const API_KEY = 'AIzaSyBvshh5RfYd5Dcs04IoM8DSQnKpNlzGeGw';  // ここにGoogle APIキーを記入
const calendarId = 'ja.japanese#holiday@group.v.calendar.google.com';  // 祝日カレンダーID

const currentYear = new Date().getFullYear(); // 今年の年

for (let year = currentYear; year <= currentYear + 2; year++) {
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&timeMin=${year}-01-01T00:00:00Z&timeMax=${year + 1}-01-01T00:00:00Z`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        console.log(`${year}年の祝日はまだ存在しません。スキップします。`);
        return;
      }

      const events = data.items.map(event => ({
        title: event.summary,
        start: event.start.date,
        allDay: true
      }));

      const filename = `${year}-holidays.json`;
      fs.writeFileSync(filename, JSON.stringify(events, null, 2));
      console.log(`${filename} に祝日データを保存しました。`);
    })
    .catch(error => {
      console.error(`${year}年のデータ取得中にエラーが発生しました:`, error);
    });
}
