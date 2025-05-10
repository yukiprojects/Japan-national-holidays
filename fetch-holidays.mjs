// fetch-holidays.mjs (node-fetch v3を使用)
import fetch from 'node-fetch'; // ESM形式でインポート
import fs from 'fs';

const API_KEY = 'AIzaSyBvshh5RfYd5Dcs04IoM8DSQnKpNlzGeGw';  // ここにGoogle APIキーを記入
const calendarId = 'ja.japanese#holiday@group.v.calendar.google.com';  // 祝日カレンダーID
const year = 2026;  // テスト用に来年の祝日を取得
const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${API_KEY}&timeMin=${year}-01-01T00:00:00Z&timeMax=${year + 1}-01-01T00:00:00Z`;

fetch(url) // Google Calendar APIを呼び出す
  .then(res => res.json())
  .then(data => {
    // ここでデータの内容を確認
    console.log(data);

    // data.itemsがundefinedの場合のチェック
    if (!data.items) {
      console.error("データにitemsが含まれていません。");
      return;
    }

    const events = data.items.map(event => ({
      title: event.summary,
      start: event.start.date,
      allDay: true
    }));
    
    const filename = `${year}-holidays.json`;  // 年ごとのファイル名
    fs.writeFileSync(filename, JSON.stringify(events, null, 2));
    console.log(`${filename} に祝日データを保存しました。`);
  })
  .catch(error => {
    console.error("データ取得中にエラーが発生しました:", error);
  });
