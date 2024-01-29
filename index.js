
    var username = ""
    var userdata = {}
    var swit = true // é˜²è¯¯è§¦
    var jackpor = true //å¥–æ± ç¶æ€
    var page = 1 // å½“å‰é¡µ
    var count = 0 //æ€»é¡µæ•°
    var setInt // è·å–å¥–æ± æ•°æ®å¼€å…³
    getTime()
    getInfo()
    getTop()
    var _apiPath = "/than-tai-li-xi/v2/";

    // å…³é—­æç¤ºæç¤ºçª—
    $('.closeDialog4,.closeDialog31').click(function () {
        hide('#alertDialog')
    })
    // å…³é—­çº¢åŒ…å¼¹çª—
    $('.closeDialog1').click(function () {
        hide('#hbDialog')
    })
    // å…³é—­ç™»å½•å¼¹çª—
    $('.closeDialog3').click(function () {
        hide('#loginDialog')
    })
    // å…³é—­ç»“æœå¼¹çª—
    $('.closeDialog1').click(function () {
        hide('#resultDialog')
    })
    // å…³é—­ä¸­å¥–æŸ¥è¯¢
    $('.closeDialog3').click(function () {
        hide('#queryDialog')
    })
    // è·å–info
    function getInfo() {
        $.ajax({
            url: _apiPath + 'getpccode',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                $("#info1").html(res.info1);
                $("#info2").html(res.info2);
            }
        })
    }
    // è·å–æ—¶é—´
    function getTime() {
        $.ajax({
            url: _apiPath + "gettime",
            type: 'get',
            dataType: 'json',
            success: function (res) {
                // æƒ…å†µçº¢åŒ…åˆ—è¡¨ && å½’é›¶å€’è®¡æ—¶
                if (res.status != -1) {
                    $('.cy_up_ul').text('');
                    $('#left_h1,#left_m1,#left_s1').text('00')
                }
                // æ˜¯å¦å¼€å¯å¥–æ± 
                if (res.status == -1 || res.status == -2) {
                    if (res.of == '1') {
                        $('#div_left').show()
                        handleMoney(res.jackpor)
                    }
                }
                switch (res.status) {
                    case 1:
                        showAlertDialog('Sá»± kiá»‡n Ä‘Ă£ káº¿t thĂºc!')
                        show("#dialogBg");
                        $("#wrap").snowfall('clear');
                        break
                    case 0:
                        changeTime(res.start_time, 'Báº®T Äáº¦U SAU')
                        $("#wrap").snowfall('clear');
                        break
                    case -2:
                        changeTime(res.start_time, 'Äá»¢T Káº¾ TIáº¾P')
                        $("#wrap").snowfall('clear');
                        break
                    case -1:
                        swit = true
                        changeTime(res.end_time, 'Káº¾T THĂC SAU')
                        getTop()
                        $("#wrap").snowfall({
                            image: _staticContextPath + "/images/hongbao.png",
                            flakeCount: 25,
                            minSize: _isMobile ? 25 : 50,
                            maxSize: _isMobile ? 50 : 100
                        });
                        $('.snowfall-flakes').on('click', function () {
                            if (_isAuth) {
                                show("#hbDialog");
                            } else {
                                show('#loginDialog');
                            }
                        })
                        // è·å–å¥–æ± æ•°æ®
                        //getJackpor()
                        break
                }
            }
        })
    }

    // è·å–ä¸­å¥–åå•
    function getTop() {
        $.ajax({
            url: _apiPath + 'gettop',
            type: 'get',
            dataType: 'json',
            success: function (res) {
                if (res.code == 200) {
                    var str = ''
                    $.each(res.data, function (i, user) {
                        if (user) {
                            str += '<li>'
                            str += '<span class="span1">TĂ i khoáº£n: <em>' + user.username + '</em></span>'
                            str += '<span class="span2">LĂ¬ xĂ¬ <em>' + user.money + '</em> XU đŸ§§</span>'
                            str += '</li>';
                        }
                    })
                    $('.cy_up_ul').append(str);
                }
            }
        })
    }
    // ç§’è½¬ æ—¶åˆ†ç§’
    function changeTime(second, title) {
        $('#div_title').text(title)
        var set = setInterval(function () {
            var h = Math.floor(second / 60 / 60);
            var i = Math.floor((second - h * 60 * 60) / 60);
            var s = second % 60;
            $('#left_h1').text(h)
            $('#left_m1').text(i)
            $('#left_s1').text(s)
            second -= 1
            if (second <= 0) {
                clearInterval(set) // å…³æ‰æ—¶é—´è½¬æ¢ç„å®æ—¶
                clearInterval(setInt) // å…³æ‰å¥–æ± è·å–å®æ—¶
                setTimeout(function () {
                    getTime()
                }, 1000)
                window.location.reload();
            }
        }, 1000)
    }

    $('#check').click(function () {
        const serializedData = $('#form-login').serialize();
        $.ajax({
            url: "/users/login",
            type: 'POST',
            data: serializedData,
            dataType: "json",
            beforeSend: function (xhr, settings) {
                $(this).attr('disabled', 'disabled');
            },
            success: function (response) {
                let message = null;
                typeof response.message === "object" ? message = response.message.join('<br>') : message = response.message;
                showAlertDialog(message)
                setTimeout(function () {
                    window.location.reload();
                }, 500);
            },
            error: function (response) {
                let message = 'ThĂ´ng tin Ä‘Äƒng nháº­p khĂ´ng Ä‘Ăºng';
                showAlertDialog(message)
                $(this).removeAttr("disabled", "disabled");
            },
        });
    })

    // Draw
    $('#draw').click(function () {
        $.ajax({
            url: _apiDraw,
            type: 'post',
            data: { '_token': $('meta[name=csrf-token]').attr('content') },
            dataType: 'json',
            success: function (res) {
                if (res.code == 1) {
                    $('#hbDialog').addClass("shake");
                    $('#resultMoney').text(res.gift_value)
                    $('#resultTimes').text(res.message)
                    setTimeout(function () {
                        $('#hbDialog').removeClass("shake");
                        $("#hbDialog").addClass("out").fadeOut();
                        $("#resultDialog").fadeIn().addClass("in");
                        setTimeout(function () {
                            $("#hbDialog").removeClass("out");
                            $("#resultDialog").removeClass("in");
                        }, 300);
                    }, 300);
                } else {
                    showAlertDialog(res.message)
                    hide('#loginDialog')
                }
            },
            error: function (res) {
                showAlertDialog("Äá»«ng má»Ÿ nhiá»u. Pháº£i bĂ¬nh tÄ©nh...");
                hide('#hbDialog')
            }
        })

    })

    // ä¸­å¥–è®°å½•
    $('#showRecord').click(function () {
        show('#queryDialog')
    })

    // å¥–æ± é‡‘é¢
    function handleMoney(money) {
        var temp = String(money).split('');
        var l = 8 - temp.length;
        for (var i = 0; i < l; i++) {
            temp.unshift('0')
        }
        var str = temp.join('');
        $('#leftred').text(str)
    }
    function show(selector) {
        $(selector).show();
        $('#dialogBg').show();
    }

    function hide(selector) {
        $(selector).hide();
        $('#dialogBg').hide();
    }

    function showAlertDialog(alertInfo) {
        $("#alertInfo").html(alertInfo);
        show("#alertDialog");
    }


    