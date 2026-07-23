//==================================================
// 高松道路管制センター 放送支援システム
// script.js
//==================================================



//==================================================
// 共通 音声読み上げ
//==================================================

function speak(text){

    if(text===""){

        alert("放送文を作成してください。");
        return;

    }

    // 読み方補正
    text = text.replace(/料金所/g,"りょうきんしょ");
    text = text.replace(/JCT/g,"ジャンクション");
    text = text.replace(/SIC/g,"スマートインター");
    text = text.replace(/IC/g,"インターチェンジ");
    text = text.replace(/KP/g,"キロポスト");
    //=====================================
// IC・JCT・SIC 正式読み方
//=====================================

const readingMap = {
// 路線名
"高松自動車道":"たかまつじどうしゃどう",
"高松自動車道坂出支線":"たかまつじどうしゃどう さかいでしせん",
"松山自動車道":"まつやまじどうしゃどう",
"高知自動車道":"こうちじどうしゃどう",
"徳島自動車道":"とくしまじどうしゃどう",
"徳島南部自動車道":"とくしまなんぶじどうしゃどう",
    // 高松自動車道
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
    "高松西IC":"たかまつにしインターチェンジ",
    "府中湖SIC":"ふちゅうこスマートインターチェンジ",
    "善通寺IC":"ぜんつうじインターチェンジ",
    "さぬき豊中IC":"さぬきとよなかインターチェンジ",
    "大野原IC":"おおのはらインターチェンジ",
    "観音寺SIC":"かんおんじスマートインターチェンジ",
    "三豊鳥坂IC":"みとよとっさかインターチェンジ",

    // 坂出支線
    "坂出JCT":"さかいでジャンクション",
    "坂出IC":"さかいでインターチェンジ",

    // 松山自動車道
    "川之江JCT":"かわのえジャンクション",
    "三島川之江IC":"みしまかわのえインターチェンジ",
    "土居IC":"どいインターチェンジ",
    "いよ西条IC":"いよさいじょうインターチェンジ",
    "新居浜IC":"にいはまインターチェンジ",
    "いよ小松IC":"いよこまつインターチェンジ",
    "いよ小松JCT":"いよこまつジャンクション",
    "東予丹原IC":"とうよたんばらインターチェンジ",
    "中山SIC":"なかやまスマートインターチェンジ",
    "松山IC":"まつやまインターチェンジ",
    "伊予IC":"いよインターチェンジ",
    "大洲IC":"おおずインターチェンジ",
    "大洲北只IC":"おおずきたただインターチェンジ",

    // 高知自動車道
    "新宮IC":"しんぐうインターチェンジ",
    "大豊IC":"おおとよインターチェンジ",
    "南国IC":"なんこくインターチェンジ",
    "高知IC":"こうちインターチェンジ",
    "伊野IC":"いのインターチェンジ",
    "土佐IC":"とさインターチェンジ",
    "須崎東IC":"すさきひがしインターチェンジ",

    // 徳島自動車道
    "徳島IC":"とくしまインターチェンジ",
    "鳴門JCT":"なるとジャンクション",
    "松茂SIC":"まつしげスマートインターチェンジ",
    "藍住IC":"あいずみインターチェンジ",
    "土成IC":"どなりインターチェンジ",
    "脇町IC":"わきまちインターチェンジ",
    "美馬IC":"みまインターチェンジ",
    "吉野川SIC":"よしのがわスマートインターチェンジ",
    "井川池田IC":"いかわいけだインターチェンジ",
    // 徳島南部自動車道
"徳島沖洲IC":"とくしまおきのすインターチェンジ",
};

// 長い名称から置換（誤置換防止）
Object.keys(readingMap)
.sort((a,b)=>b.length-a.length)
.forEach(key=>{

    text = text.replaceAll(key, readingMap[key]);

});

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

`高松道路管制センターから各関係機関に現在の高速道路状況をお知らせします。

現在、${road}、${direction}、${fromIC}から${toIC}間、${kp}キロポスト付近で${event}が発生しています。

今後、通行止めになる可能性があります。

対象料金所は準備してください。`;


document.getElementById("commandText").value = command;

}



function playCommand(){

let text =
document.getElementById("commandText").value;
saveHistory("🚨 有事指令", text);
speak(text);

}



function stopCommand(){

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

let type =
document.getElementById("type").value;

let name =
document.getElementById("name").value;

let color =
document.getElementById("color").value;

let kanji =
document.getElementById("kanji").value;

let number1 =
document.getElementById("number1").value;

let kana =
document.getElementById("kana").value;

let number2 =
document.getElementById("number2").value;

let feature =
document.getElementById("feature").value;



let text =

`道路管制センターから各料金所に未課金車両の流入についてお知らせします。

先ほど${hour}時${minute}分ごろ、${toll}料金所を未課金車両が流入しました。

車種${type}。

車名${name}。

車色${color}。

車番、漢字${kanji}。

数字の${number1}。

${kana}。

${number2}。

特徴としましては${feature}です。

この車両が流出した際は、所定の処理を行ってください。`;


document.getElementById("unpaidText").value=text;

}
//==================================================
// 未課金車両流入（続き）
//==================================================

function playUnpaidCommand(){

    let text =
    document.getElementById("unpaidText").value;

    speak(text);

}


function stopUnpaidCommand(){

    stopSpeech();

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