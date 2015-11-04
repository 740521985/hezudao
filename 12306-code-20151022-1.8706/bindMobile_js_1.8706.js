/*!
 * SuperSlide v2.0 
 * 轻松解决网站大部分特效展示问题
 * 详尽信息请看官网：http://www.SuperSlide2.com/
 *
 * Copyright 2011-2013, 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途
 */
(function(b) {
    b.fn.slide = function(a) {
        return b.fn.slide.defaults = {
            effect: "fade",
            autoPlay: !1,
            delayTime: 500,
            interTime: 2500,
            triggerTime: 150,
            defaultIndex: 0,
            titCell: ".hd li",
            mainCell: ".bd",
            targetCell: null ,
            trigger: "mouseover",
            scroll: 1,
            vis: 1,
            titOnClassName: "on",
            autoPage: !1,
            prevCell: ".prev",
            nextCell: ".next",
            pageStateCell: ".pageState",
            opp: !1,
            pnLoop: !0,
            easing: "linear",
            startFun: null ,
            endFun: null ,
            switchLoad: null 
        },
        this.each(function() {
            var ar = b.extend({}, b.fn.slide.defaults, a)
              , aq = ar.effect
              , ap = b(ar.prevCell, b(this))
              , ao = b(ar.nextCell, b(this))
              , an = b(ar.pageStateCell, b(this))
              , am = b(ar.titCell, b(this))
              , al = am.size()
              , ak = b(ar.mainCell, b(this))
              , aj = ak.children().size()
              , ai = ar.switchLoad;
            if (null  != ar.targetCell) {
                var ah = b(ar.targetCell, b(this))
            }
            var ag = parseInt(ar.defaultIndex)
              , af = parseInt(ar.delayTime)
              , ae = parseInt(ar.interTime);
            parseInt(ar.triggerTime);
            var ab = parseInt(ar.scroll)
              , Z = parseInt(ar.vis)
              , X = "false" == ar.autoPlay || 0 == ar.autoPlay ? !1 : !0
              , V = "false" == ar.opp || 0 == ar.opp ? !1 : !0
              , T = "false" == ar.autoPage || 0 == ar.autoPage ? !1 : !0
              , R = "false" == ar.pnLoop || 0 == ar.pnLoop ? !1 : !0
              , P = 0
              , N = 0
              , L = 0
              , ad = 0
              , ac = ar.easing
              , aa = null 
              , Y = ag;
            if (0 == al && (al = aj),
            T) {
                var W = aj - Z;
                al = 1 + parseInt(0 != W % ab ? W / ab + 1 : W / ab),
                0 >= al && (al = 1),
                am.html("");
                for (var U = 0; al > U; U++) {
                    am.append("<li>" + (U + 1) + "</li>")
                }
                var am = b("li", am)
            }
            if (ak.children().each(function() {
                b(this).width() > L && (L = b(this).width(),
                N = b(this).outerWidth(!0)),
                b(this).height() > ad && (ad = b(this).height(),
                P = b(this).outerHeight(!0))
            }
            ),
            aj >= Z) {
                switch (aq) {
                case "fold":
                    ak.css({
                        position: "relative",
                        width: N,
                        height: P
                    }).children().css({
                        position: "absolute",
                        width: L,
                        left: 0,
                        top: 0,
                        display: "none"
                    });
                    break;
                case "top":
                    ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Z * P + 'px"></div>').css({
                        position: "relative",
                        padding: "0",
                        margin: "0"
                    }).children().css({
                        height: ad
                    });
                    break;
                case "left":
                    ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + Z * N + 'px"></div>').css({
                        width: aj * N,
                        position: "relative",
                        overflow: "hidden",
                        padding: "0",
                        margin: "0"
                    }).children().css({
                        "float": "left",
                        width: L
                    });
                    break;
                case "leftLoop":
                case "leftMarquee":
                    ak.children().clone().appendTo(ak).clone().prependTo(ak),
                    ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + Z * N + 'px"></div>').css({
                        width: 3 * aj * N,
                        position: "relative",
                        overflow: "hidden",
                        padding: "0",
                        margin: "0",
                        left: -aj * N
                    }).children().css({
                        "float": "left",
                        width: L
                    });
                    break;
                case "topLoop":
                case "topMarquee":
                    ak.children().clone().appendTo(ak).clone().prependTo(ak),
                    ak.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + Z * P + 'px"></div>').css({
                        height: 3 * aj * P,
                        position: "relative",
                        padding: "0",
                        margin: "0",
                        top: -aj * P
                    }).children().css({
                        height: ad
                    })
                }
            }
            var S = function() {
                b.isFunction(ar.startFun) && ar.startFun(ag, al)
            }
              , Q = function() {
                b.isFunction(ar.endFun) && ar.endFun(ag, al)
            }
              , O = function(c) {
                c.eq(ag).find("img").each(function() {
                    b(this).attr(ai) !== void 0 && b(this).attr("src", b(this).attr(ai)).removeAttr(ai)
                }
                )
            }
              , M = function(d) {
                if (Y != ag || d || "leftMarquee" == aq || "topMarquee" == aq) {
                    switch (aq) {
                    case "fade":
                    case "fold":
                    case "top":
                    case "left":
                        ag >= al ? ag = 0 : 0 > ag && (ag = al - 1);
                        break;
                    case "leftMarquee":
                    case "topMarquee":
                        ag >= 1 ? ag = 1 : 0 >= ag && (ag = 0);
                        break;
                    case "leftLoop":
                    case "topLoop":
                        var c = ag - Y;
                        al > 2 && c == -(al - 1) && (c = 1),
                        al > 2 && c == al - 1 && (c = -1);
                        var g = Math.abs(c * ab);
                        ag >= al ? ag = 0 : 0 > ag && (ag = al - 1)
                    }
                    if (S(),
                    null  != ai && O(ak.children()),
                    ah && (null  != ai && O(ah),
                    ah.hide().eq(ag).animate({
                        opacity: "show"
                    }, af, function() {
                        ak[0] || Q()
                    }
                    )),
                    aj >= Z) {
                        switch (aq) {
                        case "fade":
                            ak.children().stop(!0, !0).eq(ag).animate({
                                opacity: "show"
                            }, af, ac, function() {
                                Q()
                            }
                            ).siblings().hide();
                            break;
                        case "fold":
                            ak.children().stop(!0, !0).eq(ag).animate({
                                opacity: "show"
                            }, af, ac, function() {
                                Q()
                            }
                            ).siblings().animate({
                                opacity: "hide"
                            }, af, ac);
                            break;
                        case "top":
                            ak.stop(!0, !1).animate({
                                top: -ag * ab * P
                            }, af, ac, function() {
                                Q()
                            }
                            );
                            break;
                        case "left":
                            ak.stop(!0, !1).animate({
                                left: -ag * ab * N
                            }, af, ac, function() {
                                Q()
                            }
                            );
                            break;
                        case "leftLoop":
                            0 > c ? ak.stop(!0, !0).animate({
                                left: -(aj - g) * N
                            }, af, ac, function() {
                                for (var h = 0; g > h; h++) {
                                    ak.children().last().prependTo(ak)
                                }
                                ak.css("left", -aj * N),
                                Q()
                            }
                            ) : ak.stop(!0, !0).animate({
                                left: -(aj + g) * N
                            }, af, ac, function() {
                                for (var h = 0; g > h; h++) {
                                    ak.children().first().appendTo(ak)
                                }
                                ak.css("left", -aj * N),
                                Q()
                            }
                            );
                            break;
                        case "topLoop":
                            0 > c ? ak.stop(!0, !0).animate({
                                top: -(aj - g) * P
                            }, af, ac, function() {
                                for (var h = 0; g > h; h++) {
                                    ak.children().last().prependTo(ak)
                                }
                                ak.css("top", -aj * P),
                                Q()
                            }
                            ) : ak.stop(!0, !0).animate({
                                top: -(aj + g) * P
                            }, af, ac, function() {
                                for (var h = 0; g > h; h++) {
                                    ak.children().first().appendTo(ak)
                                }
                                ak.css("top", -aj * P),
                                Q()
                            }
                            );
                            break;
                        case "leftMarquee":
                            var f = ak.css("left").replace("px", "");
                            0 == ag ? ak.animate({
                                left: ++f
                            }, 0, function() {
                                if (ak.css("left").replace("px", "") >= 0) {
                                    for (var h = 0; aj > h; h++) {
                                        ak.children().last().prependTo(ak)
                                    }
                                    ak.css("left", -aj * N)
                                }
                            }
                            ) : ak.animate({
                                left: --f
                            }, 0, function() {
                                if (2 * -aj * N >= ak.css("left").replace("px", "")) {
                                    for (var h = 0; aj > h; h++) {
                                        ak.children().first().appendTo(ak)
                                    }
                                    ak.css("left", -aj * N)
                                }
                            }
                            );
                            break;
                        case "topMarquee":
                            var e = ak.css("top").replace("px", "");
                            0 == ag ? ak.animate({
                                top: ++e
                            }, 0, function() {
                                if (ak.css("top").replace("px", "") >= 0) {
                                    for (var h = 0; aj > h; h++) {
                                        ak.children().last().prependTo(ak)
                                    }
                                    ak.css("top", -aj * P)
                                }
                            }
                            ) : ak.animate({
                                top: --e
                            }, 0, function() {
                                if (2 * -aj * P >= ak.css("top").replace("px", "")) {
                                    for (var h = 0; aj > h; h++) {
                                        ak.children().first().appendTo(ak)
                                    }
                                    ak.css("top", -aj * P)
                                }
                            }
                            )
                        }
                    }
                    am.removeClass(ar.titOnClassName).eq(ag).addClass(ar.titOnClassName),
                    Y = ag,
                    0 == R && (ao.removeClass("nextStop"),
                    ap.removeClass("prevStop"),
                    0 == ag ? ap.addClass("prevStop") : ag == al - 1 && ao.addClass("nextStop")),
                    an.html("<span>" + (ag + 1) + "</span>/" + al)
                }
            }
            ;
            M(!0),
            X && ("leftMarquee" == aq || "topMarquee" == aq ? (V ? ag-- : ag++,
            aa = setInterval(M, ae),
            ak.hover(function() {
                X && clearInterval(aa)
            }
            , function() {
                X && (clearInterval(aa),
                aa = setInterval(M, ae))
            }
            )) : (aa = setInterval(function() {
                V ? ag-- : ag++,
                M()
            }
            , ae),
            b(this).hover(function() {
                X && clearInterval(aa)
            }
            , function() {
                X && (clearInterval(aa),
                aa = setInterval(function() {
                    V ? ag-- : ag++,
                    M()
                }
                , ae))
            }
            )));
            var q;
            "mouseover" == ar.trigger ? am.hover(function() {
                ag = am.index(this),
                q = window.setTimeout(M, ar.triggerTime)
            }
            , function() {
                clearTimeout(q)
            }
            ) : am.click(function() {
                ag = am.index(this),
                M()
            }
            ),
            ao.click(function() {
                (1 == R || ag != al - 1) && (ag++,
                M())
            }
            ),
            ap.click(function() {
                (1 == R || 0 != ag) && (ag--,
                M())
            }
            )
        }
        )
    }
}
)(jQuery),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(g, f, j, i, h) {
        return jQuery.easing[jQuery.easing.def](g, f, j, i, h)
    },
    easeInQuad: function(g, f, j, i, h) {
        return i * (f /= h) * f + j
    },
    easeOutQuad: function(g, f, j, i, h) {
        return -i * (f /= h) * (f - 2) + j
    },
    easeInOutQuad: function(g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f + j : -i / 2 * (--f * (f - 2) - 1) + j
    },
    easeInCubic: function(g, f, j, i, h) {
        return i * (f /= h) * f * f + j
    },
    easeOutCubic: function(g, f, j, i, h) {
        return i * ((f = f / h - 1) * f * f + 1) + j
    },
    easeInOutCubic: function(g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f + j : i / 2 * ((f -= 2) * f * f + 2) + j
    },
    easeInQuart: function(g, f, j, i, h) {
        return i * (f /= h) * f * f * f + j
    },
    easeOutQuart: function(g, f, j, i, h) {
        return -i * ((f = f / h - 1) * f * f * f - 1) + j
    },
    easeInOutQuart: function(g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f * f + j : -i / 2 * ((f -= 2) * f * f * f - 2) + j
    },
    easeInQuint: function(g, f, j, i, h) {
        return i * (f /= h) * f * f * f * f + j
    },
    easeOutQuint: function(g, f, j, i, h) {
        return i * ((f = f / h - 1) * f * f * f * f + 1) + j
    },
    easeInOutQuint: function(g, f, j, i, h) {
        return 1 > (f /= h / 2) ? i / 2 * f * f * f * f * f + j : i / 2 * ((f -= 2) * f * f * f * f + 2) + j
    },
    easeInSine: function(g, f, j, i, h) {
        return -i * Math.cos(f / h * (Math.PI / 2)) + i + j
    },
    easeOutSine: function(g, f, j, i, h) {
        return i * Math.sin(f / h * (Math.PI / 2)) + j
    },
    easeInOutSine: function(g, f, j, i, h) {
        return -i / 2 * (Math.cos(Math.PI * f / h) - 1) + j
    },
    easeInExpo: function(g, f, j, i, h) {
        return 0 == f ? j : i * Math.pow(2, 10 * (f / h - 1)) + j
    },
    easeOutExpo: function(g, f, j, i, h) {
        return f == h ? j + i : i * (-Math.pow(2, -10 * f / h) + 1) + j
    },
    easeInOutExpo: function(g, f, j, i, h) {
        return 0 == f ? j : f == h ? j + i : 1 > (f /= h / 2) ? i / 2 * Math.pow(2, 10 * (f - 1)) + j : i / 2 * (-Math.pow(2, -10 * --f) + 2) + j
    },
    easeInCirc: function(g, f, j, i, h) {
        return -i * (Math.sqrt(1 - (f /= h) * f) - 1) + j
    },
    easeOutCirc: function(g, f, j, i, h) {
        return i * Math.sqrt(1 - (f = f / h - 1) * f) + j
    },
    easeInOutCirc: function(g, f, j, i, h) {
        return 1 > (f /= h / 2) ? -i / 2 * (Math.sqrt(1 - f * f) - 1) + j : i / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + j
    },
    easeInElastic: function(j, i, p, o, n) {
        var m = 1.70158
          , l = 0
          , k = o;
        if (0 == i) {
            return p
        }
        if (1 == (i /= n)) {
            return p + o
        }
        if (l || (l = 0.3 * n),
        Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return -(k * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l)) + p
    },
    easeOutElastic: function(j, i, p, o, n) {
        var m = 1.70158
          , l = 0
          , k = o;
        if (0 == i) {
            return p
        }
        if (1 == (i /= n)) {
            return p + o
        }
        if (l || (l = 0.3 * n),
        Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return k * Math.pow(2, -10 * i) * Math.sin((i * n - m) * 2 * Math.PI / l) + o + p
    },
    easeInOutElastic: function(j, i, p, o, n) {
        var m = 1.70158
          , l = 0
          , k = o;
        if (0 == i) {
            return p
        }
        if (2 == (i /= n / 2)) {
            return p + o
        }
        if (l || (l = n * 0.3 * 1.5),
        Math.abs(o) > k) {
            k = o;
            var m = l / 4
        } else {
            var m = l / (2 * Math.PI) * Math.asin(o / k)
        }
        return 1 > i ? -0.5 * k * Math.pow(2, 10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l) + p : 0.5 * k * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * n - m) * 2 * Math.PI / l) + o + p
    },
    easeInBack: function(h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        k * (g /= j) * g * ((i + 1) * g - i) + l
    },
    easeOutBack: function(h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        k * ((g = g / j - 1) * g * ((i + 1) * g + i) + 1) + l
    },
    easeInOutBack: function(h, g, l, k, j, i) {
        return void 0 == i && (i = 1.70158),
        1 > (g /= j / 2) ? k / 2 * g * g * (((i *= 1.525) + 1) * g - i) + l : k / 2 * ((g -= 2) * g * (((i *= 1.525) + 1) * g + i) + 2) + l
    },
    easeInBounce: function(g, f, j, i, h) {
        return i - jQuery.easing.easeOutBounce(g, h - f, 0, i, h) + j
    },
    easeOutBounce: function(g, f, j, i, h) {
        return 1 / 2.75 > (f /= h) ? i * 7.5625 * f * f + j : 2 / 2.75 > f ? i * (7.5625 * (f -= 1.5 / 2.75) * f + 0.75) + j : 2.5 / 2.75 > f ? i * (7.5625 * (f -= 2.25 / 2.75) * f + 0.9375) + j : i * (7.5625 * (f -= 2.625 / 2.75) * f + 0.984375) + j
    },
    easeInOutBounce: function(g, f, j, i, h) {
        return h / 2 > f ? 0.5 * jQuery.easing.easeInBounce(g, 2 * f, 0, i, h) + j : 0.5 * jQuery.easing.easeOutBounce(g, 2 * f - h, 0, i, h) + 0.5 * i + j
    }
});
/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) {
                if (b && b.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.")
                }
                return
            }
            var c = a.data(this[0], "validator");
            if (c) {
                return c
            }
            this.attr("novalidate", "novalidate");
            c = new a.validator(b,this[0]);
            a.data(this[0], "validator", c);
            if (c.settings.onsubmit) {
                this.validateDelegate(":submit", "click", function(d) {
                    if (c.settings.submitHandler) {
                        c.submitButton = d.target
                    }
                    if (a(d.target).hasClass("cancel")) {
                        c.cancelSubmit = true
                    }
                    if (a(d.target).attr("formnovalidate") !== undefined) {
                        c.cancelSubmit = true
                    }
                }
                );
                this.submit(function(d) {
                    if (c.settings.debug) {
                        d.preventDefault()
                    }
                    function e() {
                        var f;
                        if (c.settings.submitHandler) {
                            if (c.submitButton) {
                                f = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)
                            }
                            c.settings.submitHandler.call(c, c.currentForm, d);
                            if (c.submitButton) {
                                f.remove()
                            }
                            return false
                        }
                        return true
                    }
                    if (c.cancelSubmit) {
                        c.cancelSubmit = false;
                        return e()
                    }
                    if (c.form()) {
                        if (c.pendingRequest) {
                            c.formSubmitted = true;
                            return false
                        }
                        return e()
                    } else {
                        c.focusInvalid();
                        return false
                    }
                }
                )
            }
            return c
        },
        valid: function() {
            if (a(this[0]).is("form")) {
                return this.validate().form()
            } else {
                var c = true;
                var b = a(this[0].form).validate();
                this.each(function() {
                    c = c && b.element(this)
                }
                );
                return c
            }
        },
        removeAttrs: function(d) {
            var b = {}
              , c = this;
            a.each(d.split(/\s/), function(e, f) {
                b[f] = c.attr(f);
                c.removeAttr(f)
            }
            );
            return b
        },
        rules: function(e, b) {
            var g = this[0];
            if (e) {
                var d = a.data(g.form, "validator").settings;
                var i = d.rules;
                var j = a.validator.staticRules(g);
                switch (e) {
                case "add":
                    a.extend(j, a.validator.normalizeRule(b));
                    delete j.messages;
                    i[g.name] = j;
                    if (b.messages) {
                        d.messages[g.name] = a.extend(d.messages[g.name], b.messages)
                    }
                    break;
                case "remove":
                    if (!b) {
                        delete i[g.name];
                        return j
                    }
                    var h = {};
                    a.each(b.split(/\s/), function(k, l) {
                        h[l] = j[l];
                        delete j[l]
                    }
                    );
                    return h
                }
            }
            var f = a.validator.normalizeRules(a.extend({}, a.validator.classRules(g), a.validator.attributeRules(g), a.validator.dataRules(g), a.validator.staticRules(g)), g);
            if (f.required) {
                var c = f.required;
                delete f.required;
                f = a.extend({
                    required: c
                }, f)
            }
            return f
        }
    });
    a.extend(a.expr[":"], {
        blank: function(b) {
            return !a.trim("" + a(b).val())
        },
        filled: function(b) {
            return !!a.trim("" + a(b).val())
        },
        unchecked: function(b) {
            return !a(b).prop("checked")
        }
    });
    a.validator = function(b, c) {
        this.settings = a.extend(true, {}, a.validator.defaults, b);
        this.currentForm = c;
        this.init()
    }
    ;
    a.validator.format = function(b, c) {
        if (arguments.length === 1) {
            return function() {
                var d = a.makeArray(arguments);
                d.unshift(b);
                return a.validator.format.apply(this, d)
            }
        }
        if (arguments.length > 2 && c.constructor !== Array) {
            c = a.makeArray(arguments).slice(1)
        }
        if (c.constructor !== Array) {
            c = [c]
        }
        a.each(c, function(d, e) {
            b = b.replace(new RegExp("\\{" + d + "\\}","g"), function() {
                return e
            }
            )
        }
        );
        return b
    }
    ;
    a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(b, c) {
                this.lastActive = b;
                if (this.settings.focusCleanup && !this.blockFocusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, b, this.settings.errorClass, this.settings.validClass)
                    }
                    this.addWrapper(this.errorsFor(b)).hide()
                }
            },
            onfocusout: function(b, c) {
                if (!this.checkable(b) && (b.name in this.submitted || !this.optional(b))) {
                    this.element(b)
                }
            },
            onkeyup: function(b, c) {
                if (c.which === 9 && this.elementValue(b) === "") {
                    return
                } else {
                    if (b.name in this.submitted || b === this.lastElement) {
                        this.element(b)
                    }
                }
            },
            onclick: function(b, c) {
                if (b.name in this.submitted) {
                    this.element(b)
                } else {
                    if (b.parentNode.name in this.submitted) {
                        this.element(b.parentNode)
                    }
                }
            },
            highlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).addClass(b).removeClass(c)
                } else {
                    a(d).addClass(b).removeClass(c)
                }
            },
            unhighlight: function(d, b, c) {
                if (d.type === "radio") {
                    this.findByName(d.name).removeClass(b).addClass(c)
                } else {
                    a(d).removeClass(b).addClass(c)
                }
            }
        },
        setDefaults: function(b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var b = (this.groups = {});
                a.each(this.settings.groups, function(e, f) {
                    if (typeof f === "string") {
                        f = f.split(/\s/)
                    }
                    a.each(f, function(h, g) {
                        b[g] = e
                    }
                    )
                }
                );
                var d = this.settings.rules;
                a.each(d, function(e, f) {
                    d[e] = a.validator.normalizeRule(f)
                }
                );
                function c(g) {
                    var f = a.data(this[0].form, "validator")
                      , e = "on" + g.type.replace(/^validate/, "");
                    if (f.settings[e]) {
                        f.settings[e].call(f, this[0], g)
                    }
                }
                a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", c).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", c);
                if (this.settings.invalidHandler) {
                    a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                }
            },
            form: function() {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                if (!this.valid()) {
                    a(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var b = 0, c = (this.currentElements = this.elements()); c[b]; b++) {
                    this.check(c[b])
                }
                return this.valid()
            },
            element: function(c) {
                c = this.validationTargetFor(this.clean(c));
                this.lastElement = c;
                this.prepareElement(c);
                this.currentElements = a(c);
                var b = this.check(c) !== false;
                if (b) {
                    delete this.invalid[c.name]
                } else {
                    this.invalid[c.name] = true
                }
                if (!this.numberOfInvalids()) {
                    this.toHide = this.toHide.add(this.containers)
                }
                this.showErrors();
                return b
            },
            showErrors: function(c) {
                if (c) {
                    a.extend(this.errorMap, c);
                    this.errorList = [];
                    for (var b in c) {
                        this.errorList.push({
                            message: c[b],
                            element: this.findByName(b)[0]
                        })
                    }
                    this.successList = a.grep(this.successList, function(d) {
                        return !(d.name in c)
                    }
                    )
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList)
                } else {
                    this.defaultShowErrors()
                }
            },
            resetForm: function() {
                if (a.fn.resetForm) {
                    a(this.currentForm).resetForm()
                }
                this.submitted = {};
                this.lastElement = null ;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(d) {
                var c = 0;
                for (var b in d) {
                    c++
                }
                return c
            },
            hideErrors: function() {
                this.addWrapper(this.toHide).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                }
            },
            findLastActive: function() {
                var b = this.lastActive;
                return b && a.grep(this.errorList, function(c) {
                    return c.element.name === b.name
                }
                ).length === 1 && b
            },
            elements: function() {
                var c = this
                  , b = {};
                return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function() {
                    if (!this.name && c.settings.debug && window.console) {
                        console.error("%o has no name assigned", this)
                    }
                    if (this.name in b || !c.objectLength(a(this).rules())) {
                        return false
                    }
                    b[this.name] = true;
                    return true
                }
                )
            },
            clean: function(b) {
                return a(b)[0]
            },
            errors: function() {
                var b = this.settings.errorClass.replace(" ", ".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([]);
                this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(b) {
                this.reset();
                this.toHide = this.errorsFor(b)
            },
            elementValue: function(b) {
                var c = a(b).attr("type")
                  , d = a(b).val();
                if (c === "radio" || c === "checkbox") {
                    return a("input[name='" + a(b).attr("name") + "']:checked").val()
                }
                if (typeof d === "string") {
                    return d.replace(/\r/g, "")
                }
                return d
            },
            check: function(c) {
                c = this.validationTargetFor(this.clean(c));
                var i = a(c).rules();
                var d = false;
                var h = this.elementValue(c);
                var b;
                for (var j in i) {
                    var g = {
                        method: j,
                        parameters: i[j]
                    };
                    try {
                        b = a.validator.methods[j].call(this, h, c, g.parameters);
                        if (b === "dependency-mismatch") {
                            d = true;
                            continue
                        }
                        d = false;
                        if (b === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(c));
                            return
                        }
                        if (!b) {
                            this.formatAndAdd(c, g);
                            return false
                        }
                    } catch (f) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + c.id + ", check the '" + g.method + "' method.", f)
                        }
                        throw f
                    }
                }
                if (d) {
                    return
                }
                if (this.objectLength(i)) {
                    this.successList.push(c)
                }
                return true
            },
            customDataMessage: function(b, c) {
                return a(b).data("msg-" + c.toLowerCase()) || (b.attributes && a(b).attr("data-msg-" + c.toLowerCase()))
            },
            customMessage: function(c, d) {
                var b = this.settings.messages[c];
                return b && (b.constructor === String ? b : b[d])
            },
            findDefined: function() {
                for (var b = 0; b < arguments.length; b++) {
                    if (arguments[b] !== undefined) {
                        return arguments[b]
                    }
                }
                return undefined
            },
            defaultMessage: function(b, c) {
                return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
            },
            formatAndAdd: function(c, e) {
                var d = this.defaultMessage(c, e.method)
                  , b = /\$?\{(\d+)\}/g;
                if (typeof d === "function") {
                    d = d.call(this, e.parameters, c)
                } else {
                    if (b.test(d)) {
                        d = a.validator.format(d.replace(b, "{$1}"), e.parameters)
                    }
                }
                this.errorList.push({
                    message: d,
                    element: c
                });
                this.errorMap[c.name] = d;
                this.submitted[c.name] = d
            },
            addWrapper: function(b) {
                if (this.settings.wrapper) {
                    b = b.add(b.parent(this.settings.wrapper))
                }
                return b
            },
            defaultShowErrors: function() {
                var c, d;
                for (c = 0; this.errorList[c]; c++) {
                    var b = this.errorList[c];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, b.element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.showLabel(b.element, b.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (c = 0; this.successList[c]; c++) {
                        this.showLabel(this.successList[c])
                    }
                }
                if (this.settings.unhighlight) {
                    for (c = 0,
                    d = this.validElements(); d[c]; c++) {
                        this.settings.unhighlight.call(this, d[c], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                }
                )
            },
            showLabel: function(c, d) {
                var b = this.errorsFor(c);
                if (b.length) {
                    b.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    b.html(d)
                } else {
                    b = a("<" + this.settings.errorElement + ">").attr("for", this.idOrName(c)).addClass(this.settings.errorClass).html(d || "");
                    if (this.settings.wrapper) {
                        var e = b.hide().show().wrap("<" + this.settings.wrapper + "/>");
                        b = e.parent();
                        a("<div class='label'><span class='required'></span></div>").insertBefore(e)
                    }
                    if (!this.labelContainer.append(b).length) {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(b, a(c))
                        } else {
                            b.insertAfter(c)
                        }
                    }
                }
                if (!d && this.settings.success) {
                    b.text("");
                    if (typeof this.settings.success === "string") {
                        b.addClass(this.settings.success)
                    } else {
                        this.settings.success(b, c)
                    }
                }
                this.toShow = this.toShow.add(b)
            },
            errorsFor: function(c) {
                var b = this.idOrName(c);
                return this.errors().filter(function() {
                    return a(this).attr("for") === b
                }
                )
            },
            idOrName: function(b) {
                return this.groups[b.name] || (this.checkable(b) ? b.name : b.id || b.name)
            },
            validationTargetFor: function(b) {
                if (this.checkable(b)) {
                    b = this.findByName(b.name).not(this.settings.ignore)[0]
                }
                return b
            },
            checkable: function(b) {
                return (/radio|checkbox/i).test(b.type)
            },
            findByName: function(b) {
                return a(this.currentForm).find("[name='" + b + "']")
            },
            getLength: function(c, b) {
                switch (b.nodeName.toLowerCase()) {
                case "select":
                    return a("option:selected", b).length;
                case "input":
                    if (this.checkable(b)) {
                        return this.findByName(b.name).filter(":checked").length
                    }
                }
                return c.length
            },
            depend: function(c, b) {
                return this.dependTypes[typeof c] ? this.dependTypes[typeof c](c, b) : true
            },
            dependTypes: {
                "boolean": function(c, b) {
                    return c
                },
                string: function(c, b) {
                    return !!a(c, b.form).length
                },
                "function": function(c, b) {
                    return c(b)
                }
            },
            optional: function(b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function(b) {
                if (!this.pending[b.name]) {
                    this.pendingRequest++;
                    this.pending[b.name] = true
                }
            },
            stopRequest: function(b, c) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[b.name];
                if (c && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    a(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!c && this.pendingRequest === 0 && this.formSubmitted) {
                        a(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function(b) {
                return a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null ,
                    valid: true,
                    message: this.defaultMessage(b, "remote")
                })
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(b, c) {
            if (b.constructor === String) {
                this.classRuleSettings[b] = c
            } else {
                a.extend(this.classRuleSettings, b)
            }
        },
        classRules: function(c) {
            var d = {};
            var b = a(c).attr("class");
            if (b) {
                a.each(b.split(" "), function() {
                    if (this in a.validator.classRuleSettings) {
                        a.extend(d, a.validator.classRuleSettings[this])
                    }
                }
                )
            }
            return d
        },
        attributeRules: function(c) {
            var f = {};
            var b = a(c);
            var d = b[0].getAttribute("type");
            for (var g in a.validator.methods) {
                var e;
                if (g === "required") {
                    e = b.get(0).getAttribute(g);
                    if (e === "") {
                        e = true
                    }
                    e = !!e
                } else {
                    e = b.attr(g)
                }
                if (/min|max/.test(g) && (d === null  || /number|range|text/.test(d))) {
                    e = Number(e)
                }
                if (e) {
                    f[g] = e
                } else {
                    if (d === g && d !== "range") {
                        f[g] = true
                    }
                }
            }
            if (f.maxlength && /-1|2147483647|524288/.test(f.maxlength)) {
                delete f.maxlength
            }
            return f
        },
        dataRules: function(c) {
            var f, d, e = {}, b = a(c);
            for (f in a.validator.methods) {
                d = b.data("rule-" + f.toLowerCase());
                if (d !== undefined) {
                    e[f] = d
                }
            }
            return e
        },
        staticRules: function(c) {
            var d = {};
            var b = a.data(c.form, "validator");
            if (b.settings.rules) {
                d = a.validator.normalizeRule(b.settings.rules[c.name]) || {}
            }
            return d
        },
        normalizeRules: function(c, b) {
            a.each(c, function(f, e) {
                if (e === false) {
                    delete c[f];
                    return
                }
                if (e.param || e.depends) {
                    var d = true;
                    switch (typeof e.depends) {
                    case "string":
                        d = !!a(e.depends, b.form).length;
                        break;
                    case "function":
                        d = e.depends.call(b, b);
                        break
                    }
                    if (d) {
                        c[f] = e.param !== undefined ? e.param : true
                    } else {
                        delete c[f]
                    }
                }
            }
            );
            a.each(c, function(d, e) {
                c[d] = a.isFunction(e) ? e(b) : e
            }
            );
            a.each(["minlength", "maxlength"], function() {
                if (c[this]) {
                    c[this] = Number(c[this])
                }
            }
            );
            a.each(["rangelength", "range"], function() {
                var d;
                if (c[this]) {
                    if (a.isArray(c[this])) {
                        c[this] = [Number(c[this][0]), Number(c[this][1])]
                    } else {
                        if (typeof c[this] === "string") {
                            d = c[this].split(/[\s,]+/);
                            c[this] = [Number(d[0]), Number(d[1])]
                        }
                    }
                }
            }
            );
            if (a.validator.autoCreateRanges) {
                if (c.min && c.max) {
                    c.range = [c.min, c.max];
                    delete c.min;
                    delete c.max
                }
                if (c.minlength && c.maxlength) {
                    c.rangelength = [c.minlength, c.maxlength];
                    delete c.minlength;
                    delete c.maxlength
                }
            }
            return c
        },
        normalizeRule: function(c) {
            if (typeof c === "string") {
                var b = {};
                a.each(c.split(/\s/), function() {
                    b[this] = true
                }
                );
                c = b
            }
            return c
        },
        addMethod: function(b, d, c) {
            a.validator.methods[b] = d;
            a.validator.messages[b] = c !== undefined ? c : a.validator.messages[b];
            if (d.length < 3) {
                a.validator.addClassRules(b, a.validator.normalizeRule(b))
            }
        },
        methods: {
            required: function(c, b, e) {
                if (!this.depend(e, b)) {
                    return "dependency-mismatch"
                }
                if (b.nodeName.toLowerCase() === "select") {
                    var d = a(b).val();
                    return d && d.length > 0
                }
                if (this.checkable(b)) {
                    return this.getLength(c, b) > 0
                }
                return a.trim(c).length > 0
            },
            email: function(c, b) {
                return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(c)
            },
            url: function(c, b) {
                return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(c)
            },
            date: function(c, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(c).toString())
            },
            dateISO: function(c, b) {
                return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(c)
            },
            number: function(c, b) {
                return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(c)
            },
            digits: function(c, b) {
                return this.optional(b) || /^\d+$/.test(c)
            },
            creditcard: function(f, c) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                if (/[^0-9 \-]+/.test(f)) {
                    return false
                }
                var g = 0
                  , e = 0
                  , b = false;
                f = f.replace(/\D/g, "");
                for (var h = f.length - 1; h >= 0; h--) {
                    var d = f.charAt(h);
                    e = parseInt(d, 10);
                    if (b) {
                        if ((e *= 2) > 9) {
                            e -= 9
                        }
                    }
                    g += e;
                    b = !b
                }
                return (g % 10) === 0
            },
            minlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c >= e
            },
            maxlength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || c <= e
            },
            rangelength: function(d, b, e) {
                var c = a.isArray(d) ? d.length : this.getLength(a.trim(d), b);
                return this.optional(b) || (c >= e[0] && c <= e[1])
            },
            min: function(c, b, d) {
                return this.optional(b) || c >= d
            },
            max: function(c, b, d) {
                return this.optional(b) || c <= d
            },
            range: function(c, b, d) {
                return this.optional(b) || (c >= d[0] && c <= d[1])
            },
            equalTo: function(c, b, e) {
                var d = a(e);
                if (this.settings.onfocusout) {
                    d.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        a(b).valid()
                    }
                    )
                }
                return c === d.val()
            },
            accept: function(c, b, d) {
                d = typeof d == "string" ? d.replace(/,/g, "|") : "png|jpe?g|gif";
                return this.optional(b) || c.match(new RegExp(".(" + d + ")$","i"))
            },
            differentFrom: function(c, b, e) {
                var d = a(e).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    a(b).valid()
                }
                );
                return c != d.val()
            },
            validatPwd: function(c, b) {
                var e = true;
                var d = new RegExp("(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$");
                if (d.test(c)) {
                    e = true
                } else {
                    e = false
                }
                return this.optional(b) || e
            },
            remote: function(f, c, g) {
                if (this.optional(c)) {
                    return "dependency-mismatch"
                }
                var d = this.previousValue(c);
                if (!this.settings.messages[c.name]) {
                    this.settings.messages[c.name] = {}
                }
                d.originalMessage = this.settings.messages[c.name].remote;
                this.settings.messages[c.name].remote = d.message;
                g = typeof g === "string" && {
                    url: g
                } || g;
                if (d.old === f) {
                    return d.valid
                }
                d.old = f;
                var b = this;
                this.startRequest(c);
                var e = {};
                e[c.name] = f;
                a.ajax(a.extend(true, {
                    url: g,
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: e,
                    success: function(i) {
                        b.settings.messages[c.name].remote = d.originalMessage;
                        var k = i === true || i === "true";
                        if (k) {
                            var h = b.formSubmitted;
                            b.prepareElement(c);
                            b.formSubmitted = h;
                            b.successList.push(c);
                            delete b.invalid[c.name];
                            b.showErrors()
                        } else {
                            var l = {};
                            var j = i || b.defaultMessage(c, "remote");
                            l[c.name] = d.message = a.isFunction(j) ? j(f) : j;
                            b.invalid[c.name] = true;
                            b.showErrors(l)
                        }
                        d.valid = k;
                        b.stopRequest(c, k)
                    }
                }, g));
                return "pending"
            }
        }
    });
    a.format = a.validator.format
}
(jQuery));
(function(c) {
    var a = {};
    if (c.ajaxPrefilter) {
        c.ajaxPrefilter(function(f, e, g) {
            var d = f.port;
            if (f.mode === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = g
            }
        }
        )
    } else {
        var b = c.ajax;
        c.ajax = function(e) {
            var f = ("mode" in e ? e : c.ajaxSettings).mode
              , d = ("port" in e ? e : c.ajaxSettings).port;
            if (f === "abort") {
                if (a[d]) {
                    a[d].abort()
                }
                a[d] = b.apply(this, arguments);
                return a[d]
            }
            return b.apply(this, arguments)
        }
    }
}
(jQuery));
(function(a) {
    a.extend(a.fn, {
        validateDelegate: function(d, c, b) {
            return this.bind(c, function(e) {
                var f = a(e.target);
                if (f.is(d)) {
                    return b.apply(f, arguments)
                }
            }
            )
        }
    })
}
(jQuery));
/*!
 * 对jquery的ajax的封装，支持请求本地数据和请求远程http服务 该js必须放在jquery.js后面 同时还负责初始化各种js变量
 * ots_global.calendarLang 初始化calendar组件的国际化信息。
 */
var alertWarningMsg;
var alertWarningMsgByHeader;
var alertWarningMsgByTit_header;
(function() {
    var e = null ;
    $(document).ready(function() {
        e = b()
    }
    );
    var a = null ;
    if (typeof globalRepeatSubmitToken != "undefined") {
        a = globalRepeatSubmitToken
    }
    var j = null ;
    var l = "_json_att";
    var d = "_es_hiddenform";
    var k = "<form  method='post' id='" + d + "'><input type='hidden' name='" + l + "'></input></form>";
    var h = $.ajax;
    ots_global = {};
    $.ajax = function(o, n) {
        if (typeof o == "object") {
            n = o;
            o = undefined
        }
        n = n || {};
        var m = n.isAlert || true;
        if (n.success) {
            var p = n.success;
            n.success = function(y, s, x) {
                if (y && y.c_url) {
                    window[y.c_name] = y.c_url
                }
                if (y && y.validateMessagesShowId) {
                    var w = y.messages;
                    if (w && w.length > 0) {
                        var v = "";
                        for (var u = 0; u < w.length; u++) {
                            v += w[u] + "\n"
                        }
                        dhtmlx.alert({
                            title: w["message.info"],
                            ok: w["button.ok"],
                            text: v,
                            callback: function() {
                                if (y.url) {
                                    window.location = ctx + y.url
                                }
                            }
                        })
                    }
                    var z = y.validateMessages;
                    var v = "";
                    for (var t in z) {
                        v += t + " :" + z[t] + "</br>"
                    }
                    if (y.attributes) {
                        j = y.attributes
                    }
                    if (y.repeatSubmitToken && y.repeatSubmitToken != "") {
                        a = y.repeatSubmitToken
                    }
                    if (v) {
                        if (m) {
                            dhtmlx.alert({
                                title: w["message.info"],
                                ok: w["button.ok"],
                                text: v,
                                callback: function() {
                                    p.call(this, y, s, x)
                                }
                            })
                        } else {
                            $("#" + y.validateMessagesShowId).html(v).show();
                            p.call(this, y, s, x)
                        }
                    } else {
                        $("#" + y.validateMessagesShowId).html("").hide();
                        p.call(this, y, s, x)
                    }
                } else {
                    p.call(this, y, s, x)
                }
            }
        }
        var r = n.data || {};
        var q = true;
        if (n.isTakeParam == false) {
            q = false
        }
        if (q) {
            if (j) {
                r[l] = j
            } else {
                r[l] = $("input[name=_json_att]").val()
            }
        }
        if ("undefined" != typeof (a) && a != null ) {
            r.REPEAT_SUBMIT_TOKEN = a
        }
        n.data = r;
        h.call(this, o, n)
    }
    ;
    if (typeof otsRedirect == "undefined") {
        otsRedirect = function(r, o, p, q) {
            p = p || {};
            if (r && r == "post") {
                if ($("#" + d).length == 0) {
                    $(document.body).append(k)
                }
                if (j) {
                    $("#" + d + " input[name='" + l + "']").val(j)
                }
                $("#" + d + " input[name='" + l + "'] ~ input").remove();
                if (a != null ) {
                    $("#" + d).append("<input type='hidden' name='REPEAT_SUBMIT_TOKEN'></input>");
                    $("#" + d + " input[name='REPEAT_SUBMIT_TOKEN']").val(a)
                }
                if (p) {
                    for (var n in p) {
                        var m = "<input type='hidden' name='" + n + "'></input>";
                        $("#" + d).append(m);
                        $("#" + d + " input[name='" + n + "']").val(p[n])
                    }
                }
                if (q != null ) {
                    $("#" + d).attr("target", q)
                } else {
                    $("#" + d).removeAttr("target")
                }
                $("#" + d).attr("action", o);
                $("#" + d).submit()
            } else {
                if (j) {
                    if (o.indexOf("?") > 0) {
                        o += "&" + l + "=" + j
                    } else {
                        o += "?" + l + "=" + j
                    }
                }
                if (p) {
                    for (var n in p) {
                        if (o.indexOf("?") > 0) {
                            o += "&" + n + "=" + p[n]
                        } else {
                            o += "?" + n + "=" + p[n]
                        }
                    }
                }
                switch (q) {
                case "_blank":
                    window.open(o);
                    break;
                default:
                    window.location.href = o
                }
            }
        }
    }
    (function() {
        var m = {
            dateformat: "%Y-%m-%d",
            monthesFNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            monthesSNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            daysFNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            daysSNames: ["日", "一", "二", "三", "四", "五", "六"],
            weekstart: 1
        };
        ots_global.calendarLang = ots_global.calendarLang || {};
        ots_global.calendarLang.zh_CN = m
    }
    )();
    function b() {
        var m = new dhtmlXWindows();
        m.enableAutoViewport(true);
        m.setSkin("dhx_terrace");
        m.setImagePath(ctx + "resources/js/rich/windows/imgs/");
        return m
    }
    alertWarningMsgByHeader = function(m) {
        alertWarningMsg(messages["message.info"], m, "", messages["button.ok"])
    }
    ;
    alertWarningMsgByTit_header = function(m, n) {
        alertWarningMsg(m, n, "", messages["button.ok"])
    }
    ;
    alertWarningMsg = function(p, s, n) {
        i(p, s, n, messages["button.ok"]);
        $("#qd_closeDefaultWarningWindowDialog_id").click(function() {
            f()
        }
        );
        $("#gb_closeDefaultWarningWindowDialog_id").click(function() {
            f()
        }
        );
        var r = "defaultwarningAlert_id";
        var o = c(r);
        var m = $(window).width() / 2 - 300;
        var q = g() + ($(window).height() / 2 - 200);
        o.setDimension($("#content_" + r).width(), $("#content_" + r).height() + 10);
        $(".dhtmlx_window_active").height($("#content_" + r).height());
        $(".dhtmlx_window_active").css({
            left: m + "px",
            top: q + "px"
        })
    }
    ;
    function g() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }
    function i(o, q, m, p) {
        var n = '<div id="defaultwarningAlert_id" style="display:none;" ><div class="mark"></div><div class="up-box w600" id="content_defaultwarningAlert_id"><div class="up-box-hd" ><span id="content_defaultwarningAlert_title">' + o + '</span><a href="#nogo"id="gb_closeDefaultWarningWindowDialog_id">关闭</a></div><div class="up-box-bd"><div class="up-con clearfix"><span class="icon i-warn"></span> <div class="r-txt"><div class="tit" id="content_defaultwarningAlert_hearder" >' + q + '</div><P  id="content_defaultwarningAlert_body">' + m + '</P></div></div> <div class="lay-btn"><a href="#nogo" id="qd_closeDefaultWarningWindowDialog_id" class="btn92s">' + p + "</a></div></div></div></div>";
        $("body").append(n)
    }
    function c(n) {
        var m = e.createWindow(n + "_", 50, 10, 660, 100);
        m.attachObject(n);
        m.clearIcon();
        m.denyResize();
        m.setModal(true);
        m.center();
        m.button("park").hide();
        m.button("minmax1").hide();
        m.hideHeader();
        return m
    }
    function f() {
        var m = "defaultwarningAlert_id";
        if (e.isWindow(m + "_")) {
            e.window(m + "_").close()
        }
    }
}
)();
dhtmlx = function(d) {
    for (var c in d) {
        dhtmlx[c] = d[c]
    }
    return dhtmlx
}
;
dhtmlx.extend_api = function(f, e, h) {
    var g = window[f];
    if (g) {
        window[f] = function(b) {
            if (b && typeof b == "object" && !b.tagName) {
                var i = g.apply(this, e._init ? e._init(b) : arguments), d;
                for (d in dhtmlx) {
                    if (e[d]) {
                        this[e[d]](dhtmlx[d])
                    }
                }
                for (d in b) {
                    if (e[d]) {
                        this[e[d]](b[d])
                    } else {
                        d.indexOf("on") == 0 && this.attachEvent(d, b[d])
                    }
                }
            } else {
                i = g.apply(this, arguments)
            }
            e._patch && e._patch(this);
            return i || this
        }
        ,
        window[f].prototype = g.prototype,
        h && dhtmlXHeir(window[f].prototype, h)
    }
}
;
dhtmlxAjax = {
    get: function(e, d) {
        var f = new dtmlXMLLoaderObject(!0);
        f.async = arguments.length < 3;
        f.waitCall = d;
        f.loadXML(e);
        return f
    },
    post: function(f, e, h) {
        var g = new dtmlXMLLoaderObject(!0);
        g.async = arguments.length < 4;
        g.waitCall = h;
        g.loadXML(f, !0, e);
        return g
    },
    getSync: function(b) {
        return this.get(b, null , !0)
    },
    postSync: function(d, c) {
        return this.post(d, c, null , !0)
    }
};
function dtmlXMLLoaderObject(f, e, h, g) {
    this.xmlDoc = "";
    this.async = typeof h != "undefined" ? h : !0;
    this.onloadAction = f || null ;
    this.mainObject = e || null ;
    this.waitCall = null ;
    this.rSeed = g || !1;
    return this
}
dtmlXMLLoaderObject.count = 0;
dtmlXMLLoaderObject.prototype.waitLoadFunction = function(d) {
    var c = !0;
    return this.check = function() {
        if (d && d.onloadAction != null  && (!d.xmlDoc.readyState || d.xmlDoc.readyState == 4) && c) {
            c = !1;
            dtmlXMLLoaderObject.count++;
            if (typeof d.onloadAction == "function") {
                d.onloadAction(d.mainObject, null , null , null , d)
            }
            if (d.waitCall) {
                d.waitCall.call(this, d),
                d.waitCall = null 
            }
        }
    }
}
;
dtmlXMLLoaderObject.prototype.getXMLTopNode = function(f, e) {
    if (this.xmlDoc.responseXML) {
        var h = this.xmlDoc.responseXML.getElementsByTagName(f);
        h.length == 0 && f.indexOf(":") != -1 && (h = this.xmlDoc.responseXML.getElementsByTagName(f.split(":")[1]));
        var g = h[0]
    } else {
        g = this.xmlDoc.documentElement
    }
    if (g) {
        return this._retry = !1,
        g
    }
    if (!this._retry && _isIE) {
        return this._retry = !0,
        e = this.xmlDoc,
        this.loadXMLString(this.xmlDoc.responseText.replace(/^[\s]+/, ""), !0),
        this.getXMLTopNode(f, e)
    }
    dhtmlxError.throwError("LoadXML", "Incorrect XML", [e || this.xmlDoc, this.mainObject]);
    return document.createElement("DIV")
}
;
dtmlXMLLoaderObject.prototype.loadXMLString = function(e, d) {
    if (_isIE) {
        this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM"),
        this.xmlDoc.async = this.async,
        this.xmlDoc.onreadystatechange = function() {}
        ,
        this.xmlDoc.loadXML(e)
    } else {
        var f = new DOMParser;
        this.xmlDoc = f.parseFromString(e, "text/xml")
    }
    if (!d) {
        if (this.onloadAction) {
            this.onloadAction(this.mainObject, null , null , null , this)
        }
        if (this.waitCall) {
            this.waitCall(),
            this.waitCall = null 
        }
    }
}
;
dtmlXMLLoaderObject.prototype.loadXML = function(f, e, h, g) {
    this.rSeed && (f += (f.indexOf("?") != -1 ? "&" : "?") + "a_dhx_rSeed=" + (new Date).valueOf());
    this.filePath = f;
    this.xmlDoc = !_isIE && window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    if (this.async) {
        this.xmlDoc.onreadystatechange = new this.waitLoadFunction(this)
    }
    this.xmlDoc.open(e ? "POST" : "GET", f, this.async);
    g ? (this.xmlDoc.setRequestHeader("User-Agent", "dhtmlxRPC v0.1 (" + navigator.userAgent + ")"),
    this.xmlDoc.setRequestHeader("Content-type", "text/xml")) : e && this.xmlDoc.setRequestHeader("Content-type", this.contenttype || "application/x-www-form-urlencoded");
    this.xmlDoc.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    this.xmlDoc.send(h);
    this.async || (new this.waitLoadFunction(this))()
}
;
dtmlXMLLoaderObject.prototype.destructor = function() {
    return this.setXSLParamValue = this.getXMLTopNode = this.xmlNodeToJSON = this.doSerialization = this.loadXMLString = this.loadXML = this.doXSLTransToString = this.doXSLTransToObject = this.doXPathOpera = this.doXPath = this.xmlDoc = this.mainObject = this.onloadAction = this.filePath = this.rSeed = this.async = this._retry = this._getAllNamedChilds = this._filterXPath = null 
}
;
dtmlXMLLoaderObject.prototype.xmlNodeToJSON = function(f) {
    for (var e = {}, h = 0; h < f.attributes.length; h++) {
        e[f.attributes[h].name] = f.attributes[h].value
    }
    e._tagvalue = f.firstChild ? f.firstChild.nodeValue : "";
    for (h = 0; h < f.childNodes.length; h++) {
        var g = f.childNodes[h].tagName;
        g && (e[g] || (e[g] = []),
        e[g].push(this.xmlNodeToJSON(f.childNodes[h])))
    }
    return e
}
;
function callerFunction(d, c) {
    return this.handler = function(a) {
        if (!a) {
            a = window.event
        }
        d(a, c);
        return !0
    }
}
function getAbsoluteLeft(b) {
    return getOffset(b).left
}
function getAbsoluteTop(b) {
    return getOffset(b).top
}
function getOffsetSum(e) {
    for (var d = 0, f = 0; e; ) {
        d += parseInt(e.offsetTop),
        f += parseInt(e.offsetLeft),
        e = e.offsetParent
    }
    return {
        top: d,
        left: f
    }
}
function getOffsetRect(u) {
    var t = u.getBoundingClientRect()
      , s = document.body
      , r = document.documentElement
      , q = window.pageYOffset || r.scrollTop || s.scrollTop
      , o = window.pageXOffset || r.scrollLeft || s.scrollLeft
      , p = r.clientTop || s.clientTop || 0
      , n = r.clientLeft || s.clientLeft || 0
      , m = t.top + q - p
      , l = t.left + o - n;
    return {
        top: Math.round(m),
        left: Math.round(l)
    }
}
function getOffset(b) {
    return b.getBoundingClientRect ? getOffsetRect(b) : getOffsetSum(b)
}
function convertStringToBoolean(b) {
    typeof b == "string" && (b = b.toLowerCase());
    switch (b) {
    case "1":
    case "true":
    case "yes":
    case "y":
    case 1:
    case !0:
        return !0;
    default:
        return !1
    }
}
function getUrlSymbol(b) {
    return b.indexOf("?") != -1 ? "&" : "?"
}
function dhtmlDragAndDropObject() {
    if (window.dhtmlDragAndDrop) {
        return window.dhtmlDragAndDrop
    }
    this.dragStartObject = this.dragStartNode = this.dragNode = this.lastLanding = 0;
    this.tempDOMM = this.tempDOMU = null ;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function(b) {
    b.onmousedown = null ;
    b.dragStarter = null ;
    b.dragLanding = null 
}
;
dhtmlDragAndDropObject.prototype.addDraggableItem = function(d, c) {
    d.onmousedown = this.preCreateDragCopy;
    d.dragStarter = c;
    this.addDragLanding(d, c)
}
;
dhtmlDragAndDropObject.prototype.addDragLanding = function(d, c) {
    d.dragLanding = c
}
;
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(b) {
    if (!((b || window.event) && (b || event).button == 2)) {
        if (window.dhtmlDragAndDrop.waitDrag) {
            return window.dhtmlDragAndDrop.waitDrag = 0,
            document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU,
            document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM,
            !1
        }
        window.dhtmlDragAndDrop.dragNode && window.dhtmlDragAndDrop.stopDrag(b);
        window.dhtmlDragAndDrop.waitDrag = 1;
        window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
        window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
        window.dhtmlDragAndDrop.dragStartNode = this;
        window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
        document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
        document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
        window.dhtmlDragAndDrop.downtime = (new Date).valueOf();
        b && b.preventDefault && b.preventDefault();
        return !1
    }
}
;
dhtmlDragAndDropObject.prototype.callDrag = function(g) {
    if (!g) {
        g = window.event
    }
    dragger = window.dhtmlDragAndDrop;
    if (!((new Date).valueOf() - dragger.downtime < 100)) {
        if (!dragger.dragNode) {
            if (dragger.waitDrag) {
                dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, g);
                if (!dragger.dragNode) {
                    return dragger.stopDrag()
                }
                dragger.dragNode.onselectstart = function() {
                    return !1
                }
                ;
                dragger.gldragNode = dragger.dragNode;
                document.body.appendChild(dragger.dragNode);
                document.body.onmouseup = dragger.stopDrag;
                dragger.waitDrag = 0;
                dragger.dragNode.pWindow = window;
                dragger.initFrameRoute()
            } else {
                return dragger.stopDrag(g, !0)
            }
        }
        if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode) {
            var f = dragger.gldragNode;
            if (dragger.gldragNode.old) {
                f = dragger.gldragNode.old
            }
            f.parentNode.removeChild(f);
            var k = dragger.dragNode.pWindow;
            f.pWindow && f.pWindow.dhtmlDragAndDrop.lastLanding && f.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(f.pWindow.dhtmlDragAndDrop.lastLanding);
            if (_isIE) {
                var i = document.createElement("Div");
                i.innerHTML = dragger.dragNode.outerHTML;
                dragger.dragNode = i.childNodes[0]
            } else {
                dragger.dragNode = dragger.dragNode.cloneNode(!0)
            }
            dragger.dragNode.pWindow = window;
            dragger.gldragNode.old = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            k.dhtmlDragAndDrop.dragNode = dragger.dragNode
        }
        dragger.dragNode.style.left = g.clientX + 15 + (dragger.fx ? dragger.fx * -1 : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
        dragger.dragNode.style.top = g.clientY + 3 + (dragger.fy ? dragger.fy * -1 : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
        var h = g.srcElement ? g.srcElement : g.target;
        dragger.checkLanding(h, g)
    }
}
;
dhtmlDragAndDropObject.prototype.calculateFramePosition = function(g) {
    if (window.name) {
        for (var f = parent.frames[window.name].frameElement.offsetParent, k = 0, i = 0; f; ) {
            k += f.offsetLeft,
            i += f.offsetTop,
            f = f.offsetParent
        }
        if (parent.dhtmlDragAndDrop) {
            var h = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            k += h.split("_")[0] * 1;
            i += h.split("_")[1] * 1
        }
        if (g) {
            return k + "_" + i
        } else {
            this.fx = k
        }
        this.fy = i
    }
    return "0_0"
}
;
dhtmlDragAndDropObject.prototype.checkLanding = function(d, c) {
    d && d.dragLanding ? (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding),
    this.lastLanding = d,
    this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, c.clientX, c.clientY, c),
    this.lastLanding_scr = _isIE ? c.srcElement : c.target) : d && d.tagName != "BODY" ? this.checkLanding(d.parentNode, c) : (this.lastLanding && this.lastLanding.dragLanding._dragOut(this.lastLanding, c.clientX, c.clientY, c),
    this.lastLanding = 0,
    this._onNotFound && this._onNotFound())
}
;
dhtmlDragAndDropObject.prototype.stopDrag = function(e, d) {
    dragger = window.dhtmlDragAndDrop;
    if (!d) {
        dragger.stopFrameRoute();
        var f = dragger.lastLanding;
        dragger.lastLanding = null ;
        f && f.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, f, _isIE ? event.srcElement : e.target)
    }
    dragger.lastLanding = null ;
    dragger.dragNode && dragger.dragNode.parentNode == document.body && dragger.dragNode.parentNode.removeChild(dragger.dragNode);
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null ;
    dragger.tempDOMM = null ;
    dragger.waitDrag = 0
}
;
dhtmlDragAndDropObject.prototype.stopFrameRoute = function(f) {
    f && window.dhtmlDragAndDrop.stopDrag(1, 1);
    for (var e = 0; e < window.frames.length; e++) {
        try {
            window.frames[e] != f && window.frames[e].dhtmlDragAndDrop && window.frames[e].dhtmlDragAndDrop.stopFrameRoute(window)
        } catch (h) {}
    }
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != f && parent.dhtmlDragAndDrop.stopFrameRoute(window)
    } catch (g) {}
}
;
dhtmlDragAndDropObject.prototype.initFrameRoute = function(g, f) {
    if (g) {
        window.dhtmlDragAndDrop.preCreateDragCopy(),
        window.dhtmlDragAndDrop.dragStartNode = g.dhtmlDragAndDrop.dragStartNode,
        window.dhtmlDragAndDrop.dragStartObject = g.dhtmlDragAndDrop.dragStartObject,
        window.dhtmlDragAndDrop.dragNode = g.dhtmlDragAndDrop.dragNode,
        window.dhtmlDragAndDrop.gldragNode = g.dhtmlDragAndDrop.dragNode,
        window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag,
        window.waitDrag = 0,
        !_isIE && f && (!_isFF || _FFrv < 1.8) && window.dhtmlDragAndDrop.calculateFramePosition()
    }
    try {
        parent.dhtmlDragAndDrop && parent != window && parent != g && parent.dhtmlDragAndDrop.initFrameRoute(window)
    } catch (k) {}
    for (var i = 0; i < window.frames.length; i++) {
        try {
            window.frames[i] != g && window.frames[i].dhtmlDragAndDrop && window.frames[i].dhtmlDragAndDrop.initFrameRoute(window, !g || f ? 1 : 0)
        } catch (h) {}
    }
}
;
_OperaRv = _KHTMLrv = _FFrv = _isChrome = _isMacOS = _isKHTML = _isOpera = _isIE = _isFF = !1;
navigator.userAgent.indexOf("Macintosh") != -1 && (_isMacOS = !0);
navigator.userAgent.toLowerCase().indexOf("chrome") > -1 && (_isChrome = !0);
if (navigator.userAgent.indexOf("Safari") != -1 || navigator.userAgent.indexOf("Konqueror") != -1) {
    _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5)),
    _KHTMLrv > 525 ? (_isFF = !0,
    _FFrv = 1.9) : _isKHTML = !0
} else {
    if (navigator.userAgent.indexOf("Opera") != -1) {
        _isOpera = !0,
        _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))
    } else {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            if (_isIE = !0,
            (navigator.appVersion.indexOf("MSIE 8.0") != -1 || navigator.appVersion.indexOf("MSIE 9.0") != -1 || navigator.appVersion.indexOf("MSIE 10.0") != -1) && document.compatMode != "BackCompat") {
                _isIE = 8
            }
        } else {
            _isFF = !0,
            _FFrv = parseFloat(navigator.userAgent.split("rv:")[1])
        }
    }
}
dtmlXMLLoaderObject.prototype.doXPath = function(s, r, q, p) {
    if (_isKHTML || !_isIE && !window.XPathResult) {
        return this.doXPathOpera(s, r)
    }
    if (_isIE) {
        return r || (r = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML),
        r || dhtmlxError.throwError("LoadXML", "Incorrect XML", [r || this.xmlDoc, this.mainObject]),
        q != null  && r.setProperty("SelectionNamespaces", "xmlns:xsl='" + q + "'"),
        p == "single" ? r.selectSingleNode(s) : r.selectNodes(s) || []
    } else {
        var o = r;
        r || (r = this.xmlDoc.nodeName ? this.xmlDoc : this.xmlDoc.responseXML);
        r || dhtmlxError.throwError("LoadXML", "Incorrect XML", [r || this.xmlDoc, this.mainObject]);
        r.nodeName.indexOf("document") != -1 ? o = r : (o = r,
        r = r.ownerDocument);
        var m = XPathResult.ANY_TYPE;
        if (p == "single") {
            m = XPathResult.FIRST_ORDERED_NODE_TYPE
        }
        var n = []
          , l = r.evaluate(s, o, function() {
            return q
        }
        , m, null );
        if (m == XPathResult.FIRST_ORDERED_NODE_TYPE) {
            return l.singleNodeValue
        }
        for (var k = l.iterateNext(); k; ) {
            n[n.length] = k,
            k = l.iterateNext()
        }
        return n
    }
}
;
function j() {
    if (!this.catches) {
        this.catches = []
    }
    return this
}
j.prototype.catchError = function(d, c) {
    this.catches[d] = c
}
;
j.prototype.throwError = function(e, d, f) {
    if (this.catches[e]) {
        return this.catches[e](e, d, f)
    }
    if (this.catches.ALL) {
        return this.catches.ALL(e, d, f)
    }
    alert("Error type: " + e + "\nDescription: " + d);
    return null 
}
;
window.dhtmlxError = new j;
dtmlXMLLoaderObject.prototype.doXPathOpera = function(g, f) {
    var k = g.replace(/[\/]+/gi, "/").split("/")
      , i = null 
      , h = 1;
    if (!k.length) {
        return []
    }
    if (k[0] == ".") {
        i = [f]
    } else {
        if (k[0] == "") {
            i = (this.xmlDoc.responseXML || this.xmlDoc).getElementsByTagName(k[h].replace(/\[[^\]]*\]/g, "")),
            h++
        } else {
            return []
        }
    }
    for (; h < k.length; h++) {
        i = this._getAllNamedChilds(i, k[h])
    }
    k[h - 1].indexOf("[") != -1 && (i = this._filterXPath(i, k[h - 1]));
    return i
}
;
dtmlXMLLoaderObject.prototype._filterXPath = function(f, e) {
    for (var h = [], e = e.replace(/[^\[]*\[\@/g, "").replace(/[\[\]\@]*/g, ""), g = 0; g < f.length; g++) {
        f[g].getAttribute(e) && (h[h.length] = f[g])
    }
    return h
}
;
dtmlXMLLoaderObject.prototype._getAllNamedChilds = function(g, f) {
    var k = [];
    _isKHTML && (f = f.toUpperCase());
    for (var i = 0; i < g.length; i++) {
        for (var h = 0; h < g[i].childNodes.length; h++) {
            _isKHTML ? g[i].childNodes[h].tagName && g[i].childNodes[h].tagName.toUpperCase() == f && (k[k.length] = g[i].childNodes[h]) : g[i].childNodes[h].tagName == f && (k[k.length] = g[i].childNodes[h])
        }
    }
    return k
}
;
function dhtmlXHeir(e, d) {
    for (var f in d) {
        typeof d[f] == "function" && (e[f] = d[f])
    }
    return e
}
function dhtmlxEvent(e, d, f) {
    e.addEventListener ? e.addEventListener(d, f, !1) : e.attachEvent && e.attachEvent("on" + d, f)
}
dtmlXMLLoaderObject.prototype.xslDoc = null ;
dtmlXMLLoaderObject.prototype.setXSLParamValue = function(f, e, h) {
    if (!h) {
        h = this.xslDoc
    }
    if (h.responseXML) {
        h = h.responseXML
    }
    var g = this.doXPath("/xsl:stylesheet/xsl:variable[@name='" + f + "']", h, "http://www.w3.org/1999/XSL/Transform", "single");
    if (g != null ) {
        g.firstChild.nodeValue = e
    }
}
;
dtmlXMLLoaderObject.prototype.doXSLTransToObject = function(f, e) {
    if (!f) {
        f = this.xslDoc
    }
    if (f.responseXML) {
        f = f.responseXML
    }
    if (!e) {
        e = this.xmlDoc
    }
    if (e.responseXML) {
        e = e.responseXML
    }
    if (_isIE) {
        g = new ActiveXObject("Msxml2.DOMDocument.3.0");
        try {
            e.transformNodeToObject(f, g)
        } catch (h) {
            g = e.transformNode(f)
        }
    } else {
        if (!this.XSLProcessor) {
            this.XSLProcessor = new XSLTProcessor,
            this.XSLProcessor.importStylesheet(f)
        }
        var g = this.XSLProcessor.transformToDocument(e)
    }
    return g
}
;
dtmlXMLLoaderObject.prototype.doXSLTransToString = function(e, d) {
    var f = this.doXSLTransToObject(e, d);
    return typeof f == "string" ? f : this.doSerialization(f)
}
;
dtmlXMLLoaderObject.prototype.doSerialization = function(d) {
    if (!d) {
        d = this.xmlDoc
    }
    if (d.responseXML) {
        d = d.responseXML
    }
    if (_isIE) {
        return d.xml
    } else {
        var c = new XMLSerializer;
        return c.serializeToString(d)
    }
}
;
dhtmlxEventable = function(a) {
    a.attachEvent = function(a, c, d) {
        a = "ev_" + a.toLowerCase();
        this[a] || (this[a] = new this.eventCatcher(d || this));
        return a + ":" + this[a].addEvent(c)
    }
    ;
    a.callEvent = function(a, c) {
        a = "ev_" + a.toLowerCase();
        return this[a] ? this[a].apply(this, c) : !0
    }
    ;
    a.checkEvent = function(a) {
        return !!this["ev_" + a.toLowerCase()]
    }
    ;
    a.eventCatcher = function(a) {
        var c = []
          , d = function() {
            for (var d = !0, g = 0; g < c.length; g++) {
                if (c[g] != null ) {
                    var f = c[g].apply(a, arguments)
                      , d = d && f
                }
            }
            return d
        }
        ;
        d.addEvent = function(a) {
            typeof a != "function" && (a = eval(a));
            return a ? c.push(a) - 1 : !1
        }
        ;
        d.removeEvent = function(a) {
            c[a] = null 
        }
        ;
        return d
    }
    ;
    a.detachEvent = function(a) {
        if (a != !1) {
            var c = a.split(":");
            this[c[0]].removeEvent(c[1])
        }
    }
    ;
    a.detachAllEvents = function() {
        for (var a in this) {
            a.indexOf("ev_") == 0 && (this.detachEvent(a),
            this[a] = null )
        }
    }
    ;
    a = null 
}
;
function dhtmlXWindowsSngl() {}
function dhtmlXWindowsBtn() {}
function dhtmlXWindows() {
    if (!window.dhtmlXContainer) {
        alert(this.i18n.dhx);
        return
    }
    this.engine = "dhx";
    var d = "_" + this.engine + "_Engine";
    if (!this[d]) {
        alert(this.i18n.noenginealert);
        return
    } else {
        this[d]()
    }
    this._isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    var c = this;
    this.pathPrefix = "dhxwins_";
    this.imagePath = dhtmlx.image_path || "codebase/imgs/";
    this.setImagePath = function(a) {
        this.imagePath = a
    }
    ;
    this.skin = (typeof (dhtmlx) != "undefined" && typeof (dhtmlx.skin) == "string" ? dhtmlx.skin : "dhx_skyblue");
    this.skinParams = {
        dhx_black: {
            header_height: 21,
            border_left_width: 2,
            border_right_width: 2,
            border_bottom_height: 2
        },
        dhx_blue: {
            header_height: 21,
            border_left_width: 2,
            border_right_width: 2,
            border_bottom_height: 2
        },
        dhx_skyblue: {
            header_height: 21,
            border_left_width: 2,
            border_right_width: 2,
            border_bottom_height: 2
        }
    };
    this.setSkin = function(a) {
        this.skin = a;
        this._engineRedrawSkin()
    }
    ;
    this.isWindow = function(e) {
        var a = (this.wins[e] != null );
        return a
    }
    ;
    this.findByText = function(g) {
        var f = new Array();
        for (var e in this.wins) {
            if (this.wins[e].getText().search(g, "gi") >= 0) {
                f[f.length] = this.wins[e]
            }
        }
        return f
    }
    ;
    this.window = function(e) {
        var a = null ;
        if (this.wins[e] != null ) {
            a = this.wins[e]
        }
        return a
    }
    ;
    this.forEachWindow = function(f) {
        for (var e in this.wins) {
            f(this.wins[e])
        }
    }
    ;
    this.getBottommostWindow = function() {
        var e = this.getTopmostWindow();
        for (var f in this.wins) {
            if (this.wins[f].zi < e.zi) {
                e = this.wins[f]
            }
        }
        return ( e.zi != 0 ? e : null ) 
    }
    ;
    this.getTopmostWindow = function(g) {
        var f = {
            zi: 0
        };
        for (var e in this.wins) {
            if (this.wins[e].zi > f.zi) {
                if (g == true && !this._isWindowHidden(this.wins[e])) {
                    f = this.wins[e]
                }
                if (g != true) {
                    f = this.wins[e]
                }
            }
        }
        return ( f.zi != 0 ? f : null ) 
    }
    ;
    this.wins = {};
    for (var b in this.wins) {
        delete this.wins[b]
    }
    this.autoViewport = true;
    this._createViewport = function() {
        this.vp = document.body;
        this._clearVPCss();
        this.vp._css = (String(this.vp.className).length > 0 ? this.vp.className : "");
        this.vp.className += " dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
        this.modalCoverI = document.createElement("IFRAME");
        this.modalCoverI.frameBorder = "0";
        this.modalCoverI.className = "dhx_modal_cover_ifr";
        this.modalCoverI.setAttribute("src", "javascript:false;");
        this.modalCoverI.style.display = "none";
        this.modalCoverI.style.zIndex = 0;
        this.vp.appendChild(this.modalCoverI);
        this.modalCoverD = document.createElement("DIV");
        this.modalCoverD.className = "dhx_modal_cover_dv";
        this.modalCoverD.style.display = "none";
        this.modalCoverD.style.zIndex = 0;
        this.vp.appendChild(this.modalCoverD);
        this._vpcover = document.createElement("DIV");
        this._vpcover.className = "dhx_content_vp_cover";
        this._vpcover.style.display = "none";
        this.vp.appendChild(this._vpcover);
        this._carcass = document.createElement("DIV");
        this._carcass.className = "dhx_carcass_resmove";
        this._carcass.style.display = "none";
        if (_isIE) {
            this._carcass.innerHTML = "<iframe border=0 frameborder=0 style='filter: alpha(opacity=0); width: 100%; height:100%; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; z-index:1;'></iframe><div style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;z-index:2;background:white;filter:alpha(opacity=0);opacity:0;'></div>";
            if (navigator.userAgent.indexOf("MSIE 10") >= 0) {} else {
                this._carcass.childNodes[0].setAttribute("src", "javascript:false;")
            }
        }
        this._carcass.onselectstart = function(a) {
            a = a || event;
            a.returnValue = false
        }
        ;
        this.vp.appendChild(this._carcass)
    }
    ;
    this._clearVPCss = function(a) {
        this.vp.className = String(this.vp.className).replace(/[a-z_]{1,}/gi, function(e) {
            return ( {
                dhtmlx_skin_dhx_skyblue: 1,
                dhtmlx_skin_dhx_blue: 1,
                dhtmlx_skin_dhx_black: 1,
                dhtmlx_skin_dhx_web: 1,
                dhtmlx_skin_dhx_terrace: 1
            }[e] == 1 ? "" : e) 
        }
        )
    }
    ;
    this._autoResizeViewport = function() {
        for (var e in this.wins) {
            if (this.wins[e]._isFullScreened) {
                this.wins[e].adjustContent(document.body, 0, 0, false, 0);
                this.wins[e].updateNestedObjects()
            }
            if (this.wins[e]._isMaximized && this.wins[e].style.display != "none") {
                this._restoreWindow(e);
                this._maximizeWindow(e)
            }
        }
        if (this.vp == document.body) {
            return
        }
        if (this.autoViewport == false) {
            return
        }
        this.vp.style.width = (_isIE ? document.body.offsetWidth - 4 : window.innerWidth) + "px";
        this.vp.style.height = (_isIE ? document.body.offsetHeight - 4 : window.innerHeight) + "px";
        for (var e in this.wins) {
            var i = this.wins[e];
            var h = false;
            var f = false;
            if (i.x > this.vp.offsetWidth - 10) {
                i.x = this.vp.offsetWidth - 10;
                h = true
            }
            var g = (i._skinParams != null  ? i._skinParams : this.skinParams[this.skin]);
            if (i.y + g.header_height > this.vp.offsetHeight) {
                i.y = this.vp.offsetHeight - g.header_height;
                f = true
            }
            if (h || f) {
                this._engineRedrawWindowPos(i)
            }
        }
    }
    ;
    this.enableAutoViewport = function(a) {
        if (this.vp != document.body) {
            return
        }
        this.autoViewport = a;
        if (a == false) {
            if (this.vp == document.body) {
                document.body.className = this.vp._css
            }
            this.vp.removeChild(this.modalCoverI);
            this.vp.removeChild(this.modalCoverD);
            this.vp.removeChild(this._vpcover);
            this.vp.removeChild(this._carcass);
            this.vp = null ;
            this.vp = document.createElement("DIV");
            this.vp.autocreated = true;
            this.vp.className = "dhtmlx_winviewport dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
            this.vp.style.left = "0px";
            this.vp.style.top = "0px";
            document.body.appendChild(this.vp);
            this.vp.ax = 0;
            this.vp.ay = 0;
            this._autoResizeViewport();
            this.vp.appendChild(this.modalCoverI);
            this.vp.appendChild(this.modalCoverD);
            this.vp.appendChild(this._vpcover);
            this.vp.appendChild(this._carcass)
        }
    }
    ;
    this.attachViewportTo = function(a) {
        if (this.autoViewport == false) {
            this.vp.removeChild(this.modalCoverI);
            this.vp.removeChild(this.modalCoverD);
            this.vp.removeChild(this._vpcover);
            this.vp.removeChild(this._carcass);
            if (this.vp != document.body) {
                this.vp.parentNode.removeChild(this.vp)
            }
            this.vp = null ;
            this.vp = (typeof (a) == "string" ? document.getElementById(a) : a);
            this.vp.autocreated = false;
            this._clearVPCss();
            this.vp.className += " dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
            this.vp.style.position = "relative";
            this.vp.style.overflow = "hidden";
            this.vp.ax = 0;
            this.vp.ay = 0;
            this.vp.appendChild(this.modalCoverI);
            this.vp.appendChild(this.modalCoverD);
            this.vp.appendChild(this._vpcover);
            this.vp.appendChild(this._carcass)
        }
    }
    ;
    this.setViewport = function(e, h, f, a, g) {
        if (this.autoViewport == false) {
            this.vp.style.left = e + "px";
            this.vp.style.top = h + "px";
            this.vp.style.width = f + "px";
            this.vp.style.height = a + "px";
            if (g != null ) {
                g.appendChild(this.vp)
            }
            this.vp.ax = getAbsoluteLeft(this.vp);
            this.vp.ay = getAbsoluteTop(this.vp)
        }
    }
    ;
    this._effects = {
        move: false,
        resize: false
    };
    this.setEffect = function(e, a) {
        if ((this._effects[e] != null ) && (typeof (a) == "boolean")) {
            this._effects[e] = a
        }
    }
    ;
    this.getEffect = function(a) {
        return this._effects[a]
    }
    ;
    this.createWindow = function(l, f, k, h, e) {
        var j = document.createElement("DIV");
        j.className = "dhtmlx_window_inactive";
        j.dir = "ltr";
        for (var g in this.wins) {
            this.wins[g].zi += this.zIndexStep;
            this.wins[g].style.zIndex = this.wins[g].zi;
            if (this.iframeMode && this.wins[g].ifr) {
                this.wins[g].ifr.style.zIndex = this.wins[g].style.zIndex - 1
            }
        }
        j.zi = this.zIndexStep;
        j.style.zIndex = j.zi;
        j.active = false;
        j._isWindow = true;
        j.isWindow = true;
        j.w = Number(h);
        j.h = Number(e);
        j.x = f;
        j.y = k;
        this._engineFixWindowPosInViewport(j);
        j._isModal = false;
        j._allowResize = true;
        j.maxW = "auto";
        j.maxH = "auto";
        j.minW = 200;
        j.minH = 140;
        j.iconsPresent = true;
        j.icons = new Array(this.imagePath + this.pathPrefix + this.skin + "/active/icon_normal.gif",this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_normal.gif");
        j._allowMove = true;
        j._allowMoveGlobal = true;
        j._allowResizeGlobal = true;
        j._keepInViewport = false;
        var i = this.skinParams[this.skin];
        j.idd = l;
        this.vp.appendChild(j);
        this._engineSetWindowBody(j);
        this._engineRedrawWindowPos(j);
        this._engineRedrawWindowSize(j);
        this._engineUpdateWindowIcon(j, j.icons[0]);
        this._engineDiableOnSelectInWindow(j, true);
        this.wins[l] = j;
        dhtmlxEventable(j);
        this._engineGetWindowHeader(j)[this._isIPad ? "ontouchstart" : "onmousedown"] = function(m) {
            m = m || event;
            var a = c.wins[this.idd];
            if (!a.isOnTop()) {
                a.bringToTop()
            }
            if (c._engineGetWindowHeaderState(a)) {
                return
            }
            if (!c._engineCheckHeaderMouseDown(a, m)) {
                return
            }
            if (!a._allowMove || !a._allowMoveGlobal) {
                return
            }
            c._wasMoved = false;
            a.moveOffsetX = a.x - (c._isIPad ? m.touches[0].clientX : m.clientX);
            a.moveOffsetY = a.y - (c._isIPad ? m.touches[0].clientY : m.clientY);
            c.movingWin = a;
            if (c._effects.move == false) {
                c._carcass.x = c.movingWin.x;
                c._carcass.y = c.movingWin.y;
                c._carcass.w = parseInt(c.movingWin.style.width) + (_isIE ? 0 : -2);
                c._carcass.h = parseInt(c.movingWin.style.height) + (_isIE ? 0 : -2);
                c._carcass.style.left = c._carcass.x + "px";
                c._carcass.style.top = c._carcass.y + "px";
                c._carcass.style.width = c._carcass.w + "px";
                c._carcass.style.height = c._carcass.h + "px";
                c._carcass.style.zIndex = c._getTopZIndex(true) + 1;
                c._carcass._keepInViewport = j._keepInViewport
            }
            c._blockSwitcher(true);
            c._vpcover.style.zIndex = c.movingWin.style.zIndex - 1;
            c._vpcover.style.display = "";
            m.returnValue = false;
            m.cancelBubble = true;
            return false
        }
        ;
        this._engineGetWindowHeader(j).ondblclick = function(m) {
            var a = c.wins[this.idd];
            if (!c._engineCheckHeaderMouseDown(a, m || event)) {
                return
            }
            if (a._allowResizeGlobal && !a._isParked) {
                if (a._isMaximized == true) {
                    c._restoreWindow(a.idd)
                } else {
                    c._maximizeWindow(a.idd)
                }
            }
            a = null 
        }
        ;
        j.setText = function(a) {
            c._engineGetWindowLabel(this).innerHTML = a
        }
        ;
        j.getText = function() {
            return c._engineGetWindowLabel(this).innerHTML
        }
        ;
        j.getId = function() {
            return this.idd
        }
        ;
        j.show = function() {
            c._showWindow(this)
        }
        ;
        j.hide = function() {
            c._hideWindow(this)
        }
        ;
        j.minimize = function() {
            c._restoreWindow(this.idd)
        }
        ;
        j.maximize = function() {
            c._maximizeWindow(this.idd)
        }
        ;
        j.close = function() {
            c._closeWindow(this.idd)
        }
        ;
        j.park = function() {
            if (this._isParkedAllowed) {
                c._parkWindow(this.idd)
            }
        }
        ;
        j.stick = function() {
            c._stickWindow(this.idd)
        }
        ;
        j.unstick = function() {
            c._unstickWindow(this.idd)
        }
        ;
        j.isSticked = function() {
            return this._isSticked
        }
        ;
        j.setIcon = function(m, a) {
            c._setWindowIcon(j, m, a)
        }
        ;
        j.getIcon = function() {
            return c._getWindowIcon(this)
        }
        ;
        j.clearIcon = function() {
            c._clearWindowIcons(this)
        }
        ;
        j.restoreIcon = function() {
            c._restoreWindowIcons(this)
        }
        ;
        j.keepInViewport = function(a) {
            this._keepInViewport = a
        }
        ;
        j.setModal = function(a) {
            if (a == true) {
                if (c.modalWin != null  || c.modalWin == this) {
                    return
                }
                c._setWindowModal(this, true)
            } else {
                if (c.modalWin != this) {
                    return
                }
                c._setWindowModal(this, false)
            }
        }
        ;
        j.isModal = function() {
            return this._isModal
        }
        ;
        j.isHidden = function() {
            return c._isWindowHidden(this)
        }
        ;
        j.isMaximized = function() {
            return this._isMaximized
        }
        ;
        j.isParked = function() {
            return this._isParked
        }
        ;
        j.allowPark = function() {
            c._allowParking(this)
        }
        ;
        j.denyPark = function() {
            c._denyParking(this)
        }
        ;
        j.isParkable = function() {
            return this._isParkedAllowed
        }
        ;
        j.allowResize = function() {
            c._allowReszieGlob(this)
        }
        ;
        j.denyResize = function() {
            c._denyResize(this)
        }
        ;
        j.isResizable = function() {
            return this._allowResizeGlobal
        }
        ;
        j.allowMove = function() {
            if (!this._isMaximized) {
                this._allowMove = true
            }
            this._allowMoveGlobal = true
        }
        ;
        j.denyMove = function() {
            this._allowMoveGlobal = false
        }
        ;
        j.isMovable = function() {
            return this._allowMoveGlobal
        }
        ;
        j.bringToTop = function() {
            c._bringOnTop(this);
            c._makeActive(this)
        }
        ;
        j.bringToBottom = function() {
            c._bringOnBottom(this)
        }
        ;
        j.isOnTop = function() {
            return c._isWindowOnTop(this)
        }
        ;
        j.isOnBottom = function() {
            return c._isWindowOnBottom(this)
        }
        ;
        j.setPosition = function(a, m) {
            this.x = a;
            this.y = m;
            c._engineFixWindowPosInViewport(this);
            c._engineRedrawWindowPos(this)
        }
        ;
        j.getPosition = function() {
            return new Array(this.x,this.y)
        }
        ;
        j.setDimension = function(m, a) {
            if (m != null ) {
                if (this.maxW != "auto") {
                    if (m > this.maxW) {
                        m = this.maxW
                    }
                }
                if (m < this.minW) {
                    m = this.minW
                }
                this.w = m
            }
            if (a != null ) {
                if (this.maxH != "auto") {
                    if (a > this.maxH) {
                        a = this.maxH
                    }
                }
                if (a < this.minH) {
                    a = this.minH
                }
                this.h = a
            }
            c._fixWindowDimensionInViewport(this);
            c._engineFixWindowPosInViewport(this);
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        }
        ;
        j.getDimension = function() {
            return new Array(this.w,this.h)
        }
        ;
        j.setMaxDimension = function(m, a) {
            this.maxW = (isNaN(m) ? "auto" : m);
            this.maxH = (isNaN(a) ? "auto" : a);
            c._engineRedrawWindowSize(this)
        }
        ;
        j.getMaxDimension = function() {
            return new Array(this.maxW,this.maxH)
        }
        ;
        j.setMinDimension = function(a, m) {
            if (a != null ) {
                this.minW = a
            }
            if (m != null ) {
                this.minH = m
            }
            c._fixWindowDimensionInViewport(this);
            c._engineRedrawWindowPos(this)
        }
        ;
        j.getMinDimension = function() {
            return new Array(this.minW,this.minH)
        }
        ;
        j._adjustToContent = function(a, m) {
            c._engineAdjustWindowToContent(this, a, m)
        }
        ;
        j._doOnAttachMenu = function() {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        }
        ;
        j._doOnAttachToolbar = function() {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        }
        ;
        j._doOnAttachStatusBar = function() {
            c._engineRedrawWindowSize(this);
            this.updateNestedObjects()
        }
        ;
        j._doOnFrameMouseDown = function() {
            this.bringToTop()
        }
        ;
        j._doOnFrameContentLoaded = function() {
            c.callEvent("onContentLoaded", [this])
        }
        ;
        j.addUserButton = function(p, o, n, a) {
            var m = c._addUserButton(this, p, o, n, a);
            return m
        }
        ;
        j.removeUserButton = function(a) {
            a = String(a).toLowerCase();
            if (!((a == "minmax1") || (a == "minmax2") || (a == "park") || (a == "close") || (a == "stick") || (a == "unstick") || (a == "help"))) {
                if (btn != null ) {
                    c._removeUserButton(this, a)
                }
            }
        }
        ;
        j.progressOn = function() {
            c._engineSwitchWindowProgress(this, true)
        }
        ;
        j.progressOff = function() {
            c._engineSwitchWindowProgress(this, false)
        }
        ;
        j.setToFullScreen = function(a) {
            c._setWindowToFullScreen(this, a)
        }
        ;
        j.showHeader = function() {
            c._engineSwitchWindowHeader(this, true)
        }
        ;
        j.hideHeader = function() {
            c._engineSwitchWindowHeader(this, false)
        }
        ;
        j.progressOff();
        j.canStartResize = false;
        j.onmousemove = function(q) {
            if (_isIE && this._isMaximized) {
                return true
            }
            q = q || event;
            var n = q.target || q.srcElement;
            if (String(n.className).search("dhtmlx_wins_resizer") < 0) {
                n = null 
            }
            if (!this._allowResize || this._allowResizeGlobal == false || !n) {
                if (n) {
                    if (n.style.cursor != "default") {
                        n.style.cursor = "default"
                    }
                }
                if (this.style.cursor != "default") {
                    this.style.cursor = "default"
                }
                this.canStartResize = false;
                return true
            }
            if (c.resizingWin != null ) {
                return
            }
            if (c.movingWin != null ) {
                return
            }
            if (this._isParked) {
                return
            }
            if (c._isIPad) {
                var m = q.touches[0].clientX;
                var a = q.touches[0].clientY
            } else {
                var m = (_isIE || _isOpera ? q.offsetX : q.layerX);
                var a = (_isIE || _isOpera ? q.offsetY : q.layerY)
            }
            var o = c._engineAllowWindowResize(j, n, m, a);
            if (o == null ) {
                this.canStartResize = false;
                if (n.style.cursor != "default") {
                    n.style.cursor = "default"
                }
                if (this.style.cursor != "default") {
                    this.style.cursor = "default"
                }
                return
            }
            c.resizingDirs = o;
            var p = {
                x: q.clientX,
                y: q.clientY
            };
            switch (c.resizingDirs) {
            case "border_left":
                n.style.cursor = "w-resize";
                this.resizeOffsetX = this.x - p.x;
                break;
            case "border_right":
                n.style.cursor = "e-resize";
                this.resizeOffsetXW = this.x + this.w - p.x;
                break;
            case "border_top":
                n.style.cursor = "n-resize";
                this.resizeOffsetY = this.y - p.y;
                break;
            case "border_bottom":
                n.style.cursor = "n-resize";
                this.resizeOffsetYH = this.y + this.h - p.y;
                break;
            case "corner_left":
                n.style.cursor = "sw-resize";
                this.resizeOffsetX = this.x - q.clientX;
                this.resizeOffsetYH = this.y + this.h - p.y;
                break;
            case "corner_up_left":
                n.style.cursor = "nw-resize";
                this.resizeOffsetY = this.y - p.y;
                this.resizeOffsetX = this.x - p.x;
                break;
            case "corner_right":
                n.style.cursor = "nw-resize";
                this.resizeOffsetXW = this.x + this.w - p.x;
                this.resizeOffsetYH = this.y + this.h - p.y;
                break;
            case "corner_up_right":
                n.style.cursor = "sw-resize";
                this.resizeOffsetY = this.y - p.y;
                this.resizeOffsetXW = this.x + this.w - p.x;
                break
            }
            this.canStartResize = true;
            this.style.cursor = n.style.cursor;
            q.cancelBubble = true;
            q.returnValue = false;
            return false
        }
        ;
        j.onmousedown = function(a) {
            if (c._getActive() != this) {
                c._makeActive(this)
            }
            c._bringOnTop(this);
            if (this.canStartResize) {
                c._blockSwitcher(true);
                c.resizingWin = this;
                if (!c._effects.resize) {
                    c._carcass.x = c.resizingWin.x;
                    c._carcass.y = c.resizingWin.y;
                    c._carcass.w = Number(c.resizingWin.w) + (_isIE ? 0 : -2);
                    c._carcass.h = Number(c.resizingWin.h) + (_isIE ? 0 : -2);
                    c._carcass.style.left = c._carcass.x + "px";
                    c._carcass.style.top = c._carcass.y + "px";
                    c._carcass.style.width = c._carcass.w + "px";
                    c._carcass.style.height = c._carcass.h + "px";
                    c._carcass.style.zIndex = c._getTopZIndex(true) + 1;
                    c._carcass.style.cursor = this.style.cursor;
                    c._carcass._keepInViewport = this._keepInViewport;
                    c._carcass.style.display = ""
                }
                c._vpcover.style.zIndex = c.resizingWin.style.zIndex - 1;
                c._vpcover.style.display = "";
                if (this.vs[this.av].layout) {
                    this.callEvent("_onBeforeTryResize", [this])
                }
                a = a || event
            }
        }
        ;
        this._addDefaultButtons(j.idd);
        j.button = function(m) {
            m = String(m).toLowerCase();
            var a = null ;
            if (this.btns[m] != null ) {
                a = this.btns[m]
            }
            return a
        }
        ;
        j.center = function() {
            c._centerWindow(this, false)
        }
        ;
        j.centerOnScreen = function() {
            c._centerWindow(this, true)
        }
        ;
        j._attachContent("empty", null );
        j._redraw = function() {
            c._engineRedrawWindowSize(this)
        }
        ;
        j.bringToTop();
        this._engineRedrawWindowSize(j);
        return this.wins[l]
    }
    ;
    this.zIndexStep = 2000;
    this._getTopZIndex = function(f) {
        var g = 0;
        for (var e in this.wins) {
            if (f == true) {
                if (this.wins[e].zi > g) {
                    g = this.wins[e].zi
                }
            } else {
                if (this.wins[e].zi > g && !this.wins[e]._isSticked) {
                    g = this.wins[e].zi
                }
            }
        }
        return g
    }
    ;
    this.movingWin = null ;
    this._moveWindow = function(h) {
        if (this.movingWin != null ) {
            if (!this.movingWin._allowMove || !this.movingWin._allowMoveGlobal) {
                return
            }
            if (this._effects.move == true) {
                if (this._engineGetWindowHeader(this.movingWin).style.cursor != "move") {
                    this._engineGetWindowHeader(this.movingWin).style.cursor = "move"
                }
                this._wasMoved = true;
                this.movingWin.x = (this._isIPad ? h.touches[0].clientX : h.clientX) + this.movingWin.moveOffsetX;
                this.movingWin.y = (this._isIPad ? h.touches[0].clientY : h.clientY) + this.movingWin.moveOffsetY;
                this._engineFixWindowPosInViewport(this.movingWin);
                this._engineRedrawWindowPos(this.movingWin)
            } else {
                if (this._carcass.style.display != "") {
                    this._carcass.style.display = ""
                }
                if (this._carcass.style.cursor != "move") {
                    this._carcass.style.cursor = "move"
                }
                if (this._engineGetWindowHeader(this.movingWin).style.cursor != "move") {
                    this._engineGetWindowHeader(this.movingWin).style.cursor = "move"
                }
                this._carcass.x = (this._isIPad ? h.touches[0].clientX : h.clientX) + this.movingWin.moveOffsetX;
                this._carcass.y = (this._isIPad ? h.touches[0].clientY : h.clientY) + this.movingWin.moveOffsetY;
                this._wasMoved = true;
                this._engineFixWindowPosInViewport(this._carcass);
                this._carcass.style.left = this._carcass.x + "px";
                this._carcass.style.top = this._carcass.y + "px"
            }
        }
        if (this.resizingWin != null ) {
            if (!this.resizingWin._allowResize) {
                return
            }
            var g = {
                x: h.clientX,
                y: h.clientY
            };
            if (this.resizingDirs == "border_left" || this.resizingDirs == "corner_left" || this.resizingDirs == "corner_up_left") {
                if (this._effects.resize) {
                    var f = g.x + this.resizingWin.resizeOffsetX;
                    var a = (f > this.resizingWin.x ? -1 : 1);
                    newW = this.resizingWin.w + Math.abs(f - this.resizingWin.x) * a;
                    if ((newW < this.resizingWin.minW) && (a < 0)) {
                        this.resizingWin.x = this.resizingWin.x + this.resizingWin.w - this.resizingWin.minW;
                        this.resizingWin.w = this.resizingWin.minW
                    } else {
                        this.resizingWin.w = newW;
                        this.resizingWin.x = f
                    }
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.x + this.resizingWin.resizeOffsetX;
                    var a = (f > this._carcass.x ? -1 : 1);
                    newW = this._carcass.w + Math.abs(f - this._carcass.x) * a;
                    if (newW > this.resizingWin.maxW) {
                        newW = this.resizingWin.maxW;
                        f = this._carcass.x + this._carcass.w - this.resizingWin.maxW
                    }
                    if ((newW < this.resizingWin.minW) && (a < 0)) {
                        this._carcass.x = this._carcass.x + this._carcass.w - this.resizingWin.minW;
                        this._carcass.w = this.resizingWin.minW
                    } else {
                        this._carcass.w = newW;
                        this._carcass.x = f
                    }
                    this._carcass.style.left = this._carcass.x + "px";
                    this._carcass.style.width = this._carcass.w + "px"
                }
            }
            if (this.resizingDirs == "border_right" || this.resizingDirs == "corner_right" || this.resizingDirs == "corner_up_right") {
                if (this._effects.resize) {
                    var f = g.x - (this.resizingWin.x + this.resizingWin.w) + this.resizingWin.resizeOffsetXW;
                    newW = this.resizingWin.w + f;
                    if (newW < this.resizingWin.minW) {
                        newW = this.resizingWin.minW
                    }
                    this.resizingWin.w = newW;
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.x - (this._carcass.x + this._carcass.w) + this.resizingWin.resizeOffsetXW;
                    newW = this._carcass.w + f;
                    if (newW < this.resizingWin.minW) {
                        newW = this.resizingWin.minW
                    }
                    if (this.resizingWin.maxW != "auto") {
                        if (newW > this.resizingWin.maxW) {
                            newW = this.resizingWin.maxW
                        }
                    }
                    this._carcass.w = newW;
                    this._carcass.style.width = this._carcass.w + "px"
                }
            }
            if (this.resizingDirs == "border_bottom" || this.resizingDirs == "corner_left" || this.resizingDirs == "corner_right") {
                if (this._effects.resize) {
                    var f = g.y - (this.resizingWin.y + this.resizingWin.h) + this.resizingWin.resizeOffsetYH;
                    newH = this.resizingWin.h + f;
                    if (newH < this.resizingWin.minH) {
                        newH = this.resizingWin.minH
                    }
                    this.resizingWin.h = newH;
                    this._engineRedrawWindowPos(this.resizingWin);
                    this._engineRedrawWindowSize(this.resizingWin)
                } else {
                    var f = g.y - (this._carcass.y + this._carcass.h) + this.resizingWin.resizeOffsetYH;
                    newH = this._carcass.h + f;
                    if (newH < this.resizingWin.minH) {
                        newH = this.resizingWin.minH
                    }
                    if (newH > this.resizingWin.maxH) {
                        newH = this.resizingWin.maxH
                    }
                    this._carcass.h = newH;
                    this._carcass.style.height = this._carcass.h + "px"
                }
            }
            if (this.resizingDirs == "border_top" || this.resizingDirs == "corner_up_right" || this.resizingDirs == "corner_up_left") {
                if (this._effects.resize) {} else {
                    var f = g.y + this.resizingWin.resizeOffsetY;
                    var a = (f > this.resizingWin.y ? -1 : 1);
                    newH = this.resizingWin.h + Math.abs(f - this.resizingWin.y) * a;
                    if (newH > this.resizingWin.maxH) {
                        newH = this.resizingWin.maxH;
                        f = this.resizingWin.y + this.resizingWin.h - this.resizingWin.maxH
                    }
                    if ((newH < this.resizingWin.minH) && (a < 0)) {
                        this._carcass.y = this._carcass.y + this._carcass.h - this.resizingWin.minH;
                        this._carcass.h = this.resizingWin.minH
                    } else {
                        this._carcass.h = newH + (_isIE ? 0 : -2);
                        this._carcass.y = f
                    }
                    this._carcass.style.top = this._carcass.y + "px";
                    this._carcass.style.height = this._carcass.h + "px"
                }
            }
        }
    }
    ;
    this._stopMove = function() {
        if (this.movingWin != null ) {
            if (this._effects.move) {
                var a = this.movingWin;
                this.movingWin = null ;
                this._blockSwitcher(false);
                this._engineGetWindowHeader(a).style.cursor = "";
                if (_isFF) {
                    a.h++;
                    c._engineRedrawWindowPos(a);
                    a.h--;
                    c._engineRedrawWindowPos(a)
                }
            } else {
                this._carcass.style.cursor = "";
                this._carcass.style.display = "none";
                var a = this.movingWin;
                this._engineGetWindowHeader(a).style.cursor = "";
                this.movingWin = null ;
                this._blockSwitcher(false);
                a.setPosition(parseInt(this._carcass.style.left), parseInt(this._carcass.style.top))
            }
            this._vpcover.style.display = "none";
            if (this._wasMoved) {
                if (a.checkEvent("onMoveFinish")) {
                    a.callEvent("onMoveFinish", [a])
                } else {
                    this.callEvent("onMoveFinish", [a])
                }
            }
            this._wasMoved = false
        }
        if (this.resizingWin != null ) {
            var a = this.resizingWin;
            this.resizingWin = null ;
            this._blockSwitcher(false);
            if (!this._effects.resize) {
                this._carcass.style.display = "none";
                a.setDimension(this._carcass.w + (_isIE ? 0 : 2), this._carcass.h + (_isIE ? 0 : 2));
                a.setPosition(this._carcass.x, this._carcass.y)
            } else {
                a.updateNestedObjects()
            }
            if (a.vs[a.av].layout) {
                a.vs[a.av].layout.callEvent("onResize", [])
            }
            this._vpcover.style.display = "none";
            if (a.checkEvent("onResizeFinish")) {
                a.callEvent("onResizeFinish", [a])
            } else {
                this.callEvent("onResizeFinish", [a])
            }
        }
    }
    ;
    this._fixWindowDimensionInViewport = function(a) {
        if (a.w < a.minW) {
            a.w = a.minW
        }
        if (a._isParked) {
            return
        }
        if (a.h < a.minH) {
            a.h = a.minH
        }
    }
    ;
    this._bringOnTop = function(h) {
        var f = h.zi;
        var g = this._getTopZIndex(h._isSticked);
        for (var e in this.wins) {
            if (this.wins[e] != h) {
                if (h._isSticked || (!h._isSticked && !this.wins[e]._isSticked)) {
                    if (this.wins[e].zi > f) {
                        this.wins[e].zi = this.wins[e].zi - this.zIndexStep;
                        this.wins[e].style.zIndex = this.wins[e].zi;
                        if (this.iframeMode && this.wins[e].ifr) {
                            this.wins[e].ifr.style.zIndex = this.wins[e].style.zIndex - 1
                        }
                    }
                }
            }
        }
        h.zi = g;
        h.style.zIndex = h.zi;
        if (this.iframeMode && h.ifr) {
            h.ifr.style.zIndex = g - 1
        }
    }
    ;
    this._makeActive = function(g, f) {
        for (var e in this.wins) {
            if (this.wins[e] == g) {
                var h = false;
                if (this.wins[e].className != "dhtmlx_window_active" && !f) {
                    h = true
                }
                this.wins[e].className = "dhtmlx_window_active";
                this._engineUpdateWindowIcon(this.wins[e], this.wins[e].icons[0]);
                if (h == true) {
                    if (g.checkEvent("onFocus")) {
                        g.callEvent("onFocus", [g])
                    } else {
                        this.callEvent("onFocus", [g])
                    }
                }
            } else {
                this.wins[e].className = "dhtmlx_window_inactive";
                this._engineUpdateWindowIcon(this.wins[e], this.wins[e].icons[1])
            }
        }
    }
    ;
    this._getActive = function() {
        var f = null ;
        for (var e in this.wins) {
            if (this.wins[e].className == "dhtmlx_window_active") {
                f = this.wins[e]
            }
        }
        return f
    }
    ;
    this._centerWindow = function(g, a) {
        if (g._isMaximized == true) {
            return
        }
        if (a == true) {
            var e = (_isIE ? document.body.offsetWidth : window.innerWidth);
            var i = (_isIE ? document.body.offsetHeight : window.innerHeight)
        } else {
            var e = (this.vp == document.body ? document.body.offsetWidth : (Number(parseInt(this.vp.style.width)) && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.width) : this.vp.offsetWidth));
            var i = (this.vp == document.body ? document.body.offsetHeight : (Number(parseInt(this.vp.style.height)) && String(this.vp.style.height).search("%") == -1 ? parseInt(this.vp.style.height) : this.vp.offsetHeight))
        }
        var h = Math.round((e / 2) - (g.w / 2));
        var f = Math.round((i / 2) - (g.h / 2));
        g.x = h;
        g.y = f;
        this._engineFixWindowPosInViewport(g);
        this._engineRedrawWindowPos(g)
    }
    ;
    this._addDefaultButtons = function(k) {
        var l = this.wins[k];
        var j = this._engineGetWindowButton(l, "stick");
        j.title = this.i18n.stick;
        j.isVisible = false;
        j.style.display = "none";
        j._isEnabled = true;
        j.isPressed = false;
        j.label = "stick";
        j._doOnClick = function() {
            this.isPressed = true;
            c._stickWindow(this.winId)
        }
        ;
        var g = this._engineGetWindowButton(l, "sticked");
        g.title = this.i18n.unstick;
        g.isVisible = false;
        g.style.display = "none";
        g._isEnabled = true;
        g.isPressed = false;
        g.label = "sticked";
        g._doOnClick = function() {
            this.isPressed = false;
            c._unstickWindow(this.winId)
        }
        ;
        var e = this._engineGetWindowButton(l, "help");
        e.title = this.i18n.help;
        e.isVisible = false;
        e.style.display = "none";
        e._isEnabled = true;
        e.isPressed = false;
        e.label = "help";
        e._doOnClick = function() {
            c._needHelp(this.winId)
        }
        ;
        var i = this._engineGetWindowButton(l, "park");
        i.titleIfParked = this.i18n.parkdown;
        i.titleIfNotParked = this.i18n.parkup;
        i.title = i.titleIfNotParked;
        i.isVisible = true;
        i._isEnabled = true;
        i.isPressed = false;
        i.label = "park";
        i._doOnClick = function() {
            c._parkWindow(this.winId)
        }
        ;
        var h = this._engineGetWindowButton(l, "minmax1");
        h.title = this.i18n.maximize;
        h.isVisible = true;
        h._isEnabled = true;
        h.isPressed = false;
        h.label = "minmax1";
        h._doOnClick = function() {
            c._maximizeWindow(this.winId)
        }
        ;
        var f = this._engineGetWindowButton(l, "minmax2");
        f.title = this.i18n.restore;
        f.isVisible = false;
        f.style.display = "none";
        f._isEnabled = true;
        f.isPressed = false;
        f.label = "minmax2";
        f._doOnClick = function() {
            c._restoreWindow(this.winId)
        }
        ;
        var n = this._engineGetWindowButton(l, "close");
        n.title = this.i18n.close;
        n.isVisible = true;
        n._isEnabled = true;
        n.isPressed = false;
        n.label = "close";
        n._doOnClick = function() {
            c._closeWindow(this.winId)
        }
        ;
        var m = this._engineGetWindowButton(l, "dock");
        m.title = this.i18n.dock;
        m.style.display = "none";
        m.isVisible = false;
        m._isEnabled = true;
        m.isPressed = false;
        m.label = "dock";
        m._doOnClick = function() {}
        ;
        l._isSticked = false;
        l._isParked = false;
        l._isParkedAllowed = true;
        l._isMaximized = false;
        l._isDocked = false;
        l.btns = {};
        l.btns.stick = j;
        l.btns.sticked = g;
        l.btns.help = e;
        l.btns.park = i;
        l.btns.minmax1 = h;
        l.btns.minmax2 = f;
        l.btns.close = n;
        l.btns.dock = m;
        for (var o in l.btns) {
            l.btns[o].winId = l.idd;
            this._attachEventsOnButton(l.idd, o)
        }
        l = j = g = e = i = h = f = n = m = null 
    }
    ;
    this._attachEventsOnButton = function(e, f) {
        var a = this.wins[e].btns[f];
        if (!this._isIPad) {
            a.onmouseover = function() {
                if (this._isEnabled) {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_" + (this.isPressed ? "pressed" : "default")
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            }
            ;
            a.onmouseout = function() {
                if (this._isEnabled) {
                    this.isPressed = false;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_default"
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            }
            ;
            a.onmousedown = function() {
                if (this._isEnabled) {
                    this.isPressed = true;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_pressed"
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            }
            ;
            a.onmouseup = function() {
                if (this._isEnabled) {
                    var g = this.isPressed;
                    this.isPressed = false;
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_over_default";
                    if (g) {
                        if (this.checkEvent("onClick")) {
                            this.callEvent("onClick", [c.wins[this.winId], this])
                        } else {
                            this._doOnClick()
                        }
                    }
                } else {
                    this.className = "dhtmlx_wins_btns_button dhtmlx_button_" + this.label + "_disabled"
                }
            }
        } else {
            a.ontouchstart = function(g) {
                g.cancelBubble = true;
                g.returnValue = false;
                return false
            }
            ;
            a.ontouchend = function(g) {
                g.cancelBubble = true;
                g.returnValue = false;
                if (!this._isEnabled) {
                    return false
                }
                if (this.checkEvent("onClick")) {
                    this.callEvent("onClick", [c.wins[this.winId], this])
                } else {
                    this._doOnClick()
                }
                return false
            }
        }
        a.show = function() {
            c._showButton(c.wins[this.winId], this.label, true)
        }
        ;
        a.hide = function() {
            c._hideButton(c.wins[this.winId], this.label, true)
        }
        ;
        a.enable = function() {
            c._enableButton(c.wins[this.winId], this.label)
        }
        ;
        a.disable = function() {
            c._disableButton(c.wins[this.winId], this.label)
        }
        ;
        a.isEnabled = function() {
            return this._isEnabled
        }
        ;
        a.isHidden = function() {
            return ( !this.isVisible) 
        }
        ;
        dhtmlxEventable(a);
        a = null 
    }
    ;
    this._parkWindow = function(e, g) {
        var f = this.wins[e];
        if (!f._isParkedAllowed && !g) {
            return
        }
        if (this.enableParkEffect && f.parkBusy) {
            return
        }
        if (f._isParked) {
            if (this.enableParkEffect && !g) {
                f.parkBusy = true;
                this._doParkDown(f)
            } else {
                f.h = f.lastParkH;
                this._engineRedrawWindowSize(f);
                this._engineDoOnWindowParkDown(f);
                f.updateNestedObjects();
                f.btns.park.title = f.btns.park.titleIfNotParked;
                if (f._allowResizeGlobal == true) {
                    this._enableButton(f, "minmax1");
                    this._enableButton(f, "minmax2")
                }
                f._isParked = false;
                if (!g) {
                    if (f.checkEvent("onParkDown")) {
                        f.callEvent("onParkDown", [f])
                    } else {
                        this.callEvent("onParkDown", [f])
                    }
                }
            }
        } else {
            if (this.enableParkEffect && !g) {
                f.lastParkH = (String(f.h).search(/\%$/) == -1 ? f.h : f.offsetHeight);
                if (f._allowResizeGlobal == true) {
                    this._disableButton(f, "minmax1");
                    this._disableButton(f, "minmax2")
                }
                if (this.enableParkEffect) {
                    f.parkBusy = true;
                    this._doParkUp(f)
                } else {
                    var a = (f._skinParams != null  ? f._skinParams : this.skinParams[this.skin]);
                    f.h = a.header_height + a.border_bottom_height;
                    f.btns.park.title = f.btns.park.titleIfParked
                }
            } else {
                f.lastParkH = (String(f.h).search(/\%$/) == -1 ? f.h : f.offsetHeight);
                f.h = this._engineGetWindowParkedHeight(f);
                this._engineRedrawWindowSize(f);
                this._engineDoOnWindowParkUp(f);
                f.btns.park.title = f.btns.park.titleIfParked;
                f._isParked = true;
                if (!g) {
                    if (f.checkEvent("onParkUp")) {
                        f.callEvent("onParkUp", [f])
                    } else {
                        this.callEvent("onParkUp", [f])
                    }
                }
            }
        }
        f = null 
    }
    ;
    this._allowParking = function(a) {
        a._isParkedAllowed = true;
        this._enableButton(a, "park")
    }
    ;
    this._denyParking = function(a) {
        a._isParkedAllowed = false;
        this._disableButton(a, "park")
    }
    ;
    this.enableParkEffect = false;
    this.parkStartSpeed = 80;
    this.parkSpeed = this.parkStartSpeed;
    this.parkTM = null ;
    this.parkTMTime = 5;
    this._doParkUp = function(e) {
        if (String(e.h).search(/\%$/) != -1) {
            e.h = e.offsetHeight
        }
        e.h -= this.parkSpeed;
        var a = this._engineGetWindowParkedHeight(e);
        if (e.h <= a) {
            e.h = a;
            this._engineGetWindowButton(e, "park").title = this._engineGetWindowButton(e, "park").titleIfParked;
            e._isParked = true;
            e.parkBusy = false;
            this._engineRedrawWindowSize(e);
            this._engineDoOnWindowParkUp(e);
            if (e.checkEvent("onParkUp")) {
                e.callEvent("onParkUp", [e])
            } else {
                this.callEvent("onParkUp", [e])
            }
        } else {
            this._engineRedrawWindowSize(e);
            this.parkTM = window.setTimeout(function() {
                c._doParkUp(e)
            }
            , this.parkTMTime)
        }
    }
    ;
    this._doParkDown = function(a) {
        a.h += this.parkSpeed;
        if (a.h >= a.lastParkH) {
            a.h = a.lastParkH;
            this._engineGetWindowButton(a, "park").title = this._engineGetWindowButton(a, "park").titleIfNotParked;
            if (a._allowResizeGlobal == true) {
                this._enableButton(a, "minmax1");
                this._enableButton(a, "minmax2")
            }
            a._isParked = false;
            a.parkBusy = false;
            this._engineRedrawWindowSize(a);
            a.updateNestedObjects();
            this._engineDoOnWindowParkDown(a);
            if (a.checkEvent("onParkDown")) {
                a.callEvent("onParkDown", [a])
            } else {
                this.callEvent("onParkDown", [a])
            }
        } else {
            this._engineRedrawWindowSize(a);
            this.parkTM = window.setTimeout(function() {
                c._doParkDown(a)
            }
            , this.parkTMTime)
        }
    }
    ;
    this._enableButton = function(f, e) {
        var a = this._engineGetWindowButton(f, e);
        if (!a) {
            return
        }
        a._isEnabled = true;
        a.className = "dhtmlx_wins_btns_button dhtmlx_button_" + a.label + "_default";
        a = null 
    }
    ;
    this._disableButton = function(f, e) {
        var a = this._engineGetWindowButton(f, e);
        if (!a) {
            return
        }
        a._isEnabled = false;
        a.className = "dhtmlx_wins_btns_button dhtmlx_button_" + f.btns[e].label + "_disabled";
        a = null 
    }
    ;
    this._allowReszieGlob = function(a) {
        a._allowResizeGlobal = true;
        this._enableButton(a, "minmax1");
        this._enableButton(a, "minmax2")
    }
    ;
    this._denyResize = function(a) {
        a._allowResizeGlobal = false;
        this._disableButton(a, "minmax1");
        this._disableButton(a, "minmax2")
    }
    ;
    this._maximizeWindow = function(a) {
        var f = this.wins[a];
        if (f._allowResizeGlobal == false) {
            return
        }
        var e = f._isParked;
        if (e) {
            this._parkWindow(f.idd, true)
        }
        f.lastMaximizeX = f.x;
        f.lastMaximizeY = f.y;
        f.lastMaximizeW = f.w;
        f.lastMaximizeH = f.h;
        if (f.maxW != "auto" && f.maxW != "auto") {
            f.x = Math.round(f.x + (f.w - f.maxW) / 2);
            f.y = Math.round(f.y + (f.h - f.maxH) / 2);
            f._allowMove = true
        } else {
            f.x = 0;
            f.y = 0;
            f._allowMove = false
        }
        f._isMaximized = true;
        f._allowResize = false;
        f.w = (f.maxW == "auto" ? (this.vp == document.body ? "100%" : (this.vp.style.width != "" && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.width) : this.vp.offsetWidth)) : f.maxW);
        f.h = (f.maxH == "auto" ? (this.vp == document.body ? "100%" : (this.vp.style.height != "" && String(this.vp.style.width).search("%") == -1 ? parseInt(this.vp.style.height) : this.vp.offsetHeight)) : f.maxH);
        this._hideButton(f, "minmax1");
        this._showButton(f, "minmax2");
        this._engineRedrawWindowPos(f);
        if (e) {
            this._parkWindow(f.idd, true)
        } else {
            this._engineRedrawWindowSize(f);
            f.updateNestedObjects()
        }
        if (f.checkEvent("onMaximize")) {
            f.callEvent("onMaximize", [f])
        } else {
            this.callEvent("onMaximize", [f])
        }
        f = null 
    }
    ;
    this._restoreWindow = function(a) {
        var f = this.wins[a];
        if (f._allowResizeGlobal == false) {
            return
        }
        if (f.layout) {
            f.layout._defineWindowMinDimension(f)
        }
        var e = f._isParked;
        if (e) {
            this._parkWindow(f.idd, true)
        }
        if (f.maxW != "auto" && f.maxW != "auto") {
            f.x = Math.round(f.x + (f.w - f.lastMaximizeW) / 2);
            f.y = Math.round(f.y + (f.h - f.lastMaximizeH) / 2)
        } else {
            f.x = f.lastMaximizeX;
            f.y = f.lastMaximizeY
        }
        f.w = f.lastMaximizeW;
        f.h = f.lastMaximizeH;
        f._isMaximized = false;
        f._allowMove = f._allowMoveGlobal;
        f._allowResize = true;
        this._fixWindowDimensionInViewport(f);
        this._hideButton(f, "minmax2");
        this._showButton(f, "minmax1");
        this._engineRedrawWindowPos(f);
        if (e) {
            this._parkWindow(f.idd, true)
        } else {
            this._engineRedrawWindowSize(f);
            f.updateNestedObjects()
        }
        if (f.checkEvent("onMinimize")) {
            f.callEvent("onMinimize", [f])
        } else {
            this.callEvent("onMinimize", [f])
        }
        f = null 
    }
    ;
    this._showButton = function(g, e, f) {
        var a = this._engineGetWindowButton(g, e);
        if (!a) {
            return
        }
        if ((!f && a._userHide) || a.isVisible === true) {
            return
        }
        a.isVisible = true;
        a.style.display = "";
        a.style.visibility = "visible";
        a._userHide = !(f == true);
        this._engineRedrawWindowTitle(g);
        a = null 
    }
    ;
    this._hideButton = function(g, e, f) {
        var a = this._engineGetWindowButton(g, e);
        if (!a || (!f && a.isVisible === false)) {
            return
        }
        a.isVisible = false;
        a.style.display = "none";
        a.style.visibility = "hidden";
        a._userHide = (f == true);
        this._engineRedrawWindowTitle(g);
        a = null 
    }
    ;
    this._showWindow = function(e) {
        e.style.display = "";
        if (e.checkEvent("onShow")) {
            e.callEvent("onShow", [e])
        } else {
            this.callEvent("onShow", [e])
        }
        var a = this._getActive();
        if (a == null ) {
            this._bringOnTop(e);
            this._makeActive(e)
        } else {
            if (this._isWindowHidden(a)) {
                this._bringOnTop(e);
                this._makeActive(e)
            }
        }
        if (this.iframeMode && e.ifr) {
            e.ifr.style.display = ""
        }
    }
    ;
    this._hideWindow = function(e) {
        e.style.display = "none";
        if (e.checkEvent("onHide")) {
            e.callEvent("onHide", [e])
        } else {
            this.callEvent("onHide", [e])
        }
        var a = this.getTopmostWindow(true);
        if (a != null ) {
            this._bringOnTop(a);
            this._makeActive(a)
        }
        if (this.iframeMode && e.ifr) {
            e.ifr.style.display = "none"
        }
    }
    ;
    this._isWindowHidden = function(e) {
        var a = (e.style.display == "none");
        return a
    }
    ;
    this._closeWindow = function(g) {
        var h = this.wins[g];
        if (this._focusFixIE) {
            this._focusFixIE.style.top = (this.vp == document.body ? 0 : getAbsoluteTop(this.vp)) + Number(h.y) + "px";
            this._focusFixIE.focus()
        }
        if (h.checkEvent("onClose")) {
            if (!h.callEvent("onClose", [h])) {
                return
            }
        } else {
            if (!this.callEvent("onClose", [h])) {
                return
            }
        }
        h = null ;
        this._removeWindowGlobal(g);
        var f = {
            zi: 0
        };
        for (var e in this.wins) {
            if (this.wins[e].zi > f.zi) {
                f = this.wins[e]
            }
        }
        if (f != null ) {
            this._makeActive(f)
        }
    }
    ;
    this._needHelp = function(a) {
        var e = this.wins[a];
        if (e.checkEvent("onHelp")) {
            e.callEvent("onHelp", [e])
        } else {
            this.callEvent("onHelp", [e])
        }
        e = null 
    }
    ;
    this._setWindowIcon = function(f, e, a) {
        f.iconsPresent = true;
        f.icons[0] = this.imagePath + e;
        f.icons[1] = this.imagePath + a;
        this._engineUpdateWindowIcon(f, f.icons[f.isOnTop() ? 0 : 1])
    }
    ;
    this._getWindowIcon = function(a) {
        if (a.iconsPresent) {
            return new Array(a.icons[0],a.icons[1])
        } else {
            return new Array(null ,null )
        }
    }
    ;
    this._clearWindowIcons = function(a) {
        a.iconsPresent = false;
        a.icons[0] = this.imagePath + this.pathPrefix + this.skin + "/active/icon_blank.gif";
        a.icons[1] = this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_blank.gif";
        this._engineUpdateWindowIcon(a, a.icons[a.isOnTop() ? 0 : 1])
    }
    ;
    this._restoreWindowIcons = function(a) {
        a.iconsPresent = true;
        a.icons[0] = this.imagePath + this.pathPrefix + this.skin + "/active/icon_normal.gif";
        a.icons[1] = this.imagePath + this.pathPrefix + this.skin + "/inactive/icon_normal.gif";
        this._engineUpdateWindowIcon(a, a.icons[a.className == "dhtmlx_window_active" ? 0 : 1])
    }
    ;
    this._attachWindowContentTo = function(i, g, a, e) {
        var f = this._engineGetWindowContent(i).parentNode;
        f.parentNode.removeChild(f);
        i.hide();
        f.style.left = "0px";
        f.style.top = "0px";
        f.style.width = (a != null  ? a : g.offsetWidth) + "px";
        f.style.height = (e != null  ? e : g.offsetHeight) + "px";
        f.style.position = "relative";
        g.appendChild(f);
        this._engineGetWindowContent(i).style.width = f.style.width;
        this._engineGetWindowContent(i).style.height = f.style.height
    }
    ;
    this._setWindowToFullScreen = function(e, a) {
        if (a == true && !e._isFullScreened) {
            e._p1 = e.vs[e.av].dhxcont.nextSibling;
            e._p1.parentNode.removeChild(e.vs[e.av].dhxcont);
            e.hide();
            e._isFullScreened = true;
            e._FSoffsetHeight = e._offsetHeight;
            e._FSoffsetHeightSaved = e._offsetHeightSaved;
            e._FSoffsetLeft = e._offsetLeft;
            e._FSoffsetWidth = e._offsetWidth;
            e._offsetHeight = 0;
            e._offsetHeightSaved = 0;
            e._offsetLeft = 0;
            e._offsetWidth = 0;
            e.vs[e.av].dhxcont.style.position = "absolute";
            document.body.appendChild(e.vs[e.av].dhxcont);
            e.adjustContent(document.body, 0, 0, false, 0);
            e.updateNestedObjects()
        }
        if (a == false && e._isFullScreened) {
            e._p1.parentNode.insertBefore(e.vs[e.av].dhxcont, e._p1);
            e._p1 = null ;
            e._isFullScreened = false;
            e._offsetHeight = e._FSoffsetHeight;
            e._offsetHeightSaved = e._FSoffsetHeightSaved;
            e._offsetLeft = e._FSoffsetLeft;
            e._offsetWidth = e._FSoffsetWidth;
            e._FSoffsetHeight = e._FSoffsetHeightSaved = e._FSoffsetLeft = e._FSoffsetWidth = null ;
            e.show();
            e.setDimension(e.w, e.h);
            e.bringToTop()
        }
    }
    ;
    this._isWindowOnTop = function(e) {
        var a = (this.getTopmostWindow() == e);
        return a
    }
    ;
    this._bringOnBottom = function(f) {
        for (var e in this.wins) {
            if (this.wins[e].zi < f.zi) {
                this.wins[e].zi += this.zIndexStep;
                this.wins[e].style.zIndex = this.wins[e].zi
            }
        }
        f.zi = 50;
        f.style.zIndex = f.zi;
        this._makeActive(this.getTopmostWindow())
    }
    ;
    this._isWindowOnBottom = function(g) {
        var f = true;
        for (var e in this.wins) {
            if (this.wins[e] != g) {
                f = f && (this.wins[e].zi > g.zi)
            }
        }
        return f
    }
    ;
    this._stickWindow = function(a) {
        var e = this.wins[a];
        e._isSticked = true;
        this._hideButton(e, "stick");
        this._showButton(e, "sticked");
        this._bringOnTop(e);
        e = null 
    }
    ;
    this._unstickWindow = function(a) {
        var e = this.wins[a];
        e._isSticked = false;
        this._hideButton(e, "sticked");
        this._showButton(e, "stick");
        this._bringOnTopAnyStickedWindows();
        e = null 
    }
    ;
    this._addUserButton = function(e, h, g, f) {
        h = String(h).toLowerCase();
        var a = this._engineAddUserButton(e, h, g);
        a.title = f;
        a.isVisible = true;
        a._isEnabled = true;
        a.isPressed = false;
        a.label = h;
        e.btns[h] = a;
        e.btns[h].winId = e.idd;
        e.btns[h]._doOnClick = function() {}
        ;
        this._attachEventsOnButton(e.idd, h);
        a = null 
    }
    ;
    this._removeUserButton = function(e, a) {
        this._removeButtonGlobal(e, a)
    }
    ;
    this._blockSwitcher = function(f) {
        for (var e in this.wins) {
            if (f == true) {
                this.wins[e].showCoverBlocker()
            } else {
                this.wins[e].hideCoverBlocker()
            }
        }
    }
    ;
    this.resizingWin = null ;
    this.modalWin = null ;
    this.resizingDirs = "none";
    if (_isIE) {
        this._focusFixIE = document.createElement("INPUT");
        this._focusFixIE.className = "dhx_windows_ieonclosefocusfix";
        this._focusFixIE.style.position = "absolute";
        this._focusFixIE.style.width = "1px";
        this._focusFixIE.style.height = "1px";
        this._focusFixIE.style.border = "none";
        this._focusFixIE.style.background = "none";
        this._focusFixIE.style.left = "-10px";
        this._focusFixIE.style.fontSize = "1px";
        document.body.appendChild(this._focusFixIE)
    }
    this._createViewport();
    this._doOnMouseUp = function() {
        if (c != null ) {
            c._stopMove()
        }
    }
    ;
    this._doOnMoseMove = function(a) {
        a = a || event;
        if (c != null ) {
            c._moveWindow(a)
        }
    }
    ;
    this._resizeTM = null ;
    this._resizeTMTime = 200;
    this._lw = null ;
    this._doOnResize = function() {
        if (c._lw != document.documentElement.clientHeight) {
            window.clearTimeout(c._resizeTM);
            c._resizeTM = window.setTimeout(function() {
                c._autoResizeViewport()
            }
            , c._resizeTMTime)
        }
        c._lw = document.documentElement.clientHeight
    }
    ;
    this._doOnUnload = function() {
        c.unload()
    }
    ;
    this._doOnSelectStart = function(a) {
        a = a || event;
        if (c.movingWin != null  || c.resizingWin != null ) {
            a.returnValue = false
        }
    }
    ;
    if (_isIE) {
        document.body.attachEvent("onselectstart", this._doOnSelectStart)
    }
    dhtmlxEvent(window, "resize", this._doOnResize);
    dhtmlxEvent(document.body, "unload", this._doOnUnload);
    if (this._isIPad) {
        document.addEventListener("touchmove", this._doOnMoseMove, false);
        document.addEventListener("touchend", this._doOnMouseUp, false)
    } else {
        dhtmlxEvent(document.body, "mouseup", this._doOnMouseUp);
        dhtmlxEvent(this.vp, "mousemove", this._doOnMoseMove);
        dhtmlxEvent(this.vp, "mouseup", this._doOnMouseUp)
    }
    this._setWindowModal = function(e, a) {
        if (a == true) {
            this._makeActive(e);
            this._bringOnTop(e);
            this.modalWin = e;
            e._isModal = true;
            this.modalCoverI.style.zIndex = e.zi - 2;
            this.modalCoverI.style.display = "";
            this.modalCoverD.style.zIndex = e.zi - 2;
            this.modalCoverD.style.display = ""
        } else {
            this.modalWin = null ;
            e._isModal = false;
            this.modalCoverI.style.zIndex = 0;
            this.modalCoverI.style.display = "none";
            this.modalCoverD.style.zIndex = 0;
            this.modalCoverD.style.display = "none"
        }
    }
    ;
    this._bringOnTopAnyStickedWindows = function() {
        var g = new Array();
        for (var e in this.wins) {
            if (this.wins[e]._isSticked) {
                g[g.length] = this.wins[e]
            }
        }
        for (var f = 0; f < g.length; f++) {
            this._bringOnTop(g[f])
        }
        if (g.length == 0) {
            for (var e in this.wins) {
                if (this.wins[e].className == "dhtmlx_window_active") {
                    this._bringOnTop(this.wins[e])
                }
            }
        }
    }
    ;
    this.unload = function() {
        this._clearAll()
    }
    ;
    this._removeButtonGlobal = function(e, f) {
        if (!this.wins[e]) {
            return
        }
        if (!this.wins[e].btns[f]) {
            return
        }
        var a = this.wins[e].btns[f];
        a.title = null ;
        a.isVisible = null ;
        a._isEnabled = null ;
        a.isPressed = null ;
        a.label = null ;
        a._doOnClick = null ;
        a.detachAllEvents();
        a.attachEvent = null ;
        a.callEvent = null ;
        a.checkEvent = null ;
        a.detachEvent = null ;
        a.detachAllEvents = null ;
        a.disable = null ;
        a.enable = null ;
        a.eventCatcher = null ;
        a.hide = null ;
        a.isEnabled = null ;
        a.isHidden = null ;
        a.show = null ;
        a.onmousedown = null ;
        a.onmouseout = null ;
        a.onmouseover = null ;
        a.onmouseup = null ;
        a.ontouchstart = null ;
        a.ontouchend = null ;
        if (a.parentNode) {
            a.parentNode.removeChild(a)
        }
        a = null ;
        this.wins[e].btns[f] = null ;
        delete this.wins[e].btns[f]
    }
    ;
    this._removeWindowGlobal = function(g) {
        var h = this.wins[g];
        if (this.modalWin == h) {
            this._setWindowModal(h, false)
        }
        if (this.iframeMode && h.ifr) {
            h.ifr.parentNode.removeChild(h.ifr);
            h.ifr = null 
        }
        var f = h.coverBlocker();
        f.onselectstart = null ;
        f = null ;
        this._engineDiableOnSelectInWindow(h, false);
        h._dhxContDestruct();
        this._engineGetWindowHeader(h).onmousedown = null ;
        this._engineGetWindowHeader(h).ondblclick = null ;
        this.movingWin = null ;
        this.resizingWin = null ;
        for (var e in h.btns) {
            this._removeButtonGlobal(h, e)
        }
        h.btns = null ;
        h.detachAllEvents();
        h._adjustToContent = null ;
        h._doOnAttachMenu = null ;
        h._doOnAttachStatusBar = null ;
        h._doOnAttachToolbar = null ;
        h._doOnFrameMouseDown = null ;
        h._doOnFrameContentLoaded = null ;
        h._redraw = null ;
        h.addUserButton = null ;
        h.allowMove = null ;
        h.allowPark = null ;
        h.allowResize = null ;
        h.attachEvent = null ;
        h.bringToBottom = null ;
        h.bringToTop = null ;
        h.callEvent = null ;
        h.center = null ;
        h.centerOnScreen = null ;
        h.checkEvent = null ;
        h.clearIcon = null ;
        h.close = null ;
        h.denyMove = null ;
        h.denyPark = null ;
        h.denyResize = null ;
        h.detachEvent = null ;
        h.detachAllEvents = null ;
        h.eventCatcher = null ;
        h.getDimension = null ;
        h.getIcon = null ;
        h.getId = null ;
        h.getMaxDimension = null ;
        h.getMinDimension = null ;
        h.getPosition = null ;
        h.getText = null ;
        h.hide = null ;
        h.hideHeader = null ;
        h.isHidden = null ;
        h.isMaximized = null ;
        h.isModal = null ;
        h.isMovable = null ;
        h.isOnBottom = null ;
        h.isOnTop = null ;
        h.isParkable = null ;
        h.isParked = null ;
        h.isResizable = null ;
        h.isSticked = null ;
        h.keepInViewport = null ;
        h.maximize = null ;
        h.minimize = null ;
        h.park = null ;
        h.progressOff = null ;
        h.progressOn = null ;
        h.removeUserButton = null ;
        h.restoreIcon = null ;
        h.setDimension = null ;
        h.setIcon = null ;
        h.setMaxDimension = null ;
        h.setMinDimension = null ;
        h.setModal = null ;
        h.setPosition = null ;
        h.setText = null ;
        h.setToFullScreen = null ;
        h.show = null ;
        h.showHeader = null ;
        h.stick = null ;
        h.unstick = null ;
        h.onmousemove = null ;
        h.onmousedown = null ;
        h.icons = null ;
        h.button = null ;
        h._dhxContDestruct = null ;
        h.dhxContGlobal.obj = null ;
        h.dhxContGlobal.setContent = null ;
        h.dhxContGlobal.dhxcont = null ;
        h.dhxContGlobal = null ;
        if (h._frame) {
            while (h._frame.childNodes.length > 0) {
                h._frame.removeChild(h._frame.childNodes[0])
            }
            h._frame = null 
        }
        this._parseNestedForEvents(h);
        h._content = null ;
        h.innerHTML = "";
        h.parentNode.removeChild(h);
        h = null ;
        this.wins[g] = null ;
        delete this.wins[g]
    }
    ;
    this._removeEvents = function(a) {
        a.onmouseover = null ;
        a.onmouseout = null ;
        a.onmousemove = null ;
        a.onclick = null ;
        a.ondblclick = null ;
        a.onmouseenter = null ;
        a.onmouseleave = null ;
        a.onmouseup = null ;
        a.onmousewheel = null ;
        a.onmousedown = null ;
        a.onselectstart = null ;
        a.onfocus = null ;
        a.style.display = "";
        a = null 
    }
    ;
    this._parseNestedForEvents = function(e) {
        this._removeEvents(e);
        for (var a = 0; a < e.childNodes.length; a++) {
            if (e.childNodes[a].tagName != null ) {
                this._parseNestedForEvents(e.childNodes[a])
            }
        }
        e = null 
    }
    ;
    this._clearAll = function() {
        this._clearDocumentEvents();
        for (var e in this.wins) {
            this._removeWindowGlobal(e)
        }
        this.wins = null ;
        this._parseNestedForEvents(this._carcass);
        while (this._carcass.childNodes.length > 0) {
            this._carcass.removeChild(this._carcass.childNodes[0])
        }
        this._carcass.onselectstart = null ;
        this._carcass.parentNode.removeChild(this._carcass);
        this._carcass = null ;
        this._parseNestedForEvents(this._vpcover);
        this._vpcover.parentNode.removeChild(this._vpcover);
        this._vpcover = null ;
        this._parseNestedForEvents(this.modalCoverD);
        this.modalCoverD.parentNode.removeChild(this.modalCoverD);
        this.modalCoverD = null ;
        this._parseNestedForEvents(this.modalCoverI);
        this.modalCoverI.parentNode.removeChild(this.modalCoverI);
        this.modalCoverI = null ;
        if (this.vp.autocreated == true) {
            this.vp.parentNode.removeChild(this.vp)
        }
        this.vp = null ;
        for (var e in this.skinParams) {
            delete this.skinParams[e]
        }
        this.skinParams = null ;
        this._effects = null ;
        this._engineSkinParams = null ;
        this._addDefaultButtons = null ;
        this._addUserButton = null ;
        this._allowParking = null ;
        this._allowReszieGlob = null ;
        this._attachEventsOnButton = null ;
        this._attachWindowContentTo = null ;
        this._autoResizeViewport = null ;
        this._blockSwitcher = null ;
        this._bringOnBottom = null ;
        this._bringOnTop = null ;
        this._bringOnTopAnyStickedWindows = null ;
        this._centerWindow = null ;
        this._clearAll = null ;
        this._clearDocumentEvents = null ;
        this._clearWindowIcons = null ;
        this._closeWindow = null ;
        this._createViewport = null ;
        this._denyParking = null ;
        this._denyResize = null ;
        this._dhx_Engine = null ;
        this._disableButton = null ;
        this._doOnMoseMove = null ;
        this._doOnMouseUp = null ;
        this._doOnResize = null ;
        this._doOnSelectStart = null ;
        this._doOnUnload = null ;
        this._doParkDown = null ;
        this._doParkUp = null ;
        this._enableButton = null ;
        this._engineAddUserButton = null ;
        this._engineAdjustWindowToContent = null ;
        this._engineAllowWindowResize = null ;
        this._engineCheckHeaderMouseDown = null ;
        this._engineDiableOnSelectInWindow = null ;
        this._engineDoOnWindowParkDown = null ;
        this._engineDoOnWindowParkUp = null ;
        this._engineFixWindowPosInViewport = null ;
        this._engineGetWindowButton = null ;
        this._engineGetWindowContent = null ;
        this._engineGetWindowHeader = null ;
        this._engineGetWindowHeaderState = null ;
        this._engineGetWindowLabel = null ;
        this._engineGetWindowParkedHeight = null ;
        this._engineRedrawSkin = null ;
        this._engineRedrawWindowPos = null ;
        this._engineRedrawWindowSize = null ;
        this._engineRedrawWindowTitle = null ;
        this._engineSetWindowBody = null ;
        this._engineSwitchWindowHeader = null ;
        this._engineSwitchWindowProgress = null ;
        this._engineUpdateWindowIcon = null ;
        this._fixWindowDimensionInViewport = null ;
        this._genStr = null ;
        this._getActive = null ;
        this._getTopZIndex = null ;
        this._getWindowIcon = null ;
        this._hideButton = null ;
        this._hideWindow = null ;
        this._isWindowHidden = null ;
        this._isWindowOnBottom = null ;
        this._isWindowOnTop = null ;
        this._makeActive = null ;
        this._maximizeWindow = null ;
        this._moveWindow = null ;
        this._needHelp = null ;
        this._parkWindow = null ;
        this._parseNestedForEvents = null ;
        this._removeButtonGlobal = null ;
        this._removeEvents = null ;
        this._removeUserButton = null ;
        this._removeWindowGlobal = null ;
        this._restoreWindow = null ;
        this._restoreWindowIcons = null ;
        this._setWindowIcon = null ;
        this._setWindowModal = null ;
        this._setWindowToFullScreen = null ;
        this._showButton = null ;
        this._showWindow = null ;
        this._stickWindow = null ;
        this._stopMove = null ;
        this._unstickWindow = null ;
        this.attachEvent = null ;
        this.attachViewportTo = null ;
        this.callEvent = null ;
        this.checkEvent = null ;
        this.createWindow = null ;
        this.detachEvent = null ;
        this.enableAutoViewport = null ;
        this.eventCatcher = null ;
        this.findByText = null ;
        this.forEachWindow = null ;
        this.getBottommostWindow = null ;
        this.getEffect = null ;
        this.getTopmostWindow = null ;
        this.isWindow = null ;
        this.setEffect = null ;
        this.setImagePath = null ;
        this.setSkin = null ;
        this.setViewport = null ;
        this.unload = null ;
        this.window = null ;
        c = null 
    }
    ;
    this._clearDocumentEvents = function() {
        if (_isIE) {
            window.detachEvent("onresize", this._doOnResize);
            document.body.detachEvent("onselectstart", this._doOnSelectStart);
            document.body.detachEvent("onmouseup", this._doOnMouseUp);
            document.body.detachEvent("onunload", this._doOnUnload);
            this.vp.detachEvent("onmousemove", this._doOnMoseMove);
            this.vp.detachEvent("onmouseup", this._doOnMouseUp)
        } else {
            window.removeEventListener("resize", this._doOnResize, false);
            document.body.removeEventListener("mouseup", this._doOnMouseUp, false);
            document.body.removeEventListener("unload", this._doOnUnload, false);
            this.vp.removeEventListener("mousemove", this._doOnMoseMove, false);
            this.vp.removeEventListener("mouseup", this._doOnMouseUp, false)
        }
    }
    ;
    this._genStr = function(a) {
        var e = "";
        var g = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (var f = 0; f < a; f++) {
            e += g.charAt(Math.round(Math.random() * (g.length - 1)))
        }
        return e
    }
    ;
    dhtmlxEventable(this);
    return this
}
dhtmlXWindows.prototype._dhx_Engine = function() {
    this._engineEnabled = true;
    this._engineName = "dhx";
    this._engineSkinParams = {
        dhx_blue: {
            hh: 21,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: null ,
            noh_h: null 
        },
        dhx_black: {
            hh: 21,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: null ,
            noh_h: null 
        },
        dhx_skyblue: {
            hh: 29,
            lbw: 2,
            rbw: 2,
            lch: 2,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 2,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 5,
            noh_h: -10
        },
        dhx_web: {
            hh: 27,
            lbw: 5,
            rbw: 5,
            lch: 5,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 5,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 5,
            noh_h: -10
        },
        dhx_terrace: {
            hh: 37,
            lbw: 5,
            rbw: 5,
            lch: 5,
            lcw: 14,
            rch: 14,
            rcw: 14,
            bbh: 5,
            mnh: 23,
            tbh: 25,
            sbh: 20,
            noh_t: 0,
            noh_h: -10
        }
    };
    this._isIE6 = false;
    if (_isIE) {
        this._isIE6 = (window.XMLHttpRequest == null  ? true : false)
    }
    this._engineSetWindowBody = function(b) {
        b.innerHTML = "<div iswin='1' class='dhtmlx_wins_body_outer' style='position: relative;'>" + (this._isIE6 ? "<iframe src='javascript:false;' frameborder='0' class='dhtmlx_wins_ie6_cover_fix' onload='this.contentWindow.document.body.style.overflow=\"hidden\";'></iframe>" : "") + "<div class='dhtmlx_wins_icon'></div><div class='dhtmlx_wins_progress'></div><div class='dhtmlx_wins_title'>dhtmlxWindow</div><div class='dhtmlx_wins_btns'><div class='dhtmlx_wins_btns_button dhtmlx_button_sticked_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_stick_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_help_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_park_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_minmax2_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_minmax1_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_close_default'></div><div class='dhtmlx_wins_btns_button dhtmlx_button_dock_default'></div></div><div class='dhtmlx_wins_body_inner'></div><div winResT='yes' class='dhtmlx_wins_resizer_t' style='display:none;'></div><div winResL='yes' class='dhtmlx_wins_resizer_l'></div><div winResR='yes' class='dhtmlx_wins_resizer_r'></div><div winResB='yes' class='dhtmlx_wins_resizer_b'></div><div class='white_line'></div><div class='white_line2'></div></div>";
        b.dhxContGlobal = new dhtmlXContainer(b);
        if (this.skin == "dhx_skyblue") {
            b.dhxContGlobal.obj._offsetWidth = -10;
            b.dhxContGlobal.obj._offsetHeight = -5;
            b.dhxContGlobal.obj._offsetLeft = 5;
            b.dhxContGlobal.obj._offsetHeightSaved = b.dhxContGlobal.obj._offsetHeight
        }
        if (this.skin == "dhx_web") {
            b.dhxContGlobal.obj._offsetWidth = -10;
            b.dhxContGlobal.obj._offsetHeight = -5;
            b.dhxContGlobal.obj._offsetLeft = 5;
            b.dhxContGlobal.obj._offsetHeightSaved = b.dhxContGlobal.obj._offsetHeight
        }
        b.skin = this.skin;
        b.dhxContGlobal.setContent(b.childNodes[0].childNodes[(this._isIE6 ? 5 : 4)]);
        var a = b.coverBlocker();
        a.onselectstart = function(c) {
            c = c || event;
            c.returnValue = false;
            c.cancelBubble = true
        }
        ;
        a = null ;
        if (this.iframeMode) {
            b.ifr = document.createElement("IFRAME");
            b.ifr.style.position = "absolute";
            b.ifr.style.left = b.style.left;
            b.ifr.style.top = b.style.top;
            b.ifr.style.width = b.style.width;
            b.ifr.style.height = b.style.height;
            b.ifr.style.zIndex = b.style.zIndex - 1;
            b.ifr.style.backgroundColor = "white";
            b.ifr.frameBorder = 0;
            b.ifr.setAttribute("src", "javascript:false;");
            b.parentNode.appendChild(b.ifr)
        }
    }
    ;
    this._engineDiableOnSelectInWindow = function(d, c) {
        var b = new Array();
        b[0] = d.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)];
        b[1] = d.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)];
        b[2] = d.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)];
        b[3] = d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)];
        b[4] = d.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)];
        b[5] = d.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)];
        b[6] = d.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)];
        b[7] = d.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)];
        for (var a = 0; a < b.length; a++) {
            b[a].onselectstart = (c ? function(f) {
                f = f || event;
                f.returnValue = false;
                return false
            }
             : null );
            b[a] = null 
        }
        b = null 
    }
    ;
    this._engineGetWindowHeader = function(a) {
        a.childNodes[0].idd = a.idd;
        return a.childNodes[0]
    }
    ;
    this._engineRedrawWindowSize = function(d) {
        d.style.width = (String(d.w).search("%") == -1 ? d.w + "px" : d.w);
        d.style.height = (String(d.h).search("%") == -1 ? d.h + "px" : d.h);
        var a = d.childNodes[0];
        a.style.width = d.clientWidth + "px";
        a.style.height = d.clientHeight + "px";
        if (a.offsetWidth > d.clientWidth) {
            a.style.width = d.clientWidth * 2 - a.offsetWidth + "px"
        }
        if (a.offsetHeight > d.clientHeight) {
            var c = d.clientHeight * 2 - a.offsetHeight;
            if (c < 0) {
                c = 0
            }
            a.style.height = c + "px"
        }
        var b = (d._noHeader == true ? d._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (this.iframeMode && d.ifr) {
            d.ifr.style.width = d.style.width;
            d.ifr.style.height = d.style.height
        }
        this._engineRedrawWindowTitle(d);
        d.adjustContent(a, b)
    }
    ;
    this._engineRedrawWindowPos = function(a) {
        if (a._isFullScreened) {
            return
        }
        a.style.left = a.x + "px";
        a.style.top = a.y + "px";
        if (this.iframeMode && a.ifr) {
            a.ifr.style.top = a.style.top;
            a.ifr.style.left = a.style.left
        }
    }
    ;
    this._engineFixWindowPosInViewport = function(b) {
        var a = (b._noHeader == true ? b._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (b._keepInViewport) {
            if (b.x < 0) {
                b.x = 0
            }
            if (b.x + b.w > this.vp.offsetWidth) {
                b.x = this.vp.offsetWidth - b.w
            }
            if (b.y + b.h > this.vp.offsetHeight) {
                b.y = this.vp.offsetHeight - b.h
            }
            if (b.y < 0) {
                b.y = 0
            }
        } else {
            if (b.y + a > this.vp.offsetHeight) {
                b.y = this.vp.offsetHeight - a
            }
            if (b.y < 0) {
                b.y = 0
            }
            if (b.x + b.w - 10 < 0) {
                b.x = 10 - b.w
            }
            if (b.x > this.vp.offsetWidth - 10) {
                b.x = this.vp.offsetWidth - 10
            }
        }
    }
    ;
    this._engineCheckHeaderMouseDown = function(e, c) {
        if (this._isIPad) {
            var a = c.touches[0].clientX;
            var f = c.touches[0].clientY;
            var d = c.target || c.srcElement;
            if (d == e.childNodes[0] || d == e.childNodes[0].childNodes[0] || d == e.childNodes[0].childNodes[2] || d == e.childNodes[0].childNodes[3]) {
                return true
            }
            return false
        } else {
            var a = (_isIE || _isOpera ? c.offsetX : c.layerX);
            var f = (_isIE || _isOpera ? c.offsetY : c.layerY);
            var d = c.target || c.srcElement
        }
        var b = (e._noHeader == true ? e._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (f <= b && (d == e.childNodes[0] || d == e.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)] || d == e.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)] || d == e.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)])) {
            return true
        }
        return false
    }
    ;
    this._engineGetWindowContent = function(a) {
        alert("_engineGetWindowContent")
    }
    ;
    this._engineGetWindowButton = function(d, a) {
        a = String(a).toLowerCase();
        var b = null ;
        var f = "dhtmlx_button_" + a + "_";
        for (var c = 0; c < d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].childNodes.length; c++) {
            var e = d.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].childNodes[c];
            if (String(e.className).search(f) != -1) {
                b = e
            }
            e = null 
        }
        return b
    }
    ;
    this._engineAddUserButton = function(e, a, d) {
        if (isNaN(d)) {
            d = 0
        }
        var c = document.createElement("DIV");
        c.className = "dhtmlx_wins_btns_button dhtmlx_button_" + a + "_default";
        var b = e.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)];
        d = b.childNodes.length - d;
        if (d < 0) {
            d = 0
        }
        if (d >= b.childNodes.length) {
            b.appendChild(c)
        } else {
            b.insertBefore(c, b.childNodes[d])
        }
        this._engineRedrawWindowTitle(e);
        return c
    }
    ;
    this._engineGetWindowParkedHeight = function(a) {
        return this._engineSkinParams[this.skin]["hh"] + 1
    }
    ;
    this._engineDoOnWindowParkDown = function(a) {
        a.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = (a._noHeader == true ? "" : "none");
        a.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)].style.display = "";
        a.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)].style.display = "";
        a.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)].style.display = ""
    }
    ;
    this._engineDoOnWindowParkUp = function(a) {
        a.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 7 : 6)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 8 : 7)].style.display = "none";
        a.childNodes[0].childNodes[(this._isIE6 ? 9 : 8)].style.display = "none"
    }
    ;
    this._engineUpdateWindowIcon = function(b, a) {
        b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.backgroundImage = "url('" + a + "')"
    }
    ;
    this._engineAllowWindowResize = function(f, e, d, b) {
        if (!e.getAttribute) {
            return
        }
        var a = this._engineSkinParams[this.skin];
        var c = (f._noHeader == true ? f._hdrSize : this._engineSkinParams[this.skin]["hh"]);
        if (e.getAttribute("winResL") != null ) {
            if (e.getAttribute("winResL") == "yes") {
                if (b >= c) {
                    if (b >= f.h - a.lch) {
                        return "corner_left"
                    }
                    if (b <= a.lch && f._noHeader == true) {
                        return "corner_up_left"
                    }
                    return "border_left"
                }
            }
        }
        if (e.getAttribute("winResR") != null ) {
            if (e.getAttribute("winResR") == "yes") {
                if (b >= c) {
                    if (b >= f.h - a.rch) {
                        return "corner_right"
                    }
                    if (b <= a.rch && f._noHeader == true) {
                        return "corner_up_right"
                    }
                    return "border_right"
                }
            }
        }
        if (e.getAttribute("winResT") != null ) {
            if (e.getAttribute("winResT") == "yes" && f._noHeader == true) {
                if (d <= a.lcw) {
                    return "corner_up_left"
                }
                if (d >= f.w - a.rcw) {
                    return "corner_up_right"
                }
                return "border_top"
            }
        }
        if (e.getAttribute("winResB") != null ) {
            if (e.getAttribute("winResB") == "yes") {
                if (d <= a.lcw) {
                    return "corner_left"
                }
                if (d >= f.w - a.rcw) {
                    return "corner_right"
                }
                return "border_bottom"
            }
        }
        return null 
    }
    ;
    this._engineAdjustWindowToContent = function(d, a, c) {
        var e = a + d.w - d.vs[d.av].dhxcont.clientWidth;
        var b = c + d.h - d.vs[d.av].dhxcont.clientHeight;
        d.setDimension(e, b)
    }
    ;
    this._engineRedrawSkin = function() {
        this.vp.className = (this.vp == document.body && this.vp._css ? this.vp._css + " " : "") + "dhtmlx_winviewport dhtmlx_skin_" + this.skin + (this._r ? " dhx_wins_rtl" : "");
        var c = this._engineSkinParams[this.skin];
        for (var b in this.wins) {
            if (this.skin == "dhx_skyblue") {
                this.wins[b].dhxContGlobal.obj._offsetTop = (this.wins[b]._noHeader ? c.noh_t : null );
                this.wins[b].dhxContGlobal.obj._offsetWidth = -10;
                this.wins[b].dhxContGlobal.obj._offsetHeight = (this.wins[b]._noHeader ? c.noh_h : -5);
                this.wins[b].dhxContGlobal.obj._offsetLeft = 5;
                this.wins[b].dhxContGlobal.obj._offsetHeightSaved = -5
            } else {
                this.wins[b].dhxContGlobal.obj._offsetWidth = null ;
                this.wins[b].dhxContGlobal.obj._offsetHeight = null ;
                this.wins[b].dhxContGlobal.obj._offsetLeft = null ;
                this.wins[b].dhxContGlobal.obj._offsetTop = null ;
                this.wins[b].dhxContGlobal.obj._offsetHeightSaved = null 
            }
            this.wins[b].skin = this.skin;
            this._restoreWindowIcons(this.wins[b]);
            this._engineRedrawWindowSize(this.wins[b])
        }
    }
    ;
    this._engineSwitchWindowProgress = function(b, a) {
        if (a == true) {
            b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = "none";
            b.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)].style.display = ""
        } else {
            b.childNodes[0].childNodes[(this._isIE6 ? 2 : 1)].style.display = "none";
            b.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = ""
        }
    }
    ;
    this._engineSwitchWindowHeader = function(c, b) {
        if (!c._noHeader) {
            c._noHeader = false
        }
        if (b != c._noHeader) {
            return
        }
        c._noHeader = (b == true ? false : true);
        c._hdrSize = 0;
        c.childNodes[0].childNodes[(this._isIE6 ? 5 : 4)].className = "dhtmlx_wins_body_inner" + (c._noHeader ? " dhtmlx_wins_no_header" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 6 : 5)].style.display = (c._noHeader ? "" : "none");
        c.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].style.display = (c._noHeader ? "none" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)].style.display = (c._noHeader ? "none" : "");
        c.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].style.display = (c._noHeader ? "none" : "");
        var a = this._engineSkinParams[this.skin];
        if (c._noHeader) {
            c.dhxContGlobal.obj._offsetHeightSaved = c.dhxContGlobal.obj._offsetHeight;
            c.dhxContGlobal.obj._offsetHeight = a.noh_h;
            c.dhxContGlobal.obj._offsetTop = a.noh_t
        } else {
            c.dhxContGlobal.obj._offsetHeight = c.dhxContGlobal.obj._offsetHeightSaved;
            c.dhxContGlobal.obj._offsetTop = null 
        }
        this._engineRedrawWindowSize(c)
    }
    ;
    this._engineGetWindowHeaderState = function(a) {
        return ( a._noHeader ? true : false) 
    }
    ;
    this._engineGetWindowLabel = function(a) {
        return a.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)]
    }
    ;
    this._engineRedrawWindowTitle = function(c) {
        if (c._noHeader !== true) {
            var b = c.childNodes[0].childNodes[(this._isIE6 ? 1 : 0)].offsetWidth;
            var a = c.childNodes[0].childNodes[(this._isIE6 ? 4 : 3)].offsetWidth;
            var d = c.offsetWidth - b - a - 24;
            if (d < 0) {
                d = "100%"
            } else {
                d += "px"
            }
            c.childNodes[0].childNodes[(this._isIE6 ? 3 : 2)].style.width = d
        }
    }
}
;
dhtmlXWindows.prototype.i18n = {
    dhxcontaler: "dhtmlxcontainer.js is missed on the page",
    noenginealert: "No dhtmlxWindows engine was found.",
    stick: "Stick",
    unstick: "Unstick",
    help: "Help",
    parkdown: "Park Down",
    parkup: "Park Up",
    maximize: "Maximize",
    restore: "Restore",
    close: "Close",
    dock: "Dock"
};
(function() {
    dhtmlx.extend_api("dhtmlXWindows", {
        _init: function(b) {
            return []
        },
        _patch: function(b) {
            b.old_createWindow = b.createWindow;
            b.createWindow = function(e) {
                if (arguments.length > 1) {
                    return this.old_createWindow.apply(this, arguments)
                }
                var d = this.old_createWindow(e.id, (e.x || e.left), (e.y || e.top), e.width, e.height);
                d.allowMoveA = function(f) {
                    if (f) {
                        this.allowMove()
                    } else {
                        this.denyMove()
                    }
                }
                ;
                d.allowParkA = function(f) {
                    if (f) {
                        this.allowPark()
                    } else {
                        this.denyPark()
                    }
                }
                ;
                d.allowResizeA = function(f) {
                    if (f) {
                        this.allowResize()
                    } else {
                        this.denyResize()
                    }
                }
                ;
                for (var c in e) {
                    if (a[c]) {
                        d[a[c]](e[c])
                    } else {
                        if (c.indexOf("on") == 0) {
                            d.attachEvent(c, e[c])
                        }
                    }
                }
                return d
            }
        },
        animation: "setEffect",
        image_path: "setImagePath",
        skin: "setSkin",
        viewport: "_viewport",
        wins: "_wins"
    }, {
        _viewport: function(b) {
            if (b.object) {
                this.enableAutoViewport(false);
                this.attachViewportTo(b.object)
            } else {
                this.enableAutoViewport(false);
                this.setViewport(b.left, b.top, b.width, b.height, b.parent)
            }
        },
        _wins: function(b) {
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                this.createWindow(d.id, d.left, d.top, d.width, d.height);
                if (d.text) {
                    this.window(d.id).setText(d.text)
                }
                if (d.keep_in_viewport) {
                    this.window(d.id).keepInViewport(true)
                }
                if (d.deny_resize) {
                    this.window(d.id).denyResize()
                }
                if (d.deny_park) {
                    this.window(d.id).denyPark()
                }
                if (d.deny_move) {
                    this.window(d.id).denyMove()
                }
            }
        }
    });
    var a = {
        move: "allowMoveA",
        park: "allowParkA",
        resize: "allowResizeA",
        center: "center",
        modal: "setModal",
        caption: "setText",
        header: "showHeader"
    }
}
)();
function dhtmlXContainer(i) {
    var g = this;
    this.obj = i;
    i = null ;
    this.obj._padding = !0;
    this.dhxcont = null ;
    this.st = document.createElement("DIV");
    this.st.style.position = "absolute";
    this.st.style.left = "-200px";
    this.st.style.top = "0px";
    this.st.style.width = "100px";
    this.st.style.height = "1px";
    this.st.style.visibility = "hidden";
    this.st.style.overflow = "hidden";
    document.body.insertBefore(this.st, document.body.childNodes[0]);
    this.obj._getSt = function() {
        return g.st
    }
    ;
    this.obj.dv = "def";
    this.obj.av = this.obj.dv;
    this.obj.cv = this.obj.av;
    this.obj.vs = {};
    this.obj.vs[this.obj.av] = {};
    this.obj.view = function(b) {
        if (!this.vs[b]) {
            this.vs[b] = {};
            this.vs[b].dhxcont = this.vs[this.dv].dhxcont;
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.left = "0px";
            a.style.width = "200px";
            a.style.height = "200px";
            a.style.overflow = "hidden";
            a.style.visibility = "";
            g.st.appendChild(a);
            this.vs[b].dhxcont.mainCont[b] = a;
            a = null 
        }
        this.avt = this.av;
        this.av = b;
        return this
    }
    ;
    this.obj.setActive = function() {
        if (this.vs[this.av]) {
            this.cv = this.av,
            this.vs[this.avt].dhxcont == this.vs[this.avt].dhxcont.mainCont[this.avt].parentNode && (g.st.appendChild(this.vs[this.avt].dhxcont.mainCont[this.avt]),
            this.vs[this.avt].menu && g.st.appendChild(document.getElementById(this.vs[this.avt].menuId)),
            this.vs[this.avt].toolbar && g.st.appendChild(document.getElementById(this.vs[this.avt].toolbarId)),
            this.vs[this.avt].sb && g.st.appendChild(document.getElementById(this.vs[this.avt].sbId))),
            this.vs[this.av].dhxcont != this.vs[this.av].dhxcont.mainCont[this.av].parentNode && (this.vs[this.av].dhxcont.insertBefore(this.vs[this.av].dhxcont.mainCont[this.av], this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]),
            this.vs[this.av].menu && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].menuId), this.vs[this.av].dhxcont.childNodes[0]),
            this.vs[this.av].toolbar && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].toolbarId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].menu ? 1 : 0]),
            this.vs[this.av].sb && this.vs[this.av].dhxcont.insertBefore(document.getElementById(this.vs[this.av].sbId), this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1])),
            this._doOnResize && this._doOnResize(),
            this._isWindow && this.updateNestedObjects(),
            this.avt = null 
        }
    }
    ;
    this.obj._viewRestore = function() {
        var b = this.av;
        if (this.avt) {
            this.av = this.avt,
            this.avt = null 
        }
        return b
    }
    ;
    this.setContent = function(b) {
        this.obj.vs[this.obj.av].dhxcont = b;
        this.obj._init();
        b = null 
    }
    ;
    this.obj._init = function() {
        this.vs[this.av].dhxcont.innerHTML = "<div ida='dhxMainCont' style='position: relative; left: 0px; top: 0px; overflow: hidden;'></div><div class='dhxcont_content_blocker' style='display: none;'></div>";
        this.vs[this.av].dhxcont.mainCont = {};
        this.vs[this.av].dhxcont.mainCont[this.av] = this.vs[this.av].dhxcont.childNodes[0]
    }
    ;
    this.obj._genStr = function(b) {
        for (var a = "", c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", d = 0; d < b; d++) {
            a += c.charAt(Math.round(Math.random() * (c.length - 1)))
        }
        return a
    }
    ;
    this.obj.setMinContentSize = function(b, a) {
        this.vs[this.av]._minDataSizeW = b;
        this.vs[this.av]._minDataSizeH = a
    }
    ;
    this.obj._setPadding = function(b, a) {
        typeof b == "object" ? (this._offsetTop = b[0],
        this._offsetLeft = b[1],
        this._offsetWidth = b[2],
        this._offsetHeight = b[3],
        b = null ) : (this._offsetLeft = this._offsetTop = b,
        this._offsetWidth = -b * 2,
        this._offsetHeight = -b * 2);
        this.vs[this.av].dhxcont.className = "dhxcont_global_content_area " + (a || "")
    }
    ;
    this.obj.moveContentTo = function(b) {
        for (var a in this.vs) {
            b.view(a).setActive();
            var c = null ;
            this.vs[a].grid && (c = "grid");
            this.vs[a].tree && (c = "tree");
            this.vs[a].tabbar && (c = "tabbar");
            this.vs[a].folders && (c = "folders");
            this.vs[a].layout && (c = "layout");
            c != null  && (b.view(a).attachObject(this.vs[a][c + "Id"], !1, !0, !1),
            b.vs[a][c] = this.vs[a][c],
            b.vs[a][c + "Id"] = this.vs[a][c + "Id"],
            b.vs[a][c + "Obj"] = this.vs[a][c + "Obj"],
            this.vs[a][c] = null ,
            this.vs[a][c + "Id"] = null ,
            this.vs[a][c + "Obj"] = null );
            if (this.vs[a]._frame) {
                b.vs[a]._frame = this.vs[a]._frame,
                this.vs[a]._frame = null 
            }
            if (this.vs[a].menu != null ) {
                if (b.cv == b.av) {
                    b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].menuId), b.vs[b.av].dhxcont.childNodes[0])
                } else {
                    var d = b._getSt();
                    d.appendChild(document.getElementById(this.vs[a].menuId));
                    d = null 
                }
                b.vs[a].menu = this.vs[a].menu;
                b.vs[a].menuId = this.vs[a].menuId;
                b.vs[a].menuHeight = this.vs[a].menuHeight;
                this.vs[a].menu = null ;
                this.vs[a].menuId = null ;
                this.vs[a].menuHeight = null ;
                this.cv == this.av && this._doOnAttachMenu && this._doOnAttachMenu("unload");
                b.cv == b.av && b._doOnAttachMenu && b._doOnAttachMenu("move")
            }
            if (this.vs[a].toolbar != null ) {
                b.cv == b.av ? b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].toolbarId), b.vs[b.av].dhxcont.childNodes[b.vs[b.av].menu != null  ? 1 : 0]) : (d = b._getSt(),
                d.appendChild(document.getElementById(this.vs[a].toolbarId)),
                d = null ),
                b.vs[a].toolbar = this.vs[a].toolbar,
                b.vs[a].toolbarId = this.vs[a].toolbarId,
                b.vs[a].toolbarHeight = this.vs[a].toolbarHeight,
                this.vs[a].toolbar = null ,
                this.vs[a].toolbarId = null ,
                this.vs[a].toolbarHeight = null ,
                this.cv == this.av && this._doOnAttachToolbar && this._doOnAttachToolbar("unload"),
                b.cv == b.av && b._doOnAttachToolbar && b._doOnAttachToolbar("move")
            }
            if (this.vs[a].sb != null ) {
                if (b.cv == b.av) {
                    b.vs[b.av].dhxcont.insertBefore(document.getElementById(this.vs[a].sbId), b.vs[b.av].dhxcont.childNodes[b.vs[b.av].dhxcont.childNodes.length - 1])
                } else {
                    return d = b._getSt(),
                    d.appendChild(document.getElementById(this.vs[a].sbId)),
                    d
                }
                b.vs[a].sb = this.vs[a].sb;
                b.vs[a].sbId = this.vs[a].sbId;
                b.vs[a].sbHeight = this.vs[a].sbHeight;
                this.vs[a].sb = null ;
                this.vs[a].sbId = null ;
                this.vs[a].sbHeight = null ;
                this.cv == this.av && this._doOnAttachStatusBar && this._doOnAttachStatusBar("unload");
                b.cv == b.av && b._doOnAttachStatusBar && b._doOnAttachStatusBar("move")
            }
            for (var e = this.vs[a].dhxcont.mainCont[a], f = b.vs[a].dhxcont.mainCont[a]; e.childNodes.length > 0; ) {
                f.appendChild(e.childNodes[0])
            }
        }
        b.view(this.av).setActive();
        b = null 
    }
    ;
    this.obj.adjustContent = function(b, a, c, d, e) {
        var f = this.vs[this.av].dhxcont
          , h = f.mainCont[this.av];
        f.style.left = (this._offsetLeft || 0) + "px";
        f.style.top = (this._offsetTop || 0) + a + "px";
        var g = b.clientWidth + (this._offsetWidth || 0);
        if (d !== !0) {
            f.style.width = Math.max(0, g) + "px"
        }
        if (d !== !0 && f.offsetWidth > g) {
            f.style.width = Math.max(0, g * 2 - f.offsetWidth) + "px"
        }
        var k = b.clientHeight + (this._offsetHeight || 0);
        f.style.height = Math.max(0, k - a) + (c != null  ? c : 0) + "px";
        if (f.offsetHeight > k - a) {
            f.style.height = Math.max(0, (k - a) * 2 - f.offsetHeight) + "px"
        }
        if (e && !isNaN(e)) {
            f.style.height = Math.max(0, parseInt(f.style.height) - e) + "px"
        }
        if (this.vs[this.av]._minDataSizeH != null  && parseInt(f.style.height) < this.vs[this.av]._minDataSizeH) {
            f.style.height = this.vs[this.av]._minDataSizeH + "px"
        }
        if (this.vs[this.av]._minDataSizeW != null  && parseInt(f.style.width) < this.vs[this.av]._minDataSizeW) {
            f.style.width = this.vs[this.av]._minDataSizeW + "px"
        }
        if (d !== !0 && (h.style.width = f.clientWidth + "px",
        h.offsetWidth > f.clientWidth)) {
            h.style.width = Math.max(0, f.clientWidth * 2 - h.offsetWidth) + "px"
        }
        var i = this.vs[this.av].menu != null  ? !this.vs[this.av].menuHidden ? this.vs[this.av].menuHeight : 0 : 0
          , j = this.vs[this.av].toolbar != null  ? !this.vs[this.av].toolbarHidden ? this.vs[this.av].toolbarHeight : 0 : 0
          , l = this.vs[this.av].sb != null  ? !this.vs[this.av].sbHidden ? this.vs[this.av].sbHeight : 0 : 0;
        h.style.height = f.clientHeight + "px";
        if (h.offsetHeight > f.clientHeight) {
            h.style.height = Math.max(0, f.clientHeight * 2 - h.offsetHeight) + "px"
        }
        h.style.height = Math.max(0, parseInt(h.style.height) - i - j - l) + "px";
        b = f = h = null 
    }
    ;
    this.obj.coverBlocker = function() {
        return this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]
    }
    ;
    this.obj.showCoverBlocker = function() {
        var b = this.coverBlocker();
        b.style.display = "";
        b = null 
    }
    ;
    this.obj.hideCoverBlocker = function() {
        var b = this.coverBlocker();
        b.style.display = "none";
        b = null 
    }
    ;
    this.obj.updateNestedObjects = function(b) {
        if (this.skin == "dhx_terrace") {
            var a = this.vs[this.av].menu != null  || this.vs[this.av].toolbar != null ;
            if (this.vs[this.av].grid) {
                var c = a || this._isWindow ? 14 : 0
                  , d = this._isWindow ? 14 : 0
                  , e = this._isWindow ? 14 : 0;
                if (b) {
                    if (!this._isWindow) {
                        this.vs[this.av].grid.entBox.style.border = "0px solid white",
                        this.vs[this.av].grid.skin_h_correction = -2
                    }
                    this.vs[this.av].grid.dontSetSizes = !0;
                    this.vs[this.av].gridObj.style.position = "absolute"
                }
                this.vs[this.av].gridObj.style.top = c + "px";
                this.vs[this.av].gridObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].gridObj.style.left = e + "px";
                this.vs[this.av].gridObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].grid.setSizes()
            }
            if (this.vs[this.av].tree) {
                c = a || this._isWindow ? 14 : 0;
                d = this._isWindow ? 14 : 0;
                e = this._isWindow ? 14 : 0;
                if (b) {
                    this.vs[this.av].treeObj.style.position = "absolute"
                }
                this.vs[this.av].treeObj.style.top = c + "px";
                this.vs[this.av].treeObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].treeObj.style.left = e + "px";
                this.vs[this.av].treeObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px"
            }
            if (this.vs[this.av].form) {
                c = a || this._isWindow ? 14 : 0;
                d = this._isWindow ? 14 : 0;
                e = this._isWindow ? 14 : 0;
                if (b) {
                    this.vs[this.av].formObj.style.position = "absolute"
                }
                this.vs[this.av].formObj.style.top = c + "px";
                this.vs[this.av].formObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].formObj.style.left = e + "px";
                this.vs[this.av].formObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].form.setSizes()
            }
            if (this.vs[this.av].layout) {
                b && !this._isWindow && !this._isCell && this.vs[this.av].layout._hideBorders(),
                c = this._isCell && this._noHeader && !a ? 0 : 14,
                d = this._isCell && this._noHeader ? 0 : 14,
                e = this._isCell && this._noHeader ? 0 : 14,
                this.vs[this.av].layoutObj.style.top = c + "px",
                this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px",
                this.vs[this.av].layoutObj.style.left = e + "px",
                this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px",
                this.vs[this.av].layout.setSizes()
            }
            if (this.vs[this.av].accordion) {
                if (b) {
                    this.vs[this.av].accordion._hideBorders = !0
                }
                c = this._isCell && this._noHeader && !a ? 0 : 14;
                d = this._isCell && this._noHeader ? 0 : 14;
                e = this._isCell && this._noHeader ? 0 : 14;
                this.vs[this.av].accordionObj.style.top = c + "px";
                this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c - d + "px";
                this.vs[this.av].accordionObj.style.left = e + "px";
                this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px";
                this.vs[this.av].accordion.setSizes()
            }
            if (this.vs[this.av].tabbar != null ) {
                c = !a && this._isCell && this._noHeader ? 0 : 14,
                d = this._isCell && this._noHeader ? c : 28,
                e = this._isCell && this._noHeader ? 0 : 14,
                this.vs[this.av].tabbarObj.style.top = c + "px",
                this.vs[this.av].tabbarObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - d + "px",
                this.vs[this.av].tabbarObj.style.left = e + "px",
                this.vs[this.av].tabbarObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px",
                this.vs[this.av].tabbar.adjustOuterSize()
            }
            if (this.vs[this.av].editor) {
                e = c = 14,
                this.vs[this.av].editorObj.style.top = c + "px",
                this.vs[this.av].editorObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) - c * 2 + "px",
                this.vs[this.av].editorObj.style.left = e + "px",
                this.vs[this.av].editorObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) - e * 2 + "px",
                _isIE || this.vs[this.av].editor._prepareContent(!0),
                this.vs[this.av].editor.setSizes()
            }
            this.vs[this.av].sched && this.vs[this.av].sched.setSizes();
            this.vs[this.av].dockedCell && this.vs[this.av].dockedCell.updateNestedObjects()
        } else {
            this.vs[this.av].grid && this.vs[this.av].grid.setSizes();
            this.vs[this.av].sched && this.vs[this.av].sched.setSizes();
            this.vs[this.av].tabbar && this.vs[this.av].tabbar.adjustOuterSize();
            this.vs[this.av].folders && this.vs[this.av].folders.setSizes();
            this.vs[this.av].editor && (_isIE || this.vs[this.av].editor._prepareContent(!0),
            this.vs[this.av].editor.setSizes());
            if (this.vs[this.av].layout) {
                (this._isAcc || this._isTabbarCell) && this.skin == "dhx_skyblue" ? (this.vs[this.av].layoutObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px",
                this.vs[this.av].layoutObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px") : (this.vs[this.av].layoutObj.style.width = this.vs[this.av].dhxcont.mainCont[this.av].style.width,
                this.vs[this.av].layoutObj.style.height = this.vs[this.av].dhxcont.mainCont[this.av].style.height),
                this.vs[this.av].layout.setSizes()
            }
            if (this.vs[this.av].accordion != null ) {
                this.skin == "dhx_web" ? (this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px",
                this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px") : (this.vs[this.av].accordionObj.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px",
                this.vs[this.av].accordionObj.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"),
                this.vs[this.av].accordion.setSizes()
            }
            this.vs[this.av].dockedCell && this.vs[this.av].dockedCell.updateNestedObjects();
            this.vs[this.av].form && this.vs[this.av].form.setSizes();
            this.vs[this.av].carousel && this.vs[this.av].carousel.setSizes()
        }
    }
    ;
    this.obj.attachStatusBar = function() {
        if (!this.vs[this.av].sb) {
            var b = document.createElement("DIV");
            b.className = this._isCell ? "dhxcont_sb_container_layoutcell" : "dhxcont_sb_container";
            b.id = "sbobj_" + this._genStr(12);
            b.innerHTML = "<div class='dhxcont_statusbar'></div>";
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(b, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].dhxcont.childNodes.length - 1]) : g.st.appendChild(b);
            b.setText = function(a) {
                this.childNodes[0].innerHTML = a
            }
            ;
            b.getText = function() {
                return this.childNodes[0].innerHTML
            }
            ;
            b.onselectstart = function(a) {
                a = a || event;
                return a.returnValue = !1
            }
            ;
            this.vs[this.av].sb = b;
            this.vs[this.av].sbHeight = this.skin == "dhx_web" ? 41 : this.skin == "dhx_skyblue" ? 23 : b.offsetHeight;
            this.vs[this.av].sbId = b.id;
            this._doOnAttachStatusBar && this._doOnAttachStatusBar("init");
            this.adjust();
            return this.vs[this._viewRestore()].sb
        }
    }
    ;
    this.obj.detachStatusBar = function(b) {
        if (this.vs[this.av].sb) {
            this.vs[this.av].sb.setText = null ,
            this.vs[this.av].sb.getText = null ,
            this.vs[this.av].sb.onselectstart = null ,
            this.vs[this.av].sb.parentNode.removeChild(this.vs[this.av].sb),
            this.vs[this.av].sb = null ,
            this.vs[this.av].sbHeight = null ,
            this.vs[this.av].sbId = null ,
            this._viewRestore(),
            this._doOnAttachStatusBar && !b && this._doOnAttachStatusBar("unload")
        }
    }
    ;
    this.obj.getFrame = function() {
        return this.getView()._frame
    }
    ;
    this.obj.getView = function(b) {
        return this.vs[b || this.av]
    }
    ;
    this.obj.attachMenu = function(b) {
        if (!this.vs[this.av].menu) {
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.overflow = "hidden";
            a.id = "dhxmenu_" + this._genStr(12);
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(a, this.vs[this.av].dhxcont.childNodes[0]) : g.st.appendChild(a);
            typeof b != "object" ? this.vs[this.av].menu = new dhtmlXMenuObject(a.id,b || this.skin) : (b.parent = a.id,
            this.vs[this.av].menu = new dhtmlXMenuObject(b));
            this.vs[this.av].menuHeight = this.skin == "dhx_web" ? 29 : a.offsetHeight;
            this.vs[this.av].menuId = a.id;
            this._doOnAttachMenu && this._doOnAttachMenu("init");
            this.adjust();
            return this.vs[this._viewRestore()].menu
        }
    }
    ;
    this.obj.detachMenu = function(b) {
        if (this.vs[this.av].menu) {
            var a = document.getElementById(this.vs[this.av].menuId);
            this.vs[this.av].menu.unload();
            this.vs[this.av].menu = null ;
            this.vs[this.av].menuId = null ;
            this.vs[this.av].menuHeight = null ;
            a && a.parentNode.removeChild(a);
            a = null ;
            this._viewRestore();
            this._doOnAttachMenu && !b && this._doOnAttachMenu("unload")
        }
    }
    ;
    this.obj.attachToolbar = function(b) {
        if (!this.vs[this.av].toolbar) {
            var a = document.createElement("DIV");
            a.style.position = "relative";
            a.style.overflow = "hidden";
            a.id = "dhxtoolbar_" + this._genStr(12);
            this.cv == this.av ? this.vs[this.av].dhxcont.insertBefore(a, this.vs[this.av].dhxcont.childNodes[this.vs[this.av].menu != null  ? 1 : 0]) : g.st.appendChild(a);
            typeof b != "object" ? this.vs[this.av].toolbar = new dhtmlXToolbarObject(a.id,b || this.skin) : (b.parent = a.id,
            this.vs[this.av].toolbar = new dhtmlXToolbarObject(b));
            this.vs[this.av].toolbarHeight = a.offsetHeight;
            this.vs[this.av].toolbarId = a.id;
            this._doOnAttachToolbar && this._doOnAttachToolbar("init");
            this.adjust();
            var c = this;
            this.vs[this.av].toolbar.attachEvent("_onIconSizeChange", function() {
                c.vs[c.av].toolbarHeight = this.cont.offsetHeight;
                c.vs[c.av].toolbarId = this.cont.id;
                c.adjust();
                c._doOnAttachToolbar && c._doOnAttachToolbar("iconSizeChange")
            }
            );
            this.skin != "dhx_terrace" && this.vs[this.av].toolbar.callEvent("_onIconSizeChange", []);
            return this.vs[this._viewRestore()].toolbar
        }
    }
    ;
    this.obj.detachToolbar = function(b) {
        if (this.vs[this.av].toolbar) {
            var a = document.getElementById(this.vs[this.av].toolbarId);
            this.vs[this.av].toolbar.unload();
            this.vs[this.av].toolbar = null ;
            this.vs[this.av].toolbarId = null ;
            this.vs[this.av].toolbarHeight = null ;
            a && a.parentNode.removeChild(a);
            a = null ;
            this._viewRestore();
            this._doOnAttachToolbar && !b && this._doOnAttachToolbar("unload")
        }
    }
    ;
    this.obj.attachGrid = function() {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
            this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxGridObj_" + this._genStr(12);
        b.style.width = "100%";
        b.style.height = "100%";
        b.cmp = "grid";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].grid = new dhtmlXGridObject(b.id);
        this.vs[this.av].grid.setSkin(this.skin);
        if (this.skin == "dhx_skyblue" || this.skin == "dhx_black" || this.skin == "dhx_blue") {
            this.vs[this.av].grid.entBox.style.border = "0px solid white",
            this.vs[this.av].grid._sizeFix = 2
        }
        this.vs[this.av].gridId = b.id;
        this.vs[this.av].gridObj = b;
        this.skin == "dhx_terrace" && (this.adjust(),
        this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].grid
    }
    ;
    this.obj.attachScheduler = function(b, a, c, d) {
        var d = d || window.scheduler
          , e = 0;
        c && (h = document.getElementById(c)) && (e = 1);
        if (!e) {
            var f = c || '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>'
              , h = document.createElement("DIV");
            h.id = "dhxSchedObj_" + this._genStr(12);
            h.innerHTML = '<div id="' + h.id + '" class="dhx_cal_container" style="width:100%; height:100%;"><div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>' + f + '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div></div>';
            document.body.appendChild(h.firstChild)
        }
        this.attachObject(h.id, !1, !0, !1);
        this.vs[this.av].sched = d;
        this.vs[this.av].schedId = h.id;
        d.setSizes = d.update_view;
        d.destructor = function() {}
        ;
        d.init(h.id, b, a);
        return this.vs[this._viewRestore()].sched
    }
    ;
    this.obj.attachTree = function(b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
            this._redraw()
        }
        var a = document.createElement("DIV");
        a.id = "dhxTreeObj_" + this._genStr(12);
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "tree";
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !1);
        this.vs[this.av].tree = new dhtmlXTreeObject(a.id,"100%","100%",b || 0);
        this.vs[this.av].tree.setSkin(this.skin);
        this.vs[this.av].tree.allTree.childNodes[0].style.marginTop = "2px";
        this.vs[this.av].tree.allTree.childNodes[0].style.marginBottom = "2px";
        this.vs[this.av].treeId = a.id;
        this.vs[this.av].treeObj = a;
        this.skin == "dhx_terrace" && (this.adjust(),
        this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].tree
    }
    ;
    this.obj.attachTabbar = function(b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.style.border = "none",
            this.setDimension(this.w, this.h)
        }
        var a = document.createElement("DIV");
        a.id = "dhxTabbarObj_" + this._genStr(12);
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.overflow = "hidden";
        a.cmp = "tabbar";
        if (!this._isWindow) {
            a._hideBorders = !0
        }
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !1);
        if (this._isCell) {
            this.hideHeader(),
            this._padding = a._hideBorders = !1
        }
        this.vs[this.av].tabbar = new dhtmlXTabBar(a.id,b || "top",this.skin == "dhx_terrace" ? null  : 20);
        if (!this._isWindow && this.skin != "dhx_terrace") {
            this.vs[this.av].tabbar._s.expand = !0
        }
        this.vs[this.av].tabbar.setSkin(this.skin);
        this.vs[this.av].tabbar.adjustOuterSize();
        this.vs[this.av].tabbarId = a.id;
        this.vs[this.av].tabbarObj = a;
        this.skin == "dhx_terrace" && (this.adjust(),
        this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].tabbar
    }
    ;
    this.obj.attachFolders = function() {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
            this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxFoldersObj_" + this._genStr(12);
        b.style.width = "100%";
        b.style.height = "100%";
        b.style.overflow = "hidden";
        b.cmp = "folders";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].folders = new dhtmlxFolders(b.id);
        this.vs[this.av].folders.setSizes();
        this.vs[this.av].foldersId = b.id;
        this.vs[this.av].foldersObj = b;
        return this.vs[this._viewRestore()].folders
    }
    ;
    this.obj.attachAccordion = function() {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
            this._redraw()
        }
        var b = document.createElement("DIV");
        b.id = "dhxAccordionObj_" + this._genStr(12);
        this._padding = !0;
        if (this.skin == "dhx_web") {
            b.style.left = "0px",
            b.style.top = "0px",
            b.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px",
            b.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px"
        } else {
            if (this.skin != "dhx_terrace") {
                b.style.left = "-1px",
                b.style.top = "-1px",
                b.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px",
                b.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"
            }
        }
        b.style.position = "relative";
        b.cmp = "accordion";
        document.body.appendChild(b);
        this.attachObject(b.id, !1, !0, !1);
        this.vs[this.av].accordion = new dhtmlXAccordion(b.id,this.skin);
        this.vs[this.av].accordion.setSizes();
        this.vs[this.av].accordionId = b.id;
        this.vs[this.av].accordionObj = b;
        this.skin == "dhx_terrace" && (this.adjust(),
        this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].accordion
    }
    ;
    this.obj.attachLayout = function(b, a) {
        if (this._isCell && this.skin == "dhx_skyblue") {
            this.hideHeader(),
            this.vs[this.av].dhxcont.style.border = "0px solid white",
            this.adjustContent(this.childNodes[0], 0)
        }
        this._isCell && this.skin == "dhx_web" && this.hideHeader();
        this._padding = !0;
        var c = document.createElement("DIV");
        c.id = "dhxLayoutObj_" + this._genStr(12);
        c.style.overflow = "hidden";
        c.style.position = "absolute";
        c.style.left = "0px";
        c.style.top = "0px";
        c.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + "px";
        c.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + "px";
        if ((this._isTabbarCell || this._isAcc) && this.skin == "dhx_skyblue") {
            c.style.left = "-1px",
            c.style.top = "-1px",
            c.style.width = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.width) + 2 + "px",
            c.style.height = parseInt(this.vs[this.av].dhxcont.mainCont[this.av].style.height) + 2 + "px"
        }
        c.dhxContExists = !0;
        c.cmp = "layout";
        document.body.appendChild(c);
        this.attachObject(c.id, !1, !0, !1);
        this.vs[this.av].layout = new dhtmlXLayoutObject(c,b,a || this.skin);
        this._isWindow && this.attachEvent("_onBeforeTryResize", this.vs[this.av].layout._defineWindowMinDimension);
        this.vs[this.av].layoutId = c.id;
        this.vs[this.av].layoutObj = c;
        if (this.skin == "dhx_terrace") {
            if (this._isCell) {
                this.style.backgroundColor = "transparent",
                this.vs[this.av].dhxcont.style.backgroundColor = "transparent",
                this.hideHeader()
            }
            this.adjust();
            this.updateNestedObjects(!0)
        }
        return this.vs[this._viewRestore()].layout
    }
    ;
    this.obj.attachEditor = function(b) {
        if (this._isWindow && this.skin == "dhx_skyblue") {
            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
            this._redraw()
        }
        var a = document.createElement("DIV");
        a.id = "dhxEditorObj_" + this._genStr(12);
        a.style.position = "relative";
        a.style.display = "none";
        a.style.overflow = "hidden";
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "editor";
        document.body.appendChild(a);
        if (this.skin == "dhx_terrace") {
            a._attached = !0
        }
        this.attachObject(a.id, !1, !0, !1);
        this.vs[this.av].editor = new dhtmlXEditor(a.id,b || this.skin);
        this.vs[this.av].editorId = a.id;
        this.vs[this.av].editorObj = a;
        this.skin == "dhx_terrace" && (this.adjust(),
        this.updateNestedObjects(!0));
        return this.vs[this._viewRestore()].editor
    }
    ;
    this.obj.attachMap = function(b) {
        var a = document.createElement("DIV");
        a.id = "GMapsObj_" + this._genStr(12);
        a.style.position = "relative";
        a.style.display = "none";
        a.style.overflow = "hidden";
        a.style.width = "100%";
        a.style.height = "100%";
        a.cmp = "gmaps";
        document.body.appendChild(a);
        this.attachObject(a.id, !1, !0, !0);
        b || (b = {
            center: new google.maps.LatLng(40.719837,-73.992348),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        this.vs[this.av].gmaps = new google.maps.Map(a,b);
        return this.vs[this.av].gmaps
    }
    ;
    this.obj.attachObject = function(b, a, c, d) {
        typeof b == "string" && (b = document.getElementById(b));
        if (a) {
            b.style.visibility = "hidden";
            b.style.display = "";
            var e = b.offsetWidth
              , f = b.offsetHeight
        }
        this._attachContent("obj", b);
        if (a && this._isWindow) {
            b.style.visibility = "",
            this._adjustToContent(e, f)
        }
        if (this.skin == "dhx_terrace" && (this.vs[this.av].menu != null  || this.vs[this.av].toolbar != null )) {
            this.adjust(typeof d == "undefined" || d == !0),
            this.updateNestedObjects(!0)
        }
        c || this._viewRestore()
    }
    ;
    this.obj.detachObject = function(b, a) {
        for (var c = null , d = null , e = "tree,grid,layout,tabbar,accordion,folders,form".split(","), f = 0; f < e.length; f++) {
            if (this.vs[this.av][e[f]]) {
                c = this.vs[this.av][e[f]];
                d = this.vs[this.av][e[f] + "Obj"];
                if (b) {
                    c.unload && c.unload();
                    for (c.destructor && c.destructor(); d.childNodes.length > 0; ) {
                        d.removeChild(d.childNodes[0])
                    }
                    d.parentNode.removeChild(d);
                    c = d = null 
                } else {
                    document.body.appendChild(d),
                    d.style.display = "none"
                }
                this.vs[this.av][e[f]] = null ;
                this.vs[this.av][e[f] + "Id"] = null ;
                this.vs[this.av][e[f] + "Obj"] = null 
            }
        }
        if (c != null  && d != null ) {
            return [c, d]
        }
        if (b && this.vs[this.av]._frame) {
            this._detachURLEvents(),
            this.vs[this.av]._frame = null 
        }
        for (var h = this.vs[this.av].dhxcont.mainCont[this.av]; h.childNodes.length > 0; ) {
            if (b == !0) {
                h.removeChild(h.childNodes[0])
            } else {
                var g = h.childNodes[0];
                a != null  ? (typeof a != "object" && (a = document.getElementById(a)),
                a.appendChild(g)) : document.body.appendChild(g);
                g.style.display = "none"
            }
        }
        h = a = null 
    }
    ;
    this.obj.appendObject = function(b) {
        typeof b == "string" && (b = document.getElementById(b));
        this._attachContent("obj", b, !0)
    }
    ;
    this.obj.attachHTMLString = function(b) {
        this._attachContent("str", b);
        for (var a = b.match(/<script[^>]*>[^\f]*?<\/script>/g) || [], c = 0; c < a.length; c++) {
            var d = a[c].replace(/<([\/]{0,1})script[^>]*>/g, "");
            d && (window.execScript ? window.execScript(d) : window.eval(d))
        }
    }
    ;
    this.obj.attachURL = function(b, a) {
        this._attachContent(a == !0 ? "urlajax" : "url", b, !1);
        if (this.skin == "dhx_terrace" && (this.vs[this.av].menu != null  || this.vs[this.av].toolbar != null )) {
            this.adjust(!0),
            this.updateNestedObjects(!0)
        }
        this._viewRestore()
    }
    ;
    this.obj.adjust = function(b) {
        if (this.skin == "dhx_skyblue") {
            if (this.vs[this.av].menu) {
                if (this._isWindow || this._isLayout) {
                    this.vs[this.av].menu._topLevelOffsetLeft = 0,
                    document.getElementById(this.vs[this.av].menuId).style.height = "26px",
                    this.vs[this.av].menuHeight = document.getElementById(this.vs[this.av].menuId).offsetHeight,
                    this._doOnAttachMenu && this._doOnAttachMenu("show")
                }
                if (this._isCell) {
                    document.getElementById(this.vs[this.av].menuId).className += " in_layoutcell",
                    this.vs[this.av].menuHeight = 25
                }
                if (this._isAcc) {
                    document.getElementById(this.vs[this.av].menuId).className += " in_acccell",
                    this.vs[this.av].menuHeight = 25
                }
                this._doOnAttachMenu && this._doOnAttachMenu("adjust")
            }
            this.vs[this.av].toolbar && (this._isWindow && (document.getElementById(this.vs[this.av].toolbarId).className += " in_window"),
            this._isLayout && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layout"),
            this._isCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell"),
            this._isAcc && (document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell"),
            this._isTabbarCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell"))
        }
        this.skin == "dhx_web" && this.vs[this.av].toolbar && (this._isWindow && (document.getElementById(this.vs[this.av].toolbarId).className += " in_window"),
        this._isLayout && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layout"),
        this._isCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_layoutcell"),
        this._isAcc && (document.getElementById(this.vs[this.av].toolbarId).className += " in_acccell"),
        this._isTabbarCell && (document.getElementById(this.vs[this.av].toolbarId).className += " in_tabbarcell"));
        if (this.skin == "dhx_terrace") {
            var a = 0;
            if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell) {
                a = 14
            }
            this._isCell && this._noHeader && (a = 0);
            var c = 0;
            if (this._isWindow || this._isCell || this._isAcc || this._isTabbarCell) {
                c = 14
            }
            this._isCell && this._noHeader && (c = 0);
            var d = b == !0 && !this.vs[this.av].toolbar || this._isLayout ? 14 : 0
              , e = b == !0 || this._isLayout ? 14 : 0
              , f = !1;
            if (this.vs[this.av].menu) {
                document.getElementById(this.vs[this.av].menuId).style.marginLeft = a + "px",
                document.getElementById(this.vs[this.av].menuId).style.marginRight = a + "px",
                document.getElementById(this.vs[this.av].menuId).style.marginTop = c + "px",
                document.getElementById(this.vs[this.av].menuId).style.marginBottom = d + "px",
                this.vs[this.av].menuHeight = 32 + c + d,
                this._doOnAttachMenu && this._doOnAttachMenu("show"),
                f = !0
            }
            if (this.vs[this.av].toolbar) {
                c == 0 && this.vs[this.av].menu != null  & this._isCell && (c = 14),
                document.getElementById(this.vs[this.av].toolbarId).style.marginLeft = a + "px",
                document.getElementById(this.vs[this.av].toolbarId).style.marginRight = a + "px",
                document.getElementById(this.vs[this.av].toolbarId).style.marginTop = c + "px",
                document.getElementById(this.vs[this.av].toolbarId).style.marginBottom = e + "px",
                this.vs[this.av].toolbarHeight = this.vs[this.av].toolbar.cont.offsetHeight + c + e,
                this._doOnAttachToolbar && this._doOnAttachToolbar("show"),
                f = !0
            }
        }
    }
    ;
    this.obj._attachContent = function(b, a, c) {
        if (c !== !0) {
            if (this.vs[this.av]._frame) {
                this._detachURLEvents(),
                this.vs[this.av]._frame = null 
            }
            for (; this.vs[this.av].dhxcont.mainCont[this.av].childNodes.length > 0; ) {
                this.vs[this.av].dhxcont.mainCont[this.av].removeChild(this.vs[this.av].dhxcont.mainCont[this.av].childNodes[0])
            }
        }
        if (b == "url") {
            if (this._isWindow && a.cmp == null  && this.skin == "dhx_skyblue") {
                this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
                this._redraw()
            }
            var d = document.createElement("IFRAME");
            d.frameBorder = 0;
            d.border = 0;
            d.style.width = "100%";
            d.style.height = "100%";
            d.setAttribute("src", "javascript:false;");
            this.vs[this.av].dhxcont.mainCont[this.av].appendChild(d);
            d.src = a;
            this.vs[this.av]._frame = d;
            this._attachURLEvents()
        } else {
            if (b == "urlajax") {
                if (this._isWindow && a.cmp == null  && this.skin == "dhx_skyblue") {
                    this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
                    this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF",
                    this._redraw()
                }
                var e = this
                  , f = String(this.av).valueOf()
                  , h = function() {
                    var a = e.av;
                    e.av = f;
                    e.attachHTMLString(this.xmlDoc.responseText, this);
                    e.av = a;
                    e._doOnFrameContentLoaded && e._doOnFrameContentLoaded();
                    this.destructor()
                }
                  , g = new dtmlXMLLoaderObject(h,window);
                g.dhxWindowObject = this;
                g.loadXML(a)
            } else {
                if (b == "obj") {
                    if (this._isWindow && a.cmp == null  && this.skin == "dhx_skyblue") {
                        this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
                        this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF",
                        this._redraw()
                    }
                    this.vs[this.av].dhxcont._frame = null ;
                    this.vs[this.av].dhxcont.mainCont[this.av].appendChild(a);
                    this.vs[this.av].dhxcont.mainCont[this.av].style.overflow = c === !0 ? "auto" : "hidden";
                    a.style.display = ""
                } else {
                    if (b == "str") {
                        if (this._isWindow && a.cmp == null  && this.skin == "dhx_skyblue") {
                            this.vs[this.av].dhxcont.mainCont[this.av].style.border = "#a4bed4 1px solid",
                            this.vs[this.av].dhxcont.mainCont[this.av].style.backgroundColor = "#FFFFFF",
                            this._redraw()
                        }
                        this.vs[this.av].dhxcont._frame = null ;
                        this.vs[this.av].dhxcont.mainCont[this.av].innerHTML = a
                    }
                }
            }
        }
    }
    ;
    this.obj._attachURLEvents = function() {
        var b = this
          , a = this.vs[this.av]._frame;
        _isIE ? a.onreadystatechange = function() {
            if (a.readyState == "complete") {
                try {
                    a.contentWindow.document.body.onmousedown = function() {
                        b._doOnFrameMouseDown && b._doOnFrameMouseDown()
                    }
                } catch (c) {}
                try {
                    b._doOnFrameContentLoaded && b._doOnFrameContentLoaded()
                } catch (d) {}
            }
        }
         : a.onload = function() {
            try {
                a.contentWindow.onmousedown = function() {
                    b._doOnFrameMouseDown && b._doOnFrameMouseDown()
                }
            } catch (c) {}
            try {
                b._doOnFrameContentLoaded && b._doOnFrameContentLoaded()
            } catch (d) {}
        }
    }
    ;
    this.obj._detachURLEvents = function() {
        if (_isIE) {
            try {
                this.vs[this.av]._frame.onreadystatechange = null ,
                this.vs[this.av]._frame.contentWindow.document.body.onmousedown = null ,
                this.vs[this.av]._frame.onload = null 
            } catch (b) {}
        } else {
            try {
                this.vs[this.av]._frame.contentWindow.onmousedown = null ,
                this.vs[this.av]._frame.onload = null 
            } catch (a) {}
        }
    }
    ;
    this.obj.showMenu = function() {
        if (this.vs[this.av].menu && this.vs[this.av].menuId && document.getElementById(this.vs[this.av].menuId).style.display == "none") {
            this.vs[this.av].menuHidden = !1,
            this._doOnAttachMenu && this._doOnAttachMenu("show"),
            document.getElementById(this.vs[this.av].menuId).style.display = "",
            this._viewRestore()
        }
    }
    ;
    this.obj.hideMenu = function() {
        if (this.vs[this.av].menu && this.vs[this.av].menuId && document.getElementById(this.vs[this.av].menuId).style.display != "none") {
            document.getElementById(this.vs[this.av].menuId).style.display = "none",
            this.vs[this.av].menuHidden = !0,
            this._doOnAttachMenu && this._doOnAttachMenu("hide"),
            this._viewRestore()
        }
    }
    ;
    this.obj.showToolbar = function() {
        if (this.vs[this.av].toolbar && this.vs[this.av].toolbarId && document.getElementById(this.vs[this.av].toolbarId).style.display == "none") {
            this.vs[this.av].toolbarHidden = !1,
            this._doOnAttachToolbar && this._doOnAttachToolbar("show"),
            document.getElementById(this.vs[this.av].toolbarId).style.display = "",
            this._viewRestore()
        }
    }
    ;
    this.obj.hideToolbar = function() {
        if (this.vs[this.av].toolbar && this.vs[this.av].toolbarId && document.getElementById(this.vs[this.av].toolbarId).style.display != "none") {
            this.vs[this.av].toolbarHidden = !0,
            document.getElementById(this.vs[this.av].toolbarId).style.display = "none",
            this._doOnAttachToolbar && this._doOnAttachToolbar("hide"),
            this._viewRestore()
        }
    }
    ;
    this.obj.showStatusBar = function() {
        if (this.vs[this.av].sb && this.vs[this.av].sbId && document.getElementById(this.vs[this.av].sbId).style.display == "none") {
            this.vs[this.av].sbHidden = !1,
            this._doOnAttachStatusBar && this._doOnAttachStatusBar("show"),
            document.getElementById(this.vs[this.av].sbId).style.display = "",
            this._viewRestore()
        }
    }
    ;
    this.obj.hideStatusBar = function() {
        if (this.vs[this.av].sb && this.vs[this.av].sbId && document.getElementById(this.vs[this.av].sbId).style.display != "none") {
            this.vs[this.av].sbHidden = !0,
            document.getElementById(this.vs[this.av].sbId).style.display = "none",
            this._doOnAttachStatusBar && this._doOnAttachStatusBar("hide"),
            this._viewRestore()
        }
    }
    ;
    this.obj._dhxContDestruct = function() {
        var b = this.av, a;
        for (a in this.vs) {
            this.av = a,
            this.detachMenu(!0),
            this.detachToolbar(!0),
            this.detachStatusBar(!0),
            this.detachObject(!0),
            this.vs[a].dhxcont.mainCont[a] = null 
        }
        for (a in this.vs) {
            this.vs[a].dhxcont.mainCont = null ,
            this.vs[a].dhxcont.innerHTML = "",
            this.vs[a].dhxcont = null ,
            this.vs[a] = null 
        }
        this.setActive = this.getView = this.getFrame = this._getSt = this._dhxContDestruct = this._genStr = this._init = this._setPadding = this._viewRestore = this._detachURLEvents = this._attachURLEvents = this._attachContent = this.updateNestedObjects = this.hideCoverBlocker = this.showCoverBlocker = this.coverBlocker = this.adjustContent = this.moveContentTo = this.setMinContentSize = this.adjust = this.show = this.view = this.attachMap = this.attachURL = this.attachHTMLString = this.appendObject = this.detachObject = this.attachObject = this.attachEditor = this.attachLayout = this.attachAccordion = this.attachFolders = this.attachTabbar = this.attachTree = this.attachScheduler = this.attachGrid = this.hideStatusBar = this.hideToolbar = this.hideMenu = this.showStatusBar = this.showToolbar = this.showMenu = this.detachStatusBar = this.detachToolbar = this.detachMenu = this.attachStatusBar = this.attachToolbar = this.attachMenu = this.vs = null ;
        g.st.innerHTML = "";
        g.st.parentNode.removeChild(g.st);
        g.st = null ;
        g.setContent = null ;
        g.dhxcont = null ;
        g = g.obj = null ;
        if (dhtmlx.detaches) {
            for (a in dhtmlx.detaches) {
                dhtmlx.detaches[a](this)
            }
        }
    }
    ;
    if (dhtmlx.attaches) {
        for (var j in dhtmlx.attaches) {
            this.obj[j] = dhtmlx.attaches[j]
        }
    }
    return this
}
;
if (!window.dhtmlx) {
    window.dhtmlx = {}
}
(function() {
    var l = null ;
    function o(t, r) {
        var s = t.callback;
        n(false);
        if (t.box.parentNode) {
            t.box.parentNode.removeChild(t.box)
        }
        l = t.box = null ;
        if (s) {
            s(r)
        }
    }
    function a(s) {
        if (l) {
            s = s || event;
            var r = s.which || event.keyCode;
            if (dhtmlx.message.keyboard) {
                if (r == 13 || r == 32) {
                    o(l, true)
                }
                if (r == 27) {
                    o(l, false)
                }
            }
            if (s.preventDefault) {
                s.preventDefault()
            }
            return !(s.cancelBubble = true)
        }
    }
    if (document.attachEvent) {
        document.attachEvent("onkeydown", a)
    } else {
        document.addEventListener("keydown", a, true)
    }
    function n(s) {
        if (!n.cover) {
            n.cover = document.createElement("DIV");
            n.cover.onkeydown = a;
            n.cover.className = "dhx_modal_cover";
            document.body.appendChild(n.cover)
        }
        var r = document.body.scrollHeight;
        n.cover.style.display = s ? "inline-block" : "none"
    }
    function f(s, r) {
        return "<div class='dhtmlx_popup_button' result='" + r + "' ><div>" + s + "</div></div>"
    }
    function c(s) {
        if (!p.area) {
            p.area = document.createElement("DIV");
            p.area.className = "dhtmlx_message_area";
            p.area.style[p.position] = "5px";
            document.body.appendChild(p.area)
        }
        p.hide(s.id);
        var r = document.createElement("DIV");
        r.innerHTML = "<div>" + s.text + "</div>";
        r.className = "dhtmlx-info dhtmlx-" + s.type;
        r.onclick = function() {
            p.hide(s.id);
            s = null 
        }
        ;
        if (p.position == "bottom" && p.area.firstChild) {
            p.area.insertBefore(r, p.area.firstChild)
        } else {
            p.area.appendChild(r)
        }
        if (s.expire > 0) {
            p.timers[s.id] = window.setTimeout(function() {
                p.hide(s.id)
            }
            , s.expire)
        }
        p.pull[s.id] = r;
        r = null ;
        return s.id
    }
    function h(s, u, x) {
        var w = document.createElement("DIV");
        w.className = " dhtmlx_modal_box dhtmlx-" + s.type;
        w.setAttribute("dhxbox", 1);
        var r = "";
        if (s.width) {
            w.style.width = s.width
        }
        if (s.height) {
            w.style.height = s.height
        }
        if (s.title) {
            r += '<div class="dhtmlx_popup_title">' + s.title + "</div>"
        }
        r += '<div class="dhtmlx_popup_text"><span>' + (s.content ? "" : s.text) + '</span></div><div  class="dhtmlx_popup_controls">';
        if (u) {
            r += f(s.ok || "OK", true)
        }
        if (x) {
            r += f(s.cancel || "Cancel", false)
        }
        if (s.buttons) {
            for (var t = 0; t < s.buttons.length; t++) {
                r += f(s.buttons[t], t)
            }
        }
        r += "</div>";
        w.innerHTML = r;
        if (s.content) {
            var v = s.content;
            if (typeof v == "string") {
                v = document.getElementById(v)
            }
            if (v.style.display == "none") {
                v.style.display = ""
            }
            w.childNodes[s.title ? 1 : 0].appendChild(v)
        }
        w.onclick = function(A) {
            A = A || event;
            var z = A.target || A.srcElement;
            if (!z.className) {
                z = z.parentNode
            }
            if (z.className == "dhtmlx_popup_button") {
                var y = z.getAttribute("result");
                y = (y == "true") || (y == "false" ? false : y);
                o(s, y)
            }
        }
        ;
        s.box = w;
        if (u || x) {
            l = s
        }
        return w
    }
    function q(r, s, u) {
        var v = $("#defaultwarningAlert_id")[0];
        var t = null ;
        if (v) {
            t = v;
            $("#content_defaultwarningAlert_title").html(r.title || "");
            $("#content_defaultwarningAlert_hearder").html(r.text || "");
            $("#content_defaultwarningAlert_body").html(r.body || "");
            $("#qd_closeDefaultWarningWindowDialog_id").html(r.ok || "确定")
        } else {
            t = $('<div id="defaultwarningAlert_id"><div class="mark"></div><div class="up-box w600" id="content_defaultwarningAlert_id" style="border:#909090 0 solid;color:#333;box-shadow:2px 2px 10px #909090;"><div class="up-box-hd" ><span id="content_defaultwarningAlert_title">' + (r.title || "") + '</span><a href="javascript:"id="gb_closeDefaultWarningWindowDialog_id">关闭</a></div><div class="up-box-bd"><div class="up-con clearfix"><span class="icon i-warn"></span> <div class="r-txt"><div class="tit" id="content_defaultwarningAlert_hearder" >' + (r.text || "") + '</div><P  id="content_defaultwarningAlert_body">' + (r.body || "") + '</P></div></div> <div class="lay-btn"><a href="javascript:" id="qd_closeDefaultWarningWindowDialog_id" class="btn92s">' + (r.ok || "确定") + "</a></div></div></div></div>")[0]
        }
        t.setAttribute("dhxbox", 1);
        $(t).css("z-index", "20000");
        if (navigator.appVersion.indexOf("MSIE 6") > -1) {} else {
            $(t).css("position", "fixed")
        }
        r.box = t;
        if (!r.hidden) {
            n(true)
        }
        document.body.appendChild(t);
        $(t).css({
            left: ($(window).width() - $(t).outerWidth()) / 2 - 300,
            top: ($(window).height() - $(t).outerHeight()) / 2 - 110
        });
        if (navigator.appVersion.indexOf("MSIE 6") > -1) {
            $("#content_defaultwarningAlert_id").css({
                "margin-left": "-300px",
                left: "50%",
                "margin-top": "-110px",
                top: ($(window).height() - $(t).outerHeight()) / 2
            })
        }
        t.onkeydown = a;
        t.focus();
        if (r.hidden) {
            dhtmlx.modalbox.hide(t)
        }
        $("#qd_closeDefaultWarningWindowDialog_id").on("click", function(w) {
            o(r);
            if (w && w.preventDefault) {
                w.preventDefault()
            } else {
                window.event.returnValue = false
            }
        }
        );
        $("#gb_closeDefaultWarningWindowDialog_id").on("click", function(w) {
            o(r);
            if (w && w.preventDefault) {
                w.preventDefault()
            } else {
                window.event.returnValue = false
            }
        }
        );
        if (s || u) {
            l = r
        }
        return t
    }
    function k() {
        if ("pageYOffset" in window) {
            return window.pageYOffset
        } else {
            if (document.compatMode == "BackCompat") {
                return document.body.scrollTop
            } else {
                return document.documentElement.scrollTop
            }
        }
    }
    function j(r) {
        return q(r, true, false)
    }
    function b(r) {
        return q(r, true, true)
    }
    function e(r) {
        return g(r)
    }
    function g(r) {
        var s = $(r.targSrc)[0];
        s.setAttribute("dhxbox", 1);
        $(s).css("z-index", "20000");
        r.box = s;
        if (!r.hidden) {
            n(true)
        }
        document.body.appendChild(s);
        if (navigator.appVersion.indexOf("MSIE 6") > -1) {
            $(s).css("position", "absolute");
            $(s).css({
                "margin-left": "-300px",
                left: "50%",
                "margin-top": "-110px",
                top: ($(window).height() - $(s).outerHeight()) / 2
            })
        } else {
            $(s).css("position", "fixed");
            $(s).css({
                left: ($(window).width() - $(s).outerWidth()) / 2,
                top: ($(window).height() - $(s).outerHeight()) / 2
            })
        }
        s.onkeydown = a;
        s.focus();
        if (r.hidden) {
            dhtmlx.modalbox.hide(s)
        }
        return s
    }
    function i(s, r, t) {
        if (typeof s != "object") {
            if (typeof r == "function") {
                t = r;
                r = ""
            }
            s = {
                text: s,
                type: r,
                callback: t
            }
        }
        return s
    }
    function d(t, s, r, u) {
        if (typeof t != "object") {
            t = {
                text: t,
                type: s,
                expire: r,
                id: u
            }
        }
        t.id = t.id || p.uid();
        t.expire = t.expire || p.expire;
        return t
    }
    dhtmlx.alert = function() {
        var r = i.apply(this, arguments);
        r.type = r.type || "confirm";
        return j(r)
    }
    ;
    dhtmlx.confirm = function() {
        var r = i.apply(this, arguments);
        r.type = r.type || "alert";
        return b(r)
    }
    ;
    dhtmlx.modalbox = function() {
        var r = i.apply(this, arguments);
        r.type = r.type || "alert";
        return e(r)
    }
    ;
    dhtmlx.createWin = function() {
        var r = i.apply(this, arguments);
        r.type = r.type || "win";
        return m(r)
    }
    ;
    dhtmlx.modality = function(r) {
        n(r)
    }
    ;
    function m(t) {
        var u = $("#" + t.winId)[0];
        u.setAttribute("dhxbox", 1);
        $(u).css("z-index", "20000");
        if (navigator.appVersion.indexOf("MSIE 6") > -1) {} else {
            $(u).css("position", "fixed")
        }
        t.box = u;
        if (!t.hidden) {
            n(true)
        }
        document.body.appendChild(u);
        var r = $(window).width() / 2 - 300;
        var w = 0;
        if (k() > 0) {
            w = ($(window).height() / 2) - k() / 2
        } else {
            w = $(window).height() / 2 - 150
        }
        $(u).css("left", r + "px");
        $(u).css("top", w + "px");
        u.onkeydown = a;
        $(u).show();
        if (t.hidden) {
            dhtmlx.modalbox.hide(u)
        }
        if (t.closeWinId) {
            var v = t.closeWinId.length;
            for (var s = 0; s < v; s++) {
                $("#" + t.closeWinId[s]).unbind("click");
                $("#" + t.closeWinId[s]).on("click", function(y) {
                    var x = t.callback;
                    n(false);
                    $(t.box).hide();
                    l = t.box = null ;
                    if (x) {
                        x()
                    }
                    if (y && y.preventDefault) {
                        y.preventDefault()
                    } else {
                        window.event.returnValue = false
                    }
                }
                )
            }
        }
        if (t.okId) {
            $("#" + t.okId).unbind("click");
            $("#" + t.okId).on("click", function(y) {
                if (t.checkConfirm) {
                    if (t.checkConfirm()) {
                        var x = t.okCallBack;
                        n(false);
                        $(t.box).hide();
                        l = t.box = null ;
                        if (x) {
                            x()
                        }
                    }
                } else {
                    var x = t.okCallBack;
                    n(false);
                    $(t.box).hide();
                    l = t.box = null ;
                    if (x) {
                        x()
                    }
                }
                if (y && y.preventDefault) {
                    y.preventDefault()
                } else {
                    window.event.returnValue = false
                }
            }
            )
        }
        return u
    }
    dhtmlx.modalbox.hide = function(r) {
        while (r && r.getAttribute && !r.getAttribute("dhxbox")) {
            r = r.parentNode
        }
        if (r) {
            r.parentNode.removeChild(r);
            n(false)
        }
    }
    ;
    var p = dhtmlx.message = function(u, t, s, v) {
        u = d.apply(this, arguments);
        u.type = u.type || "info";
        var r = u.type.split("-")[0];
        switch (r) {
        case "alert":
            return j(u);
        case "confirm":
            return b(u);
        case "modalbox":
            return e(u);
        case "win":
            return m(u);
        default:
            return c(u);
            break
        }
    }
    ;
    p.seed = (new Date()).valueOf();
    p.uid = function() {
        return p.seed++
    }
    ;
    p.expire = 4000;
    p.keyboard = true;
    p.position = "top";
    p.pull = {};
    p.timers = {};
    p.hideAll = function() {
        for (var r in p.pull) {
            p.hide(r)
        }
    }
    ;
    p.hide = function(s) {
        var r = p.pull[s];
        if (r && r.parentNode) {
            window.setTimeout(function() {
                r.parentNode.removeChild(r);
                r = null 
            }
            , 2000);
            r.className += " hidden";
            if (p.timers[s]) {
                window.clearTimeout(p.timers[s])
            }
            delete p.pull[s]
        }
    }
}
)();
jQuery.validator.addMethod("checkLoginUserName", function(f, d) {
    var a = false;
    var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
    var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
    if (b.test(f) || e.test(f) || c.test(f)) {
        a = true
    }
    return this.optional(d) || a
}
, "wrong username.");
jQuery.validator.addMethod("requiredUserName", function(b, a) {
    if ("用户名／邮箱／手机号" == b) {
        return false
    }
    if (b == null  || "" == b) {
        return false
    }
    return true
}
, "wrong username.");
jQuery.validator.addMethod("requiredSchoolName", function(b, a) {
    if ("简码／汉字" == b) {
        return false
    }
    if (b == null  || "" == b) {
        return false
    }
    return true
}
, "wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired", function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length > 0
}
, "验证码错误!");
jQuery.validator.addMethod("randCodeFormat", function(c, b) {
    $("#i-ok").css("display", "none");
    var a = /^[a-zA-Z0-9]+$/;
    return this.optional(b) || a.test(c)
}
, "验证码错误!");
jQuery.validator.addMethod("randCodeLength", function(b, a) {
    $("#i-ok").css("display", "none");
    return b.length == 4
}
, "验证码错误!.");
jQuery.validator.addMethod("integrationCheck", function(b, a) {
    var c = /^\d{6}$/;
    return this.optional(a) || c.test(b)
}
, "wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck", function(b, a, c) {
    if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
        return true
    }
    return false
}
, "两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode", function(c, b, d) {
    var a = true;
    if (c && c.length == 4) {
        $.ajax({
            url: ctx + "passcodeNew/checkRandCodeAnsyn",
            type: "post",
            data: {
                randCode: c,
                rand: d
            },
            async: false,
            success: function(e) {
                if (e.data == "N") {
                    a = false;
                    $("#i-ok").css("display", "none")
                } else {
                    a = true;
                    $("#i-ok").css("display", "block")
                }
            }
        })
    } else {
        a = false;
        $("#i-ok").css("display", "none")
    }
    return a
}
, "验证码错误!.");
jQuery.validator.addMethod("validateUsersName", function(b, a) {
    return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
}
, "用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace", function(c, b) {
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 32) {
            return false
        }
    }
    return true
}
, "contain writespace");
jQuery.validator.addMethod("validateRandCode", function(b, a) {
    return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
}
, "验证码错误!.");
jQuery.validator.addMethod("checkPassward", function(c, b, e) {
    var d = true;
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}
, "Passward wrong");
function validateSecIdCard(g) {
    var f = 0;
    var a = g;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null ) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function validateFirIdCard(g) {
    var f = 0;
    var a;
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙",
        21: "辽宁",
        22: "吉林",
        23: "黑龙",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    if (g.length == 15) {
        a = idCardUpdate(g)
    } else {
        a = g
    }
    if (!/^\d{17}(\d|x)$/i.test(a)) {
        return false
    }
    a = a.replace(/x$/i, "a");
    if (e[parseInt(a.substr(0, 2))] == null ) {
        return false
    }
    var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
    var h = new Date(c.replace(/-/g, "/"));
    if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
        return false
    }
    for (var b = 17; b >= 0; b--) {
        f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
    }
    if (f % 11 != 1) {
        return false
    }
    return true
}
function idCardUpdate(g) {
    var b;
    var f = /^(\d){15}$/;
    if (f.test(g)) {
        var e = 0;
        var a = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);
        var d = new Array("1","0","X","9","8","7","6","5","4","3","2");
        g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
        for (var c = 0; c < g.length; c++) {
            e += parseInt(g.substr(c, 1)) * a[c]
        }
        g += d[e % 11];
        b = g
    } else {
        b = "#"
    }
    return b
}
jQuery.validator.addMethod("checkBorth", function(e, c) {
    var b = e;
    if (b == "") {
        return true
    } else {
        var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (a == null ) {
            return false
        }
        var f = new Date(a[1],a[3] - 1,a[4]);
        return ( f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f.getDate() == a[4]) 
    }
}
, "日期格式不合法");
jQuery.validator.addMethod("byteRangeLength", function(d, b, e) {
    var c = d.length;
    for (var a = 0; a < d.length; a++) {
        if (d.charCodeAt(a) > 127) {
            c++
        }
    }
    return this.optional(b) || (c >= e[0] && c <= e[1])
}
, "length wrong");
jQuery.validator.addMethod("checkNameCharBlank", function(c, b, d) {
    var a = d.split("@");
    if ($("#" + a[1]).val() == "") {
        return true
    } else {
        if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
            return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
        } else {
            if ($("#" + a[0]).val() == "B") {
                if (/^[-]+$/.test(c)) {
                    return false
                }
                return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
            } else {
                if ($("#" + a[0]).val() == "H") {
                    if (/^[-]+$/.test(c)) {
                        return false
                    }
                    return this.optional(b) || /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(c)
                } else {
                    return this.optional(b) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
                }
            }
        }
    }
}
, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function(c, b) {
    var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
    return this.optional(b) || (a.test(c))
}
, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function(b, a, c) {
    if (!checkIfSecIdCard($(c).val())) {
        return true
    }
    return validateSecIdCard(b)
}
, "wrong");
function checkIfSecIdCard(a) {
    if (a == "1") {
        return true
    }
    return false
}
function checkIfFirIdCard(a) {
    if (a == "2") {
        return true
    }
    return false
}
function checkCardForHKorTW(a) {
    if (a == "C" || a == "G") {
        return true
    }
    return false
}
jQuery.validator.addMethod("isFirIDCard", function(b, a, c) {
    if (!checkIfFirIdCard($(c).val())) {
        return true
    }
    return validateFirIdCard(b)
}
, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function(c, b, d) {
    if ($(d).val() == "C") {
        var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}
, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function(c, a, e) {
    if ($(e).val() == "G") {
        var d = /^[0-9]{8}$/;
        var b = /^[0-9]{10}$/;
        return this.optional(a) || (d.test(c)) || (b.test(c))
    } else {
        return true
    }
}
, "wrong format.");
jQuery.validator.addMethod("checkPassport", function(d, b, e) {
    if ($(e).val() == "B") {
        var c = /^[a-zA-Z]{5,17}$/;
        var a = /^[a-zA-Z0-9]{5,17}$/;
        return this.optional(b) || (a.test(d)) || c.test(d)
    } else {
        return true
    }
}
, "wrong format.");
jQuery.validator.addMethod("checkWork", function(c, b, d) {
    if ($(d).val() == "H") {
        var a = /^[a-zA-Z]{3}[0-9]{12}$/;
        return this.optional(b) || (a.test(c))
    } else {
        return true
    }
}
, "wrong format.");
jQuery.validator.addMethod("isMobile", function(d, b) {
    var c = d.length;
    var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
    return this.optional(b) || (c == 11 && a.test(d))
}
, "wrong mobile phone ");
jQuery.validator.addMethod("isTelePhone", function(b, a) {
    var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
    return this.optional(a) || (c.test(b))
}
, "wrong telePhone ");
jQuery.validator.addMethod("illegalChar", function(c, b, e) {
    var d = true;
    if (c.indexOf("$") >= 0) {
        return false
    }
    for (var a = 0; a < c.length; a++) {
        if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60 || c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34 || c.charCodeAt(a) == 63) {
            d = false
        }
        if (!d) {
            break
        }
    }
    return this.optional(b) || d
}
, "Illegal char wrong");
jQuery.validator.addMethod("isZipCode", function(c, b) {
    var a = /^[0-9]{6}$/;
    return this.optional(b) || (a.test(c))
}
, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function(c, a) {
    var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return this.optional(a) || (b.test(trim(c)))
}
, "wrong email");
function replaceChar(b) {
    var a = b.value.replace(/['"<> ?]/g, "");
    b.value = a
}
function checkNameChar1(a) {
    return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
    return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
    return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
    return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName", function(b, a) {
    return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
}
, "wrong username.");
jQuery.validator.addMethod("studentRequired", function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != ""
    }
    return true
}
, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function(b, a, c) {
    if ($(c).val() == "3") {
        return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
    }
    return true
}
, "wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName", function(b, a, c) {
    if ($(c).val() == "3") {
        return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
    }
    return true
}
, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function(b, a, c) {
    if ($(c).val() == "3") {
        if ((!b || trim(b) == "" || trim(b) == "简码/汉字") ) {
            return false
        }
    }
    return true
}
, "wrong username.");
jQuery.validator.addMethod("isQuestionNull", function(b, a, c) {
    if (jQuery.trim(b) != "") {
        if (jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) == "" || jQuery.trim($(c[0]).val()) == "") {
            return false
        }
    }
    return true
}
, "you should input the question");
jQuery.validator.addMethod("isAnswerNull", function(b, a, c) {
    if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1]).val()) != "") || (jQuery.trim($(c[0]).val()) != "")) {
        if (jQuery.trim(b) == "") {
            return false
        }
    }
    return true
}
, "you should input the answer");
function checkSex(c, b, a) {
    if (!checkSexByCardId(c, b, a)) {
        if (!confirm("性别与身份证中的性别不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkSexByCardId(c, e, a) {
    function b(h, i) {
        var g = null ;
        if (i.length == 15) {
            g = i.substring(14, 15)
        } else {
            if (i.length == 18) {
                g = i.substring(16, 17)
            } else {
                return true
            }
        }
        if (g == "x" || g == "X") {
            g = "10"
        }
        var f = parseInt(g);
        var j = f % 2;
        if (j === 0 && h === "F") {
            return true
        } else {
            if (j === 1 && h === "M") {
                return true
            } else {
                return false
            }
        }
    }
    var d = $(a).val();
    if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
        if (d !== "") {
            return b(c, d)
        } else {
            return true
        }
    } else {
        if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
            if (d !== "") {
                return b(c, d)
            } else {
                return true
            }
        } else {
            return true
        }
    }
}
function checkBirdDateByCardId(c, e, b) {
    var a = null ;
    var d = $(b).val();
    if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
        a = d.substring(6, 14)
    } else {
        if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
            if (d.length == 15) {
                a = "19" + d.substring(6, 12)
            } else {
                if (d.length == 18) {
                    a = d.substring(6, 14)
                }
            }
        } else {
            return true
        }
    }
    if (c !== "") {
        c = c.replace(/-/g, "");
        if (c != a) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
function checkBirdate(c, b, a) {
    if (!checkBirdDateByCardId(c, b, a)) {
        if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
            return false
        } else {
            return true
        }
    } else {
        return true
    }
}
jQuery.validator.addMethod("checkPwdValidate", function(b, a) {
    return this.optional(a) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
}
, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function(b, a, c) {
    if ($(c).val() != null ) {
        return $(c).val() == b
    }
    return true
}
, "contain writespace");
jQuery.validator.addMethod("IVR_passwd_format", function(b, a) {
    var c = /^[0-9]{6}$/;
    return this.optional(a) || c.test(b)
}
, "验证码错误!.");
jQuery.validator.addMethod("checkStation", function(b, a) {
    if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓") ) {
        return false
    }
    return true
}
, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function(e, c, f) {
    var b = f[0];
    var d = $("#" + f[1]).val();
    var a = true;
    $.ajax({
        url: b + "?user_name=" + e,
        type: "get",
        async: false,
        success: function(g, h) {
            if (g.data == true) {
                a = false
            } else {
                a = true
            }
        },
        error: function(g, i, h) {
            a = false
        }
    });
    return a
}
, "wrong cardNo");
function checkPwdRank(e, a, d) {
    var b = $(e);
    var c = b.val();
    if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c) || new RegExp("^[0-9]{6,}$").test(c) || new RegExp("^[_]{6,}$").test(c)) {
        $("#" + a).attr("title", "危险");
        $("#" + d).html("危险");
        $("#" + a).removeClass("rank-a");
        $("#" + a).removeClass("rank-b");
        $("#" + a).removeClass("rank-c");
        $("#" + a).addClass("rank-a")
    } else {
        if (c.length > 6 && new RegExp("[a-zA-Z]").test(c) && new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
            $("#" + a).attr("title", "安全");
            $("#" + d).html("安全");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-c")
        } else {
            $("#" + a).attr("title", "一般");
            $("#" + d).html("一般");
            $("#" + a).removeClass("rank-a");
            $("#" + a).removeClass("rank-b");
            $("#" + a).removeClass("rank-c");
            $("#" + a).addClass("rank-b")
        }
    }
}
Array.prototype.unique = function() {
    var b = {}
      , a = this.length;
    for (var c = 0; c < a; c++) {
        if (typeof b[this[c]] == "undefined") {
            b[this[c]] = 1
        }
    }
    this.length = 0;
    a = 0;
    for (var c in b) {
        this[a++] = c
    }
    return this
}
;
function checkSearchPwdRank(h, c, g) {
    var e = $(h);
    var f = e.val();
    if (f.length < 6) {
        $("#" + c).attr("title", "危险");
        $("#" + g).html("危险");
        $("#" + c).removeClass("rank-a");
        $("#" + c).removeClass("rank-b");
        $("#" + c).removeClass("rank-c");
        $("#" + c).addClass("rank-a")
    } else {
        var a = [];
        for (var b = 0; b < 6; b++) {
            a.push(f.charAt(b))
        }
        a = a.unique();
        var d = a.length;
        if (d == 1) {
            $("#" + c).attr("title", "危险");
            $("#" + g).html("危险");
            $("#" + c).removeClass("rank-a");
            $("#" + c).removeClass("rank-b");
            $("#" + c).removeClass("rank-c");
            $("#" + c).addClass("rank-a")
        } else {
            if (d > 1 && d < 5) {
                $("#" + c).attr("title", "一般");
                $("#" + g).html("一般");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-b")
            } else {
                $("#" + c).attr("title", "安全");
                $("#" + g).html("安全");
                $("#" + c).removeClass("rank-a");
                $("#" + c).removeClass("rank-b");
                $("#" + c).removeClass("rank-c");
                $("#" + c).addClass("rank-c")
            }
        }
    }
}
jQuery.validator.addMethod("checkDetailAddress", function(b, a) {
    return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
}
, "wrong name.");
jQuery.validator.addMethod("checkAddressName", function(b, a) {
    if (/^[-]+$/.test(b)) {
        return false
    }
    return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
}
, "wrong name.");
jQuery.validator.addMethod("checkAddressSelect", function(b, a) {
    if ("" == b) {
        return false
    }
    if (b) {
        return true
    }
    return this.optional(a)
}
, "wrong name.");
(function(a) {
    jQuery.extend({
        isNum: function(c) {
            var b = window.event ? c.keyCode : c.which;
            if (!(((b >= 48) && (b <= 57)) || b == 8 || b == 0)) {
                if (window.event) {
                    window.event.returnValue = false
                } else {
                    c.preventDefault()
                }
            }
        }
    });
    "use strict";
    a.mobile = function(c, b) {
        var d = this;
        d.$el = a(c);
        d.el = c;
        d.nextTimeNum = 120;
        d.isCanGet = true;
        d.boxDiv = [];
        d.init = function() {
            d.options = a.extend({}, a.mobile.defaultOptions, b);
            if (d.options.isShow) {
                d.show()
            }
        }
        ;
        d.createDioDiv = function() {
            if (a("#mobile_hy_dia")[0]) {
                a("#mobile_hy_dia").remove()
            }
            if (d.boxDiv.length == 0) {
                d.boxDiv.push('<div id="mobile_hy_dia" style="display: none;">');
                d.boxDiv.push('<div class="mark"></div><div class="up-box w600">');
                d.boxDiv.push('<div class="up-box-hd">手机核验<a href="javascript:" id="mobile_hy_dia_close">关闭</a></div>');
                d.boxDiv.push('<div class="up-bd"><div class="number-test"><div class="test-tips"><i></i>');
                if (d.options.userreceive == "X") {
                    d.boxDiv.push("您的手机号码" + d.options.mobileNum.substr(0, 3) + "****" + d.options.mobileNum.substr(7) + "尚未通过核验，请您先对手机号码进行核验，通过后再办理购票、改签等业务，谢谢您的合作。</div>")
                } else {
                    d.boxDiv.push("本网站已开通手机核验功能，请您尽快办理手机号码核验手续,以免影响您今后在本网站正常办理业务，谢谢您的合作。</div>")
                }
                d.boxDiv.push('<table><tr><td class="tr" width="170">您当前的手机号码是：</td>');
                d.boxDiv.push('<td><span class="ph-num" id="mobile_hy_dia_num"></span></td>');
                d.boxDiv.push('<td><a href="javascript:" id="mobile_hy_dia_edit" class="btn92">修改手机号</a></td></tr>');
                d.boxDiv.push('<tr><td class="tr" width="170">验证码：</td><td><input type="text"  onkeypress="return $.isNum(event)" maxlength="6" name="mobile_hy_code" id="mobile_hy_code" class="inp-txt" /></td><td><a id="mobile_hy_dia_get"  href="javascript:" class="btn92s">获取手机验证码</a></td></tr>');
                d.boxDiv.push('<tr><td class="tr">&nbsp;</td><td colspan="2" class="colorA" id="mobile_hy_errorMsg_id"></td></tr>');
                d.boxDiv.push('<tr><td class="tr">&nbsp;</td><td colspan="2"><a href="javascript:" id="mobile_hy_dia_ok" class="btn92s mr15">核验</a><a href="javascript:" id="mobile_hy_dia_cancel">取消</a></td></tr></table></div>');
                d.boxDiv.push(' <div class="tips-box"><p>使用说明：<br />');
                d.boxDiv.push("1.一个用户一天可以获取三次手机核验的短信验证码。<br />");
                d.boxDiv.push("2.手机核验通过的用户方能在12306.cn网站办理邮箱修改、密码修改等业务。<br />");
                d.boxDiv.push("</p></div></div></div>")
            }
            a(document.body).append(a(d.boxDiv.join("")));
            a("#mobile_hy_dia_get").unbind("click").on("click", d.getMobileCode);
            a("#mobile_hy_code").unbind("keyup").on("keyup", function() {
                a("#mobile_hy_errorMsg_id").text("")
            }
            );
            if (d.options.showEdit) {
                a("#mobile_hy_dia_edit").show();
                a("#mobile_hy_dia_edit").unbind("click").on("click", function() {
                    a("#mobile_hy_dia").hide();
                    a(".dhx_modal_cover").hide();
                    d.options.editFun()
                }
                )
            }
            d.dhtmlxBox = dhtmlx.createWin({
                winId: "mobile_hy_dia",
                closeWinId: ["mobile_hy_dia_cancel", "mobile_hy_dia_close"],
                okId: "mobile_hy_dia_ok",
                okCallBack: function() {
                    d.options.okCallBack();
                    d.isCanGet = true;
                    a("#mobile_hy_send_str").hide();
                    if (d.countDown) {
                        clearInterval(d.countDown)
                    }
                },
                checkConfirm: function() {
                    return d.checkMobileCode()
                }
            });
            a("#mobile_hy_dia").css("top", "150px")
        }
        ;
        d.checkMobileCode = function() {
            var e = false;
            var j = "";
            if (a("#mobile_hy_code").val() == "") {
                a("#mobile_hy_errorMsg_id").text("请输入手机验证码");
                a("#mobile_hy_code").focus();
                e = false
            } else {
                a("#mobile_hy_errorMsg_id").text("");
                var h = {};
                for (var f = 0, g = d.options.checkDatas.length; f < g; f++) {
                    var i = d.options.checkDatas[f];
                    h[i.name] = a("#" + i.id).val() || a("#" + i.id).text()
                }
                h.randCode = a("#mobile_hy_code").val();
                a.ajax({
                    url: ctx + d.options.hyUrl,
                    type: "POST",
                    dataType: "JSON",
                    async: false,
                    data: h,
                    success: function(k) {
                        if (k.status) {
                            if (k.data.errorMsg && k.data.errorMsg.length > 0) {
                                j = k.data.errorMsg;
                                a("#mobile_hy_errorMsg_id").text(j);
                                e = false
                            } else {
                                e = true
                            }
                        } else {
                            j = "获取手机验证码失败";
                            a("#mobile_hy_errorMsg_id").text(j);
                            e = false
                        }
                    }
                });
                if (e == false && j == "") {
                    a("#mobile_hy_errorMsg_id").text("手机核验失败")
                }
                return e
            }
        }
        ;
        d.getMobileCode = function() {
            if (!d.isCanGet) {
                return
            }
            a("#mobile_hy_errorMsg_id").text("");
            a("#mobile_hy_code").val("");
            var g = {};
            for (var e = 0, f = d.options.getDatas.length; e < f; e++) {
                var h = d.options.getDatas[e];
                g[h.name] = a("#" + h.id).val() || a("#" + h.id).text()
            }
            a.ajax({
                url: ctx + d.options.getUrl,
                type: "POST",
                dataType: "JSON",
                data: g,
                success: function(i) {
                    if (i.status) {
                        if (i.data.errorMsg && i.data.errorMsg.length > 0) {
                            a("#mobile_hy_errorMsg_id").text(i.data.errorMsg)
                        } else {
                            d.nextSendTime();
                            a("#mobile_hy_send_str").show();
                            a("#mobile_hy_code").focus()
                        }
                    } else {
                        a("#mobile_hy_errorMsg_id").text("获取手机验证码失败")
                    }
                }
            })
        }
        ;
        d.nextSendTime = function() {
            d.isCanGet = false;
            if (d.countDown) {
                clearInterval(d.countDown)
            }
            d.countDown = window.setInterval(function() {
                if (d.nextTimeNum > 0) {
                    a("#mobile_hy_dia_get").html("重新获取(" + (d.nextTimeNum--) + ")")
                } else {
                    a("#mobile_hy_send_str").hide();
                    d.isCanGet = true;
                    d.nextTimeNum = 120;
                    clearInterval(d.countDown);
                    a("#mobile_hy_dia_get").html("获取手机验证码")
                }
            }
            , 1000)
        }
        ;
        d.show = function() {
            d.createDioDiv();
            a("#mobile_hy_dia_num").text(d.options.mobileNum.substr(0, 3) + "****" + d.options.mobileNum.substr(7));
            a("#mobile_hy_code").focus();
            a("#mobile_hy_dia").show();
            a(".dhx_modal_cover").show()
        }
        ;
        d.init();
        return d
    }
    ;
    a.mobile.defaultOptions = {
        mobileNum: "",
        userreceive: "",
        getUrl: "",
        getDatas: [],
        checkDatas: [],
        hyUrl: "",
        showEdit: true,
        okCallBack: function() {},
        editFun: function() {},
        isShow: true
    };
    a.fn.mobile = function() {
        var b = Array.prototype.slice.call(arguments);
        return ( new a.mobile(this,b[0])) 
    }
}
)(jQuery);
(function() {
    $(document).ready(function() {
        $.sidebar_init(5);
        $._initForm();
        $("#mobile_no").val("");
        $("#mobile_no").focus();
        $("#_loginPwd").val("");
        if ("Y" == isMobileCheck) {
            $._initMobileHy()
        }
    }
    );
    var a;
    jQuery.extend({
        _initMobileHy: function() {
            if (mobile && mobile != "") {
                a = $(document).mobile({
                    mobileNum: mobile,
                    userreceive: userreceive,
                    getUrl: "userSecurity/getMobileCode",
                    hyUrl: "userSecurity/checkMobileCode",
                    getDatas: [{
                        name: "mobile",
                        id: "old_mobile_no"
                    }],
                    checkDatas: [{
                        name: "mobile",
                        id: "old_mobile_no"
                    }],
                    okCallBack: function() {
                        $("#hy_a").hide();
                        $("#has_hy_a").show();
                        dhtmlx.alert({
                            title: "手机核验",
                            ok: "确定",
                            text: "核验成功!",
                            type: "dhtmlx_popup_title",
                            callback: function() {
                                window.location.href = ctx + "modifyUser/initQueryUserInfo"
                            }
                        })
                    },
                    editFun: function() {
                        $("#mobile_no").focus()
                    }
                });
                $("#has_hy_a").hide()
            } else {
                $("#hy_a").hide();
                $("#has_hy_a").show()
            }
            $("#hy_a").on("click", function() {
                a.show()
            }
            )
        },
        _cancelSubmit: function() {
            otsRedirect("post", ctx + "userSecurity/init")
        },
        _editSubmit: function() {
            $("#_editMobileForm").submit()
        },
        _show_mobile_no: function() {
            $("#mobile_no").on("focus", function() {
                var d = $("#mobile_no").val();
                if (d != "") {
                    var c = "";
                    var b = d.length;
                    if (d.length <= 3) {
                        c = d
                    } else {
                        if (b <= 7) {
                            c = d.substring(0, 3) + " " + d.substring(3, b)
                        } else {
                            c = d.substring(0, 3) + " " + d.substring(3, 7) + "  " + d.substring(7, b)
                        }
                    }
                    $("#mobile_no_div").html(c);
                    $("#mobile_no_div").css("display", "block")
                } else {
                    $("#mobile_no_div").html("");
                    $("#mobile_no_div").css("display", "none")
                }
            }
            ).on("keyup", function() {
                $("#mobile_no_div").css("display", "block");
                var d = $("#mobile_no").val();
                var c = "";
                var b = d.length;
                if (d.length <= 3) {
                    c = d
                } else {
                    if (b <= 7) {
                        c = d.substring(0, 3) + " " + d.substring(3, b)
                    } else {
                        c = d.substring(0, 3) + " " + d.substring(3, 7) + "  " + d.substring(7, b)
                    }
                }
                $("#mobile_no_div").html(c)
            }
            ).on("blur", function() {
                $("#mobile_no_div").html("");
                $("#mobile_no_div").css("display", "none")
            }
            )
        },
        _initForm: function() {
            $("#_editMobileForm").validate({
                wrapper: "li",
                rules: {
                    mobile_no: {
                        required: true,
                        isMobile: true
                    },
                    _loginPwd: {
                        required: true
                    }
                },
                messages: {
                    mobile_no: {
                        required: "请输入新的手机号！",
                        isMobile: "请输入有效的手机号！"
                    },
                    _loginPwd: {
                        required: "请输入登录密码！"
                    }
                },
                errorPlacement: function(b, c) {
                    b.insertAfter(c.parent().parent())
                },
                submitHandler: function(b) {
                    $.ajax({
                        url: ctx + "userSecurity/doEditTel",
                        type: "post",
                        data: $("#_editMobileForm").serialize(),
                        success: function(c) {
                            if (c.status) {
                                if (c.data.flag) {
                                    mobile = $("#mobile_no").val();
                                    if ("Y" == isMobileCheck) {
                                        a = $(document).mobile({
                                            mobileNum: mobile,
                                            userreceive: userreceive,
                                            getUrl: "userSecurity/getMobileCode",
                                            hyUrl: "userSecurity/checkMobileCode",
                                            getDatas: [{
                                                name: "mobile",
                                                id: "mobile_no"
                                            }],
                                            checkDatas: [{
                                                name: "mobile",
                                                id: "mobile_no"
                                            }],
                                            okCallBack: function() {
                                                $("#hy_a").hide();
                                                $("#has_hy_a").show();
                                                $("#old_mobile_no").text(mobile);
                                                $("#mobile_no").val("");
                                                $("#_loginPwd").val("");
                                                var e = "修改手机号为" + mobile + "成功";
                                                dhtmlx.alert({
                                                    title: "修改绑定手机",
                                                    ok: "确定",
                                                    text: e,
                                                    type: "alert-info",
                                                    callback: function() {
                                                        window.location.href = ctx + "modifyUser/initQueryUserInfo"
                                                    }
                                                })
                                            }
                                        });
                                        a.show()
                                    } else {
                                        var d = "修改手机号为" + mobile + "成功";
                                        dhtmlx.alert({
                                            title: "修改绑定手机",
                                            ok: "确定",
                                            text: d,
                                            type: "alert-info",
                                            callback: function() {
                                                window.location.href = ctx + "modifyUser/initQueryUserInfo"
                                            }
                                        })
                                    }
                                } else {
                                    dhtmlx.alert({
                                        title: "修改手机",
                                        ok: "确定",
                                        text: c.data.message,
                                        type: "alert-error",
                                        callback: function() {
                                            if (c.data.errorCode) {
                                                var e = c.data.errorCode;
                                                if ("1" == e) {
                                                    $("#mobile_no").focus()
                                                } else {
                                                    if ("2" == e) {
                                                        $("#_loginPwd").focus()
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    })
                }
            })
        }
    })
}
)();
