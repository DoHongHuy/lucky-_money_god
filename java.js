var _apiPath = "/than-tai-li-xi/v2/";
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    var username = ""
    var userdata = {}
    var swit = true // 防误触
    var jackpor = true //奖池状态
    var page = 1 // 当前页
    var count = 0 //总页数
    var setInt // 获取奖池数据开关
    getTime()
    getInfo()
    getTop()

    // 关闭提示提示窗
    $('.closeDialog4,.closeDialog31').click(function () {
        hide('#alertDialog')
    })
    // 关闭红包弹窗
    $('.closeDialog1').click(function () {
        hide('#hbDialog')
    })
    // 关闭登录弹窗
    $('.closeDialog3').click(function () {
        hide('#loginDialog')
    })
    // 关闭结果弹窗
    $('.closeDialog1').click(function () {
        hide('#resultDialog')
    })
    // 关闭中奖查询
    $('.closeDialog3').click(function () {
        hide('#queryDialog')
    })
    $("#login-facebook").click(function () {
        showAlertDialog('Tính năng đang hoàn thiện! <br />Hãy đăng nhập bằng phương thức khác...')
        show("#dialogBg");
    })
    $("#showLoginDialog").click(function () {
        show('#loginDialog');
    })

    // 获取info
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
    // 获取时间
    function getTime() {
        $.ajax({
            url: _apiPath + "gettime",
            type: 'get',
            dataType: 'json',
            success: function (res) {
                // 情况红包列表 && 归零倒计时
                if (res.status != -1) {
                    $('.cy_up_ul').text('');
                    $('#left_h1,#left_m1,#left_s1').text('00')
                }
                // 是否开启奖池
                if (res.status == -1 || res.status == -2) {
                    if (res.of == '1') {
                        $('#div_left').show()
                        handleMoney(res.jackpor)
                    }
                }
                switch (res.status) {
                    case 1:
                        showAlertDialog('Sự kiện đã kết thúc!')
                        show("#dialogBg");
                        $("#wrap").snowfall('clear');
                        break
                    case 0:
                        changeTime(res.start_time, 'BẮT ĐẦU SAU')
                        $("#wrap").snowfall('clear');
                        break
                    case -2:
                        changeTime(res.start_time, 'ĐỢT KẾ TIẾP')
                        $("#wrap").snowfall('clear');
                        break
                    case -1:
                        swit = true
                        changeTime(res.end_time, 'KẾT THÚC SAU')
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
                        // 获取奖池数据
                        //getJackpor()
                        break
                }
            }
        })
    }

    // 获取中奖名单
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
                            str += '<span class="span1">Tài khoản: <em>' + user.username + '</em></span>'
                            str += '<span class="span2">Lì xì <em>' + user.money + '</em> XU 🧧</span>'
                            str += '</li>';
                        }
                    })
                    $('.cy_up_ul').append(str);
                }
            }
        })
    }
    // 秒转 时分秒
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
                clearInterval(set) // 关掉时间转换的定时
                clearInterval(setInt) // 关掉奖池获取定时
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
                let message = 'Thông tin đăng nhập không đúng';
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
                showAlertDialog("Đừng mở nhiều. Phải bình tĩnh...");
                hide('#hbDialog')
            }
        })

    })

    // 中奖记录
    $('#showRecord').click(function () {
        show('#queryDialog')
    })

    // 奖池金额
    function handleMoney(money) {
        var temp = String(money).split('');
        var l = 8 - temp.length;
        for (var i = 0; i < l; i++) {
            temp.unshift('0')
        }
        var str = temp.join('');
        $('#leftred').text(str)
    }

    // 奖池数据更新
    // function getJackpor() {
    //     $rand = (Math.floor(Math.random() * 5) + 5) * 1000
    //     setInt = setInterval(function () {
    //         $.ajax({
    //             url: '/api/index/getjackpor',
    //             type: 'get',
    //             dataType: 'json',
    //             success: function (res) {
    //                 if (res.code == 200) {
    //                     handleMoney(res.jackpor);
    //                 }
    //             }
    //         })
    //     }, $rand)
    // }


    // 原
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
})
(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}());
(function ($) {
    $.snowfall = function (element, options) {
        var defaults = {
            flakeCount: 35,
            flakeColor: '#ffffff',
            flakePosition: 'absolute',
            flakeIndex: 999999,
            minSize: 1,
            maxSize: 2,
            minSpeed: 1,
            maxSpeed: _isMobile ? 1 : 5,
            round: false,
            shadow: false,
            collection: false,
            collectionHeight: 40,
            deviceorientation: false
        }, options = $.extend(defaults, options),
            random = function random(min, max) {
                return Math.round(min + Math.random() * (max - min));
            };
        $(element).data("snowfall", this);

        function Flake(_x, _y, _size, _speed, _id) {
            this.id = _id;
            this.x = _x;
            this.y = _y;
            this.size = _size;
            this.speed = _speed;
            this.step = 0;
            this.stepSize = random(1, 10) / 100;
            if (options.collection) {
                this.target = canvasCollection[random(0, canvasCollection.length - 1)];
            }
            var flakeMarkup = null;
            if (options.image) {
                flakeMarkup = $(document.createElement("img"));
                flakeMarkup[0].src = options.image;
            } else {
                flakeMarkup = $(document.createElement("div"));
                flakeMarkup.css({
                    'background': options.flakeColor
                });
            }
            flakeMarkup.attr({
                'class': 'snowfall-flakes',
                'id': 'flake-' + this.id
            }).css({
                'width': this.size,
                'position': options.flakePosition,
                'top': this.y,
                'left': this.x,
                'fontSize': 0,
                'zIndex': options.flakeIndex
            });
            if ($(element).get(0).tagName === $(document).get(0).tagName) {
                $('body').append(flakeMarkup);
                element = $('body');
            } else {
                $(element).append(flakeMarkup);
            }
            this.element = document.getElementById('flake-' + this.id);
            this.update = function () {
                this.y += this.speed;
                if (this.y > (elHeight) - (this.size + 6)) {
                    this.reset();
                }
                this.element.style.top = this.y + 'px';
                this.element.style.left = this.x + 'px';
                this.step += this.stepSize;
                if (doRatio === false) {
                    this.x += Math.cos(this.step);
                } else {
                    this.x += (doRatio + Math.cos(this.step));
                }
                if (options.collection) {
                    if (this.x > this.target.x && this.x < this.target.width + this.target.x && this.y > this.target.y && this.y < this.target.height + this.target.y) {
                        var ctx = this.target.element.getContext("2d"),
                            curX = this.x - this.target.x,
                            curY = this.y - this.target.y,
                            colData = this.target.colData;
                        if (colData[parseInt(curX)][parseInt(curY + this.speed + this.size)] !== undefined || curY + this.speed + this.size > this.target.height) {
                            if (curY + this.speed + this.size > this.target.height) {
                                while (curY + this.speed + this.size > this.target.height && this.speed > 0) {
                                    this.speed *= .5;
                                }
                                ctx.fillStyle = "#fff";
                                if (colData[parseInt(curX)][parseInt(curY + this.speed + this.size)] == undefined) {
                                    colData[parseInt(curX)][parseInt(curY + this.speed + this.size)] = 1;
                                    ctx.fillRect(curX, (curY) + this.speed + this.size, this.size, this.size);
                                } else {
                                    colData[parseInt(curX)][parseInt(curY + this.speed)] = 1;
                                    ctx.fillRect(curX, curY + this.speed, this.size, this.size);
                                }
                                this.reset();
                            } else {
                                this.speed = 1;
                                this.stepSize = 0;
                                if (parseInt(curX) + 1 < this.target.width && colData[parseInt(curX) + 1][parseInt(curY) + 1] == undefined) {
                                    this.x++;
                                } else if (parseInt(curX) - 1 > 0 && colData[parseInt(curX) - 1][parseInt(curY) + 1] == undefined) {
                                    this.x--;
                                } else {
                                    ctx.fillStyle = "#fff";
                                    ctx.fillRect(curX, curY, this.size, this.size);
                                    colData[parseInt(curX)][parseInt(curY)] = 1;
                                    this.reset();
                                }
                            }
                        }
                    }
                }
                if (this.x > (elWidth) - widthOffset || this.x < widthOffset) {
                    this.reset();
                }
            }
            this.reset = function () {
                this.y = 0;
                this.x = random(widthOffset, elWidth - widthOffset);
                this.stepSize = random(1, 10) / 100;
                this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
                this.speed = random(options.minSpeed, options.maxSpeed);
            }
        }
        var flakes = [],
            flakeId = 0,
            i = 0,
            elHeight = $(element).height(),
            elWidth = $(element).width(),
            widthOffset = 0,
            snowTimeout = 0;
        if (options.collection !== false) {
            var testElem = document.createElement('canvas');
            if (!!(testElem.getContext && testElem.getContext('2d'))) {
                var canvasCollection = [],
                    elements = $(options.collection),
                    collectionHeight = options.collectionHeight;
                for (var i = 0; i < elements.length; i++) {
                    var bounds = elements[i].getBoundingClientRect(),
                        canvas = document.createElement('canvas'),
                        collisionData = [];
                    if (bounds.top - collectionHeight > 0) {
                        document.body.appendChild(canvas);
                        canvas.style.position = options.flakePosition;
                        canvas.height = collectionHeight;
                        canvas.width = bounds.width;
                        canvas.style.left = bounds.left + 'px';
                        canvas.style.top = bounds.top - collectionHeight + 'px';
                        for (var w = 0; w < bounds.width; w++) {
                            collisionData[w] = [];
                        }
                        canvasCollection.push({
                            element: canvas,
                            x: bounds.left,
                            y: bounds.top - collectionHeight,
                            width: bounds.width,
                            height: collectionHeight,
                            colData: collisionData
                        });
                    }
                }
            } else {
                options.collection = false;
            }
        }
        if ($(element).get(0).tagName === $(document).get(0).tagName) {
            widthOffset = 25;
        }
        $(window).bind("resize", function () {
            elHeight = $(element)[0].clientHeight;
            elWidth = $(element)[0].offsetWidth;
        });
        for (i = 0; i < options.flakeCount; i += 1) {
            flakeId = flakes.length;
            flakes.push(new Flake(random(widthOffset, elWidth - widthOffset), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed), flakeId));
        }
        if (options.round) {
            $('.snowfall-flakes').css({
                '-moz-border-radius': options.maxSize,
                '-webkit-border-radius': options.maxSize,
                'border-radius': options.maxSize
            });
        }
        if (options.shadow) {
            $('.snowfall-flakes').css({
                '-moz-box-shadow': '1px 1px 1px #555',
                '-webkit-box-shadow': '1px 1px 1px #555',
                'box-shadow': '1px 1px 1px #555'
            });
        }
        var doRatio = false;
        if (options.deviceorientation) {
            $(window).bind('deviceorientation', function (event) {
                doRatio = event.originalEvent.gamma * 0.1;
            });
        }

        function snow() {
            for (i = 0; i < flakes.length; i += 1) {
                flakes[i].update();
            }
            snowTimeout = requestAnimationFrame(function () {
                snow()
            });
        }
        snow();
        this.clear = function () {
            $(element).children('.snowfall-flakes').remove();
            flakes = [];
            cancelAnimationFrame(snowTimeout);
        }
    };
    $.fn.snowfall = function (options) {
        if (typeof (options) == "object" || options == undefined) {
            return this.each(function (i) {
                (new $.snowfall(this, options));
            });
        } else if (typeof (options) == "string") {
            return this.each(function (i) {
                var snow = $(this).data('snowfall');
                if (snow) {
                    snow.clear();
                }
            });
        }
    };
})(jQuery);
