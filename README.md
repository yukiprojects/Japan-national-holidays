1
Google Calendar API から祝日を取得するスクリプトを用意
Node.js
2
そのスクリプトを クラウドに自動定期実行させる
GitHub Actions 
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

 ーーーーーーーーーーーーーー


🧠 現在構築中の「祝日データ自動取得システム」のおさらい

⸻

🏁 目的：

👉 Googleカレンダー（公式祝日カレンダー）から祝日を自動取得し、GitHub上に最新のJSONファイルとして保存
👉 そのJSONデータを 自作のカレンダーWebアプリなどで読み込んで表示する

⸻

🔄 システムの流れ：

① GoogleカレンダーAPIから祝日を取得
	•	使用カレンダーID：ja.japanese#holiday@group.v.calendar.google.com
	•	使用スクリプト：fetch-holidays.mjs
	•	出力：2025-holidays.json のような祝日一覧JSON

② GitHub Actions でこの処理を自動化
	•	ファイル：.github/workflows/fetch.yml
	•	内容：Node.js でスクリプト実行 → .json 更新 → Gitでpush
	•	定期性：毎月1日に自動実行（cron: '0 0 1 * *'）
	•	→ これは「毎月1日午前0時（日本時間9:00）に起動」という意味
	•	また、workflow_dispatch: により「手動実行」も可能

③ 生成された祝日JSONを GitHub Pages などで公開可能
	•	例：https://your-username.github.io/Japan-national-holidays/2025-holidays.json
	•	※ GitHub Pages の設定をすれば、Webから誰でもアクセス可能なAPI化も可能（必要なら次のステップ）

④ 自作のWebカレンダーでこのJSONを読み込む
	•	使用ライブラリ例：FullCalendar.js
	•	JavaScriptで fetch() などを使って .json を読み込み
	•	カレンダーに eventSource として渡せば、祝日が反映される
