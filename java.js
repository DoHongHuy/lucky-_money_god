

function luckyMoneyTimeCalculation() {
    var thePresentTime = new Date();
    var lotteryTime = new Date(thePresentTime.getFullYear(), thePresentTime.getMonth(), thePresentTime.getDate(), 16, 17, 0, 0);
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
// luckyMoneyTimeCalculation();
var capNhatInterval = setInterval(luckyMoneyTimeCalculation, 1000);

document.addEventListener('DOMContentLoaded', function () {
    const numberOfEnvelopes = 0; //(số lần rơi)
    const totalFallTime = 15; //(totalFallTime:100) phút
    const delayBetweenEnvelopes = totalFallTime / numberOfEnvelopes;

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

        // Mảng chứa thông tin khách hàng may mắn
        var accountLucky = [
            { account: "tienhung101" }, { account: "quochuy102" }, { account: "ngochuong103" }, { account: "hanhphuc104" }, { account: "linhnga105" },
            { account: "thanhdat106" }, { account: "hoanghiep107" }, { account: "quochung108" }, { account: "thanhthao109" }, { account: "vanhieu110" },
            { account: "tuyethuong111" }, { account: "minhthu112" }, { account: "thithao113" }, { account: "vanduong114" }, { account: "tuananh115" },
            { account: "thuytrang116" }, { account: "datnguyen117" }, { account: "hanhviet118" }, { account: "linhphuong119" }, { account: "ngoctuyen120" },
            { account: "hoailong121" }, { account: "nguyenthao122" }, { account: "tientran123" }, { account: "hongtruc124" }, { account: "thanhluan125" },
            { account: "minhha126" }, { account: "vuongquoc127" }, { account: "huongngoc128" }, { account: "nguyenhien129" }, { account: "thithu130" },
            { account: "tanduc131" }, { account: "quanghuy132" }, { account: "hongquyen133" }, { account: "tuanminh134" }, { account: "tramphuong135" },
            { account: "thutrang136" }, { account: "minhquan137" }, { account: "thanhhuong138" }, { account: "huynhnhu139" }, { account: "huyenanh140" },
            { account: "thithuy141" }, { account: "nguyenhuy142" }, { account: "minhduc143" }, { account: "quanghieu144" }, { account: "trangphuc145" },
            { account: "quyentran146" }, { account: "huynhquang147" }, { account: "phamthu148" }, { account: "thanhphong149" }, { account: "huyhoang150" },
            { account: "hongchau151" }, { account: "linhhuong152" }, { account: "duyminh153" }, { account: "thuyduong154" }, { account: "ngoctu155" },
            { account: "quynhanh156" }, { account: "hungtien157" }, { account: "vuthu158" }, { account: "hieuanh159" }, { account: "lehoang160" },
            { account: "duonglam161" }, { account: "ngoctu162" }, { account: "minhduc163" }, { account: "hainguyen164" }, { account: "minhha165" },
            { account: "hanhtrinh166" }, { account: "trantam167" }, { account: "tienlong168" }, { account: "truclinh169" }, { account: "minhtu170" },
            { account: "phamtrinh171" }, { account: "huynhhoa172" }, { account: "nguyetanh173" }, { account: "huyhung174" }, { account: "tranquoc175" },
            { account: "tuyetmai176" }, { account: "quangthinh177" }, { account: "huynhthi178" }, { account: "thuannghia179" }, { account: "hoainam180" },
            // Thêm các khách hàng khác nếu cần
        ];

        // Hàm để che phần tên của người dùng và hiển thị số tiền ngẫu nhiên
        function randomAccountAndMoney(account) {
            var middlePosition = Math.floor(account.length / 3);
            var top = account.substring(0, middlePosition);
            var between = "*".repeat(account.length - middlePosition * 2);
            var last = account.substring(account.length - middlePosition);

            // Tạo số tiền ngẫu nhiên từ 1000 đến 9999
            var moneyRamdon = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

            return {
                accountLucky: top + between + last,
                moneyLucky: moneyRamdon
            };
        }

        // Hàm để thêm danh sách khách hàng vào phần tử g
        function showAllListCustomer() {
             var container = $(".showAllListCustomerLucky");
        
            var container2 =$(".showAllListCustomerLuckyCp");
            var ul = $("<ul>");
            accountLucky.forEach(function (account) {
                var tam = Math.random() < 0.5 ? 2 : 3;
                var anonymousAccount = randomAccountAndMoney(account.account, tam);
console.log(anonymousAccount.accountLucky)
              
                var li = $("<li>").html(`
                <span class="span1">Tài khoản:<em>${anonymousAccount.accountLucky}</em></span>
                <span class="span2">Lì <em>${anonymousAccount.moneyLucky}</em> XU 🧧</span>
            `);
            ul.append(li.clone()); 
            });
            container.append(ul.clone()); // Thêm bản sao của ul vào container
            container2.append(ul); // Thêm ul (không cần clone ở đây nếu muốn chia sẻ cùng một danh sách)
       }
       showAllListCustomer() ;


      