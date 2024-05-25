var soru = 0;
var taked_answer = true;
var saniye = 10;
var IntervalID;

document.querySelector("#start_btn").addEventListener("click",RenderGame)
var body = document.querySelector(".main");

function Sorular(SoruMetni,Cevaplar,DogruCevap) {
    this.SoruMetni = SoruMetni;
    this.Cevaplar = Cevaplar;
    this.DogruCevap = DogruCevap;
    Sorular.prototype.CevabıKontrolEt = function(cevap){
        return cevap == DogruCevap
    }
}

var sorular = [
    new Sorular("Hangisi js paket yönetim uygulamasıdır1?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır2?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır3?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır4?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır5?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır6?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır7?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır8?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
    new Sorular("Hangisi js paket yönetim uygulamasıdır9?",{a:"NodeJs",b:"TypeScrpipt",c:"Npm",d:"Nuget"},"c"),
];

function YeniSoru() {
    soru+=1;
    taked_answer = true;
    RenderGame()
}

function RenderResult(control,false_answer) {
    if(taked_answer){
        if(!control && false_answer){
            document.querySelector(`.${false_answer}`).classList.add("false");
        }
        document.querySelector(`.${sorular[soru].DogruCevap}`).classList.add("true");

        taked_answer = false;

        document.querySelector(".footer").insertAdjacentHTML("beforeend",`
            <button class="sonraki_soru">Sonraki Soruya Geç</button>
        `);

        document.querySelector(".sonraki_soru").addEventListener("click",YeniSoru);
        clearInterval(IntervalID)
    }
}

function RenderGame() {
    saniye = 10;
    IntervalID = setInterval(() => {
        saniye--;
        document.querySelector(".saniye").innerHTML = saniye;
        if(saniye == 0){
            clearInterval(IntervalID);
            RenderResult();
        }
    }, 1000);

    body.innerHTML = "";
    body.innerHTML = `
        <div class="box">
            <div class="head">
                <p class="title">Quiz App</p>
                <div class="süre">
                    <div>
                        <p>Kalan süre</p>
                        <p class="saniye">10</p>
                    </div>
                </div>
            </div>

            <div class="main_app">
                <p class="soru_metni">${soru + 1}-${sorular[soru].SoruMetni}</p>
                <div class="secenek a">
                    <p class="sik"><b>a: </b>${sorular[soru].Cevaplar.a}</p>
                </div>
                <div class="secenek b">
                    <p class="sik"><b>b: </b>${sorular[soru].Cevaplar.b}</p>
                </div>
                <div class="secenek c">
                    <p class="sik"><b>c: </b>${sorular[soru].Cevaplar.c}</p>
                </div>
                <div class="secenek d">
                    <p class="sik"><b>d: </b>${sorular[soru].Cevaplar.d}</p>
                </div>
            </div>

            <div class="footer">
                <div class="soru_sayısı">${soru + 1}/${sorular.length}</div>
            </div>
        </div>
    `;

    var siklar = document.querySelectorAll(".secenek");
    siklar.forEach(sik => {
        sik.addEventListener("click",function() {
            const secilen_soru = sorular[soru];
            var control = secilen_soru.CevabıKontrolEt(sik.classList[1]);
            RenderResult(control,sik.classList[1]);
        })
    })
}