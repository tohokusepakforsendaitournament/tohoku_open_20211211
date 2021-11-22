//https://qiita.com/kakkiichan/items/6eeff6e67a86e9f81aaa
//https://script.google.com/home/projects/1aL1bvAkWEiz3mA0ClDcQSMhrFuwIJLmdDDASsz6LECBBJ0XmZuAjVyR3/edit

function doGet(req) {

  // スプレッドシートから情報取得
  const sh = SpreadsheetApp.openById("############################################");
  const ss = sh.getSheets()[0];
  const ss3 = sh.getSheets()[2];
  const last_row = ss.getLastRow();
  var msg = "";

  let info_list= new Array(32).fill("<ul>"); //要素数32の配列(array)を作成
  // 取得した情報をindex.htmlでhiddenのリストとして出力する。検索高速化の為
  var infoArray = ss.getRange(2, 2, last_row-1, 32).getValues(); 
  for(let i=0; i<last_row-1; i++) {   
    const sec = 0; // セクション
    const st = 1; // 開始時間
    const court = 2; // コート
    const gm_num = 3; // 試合番号
    const gm_name = 4; // 試合名
    const a_reg = 5; // レグA
    const b_reg = 6; // レグB
    const w_next = 17; // 勝者次試合番号
    const l_next = 18; // 敗者次試合番号
    const a_sets = 21; // A獲得セット
    const b_sets = 22; // B獲得セット
    const a_1 = 23; // A1セット
    const a_2 = 24; // A2セット
    const a_3 = 25; // A3セット
    const b_1 = 26; // B1セット
    const b_2 = 27; // B2セット
    const b_3 = 28; // B3セット
    const fin = 31; // 終了フラグ
    if(infoArray[0][fin] == 1){
      var para = `<tr class="table-dark">`;
    }
    else{
      var para = `<tr>`;
    }

    msg +=
      para +
        `<td scope="row" class="align-middle">` + infoArray[i][sec] + ` (` + infoArray[i][st] + `)</td>
        <td class="align-middle">` + infoArray[i][court] + `</td>
        <td class="align-middle">` + infoArray[i][gm_num] + ` (` + infoArray[i][gm_name] + `)</td>
        <td><ul class="list-unstyled">
          <li>` + infoArray[i][a_reg] + `/</li>
          <li>` + infoArray[i][b_reg] + `</li></ul></td>
        <td><ul class="list-unstyled">
          <li>`+infoArray[i][a_sets]+` (`+infoArray[i][a_1]+`-`+infoArray[i][a_2]+`-`+infoArray[i][a_3]+`)/</li>
          <li>`+infoArray[i][b_sets]+` (`+infoArray[i][b_1]+`-`+infoArray[i][b_2]+`-`+infoArray[i][b_3]+`)</li>
      </tr>`;

    info_list[sec] += "<li>" + infoArray[i][sec] + "</li>";
    info_list[st] += "<li>" + infoArray[i][st] + "</li>";
    info_list[court] += "<li>" + infoArray[i][court] + "</li>";
    info_list[gm_num] += "<li>" + infoArray[i][gm_num] + "</li>";
    info_list[gm_name] += "<li>" + infoArray[i][gm_name] + "</li>";
    info_list[a_reg] += "<li>" + infoArray[i][a_reg] + "</li>";
    info_list[b_reg] += "<li>" + infoArray[i][b_reg] + "</li>";
    info_list[w_next] += "<li>" + infoArray[i][w_next] + "</li>";
    info_list[l_next] += "<li>" + infoArray[i][l_next] + "</li>";
    info_list[a_sets] += "<li>" + infoArray[i][a_sets] + "</li>";
    info_list[b_sets] += "<li>" + infoArray[i][b_sets] + "</li>";
    info_list[a_1] += "<li>" + infoArray[i][a_1] + "</li>";
    info_list[a_2] += "<li>" + infoArray[i][a_2] + "</li>";
    info_list[a_3] += "<li>" + infoArray[i][a_3] + "</li>";
    info_list[b_1] += "<li>" + infoArray[i][b_1] + "</li>";
    info_list[b_2] += "<li>" + infoArray[i][b_2] + "</li>";
    info_list[b_3] += "<li>" + infoArray[i][b_3] + "</li>";
    info_list[fin] += "<li>" + infoArray[i][fin] + "</li>";

  }
  for(let y = 0; y < 32; y++) {
    info_list[y] += "</ul>"; //</ul>でフタ
  }

  // 予選リーグの勝ち点や得失点を表示するために情報取得及び情報出力する
  var league_info = ss3.getRange(2, 7, 30, 3).getValues(); 
  const transpose = a => a[0].map((_, c) => a.map(r => r[c])); // 転置
  league_info = transpose(league_info);
  infoArray = transpose(infoArray);
  // 試合の点数を取得する為の関数
  function getGameP(infoArray, game_number) {
    let idx = infoArray[3].indexOf(String(game_number));
    return [infoArray[21][idx], infoArray[22][idx]];
  }
  // 勝ち点等を取得する為の関数
  function getHaveP(league_info, reg_number) {
    let idx = league_info[0].indexOf(reg_number);
    return [league_info[1][idx], league_info[2][idx]];
  }
  // アスリートの予選リーグ表
  var score_sheet_athlete = "";
  var leagueAth = [
    ["table_A", "A", "宮城E", "札ク", "阪神酒販3rd", "宮城D", 23, 43, 61, 63, 45, 14, 1, 2, 3, 4],
    ["table_B", "B", "宮城F", "宮城A", "大山たぬき", "けまりんA", 12, 41, 72, 74, 52, 25, 5, 6, 7, 8],
    ["table_B", "C", "千葉A", "宮城C", "宮城B", "バモスA", 34, 15, 76, 71, 54, 32, 9, 10, 11, 12],
  ]
  for (let i = 0; i < 3; i++) {
    score_sheet_athlete += `
    <table id="`+ leagueAth[i][0] +`">
      <tbody>
      <tr>
        <td class="group_name color_athlete">`+ leagueAth[i][1] +`</td>
        <td class="team0 color_athlete">`+ leagueAth[i][2] +`</td>
        <td class="team0 color_athlete">`+ leagueAth[i][3] +`</td>
        <td class="team0 color_athlete">`+ leagueAth[i][4] +`</td>
        <td class="team0 color_athlete">`+ leagueAth[i][5] +`</td>
        <td class="w_points color_athlete">勝点</td>
        <td class="d_points color_athlete">得失点</td>
      </tr>
      <tr>
        <td class="team color_athlete">`+ leagueAth[i][2] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][6])[0] +` - `+ getGameP(infoArray, leagueAth[i][6])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][7])[0] +` - `+ getGameP(infoArray, leagueAth[i][7])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][8])[0] +` - `+ getGameP(infoArray, leagueAth[i][8])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueAth[i][12])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueAth[i][12])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_athlete">`+ leagueAth[i][3] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][6])[1] +` - `+ getGameP(infoArray, leagueAth[i][6])[0] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][9])[0] +` - `+ getGameP(infoArray, leagueAth[i][9])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][10])[0] +` - `+ getGameP(infoArray, leagueAth[i][10])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueAth[i][13])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueAth[i][13])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_athlete">`+ leagueAth[i][4] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][7])[1] +` - `+ getGameP(infoArray, leagueAth[i][7])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][9])[1] +` - `+ getGameP(infoArray, leagueAth[i][9])[0] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][11])[0] +` - `+ getGameP(infoArray, leagueAth[i][11])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueAth[i][14])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueAth[i][14])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_athlete">`+ leagueAth[i][5] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][8])[1] +` - `+ getGameP(infoArray, leagueAth[i][8])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][10])[1] +` - `+ getGameP(infoArray, leagueAth[i][10])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueAth[i][11])[1] +` - `+ getGameP(infoArray, leagueAth[i][11])[0] +`</td>
        <td class="blank_box"></td>
        <td class="w_points">`+ getHaveP(league_info, leagueAth[i][15])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueAth[i][15])[1] +`</td>
      </tr>
      </tbody>
    </table>`
  }

  // エンジョイ（４レグ）の予選リーグ表
  var score_sheet_enjoy1 = "";
  var leagueEn1 = [
    ["table_D", "D", "宮城a", "大山", "渋番屋", "毎コミ", 13, 31, 55, 64, 35, 11, 13, 14, 15, 16],
    ["table_E", "E", "栗ご飯A", "宮城c", "下越セパ", "宮城f", 21, 44, 65, 66, 46, 22, 17, 18, 19, 20],
    ["table_F", "F", "シン・ラポラ", "サッポロ桃太郎", "阪神ラポラ―ズ", "宮城b", 22, 51, 73, 75, 53, 33, 21, 22, 23, 24],
  ]
  for (let i = 0; i < 3; i++) {
    score_sheet_enjoy1 += `
    <table id="`+ leagueEn1[i][0] +`">
      <tbody>
      <tr>
        <td class="group_name color_enjoy">`+ leagueEn1[i][1] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn1[i][2] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn1[i][3] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn1[i][4] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn1[i][5] +`</td>
        <td class="w_points color_enjoy">勝点</td>
        <td class="d_points color_enjoy">得失点</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn1[i][2] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][6])[0] +` - `+ getGameP(infoArray, leagueEn1[i][6])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][7])[0] +` - `+ getGameP(infoArray, leagueEn1[i][7])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][8])[0] +` - `+ getGameP(infoArray, leagueEn1[i][8])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn1[i][12])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn1[i][12])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn1[i][3] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][6])[1] +` - `+ getGameP(infoArray, leagueEn1[i][6])[0] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][9])[0] +` - `+ getGameP(infoArray, leagueEn1[i][9])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][10])[0] +` - `+ getGameP(infoArray, leagueEn1[i][10])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn1[i][13])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn1[i][13])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn1[i][4] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][7])[1] +` - `+ getGameP(infoArray, leagueEn1[i][7])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][9])[1] +` - `+ getGameP(infoArray, leagueEn1[i][9])[0] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][11])[0] +` - `+ getGameP(infoArray, leagueEn1[i][11])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn1[i][14])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn1[i][14])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn1[i][5] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][8])[1] +` - `+ getGameP(infoArray, leagueEn1[i][8])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][10])[1] +` - `+ getGameP(infoArray, leagueEn1[i][10])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn1[i][11])[1] +` - `+ getGameP(infoArray, leagueEn1[i][11])[0] +`</td>
        <td class="blank_box"></td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn1[i][15])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn1[i][15])[1] +`</td>
      </tr>
      </tbody>
    </table>`
  }
  
  // エンジョイ（３レグ）の予選リーグ表
  var score_sheet_enjoy2 = "";
  var leagueEn2 = [
    ["table_G", "G", "千葉B", "竈門\"タン\"治郎", "ふじみ", 24, 42, 62, 25, 26, 27],
    ["table_H", "H", "宮城d", "大山たぬずんたん", "宮城e", 16, 36, 56, 28, 29, 30],
  ]
  for (let i = 0; i < 2; i++) {
    score_sheet_enjoy2 += `
    <table id="`+ leagueEn2[i][0] +`">
      <tbody>
      <tr>
        <td class="group_name color_enjoy">`+ leagueEn2[i][1] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn2[i][2] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn2[i][3] +`</td>
        <td class="team0 color_enjoy">`+ leagueEn2[i][4] +`</td>
        <td class="w_points color_enjoy">勝点</td>
        <td class="d_points color_enjoy">得失点</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn2[i][2] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][5])[0] +` - `+ getGameP(infoArray, leagueEn2[i][5])[1] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][6])[0] +` - `+ getGameP(infoArray, leagueEn2[i][6])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn2[i][8])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn2[i][8])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn2[i][3] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][5])[1] +` - `+ getGameP(infoArray, leagueEn2[i][5])[0] +`</td>
        <td class="blank_box"></td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][7])[0] +` - `+ getGameP(infoArray, leagueEn2[i][7])[1] +`</td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn2[i][9])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn2[i][9])[1] +`</td>
      </tr>
      <tr>
        <td class="team color_enjoy">`+ leagueEn2[i][4] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][6])[1] +` - `+ getGameP(infoArray, leagueEn2[i][6])[0] +`</td>
        <td class="result">`+ getGameP(infoArray, leagueEn2[i][7])[1] +` - `+ getGameP(infoArray, leagueEn2[i][7])[0] +`</td>
        <td class="blank_box"></td>
        <td class="w_points">`+ getHaveP(league_info, leagueEn2[i][10])[0] +`</td>
        <td class="d_points">`+ getHaveP(league_info, leagueEn2[i][10])[1] +`</td>
      </tr>
      </tbody>
    </table>`
  }

  // gsファイルからhtmlへ情報を出力する
  var html = HtmlService.createTemplateFromFile("index");
  html.msg = msg;
  html.info_list = info_list
  html.score_sheet_athlete = score_sheet_athlete
  html.score_sheet_enjoy1 = score_sheet_enjoy1
  html.score_sheet_enjoy2 = score_sheet_enjoy2
  
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

// 広告が押される度にカウントする
function clickAds() {
  const sh = SpreadsheetApp.openById("############################################");
  const ss2 = sh.getSheets()[1];
  var count = ss2.getRange(1, 7).getValue();
  count += 1;
  ss2.getRange(1, 7).setValue(count);
}

