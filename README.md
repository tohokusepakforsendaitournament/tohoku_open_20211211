# セパタクロー東北オープン大会 2021/12/11 用に作成中

## デプロイしたウェブサイト
1. 大会日程・結果表示サイト(https://script.google.com/macros/s/AKfycbwxQyj6fD7GOZ5qASfo1yoRRsjWjJMeLd3vEcV8cLbDyh-ksmUl7P1EFvKpHIW3N2kf/exec)
2. 審判用ツールサイト(https://script.google.com/macros/s/AKfycbyZr7HtGTr-SIz3yL5vUmHF5Nk36buZMGVtUQ9sLXTfMauD4bTBwex9DewqU8THNUIA/exec)

## 作成の目的・背景
1. スポーツ大会の選手がスマホで大会スケジュールを確認出来るようにし、移動の負担を減らしたい
2. 大会当日、大会に参加出来なかった遠方の応援者が結果をリアルタイムで知ることが出来るようにしたい
3. 大会運営の準備や当日の作業の負担を減らし、地方大会を気軽に開催できるようにしたい

## 特徴)GoogleAppScriptで動作
1. 無料でウェブ公開可能
2. GoogleSpreadSheetで大会日程・結果を管理しておりノンプログラマーでも修正が可能

## 使用の流れ
1. 大会日程・結果表示サイトにて、スケジュールを確認
2. その際、検索機能にて、特定のチームを抽出可能
3. 試合が始まると、審判は審判用ツールサイトを使用する(デモ版には試合番号 1, パスワード 1 で入ることが出来ます）
4. 審判用ツールでの得点加算がリアルタイムに行われ、大会日程・結果表示サイトにも反映される(準備中)

### 注意点
- GoogleAppScriptはhtmlファイルのみ扱える。よって、css 及び js ファイルをそれぞれ <style> 及び <script> タグで囲い、htmlファイルにする事でウェブアプリ化が出来る。

### その他参考サイト
- 今回のウェブサイトを作成する動機となった2019年開催の大会情報サイト(http://fukushimasepak.herokuapp.com/?fbclid=IwAR2BglJmHYsnsrA9hNY_rGkyDvOL6Dm32Sj8W4oWIUVuCoKiF9qy-e6NnZ0)
