function doGet(req) {

  // スプレッドシートから情報取得
  var sh = SpreadsheetApp.openById("####################################");
  var ss = sh.getSheets()[0];
  var last_row = ss.getLastRow();
  var msg = "";

  var sec_list = "";
  var st_list = "";
  var court_list = "";
  var gm_name_list = "";
  var gm_num_list = "";
  var a_reg_list = "";
  var b_reg_list = "";
  var w_next_list = "";
  var l_next_list = "";
  var a_sets_list = "";
  var b_sets_list = "";
  var a_1_list = "";
  var a_2_list = "";
  var a_3_list = "";
  var b_1_list = "";
  var b_2_list = "";
  var b_3_list = "";
  var fin_list = "";

  for(var i=2; i<=last_row; i++) {
    var infoArray = ss.getRange(i, 2, 1, 32).getValues();
    var sec = infoArray[0][0]; // セクション
    var st = infoArray[0][1]; // 開始時間
    var court = infoArray[0][2]; // コート
    var gm_num = infoArray[0][3]; // 試合番号
    var gm_name = infoArray[0][4]; // 試合名
    var a_reg = infoArray[0][5]; // レグA
    var b_reg = infoArray[0][6]; // レグB
    var w_next = infoArray[0][17]; // 勝者次試合番号
    var l_next = infoArray[0][18]; // 敗者次試合番号
    var a_sets = infoArray[0][21]; // A獲得セット
    var b_sets = infoArray[0][22]; // B獲得セット
    var a_1 = infoArray[0][23]; // A1セット
    var a_2 = infoArray[0][24]; // A2セット
    var a_3 = infoArray[0][25]; // A3セット
    var b_1 = infoArray[0][26]; // B1セット
    var b_2 = infoArray[0][27]; // B2セット
    var b_3 = infoArray[0][28]; // B3セット
    var fin = infoArray[0][31]; // 終了フラグ
    if(fin == 1){
      var para = `<tr class="table-dark">`;
    }
    else{
      var para = `<tr>`;
    }

    msg +=
      para +
        `<td scope="row" class="align-middle">` + sec + ` (` + st + `)</td>
        <td class="align-middle">` + court + `</td>
        <td class="align-middle">` + gm_num + ` (` + gm_name + `)</td>
        <td><ul class="list-unstyled">
          <li>` + a_reg + `/</li>
          <li>` + b_reg + `</li></ul></td>
        <td><ul class="list-unstyled">
          <li>`+a_sets+` (`+a_1+`-`+a_2+`-`+a_3+`)/</li>
          <li>`+b_sets+` (`+b_1+`-`+b_2+`-`+b_3+`)</li>
      </tr>`;

    sec_list += "<li>" + sec + "</li>";
    st_list += "<li>" + st + "</li>";
    court_list += "<li>" + court + "</li>";
    gm_num_list += "<li>" + gm_num + "</li>";
    gm_name_list += "<li>" + gm_name + "</li>";
    a_reg_list += "<li>" + a_reg + "</li>";
    b_reg_list += "<li>" + b_reg + "</li>";
    w_next_list += "<li>" + w_next + "</li>";
    l_next_list += "<li>" + l_next + "</li>";
    a_sets_list += "<li>" + a_sets + "</li>";
    b_sets_list += "<li>" + b_sets + "</li>";
    a_1_list += "<li>" + a_1 + "</li>";
    a_2_list += "<li>" + a_2 + "</li>";
    a_3_list += "<li>" + a_3 + "</li>";
    b_1_list += "<li>" + b_1 + "</li>";
    b_2_list += "<li>" + b_2 + "</li>";
    b_3_list += "<li>" + b_3 + "</li>";
    fin_list += "<li>" + fin + "</li>";

  }

  var html = HtmlService.createTemplateFromFile("index");
  html.msg = msg;
  html.sec_list = sec_list;
  html.st_list = st_list;
  html.court_list = court_list;
  html.gm_num_list = gm_num_list;
  html.gm_name_list = gm_name_list;
  html.a_reg_list = a_reg_list;
  html.b_reg_list = b_reg_list;
  html.w_next_list = w_next_list;
  html.l_next_list = l_next_list;
  html.a_sets_list = a_sets_list;
  html.b_sets_list = b_sets_list;
  html.a_1_list = a_1_list;
  html.a_2_list = a_2_list;
  html.a_3_list = a_3_list;
  html.b_1_list = b_1_list;
  html.b_2_list = b_2_list;
  html.b_3_list = b_3_list;
  html.fin_list = fin_list;
  const htmlOutput = html.evaluate();
  htmlOutput
    .setTitle('大会日程・結果')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  return htmlOutput;
}

// CSSを読み込む関数
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

