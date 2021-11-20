function doGet(req) {
  var value = ScriptApp.getService().getUrl();
  var html = HtmlService.createTemplateFromFile("index");
  html.btn= value; 
  const htmlOutput = html.evaluate();
  htmlOutput
    .setTitle('審判ツール')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  return htmlOutput;
}

// CSSを読み込む関数
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// GDriveのファイルのURLを得る.https://qiita.com/TechnoKuRo/items/622c3dcc2ff3f7e09474#%E8%A7%A3%E6%B1%BA
// htmlファイルに右を差し込む。<img src="<?!=getFileUrl('XXXXX_ドキュメントID_XXXXX')?>" 
function getFileUrl(id){
  var url = DriveApp.getFileById(id).getDownloadUrl();
  return url + '&access_token=' + ScriptApp.getOAuthToken();
}

// トップ画面から入力された値を元に、試合番号とパスワードを照合する
function checkPassword(gameNumber, gamePass) {
  var sh = SpreadsheetApp.openById("######################################");
  var ss = sh.getSheets()[0];
  var gmList = ss.getRange(2, 5, ss.getLastRow() - 1).getValues();
  var gmListRetouched = [];
  for (var i=0; i<gmList.length-1; i++) {
    gmListRetouched.push(Number(gmList[i][0]));
  }

  // 一致する試合番号があったら、そのパスワードと照合する
  var isexist = gmListRetouched.indexOf(Number(gameNumber)); // リスト内での順番を示す。+2をすると、スプレッドシートの行番号に一致する
  if (isexist !== -1) {
    var gm_fin = ss.getRange(isexist+2, 33).getValue(); // 終了フラグ
    if (gm_fin !== 1) {
      var gm_pass = ss.getRange(isexist+2, 21).getValue(); // 試合パスワード
      if (gm_pass == gamePass) {
        var infoList = ss.getRange(isexist+2, 2, 1, 17).getValues();
        infoList = infoList[0];
        infoList.push(isexist+2);
        return infoList;
      }else {
        return false
      }
    }else {
      return false
    }
  }else {
    return false
  }
}
// 審判画面から送信された結果を元に、スプレッドシートを書き換える
function sendToSpread(setNum, rowNumber, pointA, pointB, setA, setB) {
  var sh = SpreadsheetApp.openById("#####################################");
  var ss = sh.getSheets()[0];
  ss.getRange(rowNumber, 23).setValue(setA);
  ss.getRange(rowNumber, 24).setValue(setB);
  ss.getRange(rowNumber, 25+setNum).setValue(pointA);
  ss.getRange(rowNumber, 28).setValue(pointB);
}
// 試合終了後に審判画面から送信された結果を元に、スプレッドシートを書き換える
function sendToSpreadFin(setNum, rowNumber, pointA, pointB, setA, setB, hisSet, reg) {
  var sh = SpreadsheetApp.openById("##################################################");
  var ss = sh.getSheets()[0];
  ss.getRange(rowNumber, 23).setValue(setA);
  ss.getRange(rowNumber, 24).setValue(setB);
  ss.getRange(rowNumber, 26+setNum-1).setValue(pointA);
  ss.getRange(rowNumber, 29+setNum-1).setValue(pointB);
  var num = hisSet[setNum];
  ss.getRange(rowNumber, 31).setValue(reg[num]);
  ss.getRange(rowNumber, 32).setValue(reg[1 - num]);
  ss.getRange(rowNumber, 33).setValue(1);
}
