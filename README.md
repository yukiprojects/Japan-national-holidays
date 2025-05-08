1
Google Calendar API から祝日を取得するスクリプトを用意
Node.js / Python
2
そのスクリプトを クラウドに自動定期実行させる
cron / GitHub Actions / Cloud Functions
3
実行結果（JSON）を 自動でWeb公開（ストレージ or GitHub Pages）
自動push or アップロード
4
FullCalendar がそのJSONを読み込む
完全自動反映される



これで「祝日データを自動で取得し、FullCalendarに反映するシステム」の完成です。
	•	GitHub Actions で毎月祝日データを自動取得
	•	GitHub Pages でJSONを公開
	•	FullCalendar で最新祝日データを読み込む
