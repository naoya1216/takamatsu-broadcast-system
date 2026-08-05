//==================================================
// 高松道路管制センター 放送支援システム
// script.js
//==================================================


//==================================================
// 共通 音声読み上げ
//==================================================

function speak(text){

    // 空白や改行だけの場合も再生しない
    if(!text || text.trim() === ""){

        alert("先に『放送文作成』を押してください。");
        return;

    }

    // 読み方補正
    text = text.replace(/IC間通行止め/g,"インター間通行止め");
    text = text.replace(/料金所/g,"りょうきんしょ");
    text = text.replace(/JCT/g,"ジャンクション");
    text = text.replace(/SIC/g,"スマートインター");
    text = text.replace(/IC/g,"インターチェンジ");
    text = text.replace(/KP/g,"キロポスト");
    text = text.replace(/車番/g,"しゃばん");
    text = text.replace(/車名/g,"しゃめい");
    text = text.replace(/車色/g,"しゃしょく");
    text = text.replace(/行ってください/g,"おこなってください");
    text = text.replace(/徳島沖洲IC/g,"とくしま おきのす インターチェンジ");
    text = text.replace(/徳島沖洲インターチェンジ/g,"とくしま おきのす インターチェンジ")
    text = text.replace(/三豊鳥坂IC/g,"みとよ とっさか インターチェンジ");
    text = text.replace(/三豊鳥坂インターチェンジ/g,"みとよ とっさか インターチェンジ")
    // ○時00分 → ○時ちょうど
    text = text.replace(/(\d{1,2})時0?0分/g, "$1時ちょうど");
    // 車両トン数の読み方
    text = text.replace(/(\d+)ｔ/g, "$1トン");
    text = text.replace(/(\d+)t/g, "$1トン");
    text = text.replace(/(\d+)T/g, "$1トン");
//=====================================
// IC・JCT・SIC 正式読み方
//=====================================

const readingMap = {

    // 路線
    "高松自動車道":"たかまつじどうしゃどう",
    "高松自動車道坂出支線":"たかまつじどうしゃどう さかいでしせん",
    "松山自動車道":"まつやまじどうしゃどう",
    "高知自動車道":"こうちじどうしゃどう",
    "徳島自動車道":"とくしまじどうしゃどう",
    "徳島南部自動車道":"とくしまなんぶじどうしゃどう",

    // 高松道
    "鳴門JCT":"なるとジャンクション",
    "鳴門IC":"なるとインターチェンジ",
    "板野IC":"いたのインターチェンジ",
    "引田IC":"ひけたインターチェンジ",
    "白鳥大内IC":"しろとりおおちインターチェンジ",
    "津田東IC":"つだひがしインターチェンジ",
    "津田寒川IC":"つださんがわインターチェンジ",
    "志度IC":"しどインターチェンジ",
    "さぬき三木IC":"さぬきみきインターチェンジ",
    "高松東IC":"たかまつひがしインターチェンジ",
    "高松中央IC":"たかまつちゅうおうインターチェンジ",
    "高松檀紙IC":"たかまつだんしインターチェンジ",
    "高松西IC":"たかまつにしインターチェンジ",
    "府中湖SIC":"ふちゅうこスマートインターチェンジ",
    "坂出JCT":"さかいでジャンクション",
    "坂出IC":"さかいでインターチェンジ",
    "善通寺IC":"ぜんつうじインターチェンジ",
    "三豊鳥坂IC":"みとよとっさかインターチェンジ",
    "さぬき豊中IC":"さぬきとよなかインターチェンジ",
    "観音寺SIC":"かんおんじスマートインターチェンジ",
    "大野原IC":"おおのはらインターチェンジ",
    "川之江JCT":"かわのえジャンクション",

    // 松山道
    "三島川之江IC":"みしまかわのえインターチェンジ",
    "土居IC":"どいインターチェンジ",
    "新居浜IC":"にいはまインターチェンジ",
    "いよ西条IC":"いよさいじょうインターチェンジ",
    "いよ小松IC":"いよこまつインターチェンジ",
    "いよ小松JCT":"いよこまつジャンクション",
    "東予丹原IC":"とうよたんばらインターチェンジ",
    "川内IC":"かわうちインターチェンジ",
    "松山IC":"まつやまインターチェンジ",
    "伊予IC":"いよインターチェンジ",
    "中山SIC":"なかやまスマートインターチェンジ",
    "内子五十崎IC":"うちこいかざきインターチェンジ",
    "大洲IC":"おおずインターチェンジ",
    "大洲北只IC":"おおずきただインターチェンジ",

    // 高知道
    "新宮IC":"しんぐうインターチェンジ",
    "大豊IC":"おおとよインターチェンジ",
    "南国IC":"なんこくインターチェンジ",
    "高知IC":"こうちインターチェンジ",
    "伊野IC":"いのインターチェンジ",
    "土佐IC":"とさいんたーちぇんじ",
    "須崎東IC":"すさきひがしインターチェンジ",

    // 徳島道
    "松茂SIC":"まつしげスマートインターチェンジ",
    "藍住IC":"あいずみインターチェンジ",
    "土成IC":"どなりインターチェンジ",
    "脇町IC":"わきまちインターチェンジ",
    "美馬IC":"みまインターチェンジ",
    "吉野川SIC":"よしのがわスマートインターチェンジ",
    "井川池田IC":"いかわいけだインターチェンジ",

    // 徳島南部道
    "徳島沖洲IC":"とくしま おきのす インターチェンジ"
};

// 長い名称から置換
Object.keys(readingMap)
.sort((a,b)=>b.length-a.length)
.forEach(key=>{
    text = text.replaceAll(key, readingMap[key]);
});

// 最後にIC・JCT・SICが残っていたら補正
text = text.replace(/JCT/g,"ジャンクション");
text = text.replace(/SIC/g,"スマートインターチェンジ");
text = text.replace(/IC/g,"インターチェンジ");

    // 少し間を空ける
    text = text.replace(/、/g,"、 ");
    text = text.replace(/。/g,"。 ");

    const speech = new SpeechSynthesisUtterance(text);
const select =
document.getElementById("voiceSelect");

if(select && voices.length > 0){

    speech.voice = voices[select.value];

}
    speech.lang="ja-JP";

    // 少しゆっくり
    speech.rate=0.80;

    speech.pitch=1.0;

    speech.volume=1.0;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(speech);

}



function stopSpeech(){

    window.speechSynthesis.cancel();

}



//==================================================
// 有事指令
//==================================================

function createCommand(){


const road =
document.getElementById("road").value;

const direction =
document.getElementById("direction").value;

const fromIC =
document.getElementById("fromIC").value;

const toIC =
document.getElementById("toIC").value;

const kp =
document.getElementById("kp").value;

const event =
document.getElementById("event").value;



const command =

`高松道路管制センターから各事務所及び各関係機関に現在の高速道路状況をお知らせします。

現在、${road}、${direction}、${fromIC}から${toIC}間、${kp}キロポスト付近で${event}が発生しています。

今後、通行止めになる可能性があります。

対象料金所は準備してください。

以上、高松道路管制センターがお知らせしました。`;


document.getElementById("commandText").value = command;

}

function playCommand(){

    let text =
    document.getElementById("commandText").value;

    // 放送文が未作成なら再生しない
    if(!text || text.trim() === ""){
        alert("先に『放送文作成』を押してください。");
        return;
    }

    saveHistory("🚨 有事指令", text);

    let intro =
"高松道路管制センターから各事務所及び各関係機関に現在の高速道路状況をお知らせします。";

    // 冒頭と締めを除いた本文
    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    let speakText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    speak(speakText);

}
function stopCommand(){

    stopSpeech();

}


//==================================================
// 通行止め
//==================================================

function createClosureCommand(){

    let type =
    document.getElementById("closureType").value;

    let road =
    document.getElementById("road").value;

    let direction =
    document.getElementById("direction").value;

    let fromIC =
    document.getElementById("fromIC").value;

    let toIC =
    document.getElementById("toIC").value;

    let hour =
    document.getElementById("hour").value;

    let minute =
    document.getElementById("minute").value;

    let reason =
    document.getElementById("reason").value;

    let text = "";

    switch(type){

        //==========================
        // 通行止め実施予定
        //==========================
        case "plan":

            text =
`高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め実施予定についてお知らせします。

この後、${hour}時${minute}分をもって、

${road}、

${direction}、

${fromIC}から${toIC}間、

${reason}によるIC間通行止めが、実施予定となりました。

各料金所、了解であれば、了解の合図を送ってください。

なお、乗り継ぎ対象料金所は証明書の発行を願います。

以上、高松道路管制センターがお知らせしました。`;

        break;


        //==========================
        // 通行止め実施
        //==========================
        case "start":

            text =
`高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め実施についてお知らせします。

${hour}時${minute}分 をもって

${road}、

${direction}、

${fromIC}から${toIC}間、

${reason}によるIC間通行止めが実施となりました。

以上、高松道路管制センターがお知らせしました。`;

        break;


        //==========================
        // 通行止め解除予定
        //==========================
        case "releasePlan":

            text =
`高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め解除予定についてお知らせします。

この後、${hour}時${minute}分をもって、

${road}、

${direction}、

${fromIC}から${toIC}間、

${reason}によるIC間通行止めを解除予定です。

各料金所、了解であれば、了解の合図を送ってください。

以上、高松道路管制センターがお知らせしました。`;

        break;


        //==========================
        // 通行止め解除
        //==========================
        case "release":

            text =
`高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め解除についてお知らせします。

${hour}時${minute}分 をもって

${road}、

${direction}、

${fromIC}から${toIC}間の、

${reason}によるIC間通行止めを解除しました。

以上、高松道路管制センターがお知らせしました。`;

        break;

    }

    document.getElementById("closureText").value = text;

}

//==================================================
// 音声再生
//==================================================
function playClosureCommand(){

    let text =
    document.getElementById("closureText").value;

       // 放送文が未作成なら再生しない
    if(!text || text.trim() === ""){
        alert("先に『放送文作成』を押してください。");
        return;
    }


    let type =
    document.getElementById("closureType").value;

    let reason =
    document.getElementById("reason").value;

    let title = "";
    let intro = "";

    switch(type){

        case "plan":
            title = "🚧 通行止め実施予定";
            intro = `高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め実施予定についてお知らせします。`;
       break;

       case "start":
            title = "🚧 通行止め実施";
            intro = `高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め実施についてお知らせします。`;
        break;


        case "releasePlan":
    title = "🚧 通行止め解除予定";
    intro = `高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め解除予定についてお知らせします。`;
break;

        case "release":
    title = "🚧 通行止め解除";
    intro = `高松道路管制センターから各事務所及び各関係機関に、${reason}による通行止め解除についてお知らせします。`;
break;

    }

    saveHistory(title, text);

    // 本文のみ抽出
    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    // 読み上げ専用
    let speakText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    speak(speakText);

}

function stopClosureCommand(){

    stopSpeech();

}

//==================================================
// 了解の合図依頼
//==================================================

function playAcknowledgement(){

    const text =
"各料金所、了解であれば、了解の合図を送ってください。";

    speak(text);

}
//==================================================
// 了解の合図受領
//==================================================

function playAcknowledged(){

    const text =
`了解の合図が取れました。

以上、道路管制センターがお知らせしました。`;

    speak(text);

}

//==================================================
// トンネル進入禁止
//==================================================

function createTunnelCommand(){

    let mode =
    document.getElementById("mode").value;

    let reason =
    document.getElementById("reason").value;

    let hour =
    document.getElementById("hour").value;

    let minute =
    document.getElementById("minute").value;

    let road =
    document.getElementById("road").value;

    let direction =
    document.getElementById("direction").value;

    let fromIC =
    document.getElementById("fromIC").value;

    let toIC =
    document.getElementById("toIC").value;

    let tunnel =
    document.getElementById("tunnel").value;

   
    let intro =
`高松道路管制センターから各事務所及び各関係機関に、${reason}によるトンネル進入禁止、${mode}についてお知らせします。`;

    let body =
`${hour}時${minute}分をもって、

${road}、

${direction}、

${fromIC}から${toIC}間の、

${tunnel}は、

${reason}による、

トンネル進入禁止が、${mode}となりました。`;

    // 画面表示は1回だけ
    let text =
`${intro}

${body}

以上、高松道路管制センターがお知らせしました。`;

    document.getElementById("tunnelText").value = text;

}

function playTunnelCommand(){

    let text =
    document.getElementById("tunnelText").value;

    // 放送文未作成なら再生しない
    if(!text || text.trim() === ""){

        alert("先に『放送文作成』を押してください。");

        return;

    }

    saveHistory("🚧 トンネル進入禁止", text);

    let intro =
`高松道路管制センターから各事務所及び各関係機関に、${document.getElementById("reason").value}によるトンネル進入禁止、${document.getElementById("mode").value}についてお知らせします。`;

    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    let speakText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    speak(applyTunnelReadings(speakText));

}

function stopTunnelCommand(){

    stopSpeech();

}
//==================================================
// トンネル読み方補正
//==================================================

function applyTunnelReadings(text){

    tunnelData.forEach(t =>{

        text = text.replaceAll(
            t.tunnel,
            t.reading
        );

    });

    return text;

}
//==================================================
// IC一覧更新
//==================================================

function updateIC(){

    const road =
    document.getElementById("road").value;

    const fromSelect =
    document.getElementById("fromIC");

    const toSelect =
    document.getElementById("toIC");

    // 初期化
    fromSelect.innerHTML = "";
    toSelect.innerHTML = "";

    // 路線データ取得
    const icList = roadData[road];

    if(!icList) return;

    icList.forEach(ic =>{

        let option1 =
        document.createElement("option");

        option1.value = ic;
        option1.textContent = ic;

        fromSelect.appendChild(option1);

        let option2 =
        document.createElement("option");

        option2.value = ic;
        option2.textContent = ic;

        toSelect.appendChild(option2);

    });
    // ←ここに追加
    updateToIC();

    // ICが変わったのでトンネル一覧も更新
    updateTunnelList();

}
//==================================================
// トンネル一覧更新
//==================================================
function updateTunnelList(){

    const road = document.getElementById("road").value;
    const direction = document.getElementById("direction").value;
    const fromIC = document.getElementById("fromIC").value;
    const toIC = document.getElementById("toIC").value;

    const tunnelSelect = document.getElementById("tunnel");

    tunnelSelect.innerHTML = "";

    const list = tunnelData.filter(t => {

        // 路線が違う
        if(t.road !== road){
            return false;
        }

        // 上下線
        if(direction === "上下線"){

            return (
                (t.fromIC === fromIC && t.toIC === toIC) ||
                (t.fromIC === toIC && t.toIC === fromIC)
            );

        }

        // 上り・下り
        return (
            t.direction === direction &&
            t.fromIC === fromIC &&
            t.toIC === toIC
        );

    });

    if(list.length === 0){

        const option = document.createElement("option");
        option.textContent = "該当なし";
        option.value = "";
        tunnelSelect.appendChild(option);
        return;

    }

    list.forEach(t =>{

        const option = document.createElement("option");

        option.value = t.tunnel;
        option.textContent = t.tunnel;

        tunnelSelect.appendChild(option);

    });

}
//==================================================
// 終点IC自動設定
//==================================================

function updateToIC(){

    const road = document.getElementById("road").value;
    const direction = document.getElementById("direction").value;
    const fromIC = document.getElementById("fromIC").value;

    const toSelect = document.getElementById("toIC");

    const icList = roadData[road];

    if(!icList) return;

    const index = icList.indexOf(fromIC);

    if(index === -1) return;

    // 上り線 → 一つ上のIC
    if(direction === "上り線"){

        if(index > 0){
            toSelect.value = icList[index - 1];
        }

    }

    // 下り線・上下線
else{

    if(index < icList.length - 1){

        toSelect.value = icList[index + 1];

    }

}

updateTunnelList();

}
//==============================
// 夜間工事
//==============================
function createNightCommand(){

    let type = document.getElementById("nightType").value;

    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;

    let sections = [];

    for(let i=1; i<=3; i++){

        let road = document.getElementById("road"+i).value;

        if(road==="") continue;

        let direction = document.getElementById("direction"+i).value;
        let fromIC = document.getElementById("fromIC"+i).value;
        let toIC = document.getElementById("toIC"+i).value;

        sections.push(
`${road}、
${direction}、
${fromIC}から${toIC}間`
        );

    }

    // 区間を連結
    let sectionText = sections.join("、\n及び、\n");

    let text="";

    switch(type){

        //==============================
        // 実施予定
        //==============================
        case "plan":

text =
`高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め実施予定についてお知らせします。

この後、${hour}時${minute}分をもって、

${sectionText}
夜間工事によるIC間通行止めが、実施予定となりました。

以上、高松道路管制センターがお知らせしました。`;

        break;

        //==============================
        // 実施
        //==============================
        case "start":

text =
`高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め実施についてお知らせします。

${hour}時${minute}分をもって、

${sectionText}
夜間工事によるIC間通行止めが、実施となりました。

以上、高松道路管制センターがお知らせしました。`;

        break;

        //==============================
        // 解除予定
        //==============================
        case "releasePlan":

text =
`高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め解除予定についてお知らせします。

この後、${hour}時${minute}分をもって、

${sectionText}
夜間工事によるIC間通行止めが、解除予定となりました。

以上、高松道路管制センターがお知らせしました。`;

        break;

        //==============================
        // 解除
        //==============================
        case "release":

text =
`高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め解除についてお知らせします。

${hour}時${minute}分をもって、

${sectionText}
夜間工事によるIC間通行止めが解除となりました。

以上、高松道路管制センターがお知らせしました。`;

        break;

    }

    document.getElementById("nightText").value = text;

}

function playNightCommand(){

    let text =
    document.getElementById("nightText").value;

       // 放送文が未作成なら再生しない
    if(!text || text.trim() === ""){
        alert("先に『放送文作成』を押してください。");
        return;
    }


    saveHistory("🌙 夜間工事通行止め", text);

    let type =
    document.getElementById("nightType").value;

    let intro = "";

    switch(type){

        case "plan":
            intro = "高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め実施予定についてお知らせします。";
        break;

        case "start":
            intro = "高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め実施についてお知らせします。";
        break;

        case "releasePlan":
            intro = "高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め解除予定についてお知らせします。";
        break;

        case "release":
            intro = "高松道路管制センターから各事務所及び各関係機関に、夜間工事通行止め解除についてお知らせします。";
        break;

    }

    // 本文のみ抽出
    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    // 読み上げ専用
    let speakText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    speak(speakText);

}

function stopNightCommand(){

    stopSpeech();

}

//==================================================
// 未課金車両流入
//==================================================

function createUnpaidCommand(){

let hour =
document.getElementById("hour").value;

let minute =
document.getElementById("minute").value;

let toll =
document.getElementById("toll").value;

let lane =
document.getElementById("lane").value;

let type =
document.getElementById("type").value;

let name =
document.getElementById("carName").value;

let color =
document.getElementById("color").value;

if(name.trim()==""){

    name="不明";

}

if(color.trim()==""){

    color="不明";

}

let kanji =
document.getElementById("kanji").value;

let shakisomi;

if(kanji==="不明"){

    shakisomi="不明";

}else if(kanji==="なにわ"){

    shakisomi="なにわ、ひらがな3文字";

}else{

    shakisomi=kanji+"、漢字"+kanji.length+"文字";

}

let number1 =
document.getElementById("number1").value || "";

let kana =
document.getElementById("kana").value;

let number2 =
document.getElementById("number2").value || "";

// 空欄は不明
if(number1.trim()=="") number1="不明";
if(number2.trim()=="") number2="不明";

let feature =
document.getElementById("feature").value;

let featureText="";

if(feature.trim()!=""){

    featureText=`特徴としましては${feature}です。\n\n`;

}

let vehicleInfo="";

// 必ず表示
vehicleInfo += `車種${type}。\n\n`;
vehicleInfo += `車名${name}。\n\n`;
vehicleInfo += `車色${color}。\n\n`;

// 車番
if(kanji==="不明"){

    vehicleInfo += "車番不明。\n\n";

}else{

    vehicleInfo += `車番、${shakisomi}。\n\n`;

}

// 判明しているものだけ追加
if(number1!=="不明"){

    vehicleInfo += `数字の${number1}。\n\n`;

}

if(kana!=="不明"){

    vehicleInfo += `${kana}。\n\n`;

}

if(number2!=="不明"){

    vehicleInfo += `${number2}。\n\n`;

}

let text =

`高松道路管制センターから各料金所に未課金車両の流入についてお知らせします。

先ほど${hour}時${minute}分ごろ、${toll}${lane}を未課金車両が流入しました。

${vehicleInfo}${featureText}この車両が流出した際は、所定の処理を行ってください。

以上、高松道路管制センターがお知らせしました。`;

document.getElementById("unpaidText").value=text;

}
//==================================================
// 未課金車両流入（続き）
//==================================================
function playUnpaidCommand(){

    let text =
    document.getElementById("unpaidText").value;

       // 放送文が未作成なら再生しない
    if(!text || text.trim() === ""){
        alert("先に『放送文作成』を押してください。");
        return;
    }


    saveHistory("💴 未課金車両流入", text);

    const intro =
    "高松道路管制センターから各料金所に未課金車両の流入についてお知らせします。";

    // 本文のみ抽出
    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    // 読み上げ専用
    let speechText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    // 「数字の555」→「数字の ご、ご、ご」
    speechText = speechText.replace(
        /数字の([0-9]+)/g,
        function(match, num){
            return "数字の" + readNumber(num);
        }
    );

    // 単独の数字（1～4桁）を変換
    speechText = speechText.replace(
        /(^|\n)([0-9]{1,4})(?=\s|。|$)/gm,
        function(match, p1, num){
            return p1 + readNumber(num);
        }
    );

    speak(speechText);

}
 
function readNumber(number){

    const map = {
        "0":"まる",
        "1":"いち",
        "2":"に",
        "3":"さん",
        "4":"よん",
        "5":"ご",
        "6":"ろく",
        "7":"なな",
        "8":"はち",
        "9":"きゅう"
    };

    return String(number)
        .split("")
        .map(n => map[n])
        .join("、");
}
function saveUnpaidVehicle(){

    const vehicle = {

        id: Date.now(),   // 管理番号

        time: document.getElementById("hour").value + ":" +
      document.getElementById("minute").value,

        toll: document.getElementById("toll").value,

        lane: document.getElementById("lane").value,

        carName: document.getElementById("carName").value,

        kanji: document.getElementById("kanji").value,

        number1: document.getElementById("number1").value,

        kana: document.getElementById("kana").value,

        number2: document.getElementById("number2").value,

        status: "流入中"

    };

    let list = JSON.parse(localStorage.getItem("unpaidVehicles") || "[]");

    list.push(vehicle);

    localStorage.setItem("unpaidVehicles", JSON.stringify(list));

    alert("未課金車両を登録しました。");

}
function loadUnpaidVehicleList(){

    let list = JSON.parse(localStorage.getItem("unpaidVehicles") || "[]");

    let html = "";

    if(list.length===0){

        html="<h2>現在登録されている車両はありません。</h2>";

    }else{

        list.forEach((v,index)=>{

            if(v.status!="流入中") return;

            html += `
<div class="vehicle-card">

<h2>車両 ${index+1}</h2>

<p><b>流入時刻</b><br>${v.time}</p>

<p><b>料金所</b><br>${v.toll}</p>

<p><b>レーン</b><br>${v.lane}</p>

<p><b>車名</b><br>${v.carName}</p>

<p><b>車番</b><br>
${v.kanji}
${v.number1}
${v.kana}
${v.number2}
</p>

<button onclick="selectOutflow(${v.id})">
🚓 この車両を流出処理
</button>

<button onclick="deleteVehicle(${v.id})">
🗑 削除
</button>

</div>

<hr>
`;

        });

    }

    document.getElementById("vehicleList").innerHTML = html;

}
function selectOutflow(id){

    let list = JSON.parse(localStorage.getItem("unpaidVehicles") || "[]");

    let vehicle = list.find(v => v.id === id);

    localStorage.setItem(
        "selectedVehicle",
        JSON.stringify(vehicle)
    );

    location.href = "unpaid_out.html";

}
function loadSelectedVehicle(){

    let vehicle =
    JSON.parse(localStorage.getItem("selectedVehicle"));

    if(!vehicle) return;

    document.getElementById("inToll").value = vehicle.toll;

    document.getElementById("inLane").value = vehicle.lane;

    document.getElementById("carName").value = vehicle.carName;

    document.getElementById("kanji").value = vehicle.kanji;

    document.getElementById("number1").value = vehicle.number1;

    document.getElementById("kana").value = vehicle.kana;

    document.getElementById("number2").value = vehicle.number2;

    //=========================
    // 流入時刻を自動入力
    //=========================

    if(vehicle.time){

        let t = vehicle.time.split(":");

        if(t.length === 2){

            document.getElementById("hour").value = t[0];
            document.getElementById("minute").value = t[1];

        }

    }

}
function deleteVehicle(id){

    if(!confirm("この車両を削除しますか？")){
        return;
    }

    let list =
    JSON.parse(localStorage.getItem("unpaidVehicles") || "[]");

    list = list.filter(v => v.id !== id);

    localStorage.setItem(
        "unpaidVehicles",
        JSON.stringify(list)
    );

    loadUnpaidVehicleList();

}
//==================================================
// 未課金車両流出
//==================================================

function createOutflowCommand(){

    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;
    let inToll = document.getElementById("inToll").value;
    let inLane = document.getElementById("inLane").value;

    let name = document.getElementById("carName").value.trim();

    if(name==""){
        name="不明車両";
    }

    //=========================
    // 車番
    //=========================

    let kanji = document.getElementById("kanji").value;
    let shakisomi;

    if(kanji === "不明"){

        shakisomi = "不明";

    }else if(kanji === "なにわ"){

        shakisomi = "なにわ、ひらがな3文字";

    }else{

        shakisomi = kanji + "、漢字" + kanji.length + "文字";

    }

    let number1 = document.getElementById("number1").value || "";
    let kana = document.getElementById("kana").value;
    let number2 = document.getElementById("number2").value || "";

    //=========================
    // 流出情報
    //=========================

    let exitIC = document.getElementById("exitIC").value;
    let outType = document.getElementById("outType").value;

    //=========================
    // 車番文章
    //=========================

    let plateInfo = "";

    if(kanji === "不明"){

        plateInfo += "車番不明。\n\n";

    }else{

        plateInfo += `車番、${shakisomi}。\n\n`;

    }

    if(number1 !== ""){

        plateInfo += `数字の${number1}。\n\n`;

    }

    if(kana !== "不明"){

        plateInfo += `${kana}。\n\n`;

    }

    if(number2 !== ""){

        plateInfo += `${number2}。\n\n`;

    }

    //=========================
    // 放送文
    //=========================

let text =
`高松道路管制センターから各料金所に、未課金車両の流出についてお知らせします。

${hour}時${minute}分頃、

${inToll}${inLane}を未課金で流入した、

車名${name}。

${plateInfo}

この車両は、

${exitIC}を${outType}で流出しました。

よって、この件は解除とします。

以上、高松道路管制センターがお知らせしました。`;

    document.getElementById("outText").value = text;

//=========================
// 登録車両を解除済に変更
//=========================

let vehicle =
JSON.parse(localStorage.getItem("selectedVehicle"));

if(vehicle){

    let list =
    JSON.parse(localStorage.getItem("unpaidVehicles") || "[]");

    let index =
    list.findIndex(v => v.id === vehicle.id);

    if(index >= 0){

        list[index].status = "解除済";

        list[index].releaseTime =
        new Date().toLocaleString("ja-JP");

        localStorage.setItem(
            "unpaidVehicles",
            JSON.stringify(list)
        );

    }

}

// 選択中の車両情報を削除
    localStorage.removeItem("selectedVehicle");

}


function playOutflowCommand(){

    let text = document.getElementById("outText").value;

       // 放送文が未作成なら再生しない
    if(!text || text.trim() === ""){
        alert("先に『放送文作成』を押してください。");
        return;
    }


    saveHistory("💳 未課金車両流出", text);

    const intro =
    "高松道路管制センターから各料金所に、未課金車両の流出についてお知らせします。";

    // 本文のみ抽出
    let body = text
        .replace(intro, "")
        .replace("以上、高松道路管制センターがお知らせしました。", "")
        .trim();

    // 読み上げ専用
    let speechText =
`${intro}

${intro}

${body}

繰り返します。

${body}

以上、高松道路管制センターがお知らせしました。`;

    // 「数字の555」→「数字の ご、ご、ご」
    speechText = speechText.replace(
        /数字の([0-9]+)/g,
        function(match, num){
            return "数字の" + readNumber(num);
        }
    );

    // 後半4桁「1234。」→「いち、に、さん、よん」
    speechText = speechText.replace(
        /\n([0-9]{1,4})\。\n/g,
        function(match, num){
            return "\n" + readNumber(num) + "。\n";
        }
    );

    speak(speechText);

}
function readNumber(number){

    const map = {
        "0":"まる",
        "1":"いち",
        "2":"に",
        "3":"さん",
        "4":"よん",
        "5":"ご",
        "6":"ろく",
        "7":"なな",
        "8":"はち",
        "9":"きゅう"
    };

    return String(number)
        .split("")
        .map(n => map[n])
        .join("、");

}

//==================================================
// 車両手配（ひな形）
//==================================================

function createVehicleCommand(){

    const text =
    document.getElementById("vehicleText");

    if(text){

        text.value =
`道路管制センターから車両手配を行います。

関係車両は現場へ向かってください。`;

    }

}


function playVehicleCommand(){

    const text =
    document.getElementById("vehicleText");

    if(text){

        speak(text.value);

    }

}


function stopVehicleCommand(){

    stopSpeech();

}



//==================================================
// 共通初期化
//==================================================

function clearCommand(){

    if(document.getElementById("commandText")){

        document.getElementById("commandText").value="";

    }

}


function clearUnpaid(){

    if(document.getElementById("unpaidText")){

        document.getElementById("unpaidText").value="";

    }

}



//==================================================
// 将来追加予定
//==================================================

// createClosureCommand()
// createReleaseCommand()
// createEmergencyCommand()
// createPoliceCommand()
// createFireCommand()
// createAmbulanceCommand()




//==================================================
// 起動時
//==================================================

window.speechSynthesis.cancel();
//==============================
// 放送履歴保存
//==============================

function saveHistory(type, text){

    let history =
    JSON.parse(localStorage.getItem("history")) || [];

    history.unshift({

        date: new Date().toLocaleString("ja-JP"),
        type: type,
        text: text

    });

    // 最大100件保存
    if(history.length > 100){

        history.pop();

    }

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

}
function copyHistory(index){

let history =
JSON.parse(localStorage.getItem("history")) || [];

navigator.clipboard.writeText(
history[index].text
);

alert("コピーしました");

}


function deleteHistory(index){

let history =
JSON.parse(localStorage.getItem("history")) || [];

history.splice(index,1);

localStorage.setItem(
"history",
JSON.stringify(history)
);

location.reload();

}
//==============================
// 利用可能な日本語音声を取得
//==============================

let voices = [];

function loadVoices(){

    voices = window.speechSynthesis.getVoices();

    const select = document.getElementById("voiceSelect");

    if(!select) return;

    // スマホは音声選択を非表示
    if(/Android|iPhone|iPad/i.test(navigator.userAgent)){

        select.style.display = "none";

        const label = document.querySelector("label[for='voiceSelect']");

        if(label){

            label.style.display = "none";

        }

        return;

    }

    // PCのみ日本語音声を表示
    select.innerHTML = "";

    voices.forEach((voice,index)=>{

        if(!voice.lang.startsWith("ja")) return;

        const option = document.createElement("option");

        option.value = index;
        option.textContent = voice.name;

        select.appendChild(option);

    });

}

speechSynthesis.onvoiceschanged = loadVoices;
window.onload = loadVoices;