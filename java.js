

function luckyMoneyTimeCalculation() {
    var thePresentTime = new Date();
    var lotteryTime = new Date(thePresentTime.getFullYear(), thePresentTime.getMonth(), thePresentTime.getDate(), 16, 15, 0, 0);
    var lotteryTime2 = new Date(thePresentTime.getFullYear(), thePresentTime.getMonth(), thePresentTime.getDate(), 17, 15, 0, 0);
    var lotteryTime3 = new Date(thePresentTime.getFullYear(), thePresentTime.getMonth(), thePresentTime.getDate(), 18, 15, 0, 0);
    var tam = lotteryTime - thePresentTime;
    var remainingHour = Math.floor(tam / (1000 * 60 * 60));
    var remainingMinute = Math.floor((tam % (1000 * 60 * 60)) / (1000 * 60));
    var remainingSecond = Math.floor((tam % (1000 * 60)) / 1000);
    console.log("giơ" + remainingHour +"phut"+ remainingMinute + "giay" + remainingSecond)
   $("#remainingHourCp").html(remainingHour);
   $("#remainingMinuteCp").html(remainingMinute);
   $("#remainingSecondCP").html(remainingSecond);
   $("#hours").html(remainingHour);
   $("#minutes").html(remainingMinute);
   $("#seconds").html(remainingSecond);
}
var capNhatInterval = setInterval(luckyMoneyTimeCalculation, 1000);
    document.addEventListener('DOMContentLoaded', function () {
        var numberOfEnvelopes = 100; //(số lần rơi)
        var totalFallTime = 3; //(totalFallTime:) phút
        var delayBetweenEnvelopes = totalFallTime / numberOfEnvelopes; 
    
        for (let i = 0; i < numberOfEnvelopes; i++) {
            createLuckyMoney(i * delayBetweenEnvelopes); 
        }
    });


function createLuckyMoney(delay) {
    const luckyMoney = document.createElement('img');
    luckyMoney.classList.add('lucky-money');
    luckyMoney.src = 'images/hongbaolixi.png';
    // Random chiều rộng và chiều cao
    const randomWidth = Math.floor(Math.random() * 50) + 80;
    const randomHeight = Math.floor(Math.random() * 50) + 140; 

    luckyMoney.style.width = randomWidth + 'px';
    luckyMoney.style.height = randomHeight + 'px';

    const startPosition = Math.random() * window.innerWidth;
    luckyMoney.style.left = startPosition + 'px';
    luckyMoney.style.animationDuration = '10s';
    luckyMoney.style.animationDelay = delay + 's';
    document.getElementById('lucky-money-container').appendChild(luckyMoney);
    luckyMoney.addEventListener('animationiteration', function () {
        luckyMoney.style.left = Math.random() * window.innerWidth + 'px';
    });
}
$(document).ready(function () {
    // Mảng chứa thông tin khách hàng may mắn
    var accountLucky = [
    { account: "tienhu1" }, { account: "quy102" }, { account: "ngochu03" }, { account: "hanhphu" }, { account: "linh05" },
        { account: "than106" }, { account: "hoang107" }, { account: "qung108" }, { account: "thaao109" }, { account: "vau110" },
        { account: "tuyeng111" }, { account: "min112" }, { account: "thithao113" }, { account: "vandu14" }, { account: "tuan15" },
        { account: "thuyg116" }, { account: "daten117" }, { account: "hant118" }, { account: "linhph119" }, { account: "tuyen120" },
        { account: "hoai121" }, { account: "nguyao122" }, { account: "tientrn123" }, { account: "houc124" }, { account: "tluan125" },
        { account: "min26" }, { account: "vuongq27" }, { account: "huogn28" }, { account: "nguyen129" }, { account: "hu130" },
        { account: "tan31" }, { account: "quanh2" }, { account: "honyen133" }, { account: "tuanmi4" }, { account: "tramng135" },
        { account: "thut136" }, { account: "minh37" }, { account: "thanng138" }, { account: "huyu139" }, { account: "hanh140" },
        { account: "thi141" }, { account: "nguyy142" }, { account: "minh43" }, { account: "quang144" }, { account: "tranc145" },
        { account: "quyan146" }, { account: "huyng147" }, { account: "phamthu148" }, { account: "thhong149" }, { account: "oang150" },
        { account: "honu151" }, { account: "linhhu2" }, { account: "duym53" }, { account: "thung154" }, { account: "ng155" },
        { account: "quyh156" }, { account: "hung157" }, { account: "vuth" }, { account: "hieu59" }, { account: "leho60" },
        { account: "duom161" }, { account: "ngo62" }, { account: "minhdu" }, { account: "hainn164" }, { account: "minh5" },
        { account: "hannh166" }, { account: "tam167" }, { account: "tien168" }, { account: "trucl69" }, { account: "minh0" },
        { account: "phanh171" }, { account: "huoa172" }, { account: "nguyh173" }, { account: "huy174" }, { account: "trac175" },
        { account: "tuai176" }, { account: "quannh177" }, { account: "huyn178" }, { account: "thuhia179" }, { account: "nam180" }
    ];

    // Hàm để ẩn tên tài khoản và hiển thị số tiền ngẫu nhiên
    function randomAccountAndMoney(account) {
        var middlePosition = Math.floor(account.length / 3);
        var top = account.substring(0, middlePosition);
        var between = "*".repeat(account.length - middlePosition * 2);
        var last = account.substring(account.length - middlePosition);

        // Tạo số tiền ngẫu nhiên từ 1000 đến 9999
        var moneyRandom = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

        return {
            accountLucky: top + between + last,
            moneyLucky: moneyRandom
        };
    }

    // Hàm để hiển thị danh sách khách hàng
    function showAllListCustomer() {
        var container = $("#showAllListCustomerLucky");
        var container2 = $("#showAllListCustomerLuckyCp");
        accountLucky.forEach(function (account) {
            var tam = Math.random() < 0.5 ? 2 : 3;
            var anonymousAccount = randomAccountAndMoney(account.account);
            var li = $("<li>").html(`
                <span class="span1">Tài khoản:<em>${anonymousAccount.accountLucky}</em></span>
                <span class="span2">Lì <em>${anonymousAccount.moneyLucky}</em> XU 🧧</span>
            `);
            var ul = $("<ul>").append(li.clone());
            var ul2 = $("<ul>").append(li.clone());
            container.append(ul);
            container2.append(ul2);
        });

      
    }

    // Gọi hàm để hiển thị danh sách khách hàng
    showAllListCustomer();
});