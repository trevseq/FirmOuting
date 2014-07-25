/*

 FullCalendar v1.5.1
 http://arshaw.com/fullcalendar/

 Use fullcalendar.css for basic styling.
 For event drag & drop, requires jQuery UI draggable.
 For event resizing, requires jQuery UI resizable.

 Copyright (c) 2011 Adam Shaw
 Dual licensed under the MIT and GPL licenses, located in
 MIT-LICENSE.txt and GPL-LICENSE.txt respectively.

 Date: Sat Apr 9 14:09:51 2011 -0700

*/
(function (m, oa) {
    function wb(a) {
        m.extend(true, Ya, a)
    }

    function Yb(a, b, e) {
        function d(k) {
            if (E) {
                u();
                q();
                ma();
                S(k)
            } else f()
        }

        function f() {
            B = b.theme ? "ui" : "fc";
            a.addClass("fc");
            b.isRTL && a.addClass("fc-rtl");
            b.theme && a.addClass("ui-widget");
            E = m("<div class='fc-content' style='position:relative'/>").prependTo(a);
            C = new Zb(X, b);
            (P = C.render()) && a.prepend(P);
            y(b.defaultView);
            m(window).resize(na);
            t() || g()
        }

        function g() {
            setTimeout(function () {
                !n.start && t() && S()
            }, 0)
        }

        function l() {
            m(window).unbind("resize", na);
            C.destroy();
            E.remove();
            a.removeClass("fc fc-rtl ui-widget")
        }

        function j() {
            return i.offsetWidth !== 0
        }

        function t() {
            return m("body")[0].offsetWidth !== 0
        }

        function y(k) {
            if (!n || k != n.name) {
                F++;
                pa();
                var D = n,
                    Z;
                if (D) {
                    (D.beforeHide || xb)();
                    Za(E, E.height());
                    D.element.hide()
                } else Za(E, 1);
                E.css("overflow", "hidden");
                if (n = Y[k]) n.element.show();
                else n = Y[k] = new Ja[k](Z = s = m("<div class='fc-view fc-view-" + k + "' style='position:absolute'/>").appendTo(E), X);
                D && C.deactivateButton(D.name);
                C.activateButton(k);
                S();
                E.css("overflow", "");
                D &&
                    Za(E, 1);
                Z || (n.afterShow || xb)();
                F--
            }
        }

        function S(k) {
            if (j()) {
                F++;
                pa();
                o === oa && u();
                var D = false;
                if (!n.start || k || r < n.start || r >= n.end) {
                    n.render(r, k || 0);
                    fa(true);
                    D = true
                } else if (n.sizeDirty) {
                    n.clearEvents();
                    fa();
                    D = true
                } else if (n.eventsDirty) {
                    n.clearEvents();
                    D = true
                }
                n.sizeDirty = false;
                n.eventsDirty = false;
                ga(D);
                W = a.outerWidth();
                C.updateTitle(n.title);
                k = new Date;
                k >= n.start && k < n.end ? C.disableButton("today") : C.enableButton("today");
                F--;
                n.trigger("viewDisplay", i)
            }
        }

        function Q() {
            q();
            if (j()) {
                u();
                fa();
                pa();
                n.clearEvents();
                n.renderEvents(J);
                n.sizeDirty = false
            }
        }

        function q() {
            m.each(Y, function (k, D) {
                D.sizeDirty = true
            })
        }

        function u() {
            o = b.contentHeight ? b.contentHeight : b.height ? b.height - (P ? P.height() : 0) - Sa(E) : Math.round(E.width() / Math.max(b.aspectRatio, 0.5))
        }

        function fa(k) {
            F++;
            n.setHeight(o, k);
            if (s) {
                s.css("position", "relative");
                s = null
            }
            n.setWidth(E.width(), k);
            F--
        }

        function na() {
            if (!F)
                if (n.start) {
                    var k = ++v;
                    setTimeout(function () {
                        if (k == v && !F && j())
                            if (W != (W = a.outerWidth())) {
                                F++;
                                Q();
                                n.trigger("windowResize", i);
                                F--
                            }
                    }, 200)
                } else g()
        }

        function ga(k) {
            if (!b.lazyFetching ||
                ya(n.visStart, n.visEnd)) ra();
            else k && da()
        }

        function ra() {
            K(n.visStart, n.visEnd)
        }

        function sa(k) {
            J = k;
            da()
        }

        function ha(k) {
            da(k)
        }

        function da(k) {
            ma();
            if (j()) {
                n.clearEvents();
                n.renderEvents(J, k);
                n.eventsDirty = false
            }
        }

        function ma() {
            m.each(Y, function (k, D) {
                D.eventsDirty = true
            })
        }

        function ua(k, D, Z) {
            n.select(k, D, Z === oa ? true : Z)
        }

        function pa() {
            n && n.unselect()
        }

        function U() {
            S(-1)
        }

        function ca() {
            S(1)
        }

        function ka() {
            gb(r, -1);
            S()
        }

        function qa() {
            gb(r, 1);
            S()
        }

        function G() {
            r = new Date;
            S()
        }

        function p(k, D, Z) {
            if (k instanceof Date) r =
                N(k);
            else yb(r, k, D, Z);
            S()
        }

        function L(k, D, Z) {
            k !== oa && gb(r, k);
            D !== oa && hb(r, D);
            Z !== oa && ba(r, Z);
            S()
        }

        function c() {
            return N(r)
        }

        function z() {
            return n
        }

        function H(k, D) {
            if (D === oa) return b[k];
            if (k == "height" || k == "contentHeight" || k == "aspectRatio") {
                b[k] = D;
                Q()
            }
        }

        function T(k, D) {
            if (b[k]) return b[k].apply(D || i, Array.prototype.slice.call(arguments, 2))
        }
        var X = this;
        X.options = b;
        X.render = d;
        X.destroy = l;
        X.refetchEvents = ra;
        X.reportEvents = sa;
        X.reportEventChange = ha;
        X.rerenderEvents = da;
        X.changeView = y;
        X.select = ua;
        X.unselect = pa;
        X.prev = U;
        X.next = ca;
        X.prevYear = ka;
        X.nextYear = qa;
        X.today = G;
        X.gotoDate = p;
        X.incrementDate = L;
        X.formatDate = function (k, D) {
            return Oa(k, D, b)
        };
        X.formatDates = function (k, D, Z) {
            return ib(k, D, Z, b)
        };
        X.getDate = c;
        X.getView = z;
        X.option = H;
        X.trigger = T;
        $b.call(X, b, e);
        var ya = X.isFetchNeeded,
            K = X.fetchEvents,
            i = a[0],
            C, P, E, B, n, Y = {}, W, o, s, v = 0,
            F = 0,
            r = new Date,
            J = [],
            M;
        yb(r, b.year, b.month, b.date);
        b.droppable && m(document).bind("dragstart", function (k, D) {
            var Z = k.target,
                ja = m(Z);
            if (!ja.parents(".fc").length) {
                var ia = b.dropAccept;
                if (m.isFunction(ia) ?
                    ia.call(Z, ja) : ja.is(ia)) {
                    M = Z;
                    n.dragStart(M, k, D)
                }
            }
        }).bind("dragstop", function (k, D) {
            if (M) {
                n.dragStop(M, k, D);
                M = null
            }
        })
    }

    function Zb(a, b) {
        function e() {
            q = b.theme ? "ui" : "fc";
            if (b.header) return Q = m("<table class='fc-header' style='width:100%'/>").append(m("<tr/>").append(f("left")).append(f("center")).append(f("right")))
        }

        function d() {
            Q.remove()
        }

        function f(u) {
            var fa = m("<td class='fc-header-" + u + "'/>");
            (u = b.header[u]) && m.each(u.split(" "), function (na) {
                na > 0 && fa.append("<span class='fc-header-space'/>");
                var ga;
                m.each(this.split(","), function (ra, sa) {
                    if (sa == "title") {
                        fa.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>");
                        ga && ga.addClass(q + "-corner-right");
                        ga = null
                    } else {
                        var ha;
                        if (a[sa]) ha = a[sa];
                        else if (Ja[sa]) ha = function () {
                            ma.removeClass(q + "-state-hover");
                            a.changeView(sa)
                        };
                        if (ha) {
                            ra = b.theme ? jb(b.buttonIcons, sa) : null;
                            var da = jb(b.buttonText, sa),
                                ma = m("<span class='fc-button fc-button-" + sa + " " + q + "-state-default'><span class='fc-button-inner'><span class='fc-button-content'>" + (ra ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" +
                                    ra + "'/></span>" : da) + "</span><span class='fc-button-effect'><span></span></span></span></span>");
                            if (ma) {
                                ma.click(function () {
                                    ma.hasClass(q + "-state-disabled") || ha()
                                }).mousedown(function () {
                                    ma.not("." + q + "-state-active").not("." + q + "-state-disabled").addClass(q + "-state-down")
                                }).mouseup(function () {
                                    ma.removeClass(q + "-state-down")
                                }).hover(function () {
                                    ma.not("." + q + "-state-active").not("." + q + "-state-disabled").addClass(q + "-state-hover")
                                }, function () {
                                    ma.removeClass(q + "-state-hover").removeClass(q + "-state-down")
                                }).appendTo(fa);
                                ga || ma.addClass(q + "-corner-left");
                                ga = ma
                            }
                        }
                    }
                });
                ga && ga.addClass(q + "-corner-right")
            });
            return fa
        }

        function g(u) {
            Q.find("h2").html(u)
        }

        function l(u) {
            Q.find("span.fc-button-" + u).addClass(q + "-state-active")
        }

        function j(u) {
            Q.find("span.fc-button-" + u).removeClass(q + "-state-active")
        }

        function t(u) {
            Q.find("span.fc-button-" + u).addClass(q + "-state-disabled")
        }

        function y(u) {
            Q.find("span.fc-button-" + u).removeClass(q + "-state-disabled")
        }
        var S = this;
        S.render = e;
        S.destroy = d;
        S.updateTitle = g;
        S.activateButton = l;
        S.deactivateButton =
            j;
        S.disableButton = t;
        S.enableButton = y;
        var Q = m([]),
            q
    }

    function $b(a, b) {
        function e(c, z) {
            return !ca || c < ca || z > ka
        }

        function d(c, z) {
            ca = c;
            ka = z;
            L = [];
            c = ++qa;
            G = z = U.length;
            for (var H = 0; H < z; H++) f(U[H], c)
        }

        function f(c, z) {
            g(c, function (H) {
                if (z == qa) {
                    if (H) {
                        for (var T = 0; T < H.length; T++) {
                            H[T].source = c;
                            na(H[T])
                        }
                        L = L.concat(H)
                    }
                    G--;
                    G || ua(L)
                }
            })
        }

        function g(c, z) {
            var H, T = Aa.sourceFetchers,
                X;
            for (H = 0; H < T.length; H++) {
                X = T[H](c, ca, ka, z);
                if (X === true) return;
                else if (typeof X == "object") {
                    g(X, z);
                    return
                }
            }
            if (H = c.events)
                if (m.isFunction(H)) {
                    u();
                    H(N(ca), N(ka), function (C) {
                        z(C);
                        fa()
                    })
                } else m.isArray(H) ? z(H) : z();
                else if (c.url) {
                var ya = c.success,
                    K = c.error,
                    i = c.complete;
                H = m.extend({}, c.data || {});
                T = Ta(c.startParam, a.startParam);
                X = Ta(c.endParam, a.endParam);
                if (T) H[T] = Math.round(+ca / 1E3);
                if (X) H[X] = Math.round(+ka / 1E3);
                u();
                m.ajax(m.extend({}, ac, c, {
                    data: H,
                    success: function (C) {
                        C = C || [];
                        var P = $a(ya, this, arguments);
                        if (m.isArray(P)) C = P;
                        z(C)
                    },
                    error: function () {
                        $a(K, this, arguments);
                        z()
                    },
                    complete: function () {
                        $a(i, this, arguments);
                        fa()
                    }
                }))
            } else z()
        }

        function l(c) {
            if (c =
                j(c)) {
                G++;
                f(c, qa)
            }
        }

        function j(c) {
            if (m.isFunction(c) || m.isArray(c)) c = {
                events: c
            };
            else if (typeof c == "string") c = {
                url: c
            };
            if (typeof c == "object") {
                ga(c);
                U.push(c);
                return c
            }
        }

        function t(c) {
            U = m.grep(U, function (z) {
                return !ra(z, c)
            });
            L = m.grep(L, function (z) {
                return !ra(z.source, c)
            });
            ua(L)
        }

        function y(c) {
            var z, H = L.length,
                T, X = ma().defaultEventEnd,
                ya = c.start - c._start,
                K = c.end ? c.end - (c._end || X(c)) : 0;
            for (z = 0; z < H; z++) {
                T = L[z];
                if (T._id == c._id && T != c) {
                    T.start = new Date(+T.start + ya);
                    T.end = c.end ? T.end ? new Date(+T.end + K) : new Date(+X(T) +
                        K) : null;
                    T.title = c.title;
                    T.url = c.url;
                    T.allDay = c.allDay;
                    T.className = c.className;
                    T.editable = c.editable;
                    T.color = c.color;
                    T.backgroudColor = c.backgroudColor;
                    T.borderColor = c.borderColor;
                    T.textColor = c.textColor;
                    na(T)
                }
            }
            na(c);
            ua(L)
        }

        function S(c, z) {
            na(c);
            if (!c.source) {
                if (z) {
                    pa.events.push(c);
                    c.source = pa
                }
                L.push(c)
            }
            ua(L)
        }

        function Q(c) {
            if (c) {
                if (!m.isFunction(c)) {
                    var z = c + "";
                    c = function (T) {
                        return T._id == z
                    }
                }
                L = m.grep(L, c, true);
                for (H = 0; H < U.length; H++)
                    if (m.isArray(U[H].events)) U[H].events = m.grep(U[H].events, c, true)
            } else {
                L = [];
                for (var H = 0; H < U.length; H++)
                    if (m.isArray(U[H].events)) U[H].events = []
            }
            ua(L)
        }

        function q(c) {
            if (m.isFunction(c)) return m.grep(L, c);
            else if (c) {
                c += "";
                return m.grep(L, function (z) {
                    return z._id == c
                })
            }
            return L
        }

        function u() {
            p++ || da("loading", null, true)
        }

        function fa() {
            --p || da("loading", null, false)
        }

        function na(c) {
            var z = c.source || {}, H = Ta(z.ignoreTimezone, a.ignoreTimezone);
            c._id = c._id || (c.id === oa ? "_fc" + bc++ : c.id + "");
            if (c.date) {
                if (!c.start) c.start = c.date;
                delete c.date
            }
            c._start = N(c.start = kb(c.start, H));
            c.end = kb(c.end,
                H);
            if (c.end && c.end <= c.start) c.end = null;
            c._end = c.end ? N(c.end) : null;
            if (c.allDay === oa) c.allDay = Ta(z.allDayDefault, a.allDayDefault);
            if (c.className) {
                if (typeof c.className == "string") c.className = c.className.split(/\s+/)
            } else c.className = []
        }

        function ga(c) {
            if (c.className) {
                if (typeof c.className == "string") c.className = c.className.split(/\s+/)
            } else c.className = [];
            for (var z = Aa.sourceNormalizers, H = 0; H < z.length; H++) z[H](c)
        }

        function ra(c, z) {
            return c && z && sa(c) == sa(z)
        }

        function sa(c) {
            return (typeof c == "object" ? c.events ||
                c.url : "") || c
        }
        var ha = this;
        ha.isFetchNeeded = e;
        ha.fetchEvents = d;
        ha.addEventSource = l;
        ha.removeEventSource = t;
        ha.updateEvent = y;
        ha.renderEvent = S;
        ha.removeEvents = Q;
        ha.clientEvents = q;
        ha.normalizeEvent = na;
        var da = ha.trigger,
            ma = ha.getView,
            ua = ha.reportEvents,
            pa = {
                events: []
            }, U = [pa],
            ca, ka, qa = 0,
            G = 0,
            p = 0,
            L = [];
        for (ha = 0; ha < b.length; ha++) j(b[ha])
    }

    function gb(a, b, e) {
        a.setFullYear(a.getFullYear() + b);
        e || Ka(a);
        return a
    }

    function hb(a, b, e) {
        if (+a) {
            b = a.getMonth() + b;
            var d = N(a);
            d.setDate(1);
            d.setMonth(b);
            a.setMonth(b);
            for (e || Ka(a); a.getMonth() !=
                d.getMonth();) a.setDate(a.getDate() + (a < d ? 1 : -1))
        }
        return a
    }

    function ba(a, b, e) {
        if (+a) {
            b = a.getDate() + b;
            var d = N(a);
            d.setHours(9);
            d.setDate(b);
            a.setDate(b);
            e || Ka(a);
            lb(a, d)
        }
        return a
    }

    function lb(a, b) {
        if (+a)
            for (; a.getDate() != b.getDate();) a.setTime(+a + (a < b ? 1 : -1) * cc)
    }

    function xa(a, b) {
        a.setMinutes(a.getMinutes() + b);
        return a
    }

    function Ka(a) {
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        return a
    }

    function N(a, b) {
        if (b) return Ka(new Date(+a));
        return new Date(+a)
    }

    function zb() {
        var a = 0,
            b;
        do b = new Date(1970,
            a++, 1); while (b.getHours());
        return b
    }

    function Fa(a, b, e) {
        for (b = b || 1; !a.getDay() || e && a.getDay() == 1 || !e && a.getDay() == 6;) ba(a, b);
        return a
    }

    function Ca(a, b) {
        return Math.round((N(a, true) - N(b, true)) / Ab)
    }

    function yb(a, b, e, d) {
        if (b !== oa && b != a.getFullYear()) {
            a.setDate(1);
            a.setMonth(0);
            a.setFullYear(b)
        }
        if (e !== oa && e != a.getMonth()) {
            a.setDate(1);
            a.setMonth(e)
        }
        d !== oa && a.setDate(d)
    }

    function kb(a, b) {
        if (typeof a == "object") return a;
        if (typeof a == "number") return new Date(a * 1E3);
        if (typeof a == "string") {
            if (a.match(/^\d+(\.\d+)?$/)) return new Date(parseFloat(a) *
                1E3);
            if (b === oa) b = true;
            return Bb(a, b) || (a ? new Date(a) : null)
        }
        return null
    }

    function Bb(a, b) {
        a = a.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
        if (!a) return null;
        var e = new Date(a[1], 0, 1);
        if (b || !a[14]) {
            b = new Date(a[1], 0, 1, 9, 0);
            if (a[3]) {
                e.setMonth(a[3] - 1);
                b.setMonth(a[3] - 1)
            }
            if (a[5]) {
                e.setDate(a[5]);
                b.setDate(a[5])
            }
            lb(e, b);
            a[7] && e.setHours(a[7]);
            a[8] && e.setMinutes(a[8]);
            a[10] && e.setSeconds(a[10]);
            a[12] && e.setMilliseconds(Number("0." +
                a[12]) * 1E3);
            lb(e, b)
        } else {
            e.setUTCFullYear(a[1], a[3] ? a[3] - 1 : 0, a[5] || 1);
            e.setUTCHours(a[7] || 0, a[8] || 0, a[10] || 0, a[12] ? Number("0." + a[12]) * 1E3 : 0);
            b = Number(a[16]) * 60 + (a[18] ? Number(a[18]) : 0);
            b *= a[15] == "-" ? 1 : -1;
            e = new Date(+e + b * 60 * 1E3)
        }
        return e
    }

    function mb(a) {
        if (typeof a == "number") return a * 60;
        if (typeof a == "object") return a.getHours() * 60 + a.getMinutes();
        if (a = a.match(/(\d+)(?::(\d+))?\s*(\w+)?/)) {
            var b = parseInt(a[1], 10);
            if (a[3]) {
                b %= 12;
                if (a[3].toLowerCase().charAt(0) == "p") b += 12
            }
            return b * 60 + (a[2] ? parseInt(a[2],
                10) : 0)
        }
    }

    function Oa(a, b, e) {
        return ib(a, null, b, e)
    }

    function ib(a, b, e, d) {
        d = d || Ya;
        var f = a,
            g = b,
            l, j = e.length,
            t, y, S, Q = "";
        for (l = 0; l < j; l++) {
            t = e.charAt(l);
            if (t == "'")
                for (y = l + 1; y < j; y++) {
                    if (e.charAt(y) == "'") {
                        if (f) {
                            Q += y == l + 1 ? "'" : e.substring(l + 1, y);
                            l = y
                        }
                        break
                    }
                } else if (t == "(")
                    for (y = l + 1; y < j; y++) {
                        if (e.charAt(y) == ")") {
                            l = Oa(f, e.substring(l + 1, y), d);
                            if (parseInt(l.replace(/\D/, ""), 10)) Q += l;
                            l = y;
                            break
                        }
                    } else if (t == "[")
                        for (y = l + 1; y < j; y++) {
                            if (e.charAt(y) == "]") {
                                t = e.substring(l + 1, y);
                                l = Oa(f, t, d);
                                if (l != Oa(g, t, d)) Q += l;
                                l = y;
                                break
                            }
                        } else if (t ==
                            "{") {
                            f = b;
                            g = a
                        } else if (t == "}") {
                f = a;
                g = b
            } else {
                for (y = j; y > l; y--)
                    if (S = dc[e.substring(l, y)]) {
                        if (f) Q += S(f, d);
                        l = y - 1;
                        break
                    }
                if (y == l)
                    if (f) Q += t
            }
        }
        return Q
    }

    function Ua(a) {
        return a.end ? ec(a.end, a.allDay) : ba(N(a.start), 1)
    }

    function ec(a, b) {
        a = N(a);
        return b || a.getHours() || a.getMinutes() ? ba(a, 1) : Ka(a)
    }

    function fc(a, b) {
        return (b.msLength - a.msLength) * 100 + (a.event.start - b.event.start)
    }

    function Cb(a, b) {
        return a.end > b.start && a.start < b.end
    }

    function nb(a, b, e, d) {
        var f = [],
            g, l = a.length,
            j, t, y, S, Q;
        for (g = 0; g < l; g++) {
            j = a[g];
            t = j.start;
            y = b[g];
            if (y > e && t < d) {
                if (t < e) {
                    t = N(e);
                    S = false
                } else {
                    t = t;
                    S = true
                } if (y > d) {
                    y = N(d);
                    Q = false
                } else {
                    y = y;
                    Q = true
                }
                f.push({
                    event: j,
                    start: t,
                    end: y,
                    isStart: S,
                    isEnd: Q,
                    msLength: y - t
                })
            }
        }
        return f.sort(fc)
    }

    function ob(a) {
        var b = [],
            e, d = a.length,
            f, g, l, j;
        for (e = 0; e < d; e++) {
            f = a[e];
            for (g = 0;;) {
                l = false;
                if (b[g])
                    for (j = 0; j < b[g].length; j++)
                        if (Cb(b[g][j], f)) {
                            l = true;
                            break
                        }
                if (l) g++;
                else break
            }
            if (b[g]) b[g].push(f);
            else b[g] = [f]
        }
        return b
    }

    function Db(a, b, e) {
        a.unbind("mouseover").mouseover(function (d) {
            for (var f = d.target, g; f != this;) {
                g = f;
                f = f.parentNode
            }
            if ((f =
                g._fci) !== oa) {
                g._fci = oa;
                g = b[f];
                e(g.event, g.element, g);
                m(d.target).trigger(d)
            }
            d.stopPropagation()
        })
    }

    function Va(a, b, e) {
        for (var d = 0, f; d < a.length; d++) {
            f = m(a[d]);
            f.width(Math.max(0, b - pb(f, e)))
        }
    }

    function Eb(a, b, e) {
        for (var d = 0, f; d < a.length; d++) {
            f = m(a[d]);
            f.height(Math.max(0, b - Sa(f, e)))
        }
    }

    function pb(a, b) {
        return gc(a) + hc(a) + (b ? ic(a) : 0)
    }

    function gc(a) {
        return (parseFloat(m.curCSS(a[0], "paddingLeft", true)) || 0) + (parseFloat(m.curCSS(a[0], "paddingRight", true)) || 0)
    }

    function ic(a) {
        return (parseFloat(m.curCSS(a[0],
            "marginLeft", true)) || 0) + (parseFloat(m.curCSS(a[0], "marginRight", true)) || 0)
    }

    function hc(a) {
        return (parseFloat(m.curCSS(a[0], "borderLeftWidth", true)) || 0) + (parseFloat(m.curCSS(a[0], "borderRightWidth", true)) || 0)
    }

    function Sa(a, b) {
        return jc(a) + kc(a) + (b ? Fb(a) : 0)
    }

    function jc(a) {
        return (parseFloat(m.curCSS(a[0], "paddingTop", true)) || 0) + (parseFloat(m.curCSS(a[0], "paddingBottom", true)) || 0)
    }

    function Fb(a) {
        return (parseFloat(m.curCSS(a[0], "marginTop", true)) || 0) + (parseFloat(m.curCSS(a[0], "marginBottom", true)) || 0)
    }

    function kc(a) {
        return (parseFloat(m.curCSS(a[0], "borderTopWidth", true)) || 0) + (parseFloat(m.curCSS(a[0], "borderBottomWidth", true)) || 0)
    }

    function Za(a, b) {
        b = typeof b == "number" ? b + "px" : b;
        a.each(function (e, d) {
            d.style.cssText += ";min-height:" + b + ";_height:" + b
        })
    }

    function xb() {}

    function Gb(a, b) {
        return a - b
    }

    function Hb(a) {
        return Math.max.apply(Math, a)
    }

    function Pa(a) {
        return (a < 10 ? "0" : "") + a
    }

    function jb(a, b) {
        if (a[b] !== oa) return a[b];
        b = b.split(/(?=[A-Z])/);
        for (var e = b.length - 1, d; e >= 0; e--) {
            d = a[b[e].toLowerCase()];
            if (d !==
                oa) return d
        }
        return a[""]
    }

    function Qa(a) {
        return a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function Ib(a) {
        return a.id + "/" + a.className + "/" + a.style.cssText.replace(/(^|;)\s*(top|left|width|height)\s*:[^;]*/ig, "")
    }

    function qb(a) {
        a.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
            return false
        })
    }

    function ab(a) {
        a.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
    }

    function rb(a, b) {
        a.each(function (e, d) {
            d.className = d.className.replace(/^fc-\w*/, "fc-" + lc[b.getDay()])
        })
    }

    function Jb(a, b) {
        var e = a.source || {}, d = a.color,
            f = e.color,
            g = b("eventColor"),
            l = a.backgroundColor || d || e.backgroundColor || f || b("eventBackgroundColor") || g;
        d = a.borderColor || d || e.borderColor || f || b("eventBorderColor") || g;
        a = a.textColor || e.textColor || b("eventTextColor");
        b = [];
        l && b.push("background-color:" + l);
        d && b.push("border-color:" + d);
        a && b.push("color:" + a);
        return b.join(";")
    }

    function $a(a, b, e) {
        if (m.isFunction(a)) a = [a];
        if (a) {
            var d, f;
            for (d = 0; d < a.length; d++) f = a[d].apply(b, e) || f;
            return f
        }
    }

    function Ta() {
        for (var a = 0; a < arguments.length; a++)
            if (arguments[a] !== oa) return arguments[a]
    }

    function mc(a, b) {
        function e(j, t) {
            if (t) {
                hb(j, t);
                j.setDate(1)
            }
            j = N(j, true);
            j.setDate(1);
            t = hb(N(j), 1);
            var y = N(j),
                S = N(t),
                Q = f("firstDay"),
                q = f("weekends") ? 0 : 1;
            if (q) {
                Fa(y);
                Fa(S, -1, true)
            }
            ba(y, -((y.getDay() - Math.max(Q, q) + 7) % 7));
            ba(S, (7 - S.getDay() + Math.max(Q, q)) % 7);
            Q = Math.round((S - y) / (Ab * 7));
            if (f("weekMode") == "fixed") {
                ba(S, (6 - Q) * 7);
                Q = 6
            }
            d.title = l(j,
                f("titleFormat"));
            d.start = j;
            d.end = t;
            d.visStart = y;
            d.visEnd = S;
            g(6, Q, q ? 5 : 7, true)
        }
        var d = this;
        d.render = e;
        sb.call(d, a, b, "month");
        var f = d.opt,
            g = d.renderBasic,
            l = b.formatDate
    }

    function nc(a, b) {
        function e(j, t) {
            t && ba(j, t * 7);
            j = ba(N(j), -((j.getDay() - f("firstDay") + 7) % 7));
            t = ba(N(j), 7);
            var y = N(j),
                S = N(t),
                Q = f("weekends");
            if (!Q) {
                Fa(y);
                Fa(S, -1, true)
            }
            d.title = l(y, ba(N(S), -1), f("titleFormat"));
            d.start = j;
            d.end = t;
            d.visStart = y;
            d.visEnd = S;
            g(1, 1, Q ? 7 : 5, false)
        }
        var d = this;
        d.render = e;
        sb.call(d, a, b, "basicWeek");
        var f = d.opt,
            g = d.renderBasic,
            l = b.formatDates
    }

    function oc(a, b) {
        function e(j, t) {
            if (t) {
                ba(j, t);
                f("weekends") || Fa(j, t < 0 ? -1 : 1)
            }
            d.title = l(j, f("titleFormat"));
            d.start = d.visStart = N(j, true);
            d.end = d.visEnd = ba(N(d.start), 1);
            g(1, 1, 1, false)
        }
        var d = this;
        d.render = e;
        sb.call(d, a, b, "basicDay");
        var f = d.opt,
            g = d.renderBasic,
            l = b.formatDate
    }

    function sb(a, b, e) {
        function d(w, I, R, V) {
            v = I;
            F = R;
            f();
            (I = !C) ? g(w, V) : z();
            l(I)
        }

        function f() {
            if (k = L("isRTL")) {
                D = -1;
                Z = F - 1
            } else {
                D = 1;
                Z = 0
            }
            ja = L("firstDay");
            ia = L("weekends") ? 0 : 1;
            la = L("theme") ? "ui" : "fc";
            $ = L("columnFormat")
        }

        function g(w,
            I) {
            var R, V = la + "-widget-header",
                ea = la + "-widget-content",
                aa;
            R = "<table class='fc-border-separate' style='width:100%' cellspacing='0'><thead><tr>";
            for (aa = 0; aa < F; aa++) R += "<th class='fc- " + V + "'/>";
            R += "</tr></thead><tbody>";
            for (aa = 0; aa < w; aa++) {
                R += "<tr class='fc-week" + aa + "'>";
                for (V = 0; V < F; V++) R += "<td class='fc- " + ea + " fc-day" + (aa * F + V) + "'><div>" + (I ? "<div class='fc-day-number'/>" : "") + "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>";
                R += "</tr>"
            }
            R += "</tbody></table>";
            w =
                m(R).appendTo(a);
            K = w.find("thead");
            i = K.find("th");
            C = w.find("tbody");
            P = C.find("tr");
            E = C.find("td");
            B = E.filter(":first-child");
            n = P.eq(0).find("div.fc-day-content div");
            ab(K.add(K.find("tr")));
            ab(P);
            P.eq(0).addClass("fc-first");
            y(E);
            Y = m("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(a)
        }

        function l(w) {
            var I = w || v == 1,
                R = p.start.getMonth(),
                V = Ka(new Date),
                ea, aa, va;
            I && i.each(function (wa, Ga) {
                ea = m(Ga);
                aa = ca(wa);
                ea.html(ya(aa, $));
                rb(ea, aa)
            });
            E.each(function (wa, Ga) {
                ea = m(Ga);
                aa = ca(wa);
                aa.getMonth() ==
                    R ? ea.removeClass("fc-other-month") : ea.addClass("fc-other-month"); + aa == +V ? ea.addClass(la + "-state-highlight fc-today") : ea.removeClass(la + "-state-highlight fc-today");
                ea.find("div.fc-day-number").text(aa.getDate());
                I && rb(ea, aa)
            });
            P.each(function (wa, Ga) {
                va = m(Ga);
                if (wa < v) {
                    va.show();
                    wa == v - 1 ? va.addClass("fc-last") : va.removeClass("fc-last")
                } else va.hide()
            })
        }

        function j(w) {
            o = w;
            w = o - K.height();
            var I, R, V;
            if (L("weekMode") == "variable") I = R = Math.floor(w / (v == 1 ? 2 : 6));
            else {
                I = Math.floor(w / v);
                R = w - I * (v - 1)
            }
            B.each(function (ea,
                aa) {
                if (ea < v) {
                    V = m(aa);
                    Za(V.find("> div"), (ea == v - 1 ? R : I) - Sa(V))
                }
            })
        }

        function t(w) {
            W = w;
            M.clear();
            s = Math.floor(W / F);
            Va(i.slice(0, -1), s)
        }

        function y(w) {
            w.click(S).mousedown(X)
        }

        function S(w) {
            if (!L("selectable")) {
                var I = parseInt(this.className.match(/fc\-day(\d+)/)[1]);
                I = ca(I);
                c("dayClick", this, I, true, w)
            }
        }

        function Q(w, I, R) {
            R && r.build();
            R = N(p.visStart);
            for (var V = ba(N(R), F), ea = 0; ea < v; ea++) {
                var aa = new Date(Math.max(R, w)),
                    va = new Date(Math.min(V, I));
                if (aa < va) {
                    var wa;
                    if (k) {
                        wa = Ca(va, R) * D + Z + 1;
                        aa = Ca(aa, R) * D + Z + 1
                    } else {
                        wa =
                            Ca(aa, R);
                        aa = Ca(va, R)
                    }
                    y(q(ea, wa, ea, aa - 1))
                }
                ba(R, 7);
                ba(V, 7)
            }
        }

        function q(w, I, R, V) {
            w = r.rect(w, I, R, V, a);
            return H(w, a)
        }

        function u(w) {
            return N(w)
        }

        function fa(w, I) {
            Q(w, ba(N(I), 1), true)
        }

        function na() {
            T()
        }

        function ga(w, I, R) {
            var V = ua(w);
            c("dayClick", E[V.row * F + V.col], w, I, R)
        }

        function ra(w, I) {
            J.start(function (R) {
                T();
                R && q(R.row, R.col, R.row, R.col)
            }, I)
        }

        function sa(w, I, R) {
            var V = J.stop();
            T();
            if (V) {
                V = pa(V);
                c("drop", w, V, true, I, R)
            }
        }

        function ha(w) {
            return N(w.start)
        }

        function da(w) {
            return M.left(w)
        }

        function ma(w) {
            return M.right(w)
        }

        function ua(w) {
            return {
                row: Math.floor(Ca(w, p.visStart) / 7),
                col: ka(w.getDay())
            }
        }

        function pa(w) {
            return U(w.row, w.col)
        }

        function U(w, I) {
            return ba(N(p.visStart), w * 7 + I * D + Z)
        }

        function ca(w) {
            return U(Math.floor(w / F), w % F)
        }

        function ka(w) {
            return (w - Math.max(ja, ia) + F) % F * D + Z
        }

        function qa(w) {
            return P.eq(w)
        }

        function G() {
            return {
                left: 0,
                right: W
            }
        }
        var p = this;
        p.renderBasic = d;
        p.setHeight = j;
        p.setWidth = t;
        p.renderDayOverlay = Q;
        p.defaultSelectionEnd = u;
        p.renderSelection = fa;
        p.clearSelection = na;
        p.reportDayClick = ga;
        p.dragStart = ra;
        p.dragStop =
            sa;
        p.defaultEventEnd = ha;
        p.getHoverListener = function () {
            return J
        };
        p.colContentLeft = da;
        p.colContentRight = ma;
        p.dayOfWeekCol = ka;
        p.dateCell = ua;
        p.cellDate = pa;
        p.cellIsAllDay = function () {
            return true
        };
        p.allDayRow = qa;
        p.allDayBounds = G;
        p.getRowCnt = function () {
            return v
        };
        p.getColCnt = function () {
            return F
        };
        p.getColWidth = function () {
            return s
        };
        p.getDaySegmentContainer = function () {
            return Y
        };
        Kb.call(p, a, b, e);
        Lb.call(p);
        Mb.call(p);
        pc.call(p);
        var L = p.opt,
            c = p.trigger,
            z = p.clearEvents,
            H = p.renderOverlay,
            T = p.clearOverlays,
            X = p.daySelectionMousedown,
            ya = b.formatDate,
            K, i, C, P, E, B, n, Y, W, o, s, v, F, r, J, M, k, D, Z, ja, ia, la, $;
        qb(a.addClass("fc-grid"));
        r = new Nb(function (w, I) {
            var R, V, ea;
            i.each(function (aa, va) {
                R = m(va);
                V = R.offset().left;
                if (aa) ea[1] = V;
                ea = [V];
                I[aa] = ea
            });
            ea[1] = V + R.outerWidth();
            P.each(function (aa, va) {
                if (aa < v) {
                    R = m(va);
                    V = R.offset().top;
                    if (aa) ea[1] = V;
                    ea = [V];
                    w[aa] = ea
                }
            });
            ea[1] = V + R.outerHeight()
        });
        J = new Ob(r);
        M = new Pb(function (w) {
            return n.eq(w)
        })
    }

    function pc() {
        function a(U, ca) {
            S(U);
            ua(e(U), ca)
        }

        function b() {
            Q();
            ga().empty()
        }

        function e(U) {
            var ca = da(),
                ka =
                    ma(),
                qa = N(g.visStart);
            ka = ba(N(qa), ka);
            var G = m.map(U, Ua),
                p, L, c, z, H, T, X = [];
            for (p = 0; p < ca; p++) {
                L = ob(nb(U, G, qa, ka));
                for (c = 0; c < L.length; c++) {
                    z = L[c];
                    for (H = 0; H < z.length; H++) {
                        T = z[H];
                        T.row = p;
                        T.level = c;
                        X.push(T)
                    }
                }
                ba(qa, 7);
                ba(ka, 7)
            }
            return X
        }

        function d(U, ca, ka) {
            t(U) && f(U, ca);
            ka.isEnd && y(U) && pa(U, ca, ka);
            q(U, ca)
        }

        function f(U, ca) {
            var ka = ra(),
                qa;
            ca.draggable({
                zIndex: 9,
                delay: 50,
                opacity: l("dragOpacity"),
                revertDuration: l("dragRevertDuration"),
                start: function (G, p) {
                    j("eventDragStart", ca, U, G, p);
                    fa(U, ca);
                    ka.start(function (L,
                        c, z, H) {
                        ca.draggable("option", "revert", !L || !z && !H);
                        ha();
                        if (L) {
                            qa = z * 7 + H * (l("isRTL") ? -1 : 1);
                            sa(ba(N(U.start), qa), ba(Ua(U), qa))
                        } else qa = 0
                    }, G, "drag")
                },
                stop: function (G, p) {
                    ka.stop();
                    ha();
                    j("eventDragStop", ca, U, G, p);
                    if (qa) na(this, U, qa, 0, U.allDay, G, p);
                    else {
                        ca.css("filter", "");
                        u(U, ca)
                    }
                }
            })
        }
        var g = this;
        g.renderEvents = a;
        g.compileDaySegs = e;
        g.clearEvents = b;
        g.bindDaySeg = d;
        Qb.call(g);
        var l = g.opt,
            j = g.trigger,
            t = g.isEventDraggable,
            y = g.isEventResizable,
            S = g.reportEvents,
            Q = g.reportEventClear,
            q = g.eventElementHandlers,
            u = g.showEvents,
            fa = g.hideEvents,
            na = g.eventDrop,
            ga = g.getDaySegmentContainer,
            ra = g.getHoverListener,
            sa = g.renderDayOverlay,
            ha = g.clearOverlays,
            da = g.getRowCnt,
            ma = g.getColCnt,
            ua = g.renderDaySegs,
            pa = g.resizableDayEvent
    }

    function qc(a, b) {
        function e(j, t) {
            t && ba(j, t * 7);
            j = ba(N(j), -((j.getDay() - f("firstDay") + 7) % 7));
            t = ba(N(j), 7);
            var y = N(j),
                S = N(t),
                Q = f("weekends");
            if (!Q) {
                Fa(y);
                Fa(S, -1, true)
            }
            d.title = l(y, ba(N(S), -1), f("titleFormat"));
            d.start = j;
            d.end = t;
            d.visStart = y;
            d.visEnd = S;
            g(Q ? 7 : 5)
        }
        var d = this;
        d.render = e;
        Rb.call(d, a, b, "agendaWeek");
        var f = d.opt,
            g = d.renderAgenda,
            l = b.formatDates
    }

    function rc(a, b) {
        function e(j, t) {
            if (t) {
                ba(j, t);
                f("weekends") || Fa(j, t < 0 ? -1 : 1)
            }
            t = N(j, true);
            var y = ba(N(t), 1);
            d.title = l(j, f("titleFormat"));
            d.start = d.visStart = t;
            d.end = d.visEnd = y;
            g(1)
        }
        var d = this;
        d.render = e;
        Rb.call(d, a, b, "agendaDay");
        var f = d.opt,
            g = d.renderAgenda,
            l = b.formatDate
    }

    function Rb(a, b, e) {
        function d(h) {
            Ba = h;
            f();
            v ? P() : g();
            l()
        }

        function f() {
            Wa = i("theme") ? "ui" : "fc";
            Sb = i("weekends") ? 0 : 1;
            Tb = i("firstDay");
            if (Ub = i("isRTL")) {
                Ha = -1;
                Ia = Ba - 1
            } else {
                Ha = 1;
                Ia = 0
            }
            La = mb(i("minTime"));
            bb = mb(i("maxTime"));
            Vb = i("columnFormat")
        }

        function g() {
            var h = Wa + "-widget-header",
                O = Wa + "-widget-content",
                x, A, ta, za, Da, Ea = i("slotMinutes") % 15 == 0;
            x = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'><thead><tr><th class='fc-agenda-axis " + h + "'>&nbsp;</th>";
            for (A = 0; A < Ba; A++) x += "<th class='fc- fc-col" + A + " " + h + "'/>";
            x += "<th class='fc-agenda-gutter " + h + "'>&nbsp;</th></tr></thead><tbody><tr><th class='fc-agenda-axis " + h + "'>&nbsp;</th>";
            for (A = 0; A < Ba; A++) x += "<td class='fc- fc-col" +
                A + " " + O + "'><div><div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>";
            x += "<td class='fc-agenda-gutter " + O + "'>&nbsp;</td></tr></tbody></table>";
            v = m(x).appendTo(a);
            F = v.find("thead");
            r = F.find("th").slice(1, -1);
            J = v.find("tbody");
            M = J.find("td").slice(0, -1);
            k = M.find("div.fc-day-content div");
            D = M.eq(0);
            Z = D.find("> div");
            ab(F.add(F.find("tr")));
            ab(J.add(J.find("tr")));
            aa = F.find("th:first");
            va = v.find(".fc-agenda-gutter");
            ja = m("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(a);
            if (i("allDaySlot")) {
                ia = m("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ja);
                x = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + h + " fc-agenda-axis'>" + i("allDayText") + "</th><td><div class='fc-day-content'><div style='position:relative'/></div></td><th class='" + h + " fc-agenda-gutter'>&nbsp;</th></tr></table>";
                la = m(x).appendTo(ja);
                $ = la.find("tr");
                q($.find("td"));
                aa = aa.add(la.find("th:first"));
                va = va.add(la.find("th.fc-agenda-gutter"));
                ja.append("<div class='fc-agenda-divider " +
                    h + "'><div class='fc-agenda-divider-inner'/></div>")
            } else ia = m([]);
            w = m("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(ja);
            I = m("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(w);
            R = m("<div style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(I);
            x = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>";
            ta = zb();
            za = xa(N(ta), bb);
            xa(ta, La);
            for (A = tb = 0; ta < za; A++) {
                Da = ta.getMinutes();
                x += "<tr class='fc-slot" + A + " " +
                    (!Da ? "" : "fc-minor") + "'><th class='fc-agenda-axis " + h + "'>" + (!Ea || !Da ? s(ta, i("axisFormat")) : "&nbsp;") + "</th><td class='" + O + "'><div style='position:relative'>&nbsp;</div></td></tr>";
                xa(ta, i("slotMinutes"));
                tb++
            }
            x += "</tbody></table>";
            V = m(x).appendTo(I);
            ea = V.find("div:first");
            u(V.find("td"));
            aa = aa.add(V.find("th:first"))
        }

        function l() {
            var h, O, x, A, ta = Ka(new Date);
            for (h = 0; h < Ba; h++) {
                A = ua(h);
                O = r.eq(h);
                O.html(s(A, Vb));
                x = M.eq(h); + A == +ta ? x.addClass(Wa + "-state-highlight fc-today") : x.removeClass(Wa + "-state-highlight fc-today");
                rb(O.add(x), A)
            }
        }

        function j(h, O) {
            if (h === oa) h = Wb;
            Wb = h;
            ub = {};
            var x = J.position().top,
                A = w.position().top;
            h = Math.min(h - x, V.height() + A + 1);
            Z.height(h - Sa(D));
            ja.css("top", x);
            w.height(h - A - 1);
            Xa = ea.height() + 1;
            O && y()
        }

        function t(h) {
            Ga = h;
            cb.clear();
            Ma = 0;
            Va(aa.width("").each(function (O, x) {
                Ma = Math.max(Ma, m(x).outerWidth())
            }), Ma);
            h = w[0].clientWidth;
            if (vb = w.width() - h) {
                Va(va, vb);
                va.show().prev().removeClass("fc-last")
            } else va.hide().prev().addClass("fc-last");
            db = Math.floor((h - Ma) / Ba);
            Va(r.slice(0, -1), db)
        }

        function y() {
            function h() {
                w.scrollTop(A)
            }
            var O = zb(),
                x = N(O);
            x.setHours(i("firstHour"));
            var A = ca(O, x) + 1;
            h();
            setTimeout(h, 0)
        }

        function S() {
            Xb = w.scrollTop()
        }

        function Q() {
            w.scrollTop(Xb)
        }

        function q(h) {
            h.click(fa).mousedown(W)
        }

        function u(h) {
            h.click(fa).mousedown(H)
        }

        function fa(h) {
            if (!i("selectable")) {
                var O = Math.min(Ba - 1, Math.floor((h.pageX - v.offset().left - Ma) / db)),
                    x = ua(O),
                    A = this.parentNode.className.match(/fc-slot(\d+)/);
                if (A) {
                    A = parseInt(A[1]) * i("slotMinutes");
                    var ta = Math.floor(A / 60);
                    x.setHours(ta);
                    x.setMinutes(A % 60 + La);
                    C("dayClick", M[O], x, false,
                        h)
                } else C("dayClick", M[O], x, true, h)
            }
        }

        function na(h, O, x) {
            x && Na.build();
            var A = N(K.visStart);
            if (Ub) {
                x = Ca(O, A) * Ha + Ia + 1;
                h = Ca(h, A) * Ha + Ia + 1
            } else {
                x = Ca(h, A);
                h = Ca(O, A)
            }
            x = Math.max(0, x);
            h = Math.min(Ba, h);
            x < h && q(ga(0, x, 0, h - 1))
        }

        function ga(h, O, x, A) {
            h = Na.rect(h, O, x, A, ja);
            return E(h, ja)
        }

        function ra(h, O) {
            for (var x = N(K.visStart), A = ba(N(x), 1), ta = 0; ta < Ba; ta++) {
                var za = new Date(Math.max(x, h)),
                    Da = new Date(Math.min(A, O));
                if (za < Da) {
                    var Ea = ta * Ha + Ia;
                    Ea = Na.rect(0, Ea, 0, Ea, I);
                    za = ca(x, za);
                    Da = ca(x, Da);
                    Ea.top = za;
                    Ea.height = Da - za;
                    u(E(Ea,
                        I))
                }
                ba(x, 1);
                ba(A, 1)
            }
        }

        function sa(h) {
            return cb.left(h)
        }

        function ha(h) {
            return cb.right(h)
        }

        function da(h) {
            return {
                row: Math.floor(Ca(h, K.visStart) / 7),
                col: U(h.getDay())
            }
        }

        function ma(h) {
            var O = ua(h.col);
            h = h.row;
            i("allDaySlot") && h--;
            h >= 0 && xa(O, La + h * i("slotMinutes"));
            return O
        }

        function ua(h) {
            return ba(N(K.visStart), h * Ha + Ia)
        }

        function pa(h) {
            return i("allDaySlot") && !h.row
        }

        function U(h) {
            return (h - Math.max(Tb, Sb) + Ba) % Ba * Ha + Ia
        }

        function ca(h, O) {
            h = N(h, true);
            if (O < xa(N(h), La)) return 0;
            if (O >= xa(N(h), bb)) return V.height();
            h = i("slotMinutes");
            O = O.getHours() * 60 + O.getMinutes() - La;
            var x = Math.floor(O / h),
                A = ub[x];
            if (A === oa) A = ub[x] = V.find("tr:eq(" + x + ") td div")[0].offsetTop;
            return Math.max(0, Math.round(A - 1 + Xa * (O % h / h)))
        }

        function ka() {
            return {
                left: Ma,
                right: Ga - vb
            }
        }

        function qa() {
            return $
        }

        function G(h) {
            var O = N(h.start);
            if (h.allDay) return O;
            return xa(O, i("defaultEventMinutes"))
        }

        function p(h, O) {
            if (O) return N(h);
            return xa(N(h), i("slotMinutes"))
        }

        function L(h, O, x) {
            if (x) i("allDaySlot") && na(h, ba(N(O), 1), true);
            else c(h, O)
        }

        function c(h, O) {
            var x =
                i("selectHelper");
            Na.build();
            if (x) {
                var A = Ca(h, K.visStart) * Ha + Ia;
                if (A >= 0 && A < Ba) {
                    A = Na.rect(0, A, 0, A, I);
                    var ta = ca(h, h),
                        za = ca(h, O);
                    if (za > ta) {
                        A.top = ta;
                        A.height = za - ta;
                        A.left += 2;
                        A.width -= 5;
                        if (m.isFunction(x)) {
                            if (h = x(h, O)) {
                                A.position = "absolute";
                                A.zIndex = 8;
                                wa = m(h).css(A).appendTo(I)
                            }
                        } else {
                            A.isStart = true;
                            A.isEnd = true;
                            wa = m(o({
                                title: "",
                                start: h,
                                end: O,
                                className: ["fc-select-helper"],
                                editable: false
                            }, A));
                            wa.css("opacity", i("dragOpacity"))
                        } if (wa) {
                            u(wa);
                            I.append(wa);
                            Va(wa, A.width, true);
                            Eb(wa, A.height, true)
                        }
                    }
                }
            } else ra(h,
                O)
        }

        function z() {
            B();
            if (wa) {
                wa.remove();
                wa = null
            }
        }

        function H(h) {
            if (h.which == 1 && i("selectable")) {
                Y(h);
                var O;
                Ra.start(function (x, A) {
                    z();
                    if (x && x.col == A.col && !pa(x)) {
                        A = ma(A);
                        x = ma(x);
                        O = [A, xa(N(A), i("slotMinutes")), x, xa(N(x), i("slotMinutes"))].sort(Gb);
                        c(O[0], O[3])
                    } else O = null
                }, h);
                m(document).one("mouseup", function (x) {
                    Ra.stop();
                    if (O) {
                        +O[0] == +O[1] && T(O[0], false, x);
                        n(O[0], O[3], false, x)
                    }
                })
            }
        }

        function T(h, O, x) {
            C("dayClick", M[U(h.getDay())], h, O, x)
        }

        function X(h, O) {
            Ra.start(function (x) {
                B();
                if (x)
                    if (pa(x)) ga(x.row,
                        x.col, x.row, x.col);
                    else {
                        x = ma(x);
                        var A = xa(N(x), i("defaultEventMinutes"));
                        ra(x, A)
                    }
            }, O)
        }

        function ya(h, O, x) {
            var A = Ra.stop();
            B();
            A && C("drop", h, ma(A), pa(A), O, x)
        }
        var K = this;
        K.renderAgenda = d;
        K.setWidth = t;
        K.setHeight = j;
        K.beforeHide = S;
        K.afterShow = Q;
        K.defaultEventEnd = G;
        K.timePosition = ca;
        K.dayOfWeekCol = U;
        K.dateCell = da;
        K.cellDate = ma;
        K.cellIsAllDay = pa;
        K.allDayRow = qa;
        K.allDayBounds = ka;
        K.getHoverListener = function () {
            return Ra
        };
        K.colContentLeft = sa;
        K.colContentRight = ha;
        K.getDaySegmentContainer = function () {
            return ia
        };
        K.getSlotSegmentContainer = function () {
            return R
        };
        K.getMinMinute = function () {
            return La
        };
        K.getMaxMinute = function () {
            return bb
        };
        K.getBodyContent = function () {
            return I
        };
        K.getRowCnt = function () {
            return 1
        };
        K.getColCnt = function () {
            return Ba
        };
        K.getColWidth = function () {
            return db
        };
        K.getSlotHeight = function () {
            return Xa
        };
        K.defaultSelectionEnd = p;
        K.renderDayOverlay = na;
        K.renderSelection = L;
        K.clearSelection = z;
        K.reportDayClick = T;
        K.dragStart = X;
        K.dragStop = ya;
        Kb.call(K, a, b, e);
        Lb.call(K);
        Mb.call(K);
        sc.call(K);
        var i = K.opt,
            C = K.trigger,
            P = K.clearEvents,
            E = K.renderOverlay,
            B = K.clearOverlays,
            n = K.reportSelection,
            Y = K.unselect,
            W = K.daySelectionMousedown,
            o = K.slotSegHtml,
            s = b.formatDate,
            v, F, r, J, M, k, D, Z, ja, ia, la, $, w, I, R, V, ea, aa, va, wa, Ga, Wb, Ma, db, vb, Xa, Xb, Ba, tb, Na, Ra, cb, ub = {}, Wa, Tb, Sb, Ub, Ha, Ia, La, bb, Vb;
        qb(a.addClass("fc-agenda"));
        Na = new Nb(function (h, O) {
            function x(eb) {
                return Math.max(Ea, Math.min(tc, eb))
            }
            var A, ta, za;
            r.each(function (eb, uc) {
                A = m(uc);
                ta = A.offset().left;
                if (eb) za[1] = ta;
                za = [ta];
                O[eb] = za
            });
            za[1] = ta + A.outerWidth();
            if (i("allDaySlot")) {
                A =
                    $;
                ta = A.offset().top;
                h[0] = [ta, ta + A.outerHeight()]
            }
            for (var Da = I.offset().top, Ea = w.offset().top, tc = Ea + w.outerHeight(), fb = 0; fb < tb; fb++) h.push([x(Da + Xa * fb), x(Da + Xa * (fb + 1))])
        });
        Ra = new Ob(Na);
        cb = new Pb(function (h) {
            return k.eq(h)
        })
    }

    function sc() {
        function a(o, s) {
            sa(o);
            var v, F = o.length,
                r = [],
                J = [];
            for (v = 0; v < F; v++) o[v].allDay ? r.push(o[v]) : J.push(o[v]);
            if (u("allDaySlot")) {
                L(e(r), s);
                ma()
            }
            g(d(J), s)
        }

        function b() {
            ha();
            ua().empty();
            pa().empty()
        }

        function e(o) {
            o = ob(nb(o, m.map(o, Ua), q.visStart, q.visEnd));
            var s, v = o.length,
                F, r, J, M = [];
            for (s = 0; s < v; s++) {
                F = o[s];
                for (r = 0; r < F.length; r++) {
                    J = F[r];
                    J.row = 0;
                    J.level = s;
                    M.push(J)
                }
            }
            return M
        }

        function d(o) {
            var s = z(),
                v = ka(),
                F = ca(),
                r = xa(N(q.visStart), v),
                J = m.map(o, f),
                M, k, D, Z, ja, ia, la = [];
            for (M = 0; M < s; M++) {
                k = ob(nb(o, J, r, xa(N(r), F - v)));
                vc(k);
                for (D = 0; D < k.length; D++) {
                    Z = k[D];
                    for (ja = 0; ja < Z.length; ja++) {
                        ia = Z[ja];
                        ia.col = M;
                        ia.level = D;
                        la.push(ia)
                    }
                }
                ba(r, 1, true)
            }
            return la
        }

        function f(o) {
            return o.end ? N(o.end) : xa(N(o.start), u("defaultEventMinutes"))
        }

        function g(o, s) {
            var v, F = o.length,
                r, J, M, k, D, Z, ja, ia, la,
                $ = "",
                w, I, R = {}, V = {}, ea = pa(),
                aa;
            v = z();
            if (w = u("isRTL")) {
                I = -1;
                aa = v - 1
            } else {
                I = 1;
                aa = 0
            }
            for (v = 0; v < F; v++) {
                r = o[v];
                J = r.event;
                M = qa(r.start, r.start);
                k = qa(r.start, r.end);
                D = r.col;
                Z = r.level;
                ja = r.forward || 0;
                ia = G(D * I + aa);
                la = p(D * I + aa) - ia;
                la = Math.min(la - 6, la * 0.95);
                D = Z ? la / (Z + ja + 1) : ja ? (la / (ja + 1) - 6) * 2 : la;
                Z = ia + la / (Z + ja + 1) * Z * I + (w ? la - D : 0);
                r.top = M;
                r.left = Z;
                r.outerWidth = D;
                r.outerHeight = k - M;
                $ += l(J, r)
            }
            ea[0].innerHTML = $;
            w = ea.children();
            for (v = 0; v < F; v++) {
                r = o[v];
                J = r.event;
                $ = m(w[v]);
                I = fa("eventRender", J, J, $);
                if (I === false) $.remove();
                else {
                    if (I && I !== true) {
                        $.remove();
                        $ = m(I).css({
                            position: "absolute",
                            top: r.top,
                            left: r.left
                        }).appendTo(ea)
                    }
                    r.element = $;
                    if (J._id === s) t(J, $, r);
                    else $[0]._fci = v;
                    ya(J, $)
                }
            }
            Db(ea, o, t);
            for (v = 0; v < F; v++) {
                r = o[v];
                if ($ = r.element) {
                    J = R[s = r.key = Ib($[0])];
                    r.vsides = J === oa ? (R[s] = Sa($, true)) : J;
                    J = V[s];
                    r.hsides = J === oa ? (V[s] = pb($, true)) : J;
                    s = $.find("div.fc-event-content");
                    if (s.length) r.contentTop = s[0].offsetTop
                }
            }
            for (v = 0; v < F; v++) {
                r = o[v];
                if ($ = r.element) {
                    $[0].style.width = Math.max(0, r.outerWidth - r.hsides) + "px";
                    R = Math.max(0, r.outerHeight -
                        r.vsides);
                    $[0].style.height = R + "px";
                    J = r.event;
                    if (r.contentTop !== oa && R - r.contentTop < 10) {
                        $.find("div.fc-event-time").text(Y(J.start, u("timeFormat")) + " - " + J.title);
                        $.find("div.fc-event-title").remove()
                    }
                    fa("eventAfterRender", J, J, $)
                }
            }
        }

        function l(o, s) {
            var v = "<",
                F = o.url,
                r = Jb(o, u),
                J = r ? " style='" + r + "'" : "",
                M = ["fc-event", "fc-event-skin", "fc-event-vert"];
            na(o) && M.push("fc-event-draggable");
            s.isStart && M.push("fc-corner-top");
            s.isEnd && M.push("fc-corner-bottom");
            M = M.concat(o.className);
            if (o.source) M = M.concat(o.source.className || []);
            v += F ? "a href='" + Qa(o.url) + "'" : "div";
            v += " class='" + M.join(" ") + "' style='position:absolute;z-index:8;top:" + s.top + "px;left:" + s.left + "px;" + r + "'><div class='fc-event-inner fc-event-skin'" + J + "><div class='fc-event-head fc-event-skin'" + J + "><div class='fc-event-time'>" + Qa(W(o.start, o.end, u("timeFormat"))) + "</div></div><div class='fc-event-content'><div class='fc-event-title'>" + Qa(o.title) + "</div></div><div class='fc-event-bg'></div></div>";
            if (s.isEnd && ga(o)) v += "<div class='ui-resizable-handle ui-resizable-s'>=</div>";
            v += "</" + (F ? "a" : "div") + ">";
            return v
        }

        function j(o, s, v) {
            na(o) && y(o, s, v.isStart);
            v.isEnd && ga(o) && c(o, s, v);
            da(o, s)
        }

        function t(o, s, v) {
            var F = s.find("div.fc-event-time");
            na(o) && S(o, s, F);
            v.isEnd && ga(o) && Q(o, s, F);
            da(o, s)
        }

        function y(o, s, v) {
            function F() {
                if (!M) {
                    s.width(r).height("").draggable("option", "grid", null);
                    M = true
                }
            }
            var r, J, M = true,
                k, D = u("isRTL") ? -1 : 1,
                Z = U(),
                ja = H(),
                ia = T(),
                la = ka();
            s.draggable({
                zIndex: 9,
                opacity: u("dragOpacity", "month"),
                revertDuration: u("dragRevertDuration"),
                start: function ($, w) {
                    fa("eventDragStart",
                        s, o, $, w);
                    i(o, s);
                    r = s.width();
                    Z.start(function (I, R, V, ea) {
                        B();
                        if (I) {
                            J = false;
                            k = ea * D;
                            if (I.row)
                                if (v) {
                                    if (M) {
                                        s.width(ja - 10);
                                        Eb(s, ia * Math.round((o.end ? (o.end - o.start) / wc : u("defaultEventMinutes")) / u("slotMinutes")));
                                        s.draggable("option", "grid", [ja, 1]);
                                        M = false
                                    }
                                } else J = true;
                                else {
                                    E(ba(N(o.start), k), ba(Ua(o), k));
                                    F()
                                }
                            J = J || M && !k
                        } else {
                            F();
                            J = true
                        }
                        s.draggable("option", "revert", J)
                    }, $, "drag")
                },
                stop: function ($, w) {
                    Z.stop();
                    B();
                    fa("eventDragStop", s, o, $, w);
                    if (J) {
                        F();
                        s.css("filter", "");
                        K(o, s)
                    } else {
                        var I = 0;
                        M || (I = Math.round((s.offset().top -
                            X().offset().top) / ia) * u("slotMinutes") + la - (o.start.getHours() * 60 + o.start.getMinutes()));
                        C(this, o, k, I, M, $, w)
                    }
                }
            })
        }

        function S(o, s, v) {
            function F(I) {
                var R = xa(N(o.start), I),
                    V;
                if (o.end) V = xa(N(o.end), I);
                v.text(W(R, V, u("timeFormat")))
            }

            function r() {
                if (M) {
                    v.css("display", "");
                    s.draggable("option", "grid", [$, w]);
                    M = false
                }
            }
            var J, M = false,
                k, D, Z, ja = u("isRTL") ? -1 : 1,
                ia = U(),
                la = z(),
                $ = H(),
                w = T();
            s.draggable({
                zIndex: 9,
                scroll: false,
                grid: [$, w],
                axis: la == 1 ? "y" : false,
                opacity: u("dragOpacity"),
                revertDuration: u("dragRevertDuration"),
                start: function (I, R) {
                    fa("eventDragStart", s, o, I, R);
                    i(o, s);
                    J = s.position();
                    D = Z = 0;
                    ia.start(function (V, ea, aa, va) {
                        s.draggable("option", "revert", !V);
                        B();
                        if (V) {
                            k = va * ja;
                            if (u("allDaySlot") && !V.row) {
                                if (!M) {
                                    M = true;
                                    v.hide();
                                    s.draggable("option", "grid", null)
                                }
                                E(ba(N(o.start), k), ba(Ua(o), k))
                            } else r()
                        }
                    }, I, "drag")
                },
                drag: function (I, R) {
                    D = Math.round((R.position.top - J.top) / w) * u("slotMinutes");
                    if (D != Z) {
                        M || F(D);
                        Z = D
                    }
                },
                stop: function (I, R) {
                    var V = ia.stop();
                    B();
                    fa("eventDragStop", s, o, I, R);
                    if (V && (k || D || M)) C(this, o, k, M ? 0 : D, M, I, R);
                    else {
                        r();
                        s.css("filter", "");
                        s.css(J);
                        F(0);
                        K(o, s)
                    }
                }
            })
        }

        function Q(o, s, v) {
            var F, r, J = T();
            s.resizable({
                handles: {
                    s: "div.ui-resizable-s"
                },
                grid: J,
                start: function (M, k) {
                    F = r = 0;
                    i(o, s);
                    s.css("z-index", 9);
                    fa("eventResizeStart", this, o, M, k)
                },
                resize: function (M, k) {
                    F = Math.round((Math.max(J, s.height()) - k.originalSize.height) / J);
                    if (F != r) {
                        v.text(W(o.start, !F && !o.end ? null : xa(ra(o), u("slotMinutes") * F), u("timeFormat")));
                        r = F
                    }
                },
                stop: function (M, k) {
                    fa("eventResizeStop", this, o, M, k);
                    if (F) P(this, o, 0, u("slotMinutes") * F, M, k);
                    else {
                        s.css("z-index",
                            8);
                        K(o, s)
                    }
                }
            })
        }
        var q = this;
        q.renderEvents = a;
        q.compileDaySegs = e;
        q.clearEvents = b;
        q.slotSegHtml = l;
        q.bindDaySeg = j;
        Qb.call(q);
        var u = q.opt,
            fa = q.trigger,
            na = q.isEventDraggable,
            ga = q.isEventResizable,
            ra = q.eventEnd,
            sa = q.reportEvents,
            ha = q.reportEventClear,
            da = q.eventElementHandlers,
            ma = q.setHeight,
            ua = q.getDaySegmentContainer,
            pa = q.getSlotSegmentContainer,
            U = q.getHoverListener,
            ca = q.getMaxMinute,
            ka = q.getMinMinute,
            qa = q.timePosition,
            G = q.colContentLeft,
            p = q.colContentRight,
            L = q.renderDaySegs,
            c = q.resizableDayEvent,
            z = q.getColCnt,
            H = q.getColWidth,
            T = q.getSlotHeight,
            X = q.getBodyContent,
            ya = q.reportEventElement,
            K = q.showEvents,
            i = q.hideEvents,
            C = q.eventDrop,
            P = q.eventResize,
            E = q.renderDayOverlay,
            B = q.clearOverlays,
            n = q.calendar,
            Y = n.formatDate,
            W = n.formatDates
    }

    function vc(a) {
        var b, e, d, f, g, l;
        for (b = a.length - 1; b > 0; b--) {
            f = a[b];
            for (e = 0; e < f.length; e++) {
                g = f[e];
                for (d = 0; d < a[b - 1].length; d++) {
                    l = a[b - 1][d];
                    if (Cb(g, l)) l.forward = Math.max(l.forward || 0, (g.forward || 0) + 1)
                }
            }
        }
    }

    function Kb(a, b, e) {
        function d(G, p) {
            G = qa[G];
            if (typeof G == "object") return jb(G, p || e);
            return G
        }

        function f(G, p) {
            return b.trigger.apply(b, [G, p || da].concat(Array.prototype.slice.call(arguments, 2), [da]))
        }

        function g(G) {
            return j(G) && !d("disableDragging")
        }

        function l(G) {
            return j(G) && !d("disableResizing")
        }

        function j(G) {
            return Ta(G.editable, (G.source || {}).editable, d("editable"))
        }

        function t(G) {
            U = {};
            var p, L = G.length,
                c;
            for (p = 0; p < L; p++) {
                c = G[p];
                if (U[c._id]) U[c._id].push(c);
                else U[c._id] = [c]
            }
        }

        function y(G) {
            return G.end ? N(G.end) : ma(G)
        }

        function S(G, p) {
            ca.push(p);
            if (ka[G._id]) ka[G._id].push(p);
            else ka[G._id] = [p]
        }

        function Q() {
            ca = [];
            ka = {}
        }

        function q(G, p) {
            p.click(function (L) {
                if (!p.hasClass("ui-draggable-dragging") && !p.hasClass("ui-resizable-resizing")) return f("eventClick", this, G, L)
            }).hover(function (L) {
                f("eventMouseover", this, G, L)
            }, function (L) {
                f("eventMouseout", this, G, L)
            })
        }

        function u(G, p) {
            na(G, p, "show")
        }

        function fa(G, p) {
            na(G, p, "hide")
        }

        function na(G, p, L) {
            G = ka[G._id];
            var c, z = G.length;
            for (c = 0; c < z; c++)
                if (!p || G[c][0] != p[0]) G[c][L]()
        }

        function ga(G, p, L, c, z, H, T) {
            var X = p.allDay,
                ya = p._id;
            sa(U[ya], L, c, z);
            f("eventDrop",
                G, p, L, c, z, function () {
                    sa(U[ya], -L, -c, X);
                    pa(ya)
                }, H, T);
            pa(ya)
        }

        function ra(G, p, L, c, z, H) {
            var T = p._id;
            ha(U[T], L, c);
            f("eventResize", G, p, L, c, function () {
                ha(U[T], -L, -c);
                pa(T)
            }, z, H);
            pa(T)
        }

        function sa(G, p, L, c) {
            L = L || 0;
            for (var z, H = G.length, T = 0; T < H; T++) {
                z = G[T];
                if (c !== oa) z.allDay = c;
                xa(ba(z.start, p, true), L);
                if (z.end) z.end = xa(ba(z.end, p, true), L);
                ua(z, qa)
            }
        }

        function ha(G, p, L) {
            L = L || 0;
            for (var c, z = G.length, H = 0; H < z; H++) {
                c = G[H];
                c.end = xa(ba(y(c), p, true), L);
                ua(c, qa)
            }
        }
        var da = this;
        da.element = a;
        da.calendar = b;
        da.name = e;
        da.opt =
            d;
        da.trigger = f;
        da.isEventDraggable = g;
        da.isEventResizable = l;
        da.reportEvents = t;
        da.eventEnd = y;
        da.reportEventElement = S;
        da.reportEventClear = Q;
        da.eventElementHandlers = q;
        da.showEvents = u;
        da.hideEvents = fa;
        da.eventDrop = ga;
        da.eventResize = ra;
        var ma = da.defaultEventEnd,
            ua = b.normalizeEvent,
            pa = b.reportEventChange,
            U = {}, ca = [],
            ka = {}, qa = b.options
    }

    function Qb() {
        function a(i, C) {
            var P = z(),
                E = pa(),
                B = U(),
                n = 0,
                Y, W, o = i.length,
                s, v;
            P[0].innerHTML = e(i);
            d(i, P.children());
            f(i);
            g(i, P, C);
            l(i);
            j(i);
            t(i);
            C = y();
            for (P = 0; P < E; P++) {
                Y = [];
                for (W =
                    0; W < B; W++) Y[W] = 0;
                for (; n < o && (s = i[n]).row == P;) {
                    W = Hb(Y.slice(s.startCol, s.endCol));
                    s.top = W;
                    W += s.outerHeight;
                    for (v = s.startCol; v < s.endCol; v++) Y[v] = W;
                    n++
                }
                C[P].height(Hb(Y))
            }
            Q(i, S(C))
        }

        function b(i, C, P) {
            var E = m("<div/>"),
                B = z(),
                n = i.length,
                Y;
            E[0].innerHTML = e(i);
            E = E.children();
            B.append(E);
            d(i, E);
            l(i);
            j(i);
            t(i);
            Q(i, S(y()));
            E = [];
            for (B = 0; B < n; B++)
                if (Y = i[B].element) {
                    i[B].row === C && Y.css("top", P);
                    E.push(Y[0])
                }
            return m(E)
        }

        function e(i) {
            var C = fa("isRTL"),
                P, E = i.length,
                B, n, Y, W;
            P = ka();
            var o = P.left,
                s = P.right,
                v, F, r, J, M, k =
                    "";
            for (P = 0; P < E; P++) {
                B = i[P];
                n = B.event;
                W = ["fc-event", "fc-event-skin", "fc-event-hori"];
                ga(n) && W.push("fc-event-draggable");
                if (C) {
                    B.isStart && W.push("fc-corner-right");
                    B.isEnd && W.push("fc-corner-left");
                    v = p(B.end.getDay() - 1);
                    F = p(B.start.getDay());
                    r = B.isEnd ? qa(v) : o;
                    J = B.isStart ? G(F) : s
                } else {
                    B.isStart && W.push("fc-corner-left");
                    B.isEnd && W.push("fc-corner-right");
                    v = p(B.start.getDay());
                    F = p(B.end.getDay() - 1);
                    r = B.isStart ? qa(v) : o;
                    J = B.isEnd ? G(F) : s
                }
                W = W.concat(n.className);
                if (n.source) W = W.concat(n.source.className || []);
                Y = n.url;
                M = Jb(n, fa);
                k += Y ? "<a href='" + Qa(Y) + "'" : "<div";
                k += " class='" + W.join(" ") + "' style='position:absolute;z-index:8;left:" + r + "px;" + M + "'><div class='fc-event-inner fc-event-skin'" + (M ? " style='" + M + "'" : "") + ">";
                if (!n.allDay && B.isStart) k += "<span class='fc-event-time'>" + Qa(T(n.start, n.end, fa("timeFormat"))) + "</span>";
                k += "<span class='fc-event-title'>" + Qa(n.title) + "</span></div>";
                if (B.isEnd && ra(n)) k += "<div class='ui-resizable-handle ui-resizable-" + (C ? "w" : "e") + "'>&nbsp;&nbsp;&nbsp;</div>";
                k += "</" + (Y ?
                    "a" : "div") + ">";
                B.left = r;
                B.outerWidth = J - r;
                B.startCol = v;
                B.endCol = F + 1
            }
            return k
        }

        function d(i, C) {
            var P, E = i.length,
                B, n, Y;
            for (P = 0; P < E; P++) {
                B = i[P];
                n = B.event;
                Y = m(C[P]);
                n = na("eventRender", n, n, Y);
                if (n === false) Y.remove();
                else {
                    if (n && n !== true) {
                        n = m(n).css({
                            position: "absolute",
                            left: B.left
                        });
                        Y.replaceWith(n);
                        Y = n
                    }
                    B.element = Y
                }
            }
        }

        function f(i) {
            var C, P = i.length,
                E, B;
            for (C = 0; C < P; C++) {
                E = i[C];
                (B = E.element) && ha(E.event, B)
            }
        }

        function g(i, C, P) {
            var E, B = i.length,
                n, Y, W;
            for (E = 0; E < B; E++) {
                n = i[E];
                if (Y = n.element) {
                    W = n.event;
                    if (W._id ===
                        P) H(W, Y, n);
                    else Y[0]._fci = E
                }
            }
            Db(C, i, H)
        }

        function l(i) {
            var C, P = i.length,
                E, B, n, Y, W = {};
            for (C = 0; C < P; C++) {
                E = i[C];
                if (B = E.element) {
                    n = E.key = Ib(B[0]);
                    Y = W[n];
                    if (Y === oa) Y = W[n] = pb(B, true);
                    E.hsides = Y
                }
            }
        }

        function j(i) {
            var C, P = i.length,
                E, B;
            for (C = 0; C < P; C++) {
                E = i[C];
                if (B = E.element) B[0].style.width = Math.max(0, E.outerWidth - E.hsides) + "px"
            }
        }

        function t(i) {
            var C, P = i.length,
                E, B, n, Y, W = {};
            for (C = 0; C < P; C++) {
                E = i[C];
                if (B = E.element) {
                    n = E.key;
                    Y = W[n];
                    if (Y === oa) Y = W[n] = Fb(B);
                    E.outerHeight = B[0].offsetHeight + Y
                }
            }
        }

        function y() {
            var i, C = pa(),
                P = [];
            for (i = 0; i < C; i++) P[i] = ca(i).find("td:first div.fc-day-content > div");
            return P
        }

        function S(i) {
            var C, P = i.length,
                E = [];
            for (C = 0; C < P; C++) E[C] = i[C][0].offsetTop;
            return E
        }

        function Q(i, C) {
            var P, E = i.length,
                B, n;
            for (P = 0; P < E; P++) {
                B = i[P];
                if (n = B.element) {
                    n[0].style.top = C[B.row] + (B.top || 0) + "px";
                    B = B.event;
                    na("eventAfterRender", B, B, n)
                }
            }
        }

        function q(i, C, P) {
            var E = fa("isRTL"),
                B = E ? "w" : "e",
                n = C.find("div.ui-resizable-" + B),
                Y = false;
            qb(C);
            C.mousedown(function (W) {
                W.preventDefault()
            }).click(function (W) {
                if (Y) {
                    W.preventDefault();
                    W.stopImmediatePropagation()
                }
            });
            n.mousedown(function (W) {
                function o(ia) {
                    na("eventResizeStop", this, i, ia);
                    m("body").css("cursor", "");
                    s.stop();
                    ya();
                    k && ua(this, i, k, 0, ia);
                    setTimeout(function () {
                        Y = false
                    }, 0)
                }
                if (W.which == 1) {
                    Y = true;
                    var s = u.getHoverListener(),
                        v = pa(),
                        F = U(),
                        r = E ? -1 : 1,
                        J = E ? F - 1 : 0,
                        M = C.css("top"),
                        k, D, Z = m.extend({}, i),
                        ja = L(i.start);
                    K();
                    m("body").css("cursor", B + "-resize").one("mouseup", o);
                    na("eventResizeStart", this, i, W);
                    s.start(function (ia, la) {
                        if (ia) {
                            var $ = Math.max(ja.row, ia.row);
                            ia = ia.col;
                            if (v == 1) $ = 0;
                            if ($ == ja.row) ia = E ? Math.min(ja.col, ia) : Math.max(ja.col, ia);
                            k = $ * 7 + ia * r + J - (la.row * 7 + la.col * r + J);
                            la = ba(sa(i), k, true);
                            if (k) {
                                Z.end = la;
                                $ = D;
                                D = b(c([Z]), P.row, M);
                                D.find("*").css("cursor", B + "-resize");
                                $ && $.remove();
                                ma(i)
                            } else if (D) {
                                da(i);
                                D.remove();
                                D = null
                            }
                            ya();
                            X(i.start, ba(N(la), 1))
                        }
                    }, W)
                }
            })
        }
        var u = this;
        u.renderDaySegs = a;
        u.resizableDayEvent = q;
        var fa = u.opt,
            na = u.trigger,
            ga = u.isEventDraggable,
            ra = u.isEventResizable,
            sa = u.eventEnd,
            ha = u.reportEventElement,
            da = u.showEvents,
            ma = u.hideEvents,
            ua = u.eventResize,
            pa = u.getRowCnt,
            U = u.getColCnt,
            ca = u.allDayRow,
            ka = u.allDayBounds,
            qa = u.colContentLeft,
            G = u.colContentRight,
            p = u.dayOfWeekCol,
            L = u.dateCell,
            c = u.compileDaySegs,
            z = u.getDaySegmentContainer,
            H = u.bindDaySeg,
            T = u.calendar.formatDates,
            X = u.renderDayOverlay,
            ya = u.clearOverlays,
            K = u.clearSelection
    }

    function Mb() {
        function a(Q, q, u) {
            b();
            q || (q = j(Q, u));
            t(Q, q, u);
            e(Q, q, u)
        }

        function b(Q) {
            if (S) {
                S = false;
                y();
                l("unselect", null, Q)
            }
        }

        function e(Q, q, u, fa) {
            S = true;
            l("select", null, Q, q, u, fa)
        }

        function d(Q) {
            var q = f.cellDate,
                u = f.cellIsAllDay,
                fa = f.getHoverListener(),
                na = f.reportDayClick;
            if (Q.which == 1 && g("selectable")) {
                b(Q);
                var ga;
                fa.start(function (ra, sa) {
                    y();
                    if (ra && u(ra)) {
                        ga = [q(sa), q(ra)].sort(Gb);
                        t(ga[0], ga[1], true)
                    } else ga = null
                }, Q);
                m(document).one("mouseup", function (ra) {
                    fa.stop();
                    if (ga) {
                        +ga[0] == +ga[1] && na(ga[0], true, ra);
                        e(ga[0], ga[1], true, ra)
                    }
                })
            }
        }
        var f = this;
        f.select = a;
        f.unselect = b;
        f.reportSelection = e;
        f.daySelectionMousedown = d;
        var g = f.opt,
            l = f.trigger,
            j = f.defaultSelectionEnd,
            t = f.renderSelection,
            y = f.clearSelection,
            S = false;
        g("selectable") && g("unselectAuto") && m(document).mousedown(function (Q) {
            var q =
                g("unselectCancel");
            if (q)
                if (m(Q.target).parents(q).length) return;
            b(Q)
        })
    }

    function Lb() {
        function a(g, l) {
            var j = f.shift();
            j || (j = m("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>"));
            j[0].parentNode != l[0] && j.appendTo(l);
            d.push(j.css(g).show());
            return j
        }

        function b() {
            for (var g; g = d.shift();) f.push(g.hide().unbind())
        }
        var e = this;
        e.renderOverlay = a;
        e.clearOverlays = b;
        var d = [],
            f = []
    }

    function Nb(a) {
        var b = this,
            e, d;
        b.build = function () {
            e = [];
            d = [];
            a(e, d)
        };
        b.cell = function (f, g) {
            var l = e.length,
                j = d.length,
                t, y = -1,
                S = -1;
            for (t = 0; t < l; t++)
                if (g >= e[t][0] && g < e[t][1]) {
                    y = t;
                    break
                }
            for (t = 0; t < j; t++)
                if (f >= d[t][0] && f < d[t][1]) {
                    S = t;
                    break
                }
            return y >= 0 && S >= 0 ? {
                row: y,
                col: S
            } : null
        };
        b.rect = function (f, g, l, j, t) {
            t = t.offset();
            return {
                top: e[f][0] - t.top,
                left: d[g][0] - t.left,
                width: d[j][1] - d[g][0],
                height: e[l][1] - e[f][0]
            }
        }
    }

    function Ob(a) {
        function b(j) {
            j = a.cell(j.pageX, j.pageY);
            if (!j != !l || j && (j.row != l.row || j.col != l.col)) {
                if (j) {
                    g || (g = j);
                    f(j, g, j.row - g.row, j.col - g.col)
                } else f(j, g);
                l = j
            }
        }
        var e = this,
            d, f, g, l;
        e.start = function (j, t, y) {
            f = j;
            g = l = null;
            a.build();
            b(t);
            d = y || "mousemove";
            m(document).bind(d, b)
        };
        e.stop = function () {
            m(document).unbind(d, b);
            return l
        }
    }

    function Pb(a) {
        function b(l) {
            return d[l] = d[l] || a(l)
        }
        var e = this,
            d = {}, f = {}, g = {};
        e.left = function (l) {
            return f[l] = f[l] === oa ? b(l).position().left : f[l]
        };
        e.right = function (l) {
            return g[l] = g[l] === oa ? e.left(l) + b(l).width() : g[l]
        };
        e.clear = function () {
            d = {};
            f = {};
            g = {}
        }
    }
    var Ya = {
        defaultView: "month",
        aspectRatio: 1.35,
        header: {
            left: "title",
            center: "",
            right: "today prev,next"
        },
        weekends: true,
        allDayDefault: true,
        ignoreTimezone: true,
        lazyFetching: true,
        startParam: "start",
        endParam: "end",
        titleFormat: {
            month: "MMMM yyyy",
            week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}",
            day: "dddd, MMM d, yyyy"
        },
        columnFormat: {
            month: "ddd",
            week: "ddd M/d",
            day: "dddd M/d"
        },
        timeFormat: {
            "": "h(:mm)t"
        },
        isRTL: false,
        firstDay: 0,
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        buttonText: {
            prev: "&nbsp;&#9668;&nbsp;",
            next: "&nbsp;&#9658;&nbsp;",
            prevYear: "&nbsp;&lt;&lt;&nbsp;",
            nextYear: "&nbsp;&gt;&gt;&nbsp;",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        theme: false,
        buttonIcons: {
            prev: "circle-triangle-w",
            next: "circle-triangle-e"
        },
        unselectAuto: true,
        dropAccept: "*"
    }, xc = {
            header: {
                left: "next,prev today",
                center: "",
                right: "title"
            },
            buttonText: {
                prev: "&nbsp;&#9658;&nbsp;",
                next: "&nbsp;&#9668;&nbsp;",
                prevYear: "&nbsp;&gt;&gt;&nbsp;",
                nextYear: "&nbsp;&lt;&lt;&nbsp;"
            },
            buttonIcons: {
                prev: "circle-triangle-e",
                next: "circle-triangle-w"
            }
        }, Aa = m.fullCalendar = {
            version: "1.5.1"
        }, Ja = Aa.views = {};
    m.fn.fullCalendar = function (a) {
        if (typeof a == "string") {
            var b = Array.prototype.slice.call(arguments, 1),
                e;
            this.each(function () {
                var f = m.data(this, "fullCalendar");
                if (f && m.isFunction(f[a])) {
                    f = f[a].apply(f, b);
                    if (e === oa) e = f;
                    a == "destroy" && m.removeData(this, "fullCalendar")
                }
            });
            if (e !== oa) return e;
            return this
        }
        var d = a.eventSources || [];
        delete a.eventSources;
        if (a.events) {
            d.push(a.events);
            delete a.events
        }
        a = m.extend(true, {}, Ya, a.isRTL || a.isRTL === oa && Ya.isRTL ? xc : {}, a);
        this.each(function (f, g) {
            f = m(g);
            g = new Yb(f, a, d);
            f.data("fullCalendar", g);
            g.render()
        });
        return this
    };
    Aa.sourceNormalizers = [];
    Aa.sourceFetchers = [];
    var ac = {
        dataType: "json",
        cache: false
    }, bc = 1;
    Aa.addDays = ba;
    Aa.cloneDate = N;
    Aa.parseDate = kb;
    Aa.parseISO8601 = Bb;
    Aa.parseTime = mb;
    Aa.formatDate = Oa;
    Aa.formatDates = ib;
    var lc = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        Ab = 864E5,
        cc = 36E5,
        wc =
            6E4,
        dc = {
            s: function (a) {
                return a.getSeconds()
            },
            ss: function (a) {
                return Pa(a.getSeconds())
            },
            m: function (a) {
                return a.getMinutes()
            },
            mm: function (a) {
                return Pa(a.getMinutes())
            },
            h: function (a) {
                return a.getHours() % 12 || 12
            },
            hh: function (a) {
                return Pa(a.getHours() % 12 || 12)
            },
            H: function (a) {
                return a.getHours()
            },
            HH: function (a) {
                return Pa(a.getHours())
            },
            d: function (a) {
                return a.getDate()
            },
            dd: function (a) {
                return Pa(a.getDate())
            },
            ddd: function (a, b) {
                return b.dayNamesShort[a.getDay()]
            },
            dddd: function (a, b) {
                return b.dayNames[a.getDay()]
            },
            M: function (a) {
                return a.getMonth() + 1
            },
            MM: function (a) {
                return Pa(a.getMonth() + 1)
            },
            MMM: function (a, b) {
                return b.monthNamesShort[a.getMonth()]
            },
            MMMM: function (a, b) {
                return b.monthNames[a.getMonth()]
            },
            yy: function (a) {
                return (a.getFullYear() + "").substring(2)
            },
            yyyy: function (a) {
                return a.getFullYear()
            },
            t: function (a) {
                return a.getHours() < 12 ? "a" : "p"
            },
            tt: function (a) {
                return a.getHours() < 12 ? "am" : "pm"
            },
            T: function (a) {
                return a.getHours() < 12 ? "A" : "P"
            },
            TT: function (a) {
                return a.getHours() < 12 ? "AM" : "PM"
            },
            u: function (a) {
                return Oa(a,
                    "yyyy-MM-dd'T'HH:mm:ss'Z'")
            },
            S: function (a) {
                a = a.getDate();
                if (a > 10 && a < 20) return "th";
                return ["st", "nd", "rd"][a % 10 - 1] || "th"
            }
        };
    Aa.applyAll = $a;
    Ja.month = mc;
    Ja.basicWeek = nc;
    Ja.basicDay = oc;
    wb({
        weekMode: "fixed"
    });
    Ja.agendaWeek = qc;
    Ja.agendaDay = rc;
    wb({
        allDaySlot: true,
        allDayText: "all-day",
        firstHour: 6,
        slotMinutes: 30,
        defaultEventMinutes: 120,
        axisFormat: "h(:mm)tt",
        timeFormat: {
            agenda: "h:mm{ - h:mm}"
        },
        dragOpacity: {
            agenda: 0.5
        },
        minTime: 0,
        maxTime: 24
    })
})(jQuery);

/**
 * Jcrop v.0.9.8 (minimized)
 * (c) 2008 Kelly Hallman and DeepLiquid.com
 * More information: http://deepliquid.com/content/Jcrop.html
 * Released under MIT License - this header must remain with code
 */

(function ($) {
    $.Jcrop = function (obj, opt) {
        var obj = obj,
            opt = opt;
        if (typeof (obj) !== 'object') obj = $(obj)[0];
        if (typeof (opt) !== 'object') opt = {};
        if (!('trackDocument' in opt)) {
            opt.trackDocument = $.browser.msie ? false : true;
            if ($.browser.msie && $.browser.version.split('.')[0] == '8')
                opt.trackDocument = true;
        }
        if (!('keySupport' in opt))
            opt.keySupport = $.browser.msie ? false : true;
        var defaults = {
            trackDocument: false,
            baseClass: 'jcrop',
            addClass: null,
            bgColor: 'black',
            bgOpacity: .6,
            borderOpacity: .4,
            handleOpacity: .5,
            handlePad: 5,
            handleSize: 9,
            handleOffset: 5,
            edgeMargin: 14,
            aspectRatio: 0,
            keySupport: true,
            cornerHandles: true,
            sideHandles: true,
            drawBorders: true,
            dragEdges: true,
            boxWidth: 0,
            boxHeight: 0,
            boundary: 8,
            animationDelay: 20,
            swingSpeed: 3,
            allowSelect: true,
            allowMove: true,
            allowResize: true,
            minSelect: [0, 0],
            maxSize: [0, 0],
            minSize: [0, 0],
            onChange: function () {},
            onSelect: function () {}
        };
        var options = defaults;
        setOptions(opt);
        var $origimg = $(obj);
        var $img = $origimg.clone().removeAttr('id').css({
            position: 'absolute'
        });
        $img.width($origimg.width());
        $img.height($origimg.height());
        $origimg.after($img).hide();
        presize($img, options.boxWidth, options.boxHeight);
        var boundx = $img.width(),
            boundy = $img.height(),
            $div = $('<div />').width(boundx).height(boundy).addClass(cssClass('holder')).css({
                position: 'relative',
                backgroundColor: options.bgColor
            }).insertAfter($origimg).append($img);;
        if (options.addClass) $div.addClass(options.addClass);
        var $img2 = $('<img />').attr('src', $img.attr('src')).css('position', 'absolute').width(boundx).height(boundy);
        var $img_holder = $('<div />').width(pct(100)).height(pct(100)).css({
            zIndex: 310,
            position: 'absolute',
            overflow: 'hidden'
        }).append($img2);
        var $hdl_holder = $('<div />').width(pct(100)).height(pct(100)).css('zIndex', 320);
        var $sel = $('<div />').css({
            position: 'absolute',
            zIndex: 300
        }).insertBefore($img).append($img_holder, $hdl_holder);
        var bound = options.boundary;
        var $trk = newTracker().width(boundx + (bound * 2)).height(boundy + (bound * 2)).css({
            position: 'absolute',
            top: px(-bound),
            left: px(-bound),
            zIndex: 290
        }).mousedown(newSelection);
        var xlimit, ylimit, xmin, ymin;
        var xscale, yscale, enabled = true;
        var docOffset = getPos($img),
            btndown, lastcurs, dimmed, animating, shift_down;
        var Coords = function () {
            var x1 = 0,
                y1 = 0,
                x2 = 0,
                y2 = 0,
                ox, oy;

            function setPressed(pos) {
                var pos = rebound(pos);
                x2 = x1 = pos[0];
                y2 = y1 = pos[1];
            };

            function setCurrent(pos) {
                var pos = rebound(pos);
                ox = pos[0] - x2;
                oy = pos[1] - y2;
                x2 = pos[0];
                y2 = pos[1];
            };

            function getOffset() {
                return [ox, oy];
            };

            function moveOffset(offset) {
                var ox = offset[0],
                    oy = offset[1];
                if (0 > x1 + ox) ox -= ox + x1;
                if (0 > y1 + oy) oy -= oy + y1;
                if (boundy < y2 + oy) oy += boundy - (y2 + oy);
                if (boundx < x2 + ox) ox += boundx - (x2 + ox);
                x1 += ox;
                x2 += ox;
                y1 += oy;
                y2 += oy;
            };

            function getCorner(ord) {
                var c = getFixed();
                switch (ord) {
                case 'ne':
                    return [c.x2, c.y];
                case 'nw':
                    return [c.x, c.y];
                case 'se':
                    return [c.x2, c.y2];
                case 'sw':
                    return [c.x, c.y2];
                }
            };

            function getFixed() {
                if (!options.aspectRatio) return getRect();
                var aspect = options.aspectRatio,
                    min_x = options.minSize[0] / xscale,
                    min_y = options.minSize[1] / yscale,
                    max_x = options.maxSize[0] / xscale,
                    max_y = options.maxSize[1] / yscale,
                    rw = x2 - x1,
                    rh = y2 - y1,
                    rwa = Math.abs(rw),
                    rha = Math.abs(rh),
                    real_ratio = rwa / rha,
                    xx, yy;
                if (max_x == 0) {
                    max_x = boundx * 10
                }
                if (max_y == 0) {
                    max_y = boundy * 10
                }
                if (real_ratio < aspect) {
                    yy = y2;
                    w = rha * aspect;
                    xx = rw < 0 ? x1 - w : w + x1;
                    if (xx < 0) {
                        xx = 0;
                        h = Math.abs((xx - x1) / aspect);
                        yy = rh < 0 ? y1 - h : h + y1;
                    } else if (xx > boundx) {
                        xx = boundx;
                        h = Math.abs((xx - x1) / aspect);
                        yy = rh < 0 ? y1 - h : h + y1;
                    }
                } else {
                    xx = x2;
                    h = rwa / aspect;
                    yy = rh < 0 ? y1 - h : y1 + h;
                    if (yy < 0) {
                        yy = 0;
                        w = Math.abs((yy - y1) * aspect);
                        xx = rw < 0 ? x1 - w : w + x1;
                    } else if (yy > boundy) {
                        yy = boundy;
                        w = Math.abs(yy - y1) * aspect;
                        xx = rw < 0 ? x1 - w : w + x1;
                    }
                }
                if (xx > x1) {
                    if (xx - x1 < min_x) {
                        xx = x1 + min_x;
                    } else if (xx - x1 > max_x) {
                        xx = x1 + max_x;
                    }
                    if (yy > y1) {
                        yy = y1 + (xx - x1) / aspect;
                    } else {
                        yy = y1 - (xx - x1) / aspect;
                    }
                } else if (xx < x1) {
                    if (x1 - xx < min_x) {
                        xx = x1 - min_x
                    } else if (x1 - xx > max_x) {
                        xx = x1 - max_x;
                    }
                    if (yy > y1) {
                        yy = y1 + (x1 - xx) / aspect;
                    } else {
                        yy = y1 - (x1 - xx) / aspect;
                    }
                }
                if (xx < 0) {
                    x1 -= xx;
                    xx = 0;
                } else if (xx > boundx) {
                    x1 -= xx - boundx;
                    xx = boundx;
                }
                if (yy < 0) {
                    y1 -= yy;
                    yy = 0;
                } else if (yy > boundy) {
                    y1 -= yy - boundy;
                    yy = boundy;
                }
                return last = makeObj(flipCoords(x1, y1, xx, yy));
            };

            function rebound(p) {
                if (p[0] < 0) p[0] = 0;
                if (p[1] < 0) p[1] = 0;
                if (p[0] > boundx) p[0] = boundx;
                if (p[1] > boundy) p[1] = boundy;
                return [p[0], p[1]];
            };

            function flipCoords(x1, y1, x2, y2) {
                var xa = x1,
                    xb = x2,
                    ya = y1,
                    yb = y2;
                if (x2 < x1) {
                    xa = x2;
                    xb = x1;
                }
                if (y2 < y1) {
                    ya = y2;
                    yb = y1;
                }
                return [Math.round(xa), Math.round(ya), Math.round(xb), Math.round(yb)];
            };

            function getRect() {
                var xsize = x2 - x1;
                var ysize = y2 - y1;
                if (xlimit && (Math.abs(xsize) > xlimit))
                    x2 = (xsize > 0) ? (x1 + xlimit) : (x1 - xlimit);
                if (ylimit && (Math.abs(ysize) > ylimit))
                    y2 = (ysize > 0) ? (y1 + ylimit) : (y1 - ylimit);
                if (ymin && (Math.abs(ysize) < ymin))
                    y2 = (ysize > 0) ? (y1 + ymin) : (y1 - ymin);
                if (xmin && (Math.abs(xsize) < xmin))
                    x2 = (xsize > 0) ? (x1 + xmin) : (x1 - xmin);
                if (x1 < 0) {
                    x2 -= x1;
                    x1 -= x1;
                }
                if (y1 < 0) {
                    y2 -= y1;
                    y1 -= y1;
                }
                if (x2 < 0) {
                    x1 -= x2;
                    x2 -= x2;
                }
                if (y2 < 0) {
                    y1 -= y2;
                    y2 -= y2;
                }
                if (x2 > boundx) {
                    var delta = x2 - boundx;
                    x1 -= delta;
                    x2 -= delta;
                }
                if (y2 > boundy) {
                    var delta = y2 - boundy;
                    y1 -= delta;
                    y2 -= delta;
                }
                if (x1 > boundx) {
                    var delta = x1 - boundy;
                    y2 -= delta;
                    y1 -= delta;
                }
                if (y1 > boundy) {
                    var delta = y1 - boundy;
                    y2 -= delta;
                    y1 -= delta;
                }
                return makeObj(flipCoords(x1, y1, x2, y2));
            };

            function makeObj(a) {
                return {
                    x: a[0],
                    y: a[1],
                    x2: a[2],
                    y2: a[3],
                    w: a[2] - a[0],
                    h: a[3] - a[1]
                };
            };
            return {
                flipCoords: flipCoords,
                setPressed: setPressed,
                setCurrent: setCurrent,
                getOffset: getOffset,
                moveOffset: moveOffset,
                getCorner: getCorner,
                getFixed: getFixed
            };
        }();
        var Selection = function () {
            var start, end, dragmode, awake, hdep = 370;
            var borders = {};
            var handle = {};
            var seehandles = false;
            var hhs = options.handleOffset;
            if (options.drawBorders) {
                borders = {
                    top: insertBorder('hline').css('top', $.browser.msie ? px(-1) : px(0)),
                    bottom: insertBorder('hline'),
                    left: insertBorder('vline'),
                    right: insertBorder('vline')
                };
            }
            if (options.dragEdges) {
                handle.t = insertDragbar('n');
                handle.b = insertDragbar('s');
                handle.r = insertDragbar('e');
                handle.l = insertDragbar('w');
            }
            options.sideHandles && createHandles(['n', 's', 'e', 'w']);
            options.cornerHandles && createHandles(['sw', 'nw', 'ne', 'se']);

            function insertBorder(type) {
                var jq = $('<div />').css({
                    position: 'absolute',
                    opacity: options.borderOpacity
                }).addClass(cssClass(type));
                $img_holder.append(jq);
                return jq;
            };

            function dragDiv(ord, zi) {
                var jq = $('<div />').mousedown(createDragger(ord)).css({
                    cursor: ord + '-resize',
                    position: 'absolute',
                    zIndex: zi
                });
                $hdl_holder.append(jq);
                return jq;
            };

            function insertHandle(ord) {
                return dragDiv(ord, hdep++).css({
                    top: px(-hhs + 1),
                    left: px(-hhs + 1),
                    opacity: options.handleOpacity
                }).addClass(cssClass('handle'));
            };

            function insertDragbar(ord) {
                var s = options.handleSize,
                    o = hhs,
                    h = s,
                    w = s,
                    t = o,
                    l = o;
                switch (ord) {
                case 'n':
                case 's':
                    w = pct(100);
                    break;
                case 'e':
                case 'w':
                    h = pct(100);
                    break;
                }
                return dragDiv(ord, hdep++).width(w).height(h).css({
                    top: px(-t + 1),
                    left: px(-l + 1)
                });
            };

            function createHandles(li) {
                for (i in li) handle[li[i]] = insertHandle(li[i]);
            };

            function moveHandles(c) {
                var midvert = Math.round((c.h / 2) - hhs),
                    midhoriz = Math.round((c.w / 2) - hhs),
                    north = west = -hhs + 1,
                    east = c.w - hhs,
                    south = c.h - hhs,
                    x, y;
                'e' in handle && handle.e.css({
                    top: px(midvert),
                    left: px(east)
                }) && handle.w.css({
                    top: px(midvert)
                }) && handle.s.css({
                    top: px(south),
                    left: px(midhoriz)
                }) && handle.n.css({
                    left: px(midhoriz)
                });
                'ne' in handle && handle.ne.css({
                    left: px(east)
                }) && handle.se.css({
                    top: px(south),
                    left: px(east)
                }) && handle.sw.css({
                    top: px(south)
                });
                'b' in handle && handle.b.css({
                    top: px(south)
                }) && handle.r.css({
                    left: px(east)
                });
            };

            function moveto(x, y) {
                $img2.css({
                    top: px(-y),
                    left: px(-x)
                });
                $sel.css({
                    top: px(y),
                    left: px(x)
                });
            };

            function resize(w, h) {
                $sel.width(w).height(h);
            };

            function refresh() {
                var c = Coords.getFixed();
                Coords.setPressed([c.x, c.y]);
                Coords.setCurrent([c.x2, c.y2]);
                updateVisible();
            };

            function updateVisible() {
                if (awake) return update();
            };

            function update() {
                var c = Coords.getFixed();
                resize(c.w, c.h);
                moveto(c.x, c.y);
                options.drawBorders && borders['right'].css({
                    left: px(c.w - 1)
                }) && borders['bottom'].css({
                    top: px(c.h - 1)
                });
                seehandles && moveHandles(c);
                awake || show();
                options.onChange(unscale(c));
            };

            function show() {
                $sel.show();
                $img.css('opacity', options.bgOpacity);
                awake = true;
            };

            function release() {
                disableHandles();
                $sel.hide();
                $img.css('opacity', 1);
                awake = false;
            };

            function showHandles() {
                if (seehandles) {
                    moveHandles(Coords.getFixed());
                    $hdl_holder.show();
                }
            };

            function enableHandles() {
                seehandles = true;
                if (options.allowResize) {
                    moveHandles(Coords.getFixed());
                    $hdl_holder.show();
                    return true;
                }
            };

            function disableHandles() {
                seehandles = false;
                $hdl_holder.hide();
            };

            function animMode(v) {
                (animating = v) ? disableHandles() : enableHandles();
            };

            function done() {
                animMode(false);
                refresh();
            };
            var $track = newTracker().mousedown(createDragger('move')).css({
                cursor: 'move',
                position: 'absolute',
                zIndex: 360
            })
            $img_holder.append($track);
            disableHandles();
            return {
                updateVisible: updateVisible,
                update: update,
                release: release,
                refresh: refresh,
                setCursor: function (cursor) {
                    $track.css('cursor', cursor);
                },
                enableHandles: enableHandles,
                enableOnly: function () {
                    seehandles = true;
                },
                showHandles: showHandles,
                disableHandles: disableHandles,
                animMode: animMode,
                done: done
            };
        }();
        var Tracker = function () {
            var onMove = function () {}, onDone = function () {}, trackDoc = options.trackDocument;
            if (!trackDoc) {
                $trk.mousemove(trackMove).mouseup(trackUp).mouseout(trackUp);
            }

            function toFront() {
                $trk.css({
                    zIndex: 450
                });
                if (trackDoc) {
                    $(document).mousemove(trackMove).mouseup(trackUp);
                }
            }

            function toBack() {
                $trk.css({
                    zIndex: 290
                });
                if (trackDoc) {
                    $(document).unbind('mousemove', trackMove).unbind('mouseup', trackUp);
                }
            }

            function trackMove(e) {
                onMove(mouseAbs(e));
            };

            function trackUp(e) {
                e.preventDefault();
                e.stopPropagation();
                if (btndown) {
                    btndown = false;
                    onDone(mouseAbs(e));
                    options.onSelect(unscale(Coords.getFixed()));
                    toBack();
                    onMove = function () {};
                    onDone = function () {};
                }
                return false;
            };

            function activateHandlers(move, done) {
                btndown = true;
                onMove = move;
                onDone = done;
                toFront();
                return false;
            };

            function setCursor(t) {
                $trk.css('cursor', t);
            };
            $img.before($trk);
            return {
                activateHandlers: activateHandlers,
                setCursor: setCursor
            };
        }();
        var KeyManager = function () {
            var $keymgr = $('<input type="radio" />').css({
                position: 'absolute',
                left: '-30px'
            }).keypress(parseKey).blur(onBlur),
                $keywrap = $('<div />').css({
                    position: 'absolute',
                    overflow: 'hidden'
                }).append($keymgr);

            function watchKeys() {
                if (options.keySupport) {
                    $keymgr.show();
                    $keymgr.focus();
                }
            };

            function onBlur(e) {
                $keymgr.hide();
            };

            function doNudge(e, x, y) {
                if (options.allowMove) {
                    Coords.moveOffset([x, y]);
                    Selection.updateVisible();
                };
                e.preventDefault();
                e.stopPropagation();
            };

            function parseKey(e) {
                if (e.ctrlKey) return true;
                shift_down = e.shiftKey ? true : false;
                var nudge = shift_down ? 10 : 1;
                switch (e.keyCode) {
                case 37:
                    doNudge(e, -nudge, 0);
                    break;
                case 39:
                    doNudge(e, nudge, 0);
                    break;
                case 38:
                    doNudge(e, 0, -nudge);
                    break;
                case 40:
                    doNudge(e, 0, nudge);
                    break;
                case 27:
                    Selection.release();
                    break;
                case 9:
                    return true;
                }
                return nothing(e);
            };
            if (options.keySupport) $keywrap.insertBefore($img);
            return {
                watchKeys: watchKeys
            };
        }();

        function px(n) {
            return '' + parseInt(n) + 'px';
        };

        function pct(n) {
            return '' + parseInt(n) + '%';
        };

        function cssClass(cl) {
            return options.baseClass + '-' + cl;
        };

        function getPos(obj) {
            var pos = $(obj).offset();
            return [pos.left, pos.top];
        };

        function mouseAbs(e) {
            return [(e.pageX - docOffset[0]), (e.pageY - docOffset[1])];
        };

        function myCursor(type) {
            if (type != lastcurs) {
                Tracker.setCursor(type);
                lastcurs = type;
            }
        };

        function startDragMode(mode, pos) {
            docOffset = getPos($img);
            Tracker.setCursor(mode == 'move' ? mode : mode + '-resize');
            if (mode == 'move')
                return Tracker.activateHandlers(createMover(pos), doneSelect);
            var fc = Coords.getFixed();
            var opp = oppLockCorner(mode);
            var opc = Coords.getCorner(oppLockCorner(opp));
            Coords.setPressed(Coords.getCorner(opp));
            Coords.setCurrent(opc);
            Tracker.activateHandlers(dragmodeHandler(mode, fc), doneSelect);
        };

        function dragmodeHandler(mode, f) {
            return function (pos) {
                if (!options.aspectRatio) switch (mode) {
                case 'e':
                    pos[1] = f.y2;
                    break;
                case 'w':
                    pos[1] = f.y2;
                    break;
                case 'n':
                    pos[0] = f.x2;
                    break;
                case 's':
                    pos[0] = f.x2;
                    break;
                } else switch (mode) {
                case 'e':
                    pos[1] = f.y + 1;
                    break;
                case 'w':
                    pos[1] = f.y + 1;
                    break;
                case 'n':
                    pos[0] = f.x + 1;
                    break;
                case 's':
                    pos[0] = f.x + 1;
                    break;
                }
                Coords.setCurrent(pos);
                Selection.update();
            };
        };

        function createMover(pos) {
            var lloc = pos;
            KeyManager.watchKeys();
            return function (pos) {
                Coords.moveOffset([pos[0] - lloc[0], pos[1] - lloc[1]]);
                lloc = pos;
                Selection.update();
            };
        };

        function oppLockCorner(ord) {
            switch (ord) {
            case 'n':
                return 'sw';
            case 's':
                return 'nw';
            case 'e':
                return 'nw';
            case 'w':
                return 'ne';
            case 'ne':
                return 'sw';
            case 'nw':
                return 'se';
            case 'se':
                return 'nw';
            case 'sw':
                return 'ne';
            };
        };

        function createDragger(ord) {
            return function (e) {
                if (options.disabled) return false;
                if ((ord == 'move') && !options.allowMove) return false;
                btndown = true;
                startDragMode(ord, mouseAbs(e));
                e.stopPropagation();
                e.preventDefault();
                return false;
            };
        };

        function presize($obj, w, h) {
            var nw = $obj.width(),
                nh = $obj.height();
            if ((nw > w) && w > 0) {
                nw = w;
                nh = (w / $obj.width()) * $obj.height();
            }
            if ((nh > h) && h > 0) {
                nh = h;
                nw = (h / $obj.height()) * $obj.width();
            }
            xscale = $obj.width() / nw;
            yscale = $obj.height() / nh;
            $obj.width(nw).height(nh);
        };

        function unscale(c) {
            return {
                x: parseInt(c.x * xscale),
                y: parseInt(c.y * yscale),
                x2: parseInt(c.x2 * xscale),
                y2: parseInt(c.y2 * yscale),
                w: parseInt(c.w * xscale),
                h: parseInt(c.h * yscale)
            };
        };

        function doneSelect(pos) {
            var c = Coords.getFixed();
            if (c.w > options.minSelect[0] && c.h > options.minSelect[1]) {
                Selection.enableHandles();
                Selection.done();
            } else {
                Selection.release();
            }
            Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
        };

        function newSelection(e) {
            if (options.disabled) return false;
            if (!options.allowSelect) return false;
            btndown = true;
            docOffset = getPos($img);
            Selection.disableHandles();
            myCursor('crosshair');
            var pos = mouseAbs(e);
            Coords.setPressed(pos);
            Tracker.activateHandlers(selectDrag, doneSelect);
            KeyManager.watchKeys();
            Selection.update();
            e.stopPropagation();
            e.preventDefault();
            return false;
        };

        function selectDrag(pos) {
            Coords.setCurrent(pos);
            Selection.update();
        };

        function newTracker() {
            var trk = $('<div></div>').addClass(cssClass('tracker'));
            $.browser.msie && trk.css({
                opacity: 0,
                backgroundColor: 'white'
            });
            return trk;
        };

        function animateTo(a) {
            var x1 = a[0] / xscale,
                y1 = a[1] / yscale,
                x2 = a[2] / xscale,
                y2 = a[3] / yscale;
            if (animating) return;
            var animto = Coords.flipCoords(x1, y1, x2, y2);
            var c = Coords.getFixed();
            var animat = initcr = [c.x, c.y, c.x2, c.y2];
            var interv = options.animationDelay;
            var x = animat[0];
            var y = animat[1];
            var x2 = animat[2];
            var y2 = animat[3];
            var ix1 = animto[0] - initcr[0];
            var iy1 = animto[1] - initcr[1];
            var ix2 = animto[2] - initcr[2];
            var iy2 = animto[3] - initcr[3];
            var pcent = 0;
            var velocity = options.swingSpeed;
            Selection.animMode(true);
            var animator = function () {
                return function () {
                    pcent += (100 - pcent) / velocity;
                    animat[0] = x + ((pcent / 100) * ix1);
                    animat[1] = y + ((pcent / 100) * iy1);
                    animat[2] = x2 + ((pcent / 100) * ix2);
                    animat[3] = y2 + ((pcent / 100) * iy2);
                    if (pcent < 100) animateStart();
                    else Selection.done(); if (pcent >= 99.8) pcent = 100;
                    setSelectRaw(animat);
                };
            }();

            function animateStart() {
                window.setTimeout(animator, interv);
            };
            animateStart();
        };

        function setSelect(rect) {
            setSelectRaw([rect[0] / xscale, rect[1] / yscale, rect[2] / xscale, rect[3] / yscale]);
        };

        function setSelectRaw(l) {
            Coords.setPressed([l[0], l[1]]);
            Coords.setCurrent([l[2], l[3]]);
            Selection.update();
        };

        function setOptions(opt) {
            if (typeof (opt) != 'object') opt = {};
            options = $.extend(options, opt);
            if (typeof (options.onChange) !== 'function')
                options.onChange = function () {};
            if (typeof (options.onSelect) !== 'function')
                options.onSelect = function () {};
        };

        function tellSelect() {
            return unscale(Coords.getFixed());
        };

        function tellScaled() {
            return Coords.getFixed();
        };

        function setOptionsNew(opt) {
            setOptions(opt);
            interfaceUpdate();
        };

        function disableCrop() {
            options.disabled = true;
            Selection.disableHandles();
            Selection.setCursor('default');
            Tracker.setCursor('default');
        };

        function enableCrop() {
            options.disabled = false;
            interfaceUpdate();
        };

        function cancelCrop() {
            Selection.done();
            Tracker.activateHandlers(null, null);
        };

        function destroy() {
            $div.remove();
            $origimg.show();
        };

        function interfaceUpdate(alt) {
            options.allowResize ? alt ? Selection.enableOnly() : Selection.enableHandles() : Selection.disableHandles();
            Tracker.setCursor(options.allowSelect ? 'crosshair' : 'default');
            Selection.setCursor(options.allowMove ? 'move' : 'default');
            $div.css('backgroundColor', options.bgColor);
            if ('setSelect' in options) {
                setSelect(opt.setSelect);
                Selection.done();
                delete(options.setSelect);
            }
            if ('trueSize' in options) {
                xscale = options.trueSize[0] / boundx;
                yscale = options.trueSize[1] / boundy;
            }
            xlimit = options.maxSize[0] || 0;
            ylimit = options.maxSize[1] || 0;
            xmin = options.minSize[0] || 0;
            ymin = options.minSize[1] || 0;
            if ('outerImage' in options) {
                $img.attr('src', options.outerImage);
                delete(options.outerImage);
            }
            Selection.refresh();
        };
        $hdl_holder.hide();
        interfaceUpdate(true);
        var api = {
            animateTo: animateTo,
            setSelect: setSelect,
            setOptions: setOptionsNew,
            tellSelect: tellSelect,
            tellScaled: tellScaled,
            disable: disableCrop,
            enable: enableCrop,
            cancel: cancelCrop,
            focus: KeyManager.watchKeys,
            getBounds: function () {
                return [boundx * xscale, boundy * yscale];
            },
            getWidgetSize: function () {
                return [boundx, boundy];
            },
            release: Selection.release,
            destroy: destroy
        };
        $origimg.data('Jcrop', api);
        return api;
    };
    $.fn.Jcrop = function (options) {
        function attachWhenDone(from) {
            var loadsrc = options.useImg || from.src;
            var img = new Image();
            img.onload = function () {
                $.Jcrop(from, options);
            };
            img.src = loadsrc;
        };
        if (typeof (options) !== 'object') options = {};
        this.each(function () {
            if ($(this).data('Jcrop')) {
                if (options == 'api') return $(this).data('Jcrop');
                else $(this).data('Jcrop').setOptions(options);
            } else attachWhenDone(this);
        });
        return this;
    };
})(jQuery);

/*
 * File:        jquery.dataTables.min.js
 * Version:     1.7.6
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 *
 * Copyright 2008-2011 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, as supplied with this software.
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function (j, ra, p) {
    j.fn.dataTableSettings = [];
    var D = j.fn.dataTableSettings;
    j.fn.dataTableExt = {};
    var n = j.fn.dataTableExt;
    n.sVersion = "1.7.6";
    n.sErrMode = "alert";
    n.iApiIndex = 0;
    n.oApi = {};
    n.afnFiltering = [];
    n.aoFeatures = [];
    n.ofnSearch = {};
    n.afnSortData = [];
    n.oStdClasses = {
        sPagePrevEnabled: "paginate_enabled_previous",
        sPagePrevDisabled: "paginate_disabled_previous",
        sPageNextEnabled: "paginate_enabled_next",
        sPageNextDisabled: "paginate_disabled_next",
        sPageJUINext: "",
        sPageJUIPrev: "",
        sPageButton: "paginate_button",
        sPageButtonActive: "paginate_active",
        sPageButtonStaticDisabled: "paginate_button",
        sPageFirst: "first",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "sorting_asc",
        sSortDesc: "sorting_desc",
        sSortable: "sorting",
        sSortableAsc: "sorting_asc_disabled",
        sSortableDesc: "sorting_desc_disabled",
        sSortableNone: "sorting_disabled",
        sSortColumn: "sorting_",
        sSortJUIAsc: "",
        sSortJUIDesc: "",
        sSortJUI: "",
        sSortJUIAscAllowed: "",
        sSortJUIDescAllowed: "",
        sSortJUIWrapper: "",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: ""
    };
    n.oJUIClasses = {
        sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
        sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
        sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
        sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
        sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
        sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
        sPageButton: "fg-button ui-button ui-state-default",
        sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
        sPageFirst: "first ui-corner-tl ui-corner-bl",
        sPagePrevious: "previous",
        sPageNext: "next",
        sPageLast: "last ui-corner-tr ui-corner-br",
        sStripOdd: "odd",
        sStripEven: "even",
        sRowEmpty: "dataTables_empty",
        sWrapper: "dataTables_wrapper",
        sFilter: "dataTables_filter",
        sInfo: "dataTables_info",
        sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
        sLength: "dataTables_length",
        sProcessing: "dataTables_processing",
        sSortAsc: "ui-state-default",
        sSortDesc: "ui-state-default",
        sSortable: "ui-state-default",
        sSortableAsc: "ui-state-default",
        sSortableDesc: "ui-state-default",
        sSortableNone: "ui-state-default",
        sSortColumn: "sorting_",
        sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
        sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
        sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
        sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
        sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
        sSortJUIWrapper: "DataTables_sort_wrapper",
        sScrollWrapper: "dataTables_scroll",
        sScrollHead: "dataTables_scrollHead ui-state-default",
        sScrollHeadInner: "dataTables_scrollHeadInner",
        sScrollBody: "dataTables_scrollBody",
        sScrollFoot: "dataTables_scrollFoot ui-state-default",
        sScrollFootInner: "dataTables_scrollFootInner",
        sFooterTH: "ui-state-default"
    };
    n.oPagination = {
        two_button: {
            fnInit: function (g, m, r) {
                var s, w, y;
                if (g.bJUI) {
                    s = p.createElement("a");
                    w = p.createElement("a");
                    y = p.createElement("span");
                    y.className = g.oClasses.sPageJUINext;
                    w.appendChild(y);
                    y = p.createElement("span");
                    y.className = g.oClasses.sPageJUIPrev;
                    s.appendChild(y)
                } else {
                    s = p.createElement("div");
                    w = p.createElement("div")
                }
                s.className =
                    g.oClasses.sPagePrevDisabled;
                w.className = g.oClasses.sPageNextDisabled;
                s.title = g.oLanguage.oPaginate.sPrevious;
                w.title = g.oLanguage.oPaginate.sNext;
                m.appendChild(s);
                m.appendChild(w);
                j(s).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "previous") && r(g)
                });
                j(w).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "next") && r(g)
                });
                j(s).bind("selectstart.DT", function () {
                    return false
                });
                j(w).bind("selectstart.DT", function () {
                    return false
                });
                if (g.sTableId !== "" && typeof g.aanFeatures.p == "undefined") {
                    m.setAttribute("id",
                        g.sTableId + "_paginate");
                    s.setAttribute("id", g.sTableId + "_previous");
                    w.setAttribute("id", g.sTableId + "_next")
                }
            },
            fnUpdate: function (g) {
                if (g.aanFeatures.p)
                    for (var m = g.aanFeatures.p, r = 0, s = m.length; r < s; r++)
                        if (m[r].childNodes.length !== 0) {
                            m[r].childNodes[0].className = g._iDisplayStart === 0 ? g.oClasses.sPagePrevDisabled : g.oClasses.sPagePrevEnabled;
                            m[r].childNodes[1].className = g.fnDisplayEnd() == g.fnRecordsDisplay() ? g.oClasses.sPageNextDisabled : g.oClasses.sPageNextEnabled
                        }
            }
        },
        iFullNumbersShowPages: 5,
        full_numbers: {
            fnInit: function (g,
                m, r) {
                var s = p.createElement("span"),
                    w = p.createElement("span"),
                    y = p.createElement("span"),
                    F = p.createElement("span"),
                    x = p.createElement("span");
                s.innerHTML = g.oLanguage.oPaginate.sFirst;
                w.innerHTML = g.oLanguage.oPaginate.sPrevious;
                F.innerHTML = g.oLanguage.oPaginate.sNext;
                x.innerHTML = g.oLanguage.oPaginate.sLast;
                var u = g.oClasses;
                s.className = u.sPageButton + " " + u.sPageFirst;
                w.className = u.sPageButton + " " + u.sPagePrevious;
                F.className = u.sPageButton + " " + u.sPageNext;
                x.className = u.sPageButton + " " + u.sPageLast;
                m.appendChild(s);
                m.appendChild(w);
                m.appendChild(y);
                m.appendChild(F);
                m.appendChild(x);
                j(s).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "first") && r(g)
                });
                j(w).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "previous") && r(g)
                });
                j(F).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "next") && r(g)
                });
                j(x).bind("click.DT", function () {
                    g.oApi._fnPageChange(g, "last") && r(g)
                });
                j("span", m).bind("mousedown.DT", function () {
                    return false
                }).bind("selectstart.DT", function () {
                    return false
                });
                if (g.sTableId !== "" && typeof g.aanFeatures.p ==
                    "undefined") {
                    m.setAttribute("id", g.sTableId + "_paginate");
                    s.setAttribute("id", g.sTableId + "_first");
                    w.setAttribute("id", g.sTableId + "_previous");
                    F.setAttribute("id", g.sTableId + "_next");
                    x.setAttribute("id", g.sTableId + "_last")
                }
            },
            fnUpdate: function (g, m) {
                if (g.aanFeatures.p) {
                    var r = n.oPagination.iFullNumbersShowPages,
                        s = Math.floor(r / 2),
                        w = Math.ceil(g.fnRecordsDisplay() / g._iDisplayLength),
                        y = Math.ceil(g._iDisplayStart / g._iDisplayLength) + 1,
                        F = "",
                        x, u = g.oClasses;
                    if (w < r) {
                        s = 1;
                        x = w
                    } else if (y <= s) {
                        s = 1;
                        x = r
                    } else if (y >= w - s) {
                        s =
                            w - r + 1;
                        x = w
                    } else {
                        s = y - Math.ceil(r / 2) + 1;
                        x = s + r - 1
                    }
                    for (r = s; r <= x; r++) F += y != r ? '<span class="' + u.sPageButton + '">' + r + "</span>" : '<span class="' + u.sPageButtonActive + '">' + r + "</span>";
                    x = g.aanFeatures.p;
                    var z, U = function () {
                            g._iDisplayStart = (this.innerHTML * 1 - 1) * g._iDisplayLength;
                            m(g);
                            return false
                        }, C = function () {
                            return false
                        };
                    r = 0;
                    for (s = x.length; r < s; r++)
                        if (x[r].childNodes.length !== 0) {
                            z = j("span:eq(2)", x[r]);
                            z.html(F);
                            j("span", z).bind("click.DT", U).bind("mousedown.DT", C).bind("selectstart.DT", C);
                            z = x[r].getElementsByTagName("span");
                            z = [z[0], z[1], z[z.length - 2], z[z.length - 1]];
                            j(z).removeClass(u.sPageButton + " " + u.sPageButtonActive + " " + u.sPageButtonStaticDisabled);
                            if (y == 1) {
                                z[0].className += " " + u.sPageButtonStaticDisabled;
                                z[1].className += " " + u.sPageButtonStaticDisabled
                            } else {
                                z[0].className += " " + u.sPageButton;
                                z[1].className += " " + u.sPageButton
                            } if (w === 0 || y == w || g._iDisplayLength == -1) {
                                z[2].className += " " + u.sPageButtonStaticDisabled;
                                z[3].className += " " + u.sPageButtonStaticDisabled
                            } else {
                                z[2].className += " " + u.sPageButton;
                                z[3].className += " " +
                                    u.sPageButton
                            }
                        }
                }
            }
        }
    };
    n.oSort = {
        "string-asc": function (g, m) {
            g = g.toLowerCase();
            m = m.toLowerCase();
            return g < m ? -1 : g > m ? 1 : 0
        },
        "string-desc": function (g, m) {
            g = g.toLowerCase();
            m = m.toLowerCase();
            return g < m ? 1 : g > m ? -1 : 0
        },
        "html-asc": function (g, m) {
            g = g.replace(/<.*?>/g, "").toLowerCase();
            m = m.replace(/<.*?>/g, "").toLowerCase();
            return g < m ? -1 : g > m ? 1 : 0
        },
        "html-desc": function (g, m) {
            g = g.replace(/<.*?>/g, "").toLowerCase();
            m = m.replace(/<.*?>/g, "").toLowerCase();
            return g < m ? 1 : g > m ? -1 : 0
        },
        "date-asc": function (g, m) {
            g = Date.parse(g);
            m = Date.parse(m);
            if (isNaN(g) || g === "") g = Date.parse("01/01/1970 00:00:00");
            if (isNaN(m) || m === "") m = Date.parse("01/01/1970 00:00:00");
            return g - m
        },
        "date-desc": function (g, m) {
            g = Date.parse(g);
            m = Date.parse(m);
            if (isNaN(g) || g === "") g = Date.parse("01/01/1970 00:00:00");
            if (isNaN(m) || m === "") m = Date.parse("01/01/1970 00:00:00");
            return m - g
        },
        "numeric-asc": function (g, m) {
            return (g == "-" || g === "" ? 0 : g * 1) - (m == "-" || m === "" ? 0 : m * 1)
        },
        "numeric-desc": function (g, m) {
            return (m == "-" || m === "" ? 0 : m * 1) - (g == "-" || g === "" ? 0 : g * 1)
        }
    };
    n.aTypes = [
        function (g) {
            if (g.length ===
                0) return "numeric";
            var m, r = false;
            m = g.charAt(0);
            if ("0123456789-".indexOf(m) == -1) return null;
            for (var s = 1; s < g.length; s++) {
                m = g.charAt(s);
                if ("0123456789.".indexOf(m) == -1) return null;
                if (m == ".") {
                    if (r) return null;
                    r = true
                }
            }
            return "numeric"
        },
        function (g) {
            var m = Date.parse(g);
            if (m !== null && !isNaN(m) || g.length === 0) return "date";
            return null
        },
        function (g) {
            if (g.indexOf("<") != -1 && g.indexOf(">") != -1) return "html";
            return null
        }
    ];
    n.fnVersionCheck = function (g) {
        var m = function (x, u) {
            for (; x.length < u;) x += "0";
            return x
        }, r = n.sVersion.split(".");
        g = g.split(".");
        for (var s = "", w = "", y = 0, F = g.length; y < F; y++) {
            s += m(r[y], 3);
            w += m(g[y], 3)
        }
        return parseInt(s, 10) >= parseInt(w, 10)
    };
    n._oExternConfig = {
        iNextUnique: 0
    };
    j.fn.dataTable = function (g) {
        function m() {
            this.fnRecordsTotal = function () {
                return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
            };
            this.fnRecordsDisplay = function () {
                return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
            };
            this.fnDisplayEnd = function () {
                return this.oFeatures.bServerSide ?
                    this.oFeatures.bPaginate === false || this._iDisplayLength == -1 ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
            };
            this.sInstance = this.oInstance = null;
            this.oFeatures = {
                bPaginate: true,
                bLengthChange: true,
                bFilter: true,
                bSort: true,
                bInfo: true,
                bAutoWidth: true,
                bProcessing: false,
                bSortClasses: true,
                bStateSave: false,
                bServerSide: false
            };
            this.oScroll = {
                sX: "",
                sXInner: "",
                sY: "",
                bCollapse: false,
                bInfinite: false,
                iLoadGap: 100,
                iBarWidth: 0,
                bAutoCss: true
            };
            this.aanFeatures = [];
            this.oLanguage = {
                sProcessing: "Processing...",
                sLengthMenu: "Show _MENU_ entries",
                sZeroRecords: "No matching records found",
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sSearch: "Search:",
                sUrl: "",
                oPaginate: {
                    sFirst: "First",
                    sPrevious: "Previous",
                    sNext: "Next",
                    sLast: "Last"
                },
                fnInfoCallback: null
            };
            this.aoData = [];
            this.aiDisplay = [];
            this.aiDisplayMaster = [];
            this.aoColumns = [];
            this.iNextId = 0;
            this.asDataSearch = [];
            this.oPreviousSearch = {
                sSearch: "",
                bRegex: false,
                bSmart: true
            };
            this.aoPreSearchCols = [];
            this.aaSorting = [
                [0, "asc", 0]
            ];
            this.aaSortingFixed = null;
            this.asStripClasses = [];
            this.asDestoryStrips = [];
            this.sDestroyWidth = 0;
            this.fnFooterCallback = this.fnHeaderCallback = this.fnRowCallback = null;
            this.aoDrawCallback = [];
            this.fnInitComplete = null;
            this.sTableId = "";
            this.nTableWrapper = this.nTBody = this.nTFoot = this.nTHead = this.nTable = null;
            this.bInitialised = false;
            this.aoOpenRows = [];
            this.sDom = "lfrtip";
            this.sPaginationType = "two_button";
            this.iCookieDuration = 7200;
            this.sCookiePrefix = "SpryMedia_DataTables_";
            this.fnCookieCallback = null;
            this.aoStateSave = [];
            this.aoStateLoad = [];
            this.sAjaxSource = this.oLoadedState = null;
            this.bAjaxDataGet = true;
            this.fnServerData = function (a, b, c) {
                j.ajax({
                    url: a,
                    data: b,
                    success: c,
                    dataType: "json",
                    cache: false,
                    error: function (d, f) {
                        f == "parsererror" && alert("DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
                    }
                })
            };
            this.fnFormatNumber = function (a) {
                if (a < 1E3) return a;
                else {
                    var b = a + "";
                    a = b.split("");
                    var c = "";
                    b = b.length;
                    for (var d = 0; d < b; d++) {
                        if (d % 3 === 0 && d !== 0) c = "," + c;
                        c = a[b - d - 1] + c
                    }
                }
                return c
            };
            this.aLengthMenu = [10, 25, 50, 100];
            this.bDrawing = this.iDraw = 0;
            this.iDrawError = -1;
            this._iDisplayLength = 10;
            this._iDisplayStart = 0;
            this._iDisplayEnd = 10;
            this._iRecordsDisplay = this._iRecordsTotal = 0;
            this.bJUI = false;
            this.oClasses = n.oStdClasses;
            this.bSorted = this.bFiltered = false;
            this.oInit = null
        }

        function r(a) {
            return function () {
                var b = [A(this[n.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                return n.oApi[a].apply(this, b)
            }
        }

        function s(a) {
            var b, c;
            if (a.bInitialised === false) setTimeout(function () {
                s(a)
            }, 200);
            else {
                sa(a);
                U(a);
                K(a, true);
                a.oFeatures.bAutoWidth && $(a);
                b = 0;
                for (c = a.aoColumns.length; b < c; b++)
                    if (a.aoColumns[b].sWidth !== null) a.aoColumns[b].nTh.style.width = v(a.aoColumns[b].sWidth);
                if (a.oFeatures.bSort) O(a);
                else {
                    a.aiDisplay = a.aiDisplayMaster.slice();
                    E(a);
                    C(a)
                } if (a.sAjaxSource !== null && !a.oFeatures.bServerSide) a.fnServerData.call(a.oInstance, a.sAjaxSource, [], function (d) {
                    for (b = 0; b < d.aaData.length; b++) u(a,
                        d.aaData[b]);
                    a.iInitDisplayStart = a._iDisplayStart;
                    if (a.oFeatures.bSort) O(a);
                    else {
                        a.aiDisplay = a.aiDisplayMaster.slice();
                        E(a);
                        C(a)
                    }
                    K(a, false);
                    w(a, d)
                });
                else if (!a.oFeatures.bServerSide) {
                    K(a, false);
                    w(a)
                }
            }
        }

        function w(a, b) {
            a._bInitComplete = true;
            if (typeof a.fnInitComplete == "function") typeof b != "undefined" ? a.fnInitComplete.call(a.oInstance, a, b) : a.fnInitComplete.call(a.oInstance, a)
        }

        function y(a, b, c) {
            o(a.oLanguage, b, "sProcessing");
            o(a.oLanguage, b, "sLengthMenu");
            o(a.oLanguage, b, "sEmptyTable");
            o(a.oLanguage,
                b, "sZeroRecords");
            o(a.oLanguage, b, "sInfo");
            o(a.oLanguage, b, "sInfoEmpty");
            o(a.oLanguage, b, "sInfoFiltered");
            o(a.oLanguage, b, "sInfoPostFix");
            o(a.oLanguage, b, "sSearch");
            if (typeof b.oPaginate != "undefined") {
                o(a.oLanguage.oPaginate, b.oPaginate, "sFirst");
                o(a.oLanguage.oPaginate, b.oPaginate, "sPrevious");
                o(a.oLanguage.oPaginate, b.oPaginate, "sNext");
                o(a.oLanguage.oPaginate, b.oPaginate, "sLast")
            }
            typeof b.sEmptyTable == "undefined" && typeof b.sZeroRecords != "undefined" && o(a.oLanguage, b, "sZeroRecords", "sEmptyTable");
            c && s(a)
        }

        function F(a, b) {
            a.aoColumns[a.aoColumns.length++] = {
                sType: null,
                _bAutoType: true,
                bVisible: true,
                bSearchable: true,
                bSortable: true,
                asSorting: ["asc", "desc"],
                sSortingClass: a.oClasses.sSortable,
                sSortingClassJUI: a.oClasses.sSortJUI,
                sTitle: b ? b.innerHTML : "",
                sName: "",
                sWidth: null,
                sWidthOrig: null,
                sClass: null,
                fnRender: null,
                bUseRendered: true,
                iDataSort: a.aoColumns.length - 1,
                sSortDataType: "std",
                nTh: b ? b : p.createElement("th"),
                nTf: null,
                anThExtra: [],
                anTfExtra: []
            };
            b = a.aoColumns.length - 1;
            if (typeof a.aoPreSearchCols[b] ==
                "undefined" || a.aoPreSearchCols[b] === null) a.aoPreSearchCols[b] = {
                sSearch: "",
                bRegex: false,
                bSmart: true
            };
            else {
                if (typeof a.aoPreSearchCols[b].bRegex == "undefined") a.aoPreSearchCols[b].bRegex = true;
                if (typeof a.aoPreSearchCols[b].bSmart == "undefined") a.aoPreSearchCols[b].bSmart = true
            }
            x(a, b, null)
        }

        function x(a, b, c) {
            b = a.aoColumns[b];
            if (typeof c != "undefined" && c !== null) {
                if (typeof c.sType != "undefined") {
                    b.sType = c.sType;
                    b._bAutoType = false
                }
                o(b, c, "bVisible");
                o(b, c, "bSearchable");
                o(b, c, "bSortable");
                o(b, c, "sTitle");
                o(b,
                    c, "sName");
                o(b, c, "sWidth");
                o(b, c, "sWidth", "sWidthOrig");
                o(b, c, "sClass");
                o(b, c, "fnRender");
                o(b, c, "bUseRendered");
                o(b, c, "iDataSort");
                o(b, c, "asSorting");
                o(b, c, "sSortDataType")
            }
            if (!a.oFeatures.bSort) b.bSortable = false;
            if (!b.bSortable || j.inArray("asc", b.asSorting) == -1 && j.inArray("desc", b.asSorting) == -1) {
                b.sSortingClass = a.oClasses.sSortableNone;
                b.sSortingClassJUI = ""
            } else if (j.inArray("asc", b.asSorting) != -1 && j.inArray("desc", b.asSorting) == -1) {
                b.sSortingClass = a.oClasses.sSortableAsc;
                b.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed
            } else if (j.inArray("asc",
                b.asSorting) == -1 && j.inArray("desc", b.asSorting) != -1) {
                b.sSortingClass = a.oClasses.sSortableDesc;
                b.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed
            }
        }

        function u(a, b) {
            if (b.length != a.aoColumns.length && a.iDrawError != a.iDraw) {
                H(a, 0, "Added data (size " + b.length + ") does not match known number of columns (" + a.aoColumns.length + ")");
                a.iDrawError = a.iDraw;
                return -1
            }
            b = b.slice();
            var c = a.aoData.length;
            a.aoData.push({
                nTr: p.createElement("tr"),
                _iId: a.iNextId++,
                _aData: b,
                _anHidden: [],
                _sRowStripe: ""
            });
            for (var d, f, e = 0; e < b.length; e++) {
                d =
                    p.createElement("td");
                if (b[e] === null) b[e] = "";
                if (typeof a.aoColumns[e].fnRender == "function") {
                    f = a.aoColumns[e].fnRender({
                        iDataRow: c,
                        iDataColumn: e,
                        aData: b,
                        oSettings: a
                    });
                    d.innerHTML = f;
                    if (a.aoColumns[e].bUseRendered) a.aoData[c]._aData[e] = f
                } else d.innerHTML = b[e]; if (typeof b[e] != "string") b[e] += "";
                b[e] = j.trim(b[e]);
                if (a.aoColumns[e].sClass !== null) d.className = a.aoColumns[e].sClass;
                if (a.aoColumns[e]._bAutoType && a.aoColumns[e].sType != "string") {
                    f = aa(a.aoData[c]._aData[e]);
                    if (a.aoColumns[e].sType === null) a.aoColumns[e].sType =
                        f;
                    else if (a.aoColumns[e].sType != f) a.aoColumns[e].sType = "string"
                }
                if (a.aoColumns[e].bVisible) {
                    a.aoData[c].nTr.appendChild(d);
                    a.aoData[c]._anHidden[e] = null
                } else a.aoData[c]._anHidden[e] = d
            }
            a.aiDisplayMaster.push(c);
            return c
        }

        function z(a) {
            var b, c, d, f, e, i, h, k;
            if (a.sAjaxSource === null) {
                h = a.nTBody.childNodes;
                b = 0;
                for (c = h.length; b < c; b++)
                    if (h[b].nodeName.toUpperCase() == "TR") {
                        i = a.aoData.length;
                        a.aoData.push({
                            nTr: h[b],
                            _iId: a.iNextId++,
                            _aData: [],
                            _anHidden: [],
                            _sRowStripe: ""
                        });
                        a.aiDisplayMaster.push(i);
                        k = a.aoData[i]._aData;
                        i = h[b].childNodes;
                        d = e = 0;
                        for (f = i.length; d < f; d++)
                            if (i[d].nodeName.toUpperCase() == "TD") {
                                k[e] = j.trim(i[d].innerHTML);
                                e++
                            }
                    }
            }
            h = R(a);
            i = [];
            b = 0;
            for (c = h.length; b < c; b++) {
                d = 0;
                for (f = h[b].childNodes.length; d < f; d++) {
                    e = h[b].childNodes[d];
                    e.nodeName.toUpperCase() == "TD" && i.push(e)
                }
            }
            i.length != h.length * a.aoColumns.length && H(a, 1, "Unexpected number of TD elements. Expected " + h.length * a.aoColumns.length + " and got " + i.length + ". DataTables does not support rowspan / colspan in the table body, and there must be one cell for each row/column combination.");
            h = 0;
            for (d = a.aoColumns.length; h < d; h++) {
                if (a.aoColumns[h].sTitle === null) a.aoColumns[h].sTitle = a.aoColumns[h].nTh.innerHTML;
                f = a.aoColumns[h]._bAutoType;
                e = typeof a.aoColumns[h].fnRender == "function";
                k = a.aoColumns[h].sClass !== null;
                var l = a.aoColumns[h].bVisible,
                    q, t;
                if (f || e || k || !l) {
                    b = 0;
                    for (c = a.aoData.length; b < c; b++) {
                        q = i[b * d + h];
                        if (f)
                            if (a.aoColumns[h].sType != "string") {
                                t = aa(a.aoData[b]._aData[h]);
                                if (a.aoColumns[h].sType === null) a.aoColumns[h].sType = t;
                                else if (a.aoColumns[h].sType != t) a.aoColumns[h].sType = "string"
                            }
                        if (e) {
                            t =
                                a.aoColumns[h].fnRender({
                                    iDataRow: b,
                                    iDataColumn: h,
                                    aData: a.aoData[b]._aData,
                                    oSettings: a
                                });
                            q.innerHTML = t;
                            if (a.aoColumns[h].bUseRendered) a.aoData[b]._aData[h] = t
                        }
                        if (k) q.className += " " + a.aoColumns[h].sClass;
                        if (l) a.aoData[b]._anHidden[h] = null;
                        else {
                            a.aoData[b]._anHidden[h] = q;
                            q.parentNode.removeChild(q)
                        }
                    }
                }
            }
        }

        function U(a) {
            var b, c, d, f, e, i = a.nTHead.getElementsByTagName("tr"),
                h = 0,
                k;
            if (a.nTHead.getElementsByTagName("th").length !== 0) {
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    a.aoColumns[b].sClass !==
                        null && j(c).addClass(a.aoColumns[b].sClass);
                    f = 1;
                    for (e = i.length; f < e; f++) {
                        k = j(i[f]).children();
                        a.aoColumns[b].anThExtra.push(k[b - h]);
                        a.aoColumns[b].bVisible || i[f].removeChild(k[b - h])
                    }
                    if (a.aoColumns[b].bVisible) {
                        if (a.aoColumns[b].sTitle != c.innerHTML) c.innerHTML = a.aoColumns[b].sTitle
                    } else {
                        c.parentNode.removeChild(c);
                        h++
                    }
                }
            } else {
                f = p.createElement("tr");
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    c.innerHTML = a.aoColumns[b].sTitle;
                    a.aoColumns[b].sClass !== null && j(c).addClass(a.aoColumns[b].sClass);
                    a.aoColumns[b].bVisible && f.appendChild(c)
                }
                j(a.nTHead).html("")[0].appendChild(f)
            } if (a.bJUI) {
                b = 0;
                for (d = a.aoColumns.length; b < d; b++) {
                    c = a.aoColumns[b].nTh;
                    f = p.createElement("div");
                    f.className = a.oClasses.sSortJUIWrapper;
                    j(c).contents().appendTo(f);
                    f.appendChild(p.createElement("span"));
                    c.appendChild(f)
                }
            }
            d = function () {
                this.onselectstart = function () {
                    return false
                };
                return false
            };
            if (a.oFeatures.bSort)
                for (b = 0; b < a.aoColumns.length; b++)
                    if (a.aoColumns[b].bSortable !== false) {
                        ba(a, a.aoColumns[b].nTh, b);
                        j(a.aoColumns[b].nTh).bind("mousedown.DT",
                            d)
                    } else j(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
            if (a.nTFoot !== null) {
                h = 0;
                i = a.nTFoot.getElementsByTagName("tr");
                c = i[0].getElementsByTagName("th");
                b = 0;
                for (d = c.length; b < d; b++)
                    if (typeof a.aoColumns[b] != "undefined") {
                        a.aoColumns[b].nTf = c[b - h];
                        if (a.oClasses.sFooterTH !== "") a.aoColumns[b].nTf.className += " " + a.oClasses.sFooterTH;
                        f = 1;
                        for (e = i.length; f < e; f++) {
                            k = j(i[f]).children();
                            a.aoColumns[b].anTfExtra.push(k[b - h]);
                            a.aoColumns[b].bVisible || i[f].removeChild(k[b - h])
                        }
                        if (!a.aoColumns[b].bVisible) {
                            c[b -
                                h].parentNode.removeChild(c[b - h]);
                            h++
                        }
                    }
            }
        }

        function C(a) {
            var b, c, d = [],
                f = 0,
                e = false;
            b = a.asStripClasses.length;
            c = a.aoOpenRows.length;
            a.bDrawing = true;
            if (typeof a.iInitDisplayStart != "undefined" && a.iInitDisplayStart != -1) {
                a._iDisplayStart = a.oFeatures.bServerSide ? a.iInitDisplayStart : a.iInitDisplayStart >= a.fnRecordsDisplay() ? 0 : a.iInitDisplayStart;
                a.iInitDisplayStart = -1;
                E(a)
            }
            if (!(!a.bDestroying && a.oFeatures.bServerSide && !ta(a))) {
                a.oFeatures.bServerSide || a.iDraw++;
                if (a.aiDisplay.length !== 0) {
                    var i = a._iDisplayStart,
                        h = a._iDisplayEnd;
                    if (a.oFeatures.bServerSide) {
                        i = 0;
                        h = a.aoData.length
                    }
                    for (i = i; i < h; i++) {
                        var k = a.aoData[a.aiDisplay[i]],
                            l = k.nTr;
                        if (b !== 0) {
                            var q = a.asStripClasses[f % b];
                            if (k._sRowStripe != q) {
                                j(l).removeClass(k._sRowStripe).addClass(q);
                                k._sRowStripe = q
                            }
                        }
                        if (typeof a.fnRowCallback == "function") {
                            l = a.fnRowCallback.call(a.oInstance, l, a.aoData[a.aiDisplay[i]]._aData, f, i);
                            if (!l && !e) {
                                H(a, 0, "A node was not returned by fnRowCallback");
                                e = true
                            }
                        }
                        d.push(l);
                        f++;
                        if (c !== 0)
                            for (k = 0; k < c; k++) l == a.aoOpenRows[k].nParent && d.push(a.aoOpenRows[k].nTr)
                    }
                } else {
                    d[0] =
                        p.createElement("tr");
                    if (typeof a.asStripClasses[0] != "undefined") d[0].className = a.asStripClasses[0];
                    e = p.createElement("td");
                    e.setAttribute("valign", "top");
                    e.colSpan = S(a);
                    e.className = a.oClasses.sRowEmpty;
                    e.innerHTML = typeof a.oLanguage.sEmptyTable != "undefined" && a.fnRecordsTotal() === 0 ? a.oLanguage.sEmptyTable : a.oLanguage.sZeroRecords.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal()));
                    d[f].appendChild(e)
                }
                typeof a.fnHeaderCallback == "function" && a.fnHeaderCallback.call(a.oInstance, j(">tr", a.nTHead)[0],
                    V(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay);
                typeof a.fnFooterCallback == "function" && a.fnFooterCallback.call(a.oInstance, j(">tr", a.nTFoot)[0], V(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay);
                f = p.createDocumentFragment();
                b = p.createDocumentFragment();
                if (a.nTBody) {
                    e = a.nTBody.parentNode;
                    b.appendChild(a.nTBody);
                    if (!a.oScroll.bInfinite || !a._bInitComplete || a.bSorted || a.bFiltered) {
                        c = a.nTBody.childNodes;
                        for (b = c.length - 1; b >= 0; b--) c[b].parentNode.removeChild(c[b])
                    }
                    b = 0;
                    for (c = d.length; b < c; b++) f.appendChild(d[b]);
                    a.nTBody.appendChild(f);
                    e !== null && e.appendChild(a.nTBody)
                }
                for (b = a.aoDrawCallback.length - 1; b >= 0; b--) a.aoDrawCallback[b].fn.call(a.oInstance, a);
                a.bSorted = false;
                a.bFiltered = false;
                a.bDrawing = false;
                if (a.oFeatures.bServerSide) {
                    K(a, false);
                    typeof a._bInitComplete == "undefined" && w(a)
                }
            }
        }

        function W(a) {
            if (a.oFeatures.bSort) O(a, a.oPreviousSearch);
            else if (a.oFeatures.bFilter) P(a, a.oPreviousSearch);
            else {
                E(a);
                C(a)
            }
        }

        function ta(a) {
            if (a.bAjaxDataGet) {
                K(a, true);
                var b = a.aoColumns.length,
                    c = [],
                    d;
                a.iDraw++;
                c.push({
                    name: "sEcho",
                    value: a.iDraw
                });
                c.push({
                    name: "iColumns",
                    value: b
                });
                c.push({
                    name: "sColumns",
                    value: ca(a)
                });
                c.push({
                    name: "iDisplayStart",
                    value: a._iDisplayStart
                });
                c.push({
                    name: "iDisplayLength",
                    value: a.oFeatures.bPaginate !== false ? a._iDisplayLength : -1
                });
                if (a.oFeatures.bFilter !== false) {
                    c.push({
                        name: "sSearch",
                        value: a.oPreviousSearch.sSearch
                    });
                    c.push({
                        name: "bRegex",
                        value: a.oPreviousSearch.bRegex
                    });
                    for (d = 0; d < b; d++) {
                        c.push({
                            name: "sSearch_" + d,
                            value: a.aoPreSearchCols[d].sSearch
                        });
                        c.push({
                            name: "bRegex_" + d,
                            value: a.aoPreSearchCols[d].bRegex
                        });
                        c.push({
                            name: "bSearchable_" + d,
                            value: a.aoColumns[d].bSearchable
                        })
                    }
                }
                if (a.oFeatures.bSort !== false) {
                    var f = a.aaSortingFixed !== null ? a.aaSortingFixed.length : 0,
                        e = a.aaSorting.length;
                    c.push({
                        name: "iSortingCols",
                        value: f + e
                    });
                    for (d = 0; d < f; d++) {
                        c.push({
                            name: "iSortCol_" + d,
                            value: a.aaSortingFixed[d][0]
                        });
                        c.push({
                            name: "sSortDir_" + d,
                            value: a.aaSortingFixed[d][1]
                        })
                    }
                    for (d = 0; d < e; d++) {
                        c.push({
                            name: "iSortCol_" + (d + f),
                            value: a.aaSorting[d][0]
                        });
                        c.push({
                            name: "sSortDir_" + (d + f),
                            value: a.aaSorting[d][1]
                        })
                    }
                    for (d = 0; d < b; d++) c.push({
                        name: "bSortable_" + d,
                        value: a.aoColumns[d].bSortable
                    })
                }
                a.fnServerData.call(a.oInstance, a.sAjaxSource, c, function (i) {
                    ua(a, i)
                });
                return false
            } else return true
        }

        function ua(a, b) {
            if (typeof b.sEcho != "undefined")
                if (b.sEcho * 1 < a.iDraw) return;
                else a.iDraw = b.sEcho * 1;
            if (!a.oScroll.bInfinite || a.oScroll.bInfinite && (a.bSorted || a.bFiltered)) da(a);
            a._iRecordsTotal = b.iTotalRecords;
            a._iRecordsDisplay = b.iTotalDisplayRecords;
            var c = ca(a);
            if (c = typeof b.sColumns != "undefined" && c !== "" && b.sColumns != c) var d = va(a, b.sColumns);
            for (var f = 0, e = b.aaData.length; f <
                e; f++)
                if (c) {
                    for (var i = [], h = 0, k = a.aoColumns.length; h < k; h++) i.push(b.aaData[f][d[h]]);
                    u(a, i)
                } else u(a, b.aaData[f]);
            a.aiDisplay = a.aiDisplayMaster.slice();
            a.bAjaxDataGet = false;
            C(a);
            a.bAjaxDataGet = true;
            K(a, false)
        }

        function sa(a) {
            var b = p.createElement("div");
            a.nTable.parentNode.insertBefore(b, a.nTable);
            a.nTableWrapper = p.createElement("div");
            a.nTableWrapper.className = a.oClasses.sWrapper;
            a.sTableId !== "" && a.nTableWrapper.setAttribute("id", a.sTableId + "_wrapper");
            for (var c = a.nTableWrapper, d = a.sDom.split(""),
                    f, e, i, h, k, l, q, t = 0; t < d.length; t++) {
                e = 0;
                i = d[t];
                if (i == "<") {
                    h = p.createElement("div");
                    k = d[t + 1];
                    if (k == "'" || k == '"') {
                        l = "";
                        for (q = 2; d[t + q] != k;) {
                            l += d[t + q];
                            q++
                        }
                        if (l == "H") l = "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix";
                        else if (l == "F") l = "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix";
                        if (l.indexOf(".") != -1) {
                            k = l.split(".");
                            h.setAttribute("id", k[0].substr(1, k[0].length - 1));
                            h.className = k[1]
                        } else if (l.charAt(0) == "#") h.setAttribute("id", l.substr(1,
                            l.length - 1));
                        else h.className = l;
                        t += q
                    }
                    c.appendChild(h);
                    c = h
                } else if (i == ">") c = c.parentNode;
                else if (i == "l" && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) {
                    f = wa(a);
                    e = 1
                } else if (i == "f" && a.oFeatures.bFilter) {
                    f = xa(a);
                    e = 1
                } else if (i == "r" && a.oFeatures.bProcessing) {
                    f = ya(a);
                    e = 1
                } else if (i == "t") {
                    f = za(a);
                    e = 1
                } else if (i == "i" && a.oFeatures.bInfo) {
                    f = Aa(a);
                    e = 1
                } else if (i == "p" && a.oFeatures.bPaginate) {
                    f = Ba(a);
                    e = 1
                } else if (n.aoFeatures.length !== 0) {
                    h = n.aoFeatures;
                    q = 0;
                    for (k = h.length; q < k; q++)
                        if (i == h[q].cFeature) {
                            if (f = h[q].fnInit(a)) e =
                                1;
                            break
                        }
                }
                if (e == 1 && f !== null) {
                    if (typeof a.aanFeatures[i] != "object") a.aanFeatures[i] = [];
                    a.aanFeatures[i].push(f);
                    c.appendChild(f)
                }
            }
            b.parentNode.replaceChild(a.nTableWrapper, b)
        }

        function za(a) {
            if (a.oScroll.sX === "" && a.oScroll.sY === "") return a.nTable;
            var b = p.createElement("div"),
                c = p.createElement("div"),
                d = p.createElement("div"),
                f = p.createElement("div"),
                e = p.createElement("div"),
                i = p.createElement("div"),
                h = a.nTable.cloneNode(false),
                k = a.nTable.cloneNode(false),
                l = a.nTable.getElementsByTagName("thead")[0],
                q = a.nTable.getElementsByTagName("tfoot").length ===
                    0 ? null : a.nTable.getElementsByTagName("tfoot")[0],
                t = typeof g.bJQueryUI != "undefined" && g.bJQueryUI ? n.oJUIClasses : n.oStdClasses;
            c.appendChild(d);
            e.appendChild(i);
            f.appendChild(a.nTable);
            b.appendChild(c);
            b.appendChild(f);
            d.appendChild(h);
            h.appendChild(l);
            if (q !== null) {
                b.appendChild(e);
                i.appendChild(k);
                k.appendChild(q)
            }
            b.className = t.sScrollWrapper;
            c.className = t.sScrollHead;
            d.className = t.sScrollHeadInner;
            f.className = t.sScrollBody;
            e.className = t.sScrollFoot;
            i.className = t.sScrollFootInner;
            if (a.oScroll.bAutoCss) {
                c.style.overflow =
                    "hidden";
                c.style.position = "relative";
                e.style.overflow = "hidden";
                f.style.overflow = "auto"
            }
            c.style.border = "0";
            c.style.width = "100%";
            e.style.border = "0";
            d.style.width = "150%";
            h.removeAttribute("id");
            h.style.marginLeft = "0";
            a.nTable.style.marginLeft = "0";
            if (q !== null) {
                k.removeAttribute("id");
                k.style.marginLeft = "0"
            }
            d = j(">caption", a.nTable);
            i = 0;
            for (k = d.length; i < k; i++) h.appendChild(d[i]);
            if (a.oScroll.sX !== "") {
                c.style.width = v(a.oScroll.sX);
                f.style.width = v(a.oScroll.sX);
                if (q !== null) e.style.width = v(a.oScroll.sX);
                j(f).scroll(function () {
                    c.scrollLeft =
                        this.scrollLeft;
                    if (q !== null) e.scrollLeft = this.scrollLeft
                })
            }
            if (a.oScroll.sY !== "") f.style.height = v(a.oScroll.sY);
            a.aoDrawCallback.push({
                fn: Ca,
                sName: "scrolling"
            });
            a.oScroll.bInfinite && j(f).scroll(function () {
                if (!a.bDrawing)
                    if (j(this).scrollTop() + j(this).height() > j(a.nTable).height() - a.oScroll.iLoadGap)
                        if (a.fnDisplayEnd() < a.fnRecordsDisplay()) {
                            ea(a, "next");
                            E(a);
                            C(a)
                        }
            });
            a.nScrollHead = c;
            a.nScrollFoot = e;
            return b
        }

        function Ca(a) {
            var b = a.nScrollHead.getElementsByTagName("div")[0],
                c = b.getElementsByTagName("table")[0],
                d = a.nTable.parentNode,
                f, e, i, h, k, l, q, t, G = [];
            i = a.nTable.getElementsByTagName("thead");
            i.length > 0 && a.nTable.removeChild(i[0]);
            if (a.nTFoot !== null) {
                k = a.nTable.getElementsByTagName("tfoot");
                k.length > 0 && a.nTable.removeChild(k[0])
            }
            i = a.nTHead.cloneNode(true);
            a.nTable.insertBefore(i, a.nTable.childNodes[0]);
            if (a.nTFoot !== null) {
                k = a.nTFoot.cloneNode(true);
                a.nTable.insertBefore(k, a.nTable.childNodes[1])
            }
            var J = fa(i);
            f = 0;
            for (e = J.length; f < e; f++) {
                q = ga(a, f);
                J[f].style.width = a.aoColumns[q].sWidth
            }
            a.nTFoot !== null && L(function (B) {
                B.style.width =
                    ""
            }, k.getElementsByTagName("tr"));
            f = j(a.nTable).outerWidth();
            if (a.oScroll.sX === "") {
                a.nTable.style.width = "100%";
                if (j.browser.msie && j.browser.version <= 7) a.nTable.style.width = v(j(a.nTable).outerWidth() - a.oScroll.iBarWidth)
            } else if (a.oScroll.sXInner !== "") a.nTable.style.width = v(a.oScroll.sXInner);
            else if (f == j(d).width() && j(d).height() < j(a.nTable).height()) {
                a.nTable.style.width = v(f - a.oScroll.iBarWidth);
                if (j(a.nTable).outerWidth() > f - a.oScroll.iBarWidth) a.nTable.style.width = v(f)
            } else a.nTable.style.width =
                v(f);
            f = j(a.nTable).outerWidth();
            e = a.nTHead.getElementsByTagName("tr");
            i = i.getElementsByTagName("tr");
            L(function (B, I) {
                l = B.style;
                l.paddingTop = "0";
                l.paddingBottom = "0";
                l.borderTopWidth = "0";
                l.borderBottomWidth = "0";
                l.height = 0;
                t = j(B).width();
                I.style.width = v(t);
                G.push(t)
            }, i, e);
            j(i).height(0);
            if (a.nTFoot !== null) {
                h = k.getElementsByTagName("tr");
                k = a.nTFoot.getElementsByTagName("tr");
                L(function (B, I) {
                    l = B.style;
                    l.paddingTop = "0";
                    l.paddingBottom = "0";
                    l.borderTopWidth = "0";
                    l.borderBottomWidth = "0";
                    l.height = 0;
                    t = j(B).width();
                    I.style.width = v(t);
                    G.push(t)
                }, h, k);
                j(h).height(0)
            }
            L(function (B) {
                B.innerHTML = "";
                B.style.width = v(G.shift())
            }, i);
            a.nTFoot !== null && L(function (B) {
                B.innerHTML = "";
                B.style.width = v(G.shift())
            }, h);
            if (j(a.nTable).outerWidth() < f)
                if (a.oScroll.sX === "") H(a, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you enable x-scrolling or increase the width the table has in which to be drawn");
                else a.oScroll.sXInner !== "" && H(a, 1, "The table cannot fit into the current element which will cause column misalignment. It is suggested that you increase the sScrollXInner property to allow it to draw in a larger area, or simply remove that parameter to allow automatic calculation");
            if (a.oScroll.sY === "")
                if (j.browser.msie && j.browser.version <= 7) d.style.height = v(a.nTable.offsetHeight + a.oScroll.iBarWidth);
            if (a.oScroll.sY !== "" && a.oScroll.bCollapse) {
                d.style.height = v(a.oScroll.sY);
                h = a.oScroll.sX !== "" && a.nTable.offsetWidth > d.offsetWidth ? a.oScroll.iBarWidth : 0;
                if (a.nTable.offsetHeight < d.offsetHeight) d.style.height = v(j(a.nTable).height() + h)
            }
            h = j(a.nTable).outerWidth();
            c.style.width = v(h);
            b.style.width = v(h + a.oScroll.iBarWidth);
            if (a.nTFoot !== null) {
                b = a.nScrollFoot.getElementsByTagName("div")[0];
                c = b.getElementsByTagName("table")[0];
                b.style.width = v(a.nTable.offsetWidth + a.oScroll.iBarWidth);
                c.style.width = v(a.nTable.offsetWidth)
            }
            if (a.bSorted || a.bFiltered) d.scrollTop = 0
        }

        function X(a) {
            if (a.oFeatures.bAutoWidth === false) return false;
            $(a);
            for (var b = 0, c = a.aoColumns.length; b < c; b++) a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth
        }

        function xa(a) {
            var b = p.createElement("div");
            a.sTableId !== "" && typeof a.aanFeatures.f == "undefined" && b.setAttribute("id", a.sTableId + "_filter");
            b.className = a.oClasses.sFilter;
            b.innerHTML = a.oLanguage.sSearch + (a.oLanguage.sSearch === "" ? "" : " ") + '<input type="text" />';
            var c = j("input", b);
            c.val(a.oPreviousSearch.sSearch.replace('"', "&quot;"));
            c.bind("keyup.DT", function () {
                for (var d = a.aanFeatures.f, f = 0, e = d.length; f < e; f++) d[f] != this.parentNode && j("input", d[f]).val(this.value);
                this.value != a.oPreviousSearch.sSearch && P(a, {
                    sSearch: this.value,
                    bRegex: a.oPreviousSearch.bRegex,
                    bSmart: a.oPreviousSearch.bSmart
                })
            });
            c.bind("keypress.DT", function (d) {
                if (d.keyCode == 13) return false
            });
            return b
        }

        function P(a, b, c) {
            Da(a, b.sSearch, c, b.bRegex, b.bSmart);
            for (b = 0; b < a.aoPreSearchCols.length; b++) Ea(a, a.aoPreSearchCols[b].sSearch, b, a.aoPreSearchCols[b].bRegex, a.aoPreSearchCols[b].bSmart);
            n.afnFiltering.length !== 0 && Fa(a);
            a.bFiltered = true;
            a._iDisplayStart = 0;
            E(a);
            C(a);
            ha(a, 0)
        }

        function Fa(a) {
            for (var b = n.afnFiltering, c = 0, d = b.length; c < d; c++)
                for (var f = 0, e = 0, i = a.aiDisplay.length; e < i; e++) {
                    var h = a.aiDisplay[e - f];
                    if (!b[c](a, a.aoData[h]._aData, h)) {
                        a.aiDisplay.splice(e - f, 1);
                        f++
                    }
                }
        }

        function Ea(a, b, c, d, f) {
            if (b !==
                "") {
                var e = 0;
                b = ia(b, d, f);
                for (d = a.aiDisplay.length - 1; d >= 0; d--) {
                    f = ja(a.aoData[a.aiDisplay[d]]._aData[c], a.aoColumns[c].sType);
                    if (!b.test(f)) {
                        a.aiDisplay.splice(d, 1);
                        e++
                    }
                }
            }
        }

        function Da(a, b, c, d, f) {
            var e = ia(b, d, f);
            if (typeof c == "undefined" || c === null) c = 0;
            if (n.afnFiltering.length !== 0) c = 1;
            if (b.length <= 0) {
                a.aiDisplay.splice(0, a.aiDisplay.length);
                a.aiDisplay = a.aiDisplayMaster.slice()
            } else if (a.aiDisplay.length == a.aiDisplayMaster.length || a.oPreviousSearch.sSearch.length > b.length || c == 1 || b.indexOf(a.oPreviousSearch.sSearch) !==
                0) {
                a.aiDisplay.splice(0, a.aiDisplay.length);
                ha(a, 1);
                for (c = 0; c < a.aiDisplayMaster.length; c++) e.test(a.asDataSearch[c]) && a.aiDisplay.push(a.aiDisplayMaster[c])
            } else {
                var i = 0;
                for (c = 0; c < a.asDataSearch.length; c++)
                    if (!e.test(a.asDataSearch[c])) {
                        a.aiDisplay.splice(c - i, 1);
                        i++
                    }
            }
            a.oPreviousSearch.sSearch = b;
            a.oPreviousSearch.bRegex = d;
            a.oPreviousSearch.bSmart = f
        }

        function ha(a, b) {
            a.asDataSearch.splice(0, a.asDataSearch.length);
            b = typeof b != "undefined" && b == 1 ? a.aiDisplayMaster : a.aiDisplay;
            for (var c = 0, d = b.length; c < d; c++) a.asDataSearch[c] =
                ka(a, a.aoData[b[c]]._aData)
        }

        function ka(a, b) {
            for (var c = "", d = p.createElement("div"), f = 0, e = a.aoColumns.length; f < e; f++)
                if (a.aoColumns[f].bSearchable) c += ja(b[f], a.aoColumns[f].sType) + "  ";
            if (c.indexOf("&") !== -1) {
                d.innerHTML = c;
                c = d.textContent ? d.textContent : d.innerText;
                c = c.replace(/\n/g, " ").replace(/\r/g, "")
            }
            return c
        }

        function ia(a, b, c) {
            if (c) {
                a = b ? a.split(" ") : la(a).split(" ");
                a = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
                return new RegExp(a, "i")
            } else {
                a = b ? a : la(a);
                return new RegExp(a, "i")
            }
        }

        function ja(a, b) {
            if (typeof n.ofnSearch[b] ==
                "function") return n.ofnSearch[b](a);
            else if (b == "html") return a.replace(/\n/g, " ").replace(/<.*?>/g, "");
            else if (typeof a == "string") return a.replace(/\n/g, " ");
            return a
        }

        function O(a, b) {
            var c, d, f, e, i, h, k = [],
                l = [],
                q = n.oSort,
                t = a.aoData,
                G = a.aoColumns;
            if (!a.oFeatures.bServerSide && (a.aaSorting.length !== 0 || a.aaSortingFixed !== null)) {
                k = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
                for (f = 0; f < k.length; f++) {
                    e = k[f][0];
                    i = M(a, e);
                    h = a.aoColumns[e].sSortDataType;
                    if (typeof n.afnSortData[h] !=
                        "undefined") {
                        var J = n.afnSortData[h](a, e, i);
                        i = 0;
                        for (h = t.length; i < h; i++) t[i]._aData[e] = J[i]
                    }
                }
                f = 0;
                for (e = a.aiDisplayMaster.length; f < e; f++) l[a.aiDisplayMaster[f]] = f;
                var B = k.length;
                a.aiDisplayMaster.sort(function (I, Y) {
                    var N;
                    for (f = 0; f < B; f++) {
                        c = G[k[f][0]].iDataSort;
                        d = G[c].sType;
                        N = q[d + "-" + k[f][1]](t[I]._aData[c], t[Y]._aData[c]);
                        if (N !== 0) return N
                    }
                    return q["numeric-asc"](l[I], l[Y])
                })
            }
            if (typeof b == "undefined" || b) T(a);
            a.bSorted = true;
            if (a.oFeatures.bFilter) P(a, a.oPreviousSearch, 1);
            else {
                a.aiDisplay = a.aiDisplayMaster.slice();
                a._iDisplayStart = 0;
                E(a);
                C(a)
            }
        }

        function ba(a, b, c, d) {
            j(b).bind("click.DT", function (f) {
                if (a.aoColumns[c].bSortable !== false) {
                    var e = function () {
                        var i, h;
                        if (f.shiftKey) {
                            for (var k = false, l = 0; l < a.aaSorting.length; l++)
                                if (a.aaSorting[l][0] == c) {
                                    k = true;
                                    i = a.aaSorting[l][0];
                                    h = a.aaSorting[l][2] + 1;
                                    if (typeof a.aoColumns[i].asSorting[h] == "undefined") a.aaSorting.splice(l, 1);
                                    else {
                                        a.aaSorting[l][1] = a.aoColumns[i].asSorting[h];
                                        a.aaSorting[l][2] = h
                                    }
                                    break
                                }
                            k === false && a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                        } else if (a.aaSorting.length ==
                            1 && a.aaSorting[0][0] == c) {
                            i = a.aaSorting[0][0];
                            h = a.aaSorting[0][2] + 1;
                            if (typeof a.aoColumns[i].asSorting[h] == "undefined") h = 0;
                            a.aaSorting[0][1] = a.aoColumns[i].asSorting[h];
                            a.aaSorting[0][2] = h
                        } else {
                            a.aaSorting.splice(0, a.aaSorting.length);
                            a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                        }
                        O(a)
                    };
                    if (a.oFeatures.bProcessing) {
                        K(a, true);
                        setTimeout(function () {
                            e();
                            a.oFeatures.bServerSide || K(a, false)
                        }, 0)
                    } else e();
                    typeof d == "function" && d(a)
                }
            })
        }

        function T(a) {
            var b, c, d, f, e, i = a.aoColumns.length,
                h = a.oClasses;
            for (b =
                0; b < i; b++) a.aoColumns[b].bSortable && j(a.aoColumns[b].nTh).removeClass(h.sSortAsc + " " + h.sSortDesc + " " + a.aoColumns[b].sSortingClass);
            f = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
            for (b = 0; b < a.aoColumns.length; b++)
                if (a.aoColumns[b].bSortable) {
                    e = a.aoColumns[b].sSortingClass;
                    d = -1;
                    for (c = 0; c < f.length; c++)
                        if (f[c][0] == b) {
                            e = f[c][1] == "asc" ? h.sSortAsc : h.sSortDesc;
                            d = c;
                            break
                        }
                    j(a.aoColumns[b].nTh).addClass(e);
                    if (a.bJUI) {
                        c = j("span", a.aoColumns[b].nTh);
                        c.removeClass(h.sSortJUIAsc +
                            " " + h.sSortJUIDesc + " " + h.sSortJUI + " " + h.sSortJUIAscAllowed + " " + h.sSortJUIDescAllowed);
                        c.addClass(d == -1 ? a.aoColumns[b].sSortingClassJUI : f[d][1] == "asc" ? h.sSortJUIAsc : h.sSortJUIDesc)
                    }
                } else j(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);
            e = h.sSortColumn;
            if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
                d = Z(a);
                if (d.length >= i)
                    for (b = 0; b < i; b++)
                        if (d[b].className.indexOf(e + "1") != -1) {
                            c = 0;
                            for (a = d.length / i; c < a; c++) d[i * c + b].className = j.trim(d[i * c + b].className.replace(e + "1", ""))
                        } else if (d[b].className.indexOf(e +
                    "2") != -1) {
                    c = 0;
                    for (a = d.length / i; c < a; c++) d[i * c + b].className = j.trim(d[i * c + b].className.replace(e + "2", ""))
                } else if (d[b].className.indexOf(e + "3") != -1) {
                    c = 0;
                    for (a = d.length / i; c < a; c++) d[i * c + b].className = j.trim(d[i * c + b].className.replace(" " + e + "3", ""))
                }
                h = 1;
                var k;
                for (b = 0; b < f.length; b++) {
                    k = parseInt(f[b][0], 10);
                    c = 0;
                    for (a = d.length / i; c < a; c++) d[i * c + k].className += " " + e + h;
                    h < 3 && h++
                }
            }
        }

        function Ba(a) {
            if (a.oScroll.bInfinite) return null;
            var b = p.createElement("div");
            b.className = a.oClasses.sPaging + a.sPaginationType;
            n.oPagination[a.sPaginationType].fnInit(a,
                b, function (c) {
                    E(c);
                    C(c)
                });
            typeof a.aanFeatures.p == "undefined" && a.aoDrawCallback.push({
                fn: function (c) {
                    n.oPagination[c.sPaginationType].fnUpdate(c, function (d) {
                        E(d);
                        C(d)
                    })
                },
                sName: "pagination"
            });
            return b
        }

        function ea(a, b) {
            var c = a._iDisplayStart;
            if (b == "first") a._iDisplayStart = 0;
            else if (b == "previous") {
                a._iDisplayStart = a._iDisplayLength >= 0 ? a._iDisplayStart - a._iDisplayLength : 0;
                if (a._iDisplayStart < 0) a._iDisplayStart = 0
            } else if (b == "next")
                if (a._iDisplayLength >= 0) {
                    if (a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay()) a._iDisplayStart +=
                        a._iDisplayLength
                } else a._iDisplayStart = 0;
                else if (b == "last")
                if (a._iDisplayLength >= 0) {
                    b = parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1;
                    a._iDisplayStart = (b - 1) * a._iDisplayLength
                } else a._iDisplayStart = 0;
                else H(a, 0, "Unknown paging action: " + b);
            return c != a._iDisplayStart
        }

        function Aa(a) {
            var b = p.createElement("div");
            b.className = a.oClasses.sInfo;
            if (typeof a.aanFeatures.i == "undefined") {
                a.aoDrawCallback.push({
                    fn: Ga,
                    sName: "information"
                });
                a.sTableId !== "" && b.setAttribute("id", a.sTableId + "_info")
            }
            return b
        }

        function Ga(a) {
            if (!(!a.oFeatures.bInfo || a.aanFeatures.i.length === 0)) {
                var b = a._iDisplayStart + 1,
                    c = a.fnDisplayEnd(),
                    d = a.fnRecordsTotal(),
                    f = a.fnRecordsDisplay(),
                    e = a.fnFormatNumber(b),
                    i = a.fnFormatNumber(c),
                    h = a.fnFormatNumber(d),
                    k = a.fnFormatNumber(f);
                if (a.oScroll.bInfinite) e = a.fnFormatNumber(1);
                e = a.fnRecordsDisplay() === 0 && a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfoEmpty + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() === 0 ? a.oLanguage.sInfoEmpty + " " + a.oLanguage.sInfoFiltered.replace("_MAX_",
                    h) + a.oLanguage.sInfoPostFix : a.fnRecordsDisplay() == a.fnRecordsTotal() ? a.oLanguage.sInfo.replace("_START_", e).replace("_END_", i).replace("_TOTAL_", k) + a.oLanguage.sInfoPostFix : a.oLanguage.sInfo.replace("_START_", e).replace("_END_", i).replace("_TOTAL_", k) + " " + a.oLanguage.sInfoFiltered.replace("_MAX_", a.fnFormatNumber(a.fnRecordsTotal())) + a.oLanguage.sInfoPostFix;
                if (a.oLanguage.fnInfoCallback !== null) e = a.oLanguage.fnInfoCallback(a, b, c, d, f, e);
                a = a.aanFeatures.i;
                b = 0;
                for (c = a.length; b < c; b++) j(a[b]).html(e)
            }
        }

        function wa(a) {
            if (a.oScroll.bInfinite) return null;
            var b = '<select size="1" ' + (a.sTableId === "" ? "" : 'name="' + a.sTableId + '_length"') + ">",
                c, d;
            if (a.aLengthMenu.length == 2 && typeof a.aLengthMenu[0] == "object" && typeof a.aLengthMenu[1] == "object") {
                c = 0;
                for (d = a.aLengthMenu[0].length; c < d; c++) b += '<option value="' + a.aLengthMenu[0][c] + '">' + a.aLengthMenu[1][c] + "</option>"
            } else {
                c = 0;
                for (d = a.aLengthMenu.length; c < d; c++) b += '<option value="' + a.aLengthMenu[c] + '">' + a.aLengthMenu[c] + "</option>"
            }
            b += "</select>";
            var f = p.createElement("div");
            a.sTableId !== "" && typeof a.aanFeatures.l == "undefined" && f.setAttribute("id", a.sTableId + "_length");
            f.className = a.oClasses.sLength;
            f.innerHTML = a.oLanguage.sLengthMenu.replace("_MENU_", b);
            j('select option[value="' + a._iDisplayLength + '"]', f).attr("selected", true);
            j("select", f).bind("change.DT", function () {
                var e = j(this).val(),
                    i = a.aanFeatures.l;
                c = 0;
                for (d = i.length; c < d; c++) i[c] != this.parentNode && j("select", i[c]).val(e);
                a._iDisplayLength = parseInt(e, 10);
                E(a);
                if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
                    a._iDisplayStart =
                        a.fnDisplayEnd() - a._iDisplayLength;
                    if (a._iDisplayStart < 0) a._iDisplayStart = 0
                }
                if (a._iDisplayLength == -1) a._iDisplayStart = 0;
                C(a)
            });
            return f
        }

        function ya(a) {
            var b = p.createElement("div");
            a.sTableId !== "" && typeof a.aanFeatures.r == "undefined" && b.setAttribute("id", a.sTableId + "_processing");
            b.innerHTML = a.oLanguage.sProcessing;
            b.className = a.oClasses.sProcessing;
            a.nTable.parentNode.insertBefore(b, a.nTable);
            return b
        }

        function K(a, b) {
            if (a.oFeatures.bProcessing) {
                a = a.aanFeatures.r;
                for (var c = 0, d = a.length; c < d; c++) a[c].style.visibility =
                    b ? "visible" : "hidden"
            }
        }

        function ga(a, b) {
            for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
                a.aoColumns[d].bVisible === true && c++;
                if (c == b) return d
            }
            return null
        }

        function M(a, b) {
            for (var c = -1, d = 0; d < a.aoColumns.length; d++) {
                a.aoColumns[d].bVisible === true && c++;
                if (d == b) return a.aoColumns[d].bVisible === true ? c : null
            }
            return null
        }

        function Q(a, b) {
            var c, d;
            c = a._iDisplayStart;
            for (d = a._iDisplayEnd; c < d; c++)
                if (a.aoData[a.aiDisplay[c]].nTr == b) return a.aiDisplay[c];
            c = 0;
            for (d = a.aoData.length; c < d; c++)
                if (a.aoData[c].nTr == b) return c;
            return null
        }

        function S(a) {
            for (var b = 0, c = 0; c < a.aoColumns.length; c++) a.aoColumns[c].bVisible === true && b++;
            return b
        }

        function E(a) {
            a._iDisplayEnd = a.oFeatures.bPaginate === false ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length || a._iDisplayLength == -1 ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength
        }

        function Ha(a, b) {
            if (!a || a === null || a === "") return 0;
            if (typeof b == "undefined") b = p.getElementsByTagName("body")[0];
            var c = p.createElement("div");
            c.style.width = a;
            b.appendChild(c);
            a = c.offsetWidth;
            b.removeChild(c);
            return a
        }

        function $(a) {
            var b = 0,
                c, d = 0,
                f = a.aoColumns.length,
                e, i = j("th", a.nTHead);
            for (e = 0; e < f; e++)
                if (a.aoColumns[e].bVisible) {
                    d++;
                    if (a.aoColumns[e].sWidth !== null) {
                        c = Ha(a.aoColumns[e].sWidthOrig, a.nTable.parentNode);
                        if (c !== null) a.aoColumns[e].sWidth = v(c);
                        b++
                    }
                }
            if (f == i.length && b === 0 && d == f && a.oScroll.sX === "" && a.oScroll.sY === "")
                for (e = 0; e < a.aoColumns.length; e++) {
                    c = j(i[e]).width();
                    if (c !== null) a.aoColumns[e].sWidth = v(c)
                } else {
                    b = a.nTable.cloneNode(false);
                    e = p.createElement("tbody");
                    c = p.createElement("tr");
                    b.removeAttribute("id");
                    b.appendChild(a.nTHead.cloneNode(true));
                    if (a.nTFoot !== null) {
                        b.appendChild(a.nTFoot.cloneNode(true));
                        L(function (h) {
                            h.style.width = ""
                        }, b.getElementsByTagName("tr"))
                    }
                    b.appendChild(e);
                    e.appendChild(c);
                    e = j("thead th", b);
                    if (e.length === 0) e = j("tbody tr:eq(0)>td", b);
                    e.each(function (h) {
                        this.style.width = "";
                        h = ga(a, h);
                        if (h !== null && a.aoColumns[h].sWidthOrig !== "") this.style.width = a.aoColumns[h].sWidthOrig
                    });
                    for (e = 0; e < f; e++)
                        if (a.aoColumns[e].bVisible) {
                            d = Ia(a, e);
                            if (d !== null) {
                                d = d.cloneNode(true);
                                c.appendChild(d)
                            }
                        }
                    e = a.nTable.parentNode;
                    e.appendChild(b);
                    if (a.oScroll.sX !== "" && a.oScroll.sXInner !== "") b.style.width = v(a.oScroll.sXInner);
                    else if (a.oScroll.sX !== "") {
                        b.style.width = "";
                        if (j(b).width() < e.offsetWidth) b.style.width = v(e.offsetWidth)
                    } else if (a.oScroll.sY !== "") b.style.width = v(e.offsetWidth);
                    b.style.visibility = "hidden";
                    Ja(a, b);
                    f = j("tbody tr:eq(0)>td", b);
                    if (f.length === 0) f = j("thead tr:eq(0)>th", b);
                    for (e = c = 0; e < a.aoColumns.length; e++)
                        if (a.aoColumns[e].bVisible) {
                            d = j(f[c]).outerWidth();
                            if (d !== null &&
                                d > 0) a.aoColumns[e].sWidth = v(d);
                            c++
                        }
                    a.nTable.style.width = v(j(b).outerWidth());
                    b.parentNode.removeChild(b)
                }
        }

        function Ja(a, b) {
            if (a.oScroll.sX === "" && a.oScroll.sY !== "") {
                j(b).width();
                b.style.width = v(j(b).outerWidth() - a.oScroll.iBarWidth)
            } else if (a.oScroll.sX !== "") b.style.width = v(j(b).outerWidth())
        }

        function Ia(a, b, c) {
            if (typeof c == "undefined" || c) {
                c = Ka(a, b);
                b = M(a, b);
                if (c < 0) return null;
                return a.aoData[c].nTr.getElementsByTagName("td")[b]
            }
            var d = -1,
                f, e;
            c = -1;
            var i = p.createElement("div");
            i.style.visibility = "hidden";
            i.style.position = "absolute";
            p.body.appendChild(i);
            f = 0;
            for (e = a.aoData.length; f < e; f++) {
                i.innerHTML = a.aoData[f]._aData[b];
                if (i.offsetWidth > d) {
                    d = i.offsetWidth;
                    c = f
                }
            }
            p.body.removeChild(i);
            if (c >= 0) {
                b = M(a, b);
                if (a = a.aoData[c].nTr.getElementsByTagName("td")[b]) return a
            }
            return null
        }

        function Ka(a, b) {
            for (var c = -1, d = -1, f = 0; f < a.aoData.length; f++) {
                var e = a.aoData[f]._aData[b];
                if (e.length > c) {
                    c = e.length;
                    d = f
                }
            }
            return d
        }

        function v(a) {
            if (a === null) return "0px";
            if (typeof a == "number") {
                if (a < 0) return "0px";
                return a + "px"
            }
            var b =
                a.charCodeAt(a.length - 1);
            if (b < 48 || b > 57) return a;
            return a + "px"
        }

        function Oa(a, b) {
            if (a.length != b.length) return 1;
            for (var c = 0; c < a.length; c++)
                if (a[c] != b[c]) return 2;
            return 0
        }

        function aa(a) {
            for (var b = n.aTypes, c = b.length, d = 0; d < c; d++) {
                var f = b[d](a);
                if (f !== null) return f
            }
            return "string"
        }

        function A(a) {
            for (var b = 0; b < D.length; b++)
                if (D[b].nTable == a) return D[b];
            return null
        }

        function V(a) {
            for (var b = [], c = a.aoData.length, d = 0; d < c; d++) b.push(a.aoData[d]._aData);
            return b
        }

        function R(a) {
            for (var b = [], c = a.aoData.length, d = 0; d <
                c; d++) b.push(a.aoData[d].nTr);
            return b
        }

        function Z(a) {
            var b = R(a),
                c = [],
                d, f = [],
                e, i, h, k;
            e = 0;
            for (i = b.length; e < i; e++) {
                c = [];
                h = 0;
                for (k = b[e].childNodes.length; h < k; h++) {
                    d = b[e].childNodes[h];
                    d.nodeName.toUpperCase() == "TD" && c.push(d)
                }
                h = d = 0;
                for (k = a.aoColumns.length; h < k; h++)
                    if (a.aoColumns[h].bVisible) f.push(c[h - d]);
                    else {
                        f.push(a.aoData[e]._anHidden[h]);
                        d++
                    }
            }
            return f
        }

        function la(a) {
            return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^)", "g"), "\\$1")
        }

        function ma(a, b) {
            for (var c = -1, d = 0, f = a.length; d < f; d++)
                if (a[d] == b) c = d;
                else a[d] > b && a[d]--;
            c != -1 && a.splice(c, 1)
        }

        function va(a, b) {
            b = b.split(",");
            for (var c = [], d = 0, f = a.aoColumns.length; d < f; d++)
                for (var e = 0; e < f; e++)
                    if (a.aoColumns[d].sName == b[e]) {
                        c.push(e);
                        break
                    }
            return c
        }

        function ca(a) {
            for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++) b += a.aoColumns[c].sName + ",";
            if (b.length == d) return "";
            return b.slice(0, -1)
        }

        function H(a, b, c) {
            a = a.sTableId === "" ? "DataTables warning: " + c : "DataTables warning (table id = '" + a.sTableId + "'): " + c;
            if (b === 0)
                if (n.sErrMode ==
                    "alert") alert(a);
                else throw a;
                else typeof console != "undefined" && typeof console.log != "undefined" && console.log(a)
        }

        function da(a) {
            a.aoData.splice(0, a.aoData.length);
            a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length);
            a.aiDisplay.splice(0, a.aiDisplay.length);
            E(a)
        }

        function na(a) {
            if (!(!a.oFeatures.bStateSave || typeof a.bDestroying != "undefined")) {
                var b, c, d, f = "{";
                f += '"iCreate":' + (new Date).getTime() + ",";
                f += '"iStart":' + a._iDisplayStart + ",";
                f += '"iEnd":' + a._iDisplayEnd + ",";
                f += '"iLength":' + a._iDisplayLength +
                    ",";
                f += '"sFilter":"' + encodeURIComponent(a.oPreviousSearch.sSearch) + '",';
                f += '"sFilterEsc":' + !a.oPreviousSearch.bRegex + ",";
                f += '"aaSorting":[ ';
                for (b = 0; b < a.aaSorting.length; b++) f += "[" + a.aaSorting[b][0] + ',"' + a.aaSorting[b][1] + '"],';
                f = f.substring(0, f.length - 1);
                f += "],";
                f += '"aaSearchCols":[ ';
                for (b = 0; b < a.aoPreSearchCols.length; b++) f += '["' + encodeURIComponent(a.aoPreSearchCols[b].sSearch) + '",' + !a.aoPreSearchCols[b].bRegex + "],";
                f = f.substring(0, f.length - 1);
                f += "],";
                f += '"abVisCols":[ ';
                for (b = 0; b < a.aoColumns.length; b++) f +=
                    a.aoColumns[b].bVisible + ",";
                f = f.substring(0, f.length - 1);
                f += "]";
                b = 0;
                for (c = a.aoStateSave.length; b < c; b++) {
                    d = a.aoStateSave[b].fn(a, f);
                    if (d !== "") f = d
                }
                f += "}";
                La(a.sCookiePrefix + a.sInstance, f, a.iCookieDuration, a.sCookiePrefix, a.fnCookieCallback)
            }
        }

        function Ma(a, b) {
            if (a.oFeatures.bStateSave) {
                var c, d, f;
                d = oa(a.sCookiePrefix + a.sInstance);
                if (d !== null && d !== "") {
                    try {
                        c = typeof j.parseJSON == "function" ? j.parseJSON(d.replace(/'/g, '"')) : eval("(" + d + ")")
                    } catch (e) {
                        return
                    }
                    d = 0;
                    for (f = a.aoStateLoad.length; d < f; d++)
                        if (!a.aoStateLoad[d].fn(a,
                            c)) return;
                    a.oLoadedState = j.extend(true, {}, c);
                    a._iDisplayStart = c.iStart;
                    a.iInitDisplayStart = c.iStart;
                    a._iDisplayEnd = c.iEnd;
                    a._iDisplayLength = c.iLength;
                    a.oPreviousSearch.sSearch = decodeURIComponent(c.sFilter);
                    a.aaSorting = c.aaSorting.slice();
                    a.saved_aaSorting = c.aaSorting.slice();
                    if (typeof c.sFilterEsc != "undefined") a.oPreviousSearch.bRegex = !c.sFilterEsc;
                    if (typeof c.aaSearchCols != "undefined")
                        for (d = 0; d < c.aaSearchCols.length; d++) a.aoPreSearchCols[d] = {
                            sSearch: decodeURIComponent(c.aaSearchCols[d][0]),
                            bRegex: !c.aaSearchCols[d][1]
                        };
                    if (typeof c.abVisCols != "undefined") {
                        b.saved_aoColumns = [];
                        for (d = 0; d < c.abVisCols.length; d++) {
                            b.saved_aoColumns[d] = {};
                            b.saved_aoColumns[d].bVisible = c.abVisCols[d]
                        }
                    }
                }
            }
        }

        function La(a, b, c, d, f) {
            var e = new Date;
            e.setTime(e.getTime() + c * 1E3);
            c = ra.location.pathname.split("/");
            a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase();
            var i;
            if (f !== null) {
                i = typeof j.parseJSON == "function" ? j.parseJSON(b) : eval("(" + b + ")");
                b = f(a, i, e.toGMTString(), c.join("/") + "/")
            } else b = a + "=" + encodeURIComponent(b) + "; expires=" + e.toGMTString() +
                "; path=" + c.join("/") + "/";
            f = "";
            e = 9999999999999;
            if ((oa(a) !== null ? p.cookie.length : b.length + p.cookie.length) + 10 > 4096) {
                a = p.cookie.split(";");
                for (var h = 0, k = a.length; h < k; h++)
                    if (a[h].indexOf(d) != -1) {
                        var l = a[h].split("=");
                        try {
                            i = eval("(" + decodeURIComponent(l[1]) + ")")
                        } catch (q) {
                            continue
                        }
                        if (typeof i.iCreate != "undefined" && i.iCreate < e) {
                            f = l[0];
                            e = i.iCreate
                        }
                    }
                if (f !== "") p.cookie = f + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" + c.join("/") + "/"
            }
            p.cookie = b
        }

        function oa(a) {
            var b = ra.location.pathname.split("/");
            a = a + "_" +
                b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=";
            b = p.cookie.split(";");
            for (var c = 0; c < b.length; c++) {
                for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                if (d.indexOf(a) === 0) return decodeURIComponent(d.substring(a.length, d.length))
            }
            return null
        }

        function fa(a) {
            a = a.getElementsByTagName("tr");
            if (a.length == 1) return a[0].getElementsByTagName("th");
            var b = [],
                c = [],
                d, f, e, i, h, k, l = function (I, Y, N) {
                    for (; typeof I[Y][N] != "undefined";) N++;
                    return N
                }, q = function (I) {
                    if (typeof b[I] == "undefined") b[I] = []
                };
            d = 0;
            for (i =
                a.length; d < i; d++) {
                q(d);
                var t = 0,
                    G = [];
                f = 0;
                for (h = a[d].childNodes.length; f < h; f++)
                    if (a[d].childNodes[f].nodeName.toUpperCase() == "TD" || a[d].childNodes[f].nodeName.toUpperCase() == "TH") G.push(a[d].childNodes[f]);
                f = 0;
                for (h = G.length; f < h; f++) {
                    var J = G[f].getAttribute("colspan") * 1,
                        B = G[f].getAttribute("rowspan") * 1;
                    if (!J || J === 0 || J === 1) {
                        k = l(b, d, t);
                        b[d][k] = G[f].nodeName.toUpperCase() == "TD" ? 4 : G[f];
                        if (B || B === 0 || B === 1)
                            for (e = 1; e < B; e++) {
                                q(d + e);
                                b[d + e][k] = 2
                            }
                        t++
                    } else {
                        k = l(b, d, t);
                        for (e = 0; e < J; e++) b[d][k + e] = 3;
                        t += J
                    }
                }
            }
            d = 0;
            for (i =
                b.length; d < i; d++) {
                f = 0;
                for (h = b[d].length; f < h; f++)
                    if (typeof b[d][f] == "object" && typeof c[f] == "undefined") c[f] = b[d][f]
            }
            return c
        }

        function Na() {
            var a = p.createElement("p"),
                b = a.style;
            b.width = "100%";
            b.height = "200px";
            var c = p.createElement("div");
            b = c.style;
            b.position = "absolute";
            b.top = "0px";
            b.left = "0px";
            b.visibility = "hidden";
            b.width = "200px";
            b.height = "150px";
            b.overflow = "hidden";
            c.appendChild(a);
            p.body.appendChild(c);
            b = a.offsetWidth;
            c.style.overflow = "scroll";
            a = a.offsetWidth;
            if (b == a) a = c.clientWidth;
            p.body.removeChild(c);
            return b - a
        }

        function L(a, b, c) {
            for (var d = 0, f = b.length; d < f; d++)
                for (var e = 0, i = b[d].childNodes.length; e < i; e++)
                    if (b[d].childNodes[e].nodeType == 1) typeof c != "undefined" ? a(b[d].childNodes[e], c[d].childNodes[e]) : a(b[d].childNodes[e])
        }

        function o(a, b, c, d) {
            if (typeof d == "undefined") d = c;
            if (typeof b[c] != "undefined") a[d] = b[c]
        }
        this.oApi = {};
        this.fnDraw = function (a) {
            var b = A(this[n.iApiIndex]);
            if (typeof a != "undefined" && a === false) {
                E(b);
                C(b)
            } else W(b)
        };
        this.fnFilter = function (a, b, c, d, f) {
            var e = A(this[n.iApiIndex]);
            if (e.oFeatures.bFilter) {
                if (typeof c ==
                    "undefined") c = false;
                if (typeof d == "undefined") d = true;
                if (typeof f == "undefined") f = true;
                if (typeof b == "undefined" || b === null) {
                    P(e, {
                        sSearch: a,
                        bRegex: c,
                        bSmart: d
                    }, 1);
                    if (f && typeof e.aanFeatures.f != "undefined") {
                        b = e.aanFeatures.f;
                        c = 0;
                        for (d = b.length; c < d; c++) j("input", b[c]).val(a)
                    }
                } else {
                    e.aoPreSearchCols[b].sSearch = a;
                    e.aoPreSearchCols[b].bRegex = c;
                    e.aoPreSearchCols[b].bSmart = d;
                    P(e, e.oPreviousSearch, 1)
                }
            }
        };
        this.fnSettings = function () {
            return A(this[n.iApiIndex])
        };
        this.fnVersionCheck = n.fnVersionCheck;
        this.fnSort = function (a) {
            var b =
                A(this[n.iApiIndex]);
            b.aaSorting = a;
            O(b)
        };
        this.fnSortListener = function (a, b, c) {
            ba(A(this[n.iApiIndex]), a, b, c)
        };
        this.fnAddData = function (a, b) {
            if (a.length === 0) return [];
            var c = [],
                d, f = A(this[n.iApiIndex]);
            if (typeof a[0] == "object")
                for (var e = 0; e < a.length; e++) {
                    d = u(f, a[e]);
                    if (d == -1) return c;
                    c.push(d)
                } else {
                    d = u(f, a);
                    if (d == -1) return c;
                    c.push(d)
                }
            f.aiDisplay = f.aiDisplayMaster.slice();
            if (typeof b == "undefined" || b) W(f);
            return c
        };
        this.fnDeleteRow = function (a, b, c) {
            var d = A(this[n.iApiIndex]);
            a = typeof a == "object" ? Q(d, a) :
                a;
            var f = d.aoData.splice(a, 1),
                e = j.inArray(a, d.aiDisplay);
            d.asDataSearch.splice(e, 1);
            ma(d.aiDisplayMaster, a);
            ma(d.aiDisplay, a);
            typeof b == "function" && b.call(this, d, f);
            if (d._iDisplayStart >= d.aiDisplay.length) {
                d._iDisplayStart -= d._iDisplayLength;
                if (d._iDisplayStart < 0) d._iDisplayStart = 0
            }
            if (typeof c == "undefined" || c) {
                E(d);
                C(d)
            }
            return f
        };
        this.fnClearTable = function (a) {
            var b = A(this[n.iApiIndex]);
            da(b);
            if (typeof a == "undefined" || a) C(b)
        };
        this.fnOpen = function (a, b, c) {
            var d = A(this[n.iApiIndex]);
            this.fnClose(a);
            var f =
                p.createElement("tr"),
                e = p.createElement("td");
            f.appendChild(e);
            e.className = c;
            e.colSpan = S(d);
            e.innerHTML = b;
            b = j("tr", d.nTBody);
            j.inArray(a, b) != -1 && j(f).insertAfter(a);
            d.aoOpenRows.push({
                nTr: f,
                nParent: a
            });
            return f
        };
        this.fnClose = function (a) {
            for (var b = A(this[n.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++)
                if (b.aoOpenRows[c].nParent == a) {
                    (a = b.aoOpenRows[c].nTr.parentNode) && a.removeChild(b.aoOpenRows[c].nTr);
                    b.aoOpenRows.splice(c, 1);
                    return 0
                }
            return 1
        };
        this.fnGetData = function (a) {
            var b = A(this[n.iApiIndex]);
            if (typeof a !=
                "undefined") {
                a = typeof a == "object" ? Q(b, a) : a;
                return (aRowData = b.aoData[a]) ? aRowData._aData : null
            }
            return V(b)
        };
        this.fnGetNodes = function (a) {
            var b = A(this[n.iApiIndex]);
            if (typeof a != "undefined") return (aRowData = b.aoData[a]) ? aRowData.nTr : null;
            return R(b)
        };
        this.fnGetPosition = function (a) {
            var b = A(this[n.iApiIndex]);
            if (a.nodeName.toUpperCase() == "TR") return Q(b, a);
            else if (a.nodeName.toUpperCase() == "TD")
                for (var c = Q(b, a.parentNode), d = 0, f = 0; f < b.aoColumns.length; f++)
                    if (b.aoColumns[f].bVisible) {
                        if (b.aoData[c].nTr.getElementsByTagName("td")[f -
                            d] == a) return [c, f - d, f]
                    } else d++;
            return null
        };
        this.fnUpdate = function (a, b, c, d, f) {
            var e = A(this[n.iApiIndex]),
                i, h;
            b = typeof b == "object" ? Q(e, b) : b;
            if (typeof a != "object") {
                h = a;
                e.aoData[b]._aData[c] = h;
                if (e.aoColumns[c].fnRender !== null) {
                    h = e.aoColumns[c].fnRender({
                        iDataRow: b,
                        iDataColumn: c,
                        aData: e.aoData[b]._aData,
                        oSettings: e
                    });
                    if (e.aoColumns[c].bUseRendered) e.aoData[b]._aData[c] = h
                }
                i = M(e, c);
                if (i !== null) e.aoData[b].nTr.getElementsByTagName("td")[i].innerHTML = h;
                else e.aoData[b]._anHidden[c].innerHTML = h
            } else {
                if (a.length !=
                    e.aoColumns.length) {
                    H(e, 0, "An array passed to fnUpdate must have the same number of columns as the table in question - in this case " + e.aoColumns.length);
                    return 1
                }
                for (c = 0; c < a.length; c++) {
                    h = a[c];
                    e.aoData[b]._aData[c] = h;
                    if (e.aoColumns[c].fnRender !== null) {
                        h = e.aoColumns[c].fnRender({
                            iDataRow: b,
                            iDataColumn: c,
                            aData: e.aoData[b]._aData,
                            oSettings: e
                        });
                        if (e.aoColumns[c].bUseRendered) e.aoData[b]._aData[c] = h
                    }
                    i = M(e, c);
                    if (i !== null) e.aoData[b].nTr.getElementsByTagName("td")[i].innerHTML = h;
                    else e.aoData[b]._anHidden[c].innerHTML =
                        h
                }
            }
            a = j.inArray(b, e.aiDisplay);
            e.asDataSearch[a] = ka(e, e.aoData[b]._aData);
            if (typeof f == "undefined" || f) X(e);
            if (typeof d == "undefined" || d) W(e);
            return 0
        };
        this.fnSetColumnVis = function (a, b, c) {
            var d = A(this[n.iApiIndex]),
                f, e;
            e = d.aoColumns.length;
            var i, h, k, l, q;
            if (d.aoColumns[a].bVisible != b) {
                l = j(">tr", d.nTHead)[0];
                i = j(">tr", d.nTFoot)[0];
                q = [];
                h = [];
                for (f = 0; f < e; f++) {
                    q.push(d.aoColumns[f].nTh);
                    h.push(d.aoColumns[f].nTf)
                }
                if (b) {
                    for (f = b = 0; f < a; f++) d.aoColumns[f].bVisible && b++;
                    if (b >= S(d)) {
                        l.appendChild(q[a]);
                        l = j(">tr",
                            d.nTHead);
                        f = 1;
                        for (e = l.length; f < e; f++) l[f].appendChild(d.aoColumns[a].anThExtra[f - 1]);
                        if (i) {
                            i.appendChild(h[a]);
                            l = j(">tr", d.nTFoot);
                            f = 1;
                            for (e = l.length; f < e; f++) l[f].appendChild(d.aoColumns[a].anTfExtra[f - 1])
                        }
                        f = 0;
                        for (e = d.aoData.length; f < e; f++) {
                            i = d.aoData[f]._anHidden[a];
                            d.aoData[f].nTr.appendChild(i)
                        }
                    } else {
                        for (f = a; f < e; f++) {
                            k = M(d, f);
                            if (k !== null) break
                        }
                        l.insertBefore(q[a], l.getElementsByTagName("th")[k]);
                        l = j(">tr", d.nTHead);
                        f = 1;
                        for (e = l.length; f < e; f++) {
                            q = j(l[f]).children();
                            l[f].insertBefore(d.aoColumns[a].anThExtra[f -
                                1], q[k])
                        }
                        if (i) {
                            i.insertBefore(h[a], i.getElementsByTagName("th")[k]);
                            l = j(">tr", d.nTFoot);
                            f = 1;
                            for (e = l.length; f < e; f++) {
                                q = j(l[f]).children();
                                l[f].insertBefore(d.aoColumns[a].anTfExtra[f - 1], q[k])
                            }
                        }
                        Z(d);
                        f = 0;
                        for (e = d.aoData.length; f < e; f++) {
                            i = d.aoData[f]._anHidden[a];
                            d.aoData[f].nTr.insertBefore(i, j(">td:eq(" + k + ")", d.aoData[f].nTr)[0])
                        }
                    }
                    d.aoColumns[a].bVisible = true
                } else {
                    l.removeChild(q[a]);
                    f = 0;
                    for (e = d.aoColumns[a].anThExtra.length; f < e; f++) {
                        k = d.aoColumns[a].anThExtra[f];
                        k.parentNode.removeChild(k)
                    }
                    if (i) {
                        i.removeChild(h[a]);
                        f = 0;
                        for (e = d.aoColumns[a].anTfExtra.length; f < e; f++) {
                            k = d.aoColumns[a].anTfExtra[f];
                            k.parentNode.removeChild(k)
                        }
                    }
                    h = Z(d);
                    f = 0;
                    for (e = d.aoData.length; f < e; f++) {
                        i = h[f * d.aoColumns.length + a * 1];
                        d.aoData[f]._anHidden[a] = i;
                        i.parentNode.removeChild(i)
                    }
                    d.aoColumns[a].bVisible = false
                }
                f = 0;
                for (e = d.aoOpenRows.length; f < e; f++) d.aoOpenRows[f].nTr.colSpan = S(d);
                if (typeof c == "undefined" || c) {
                    X(d);
                    C(d)
                }
                na(d)
            }
        };
        this.fnPageChange = function (a, b) {
            var c = A(this[n.iApiIndex]);
            ea(c, a);
            E(c);
            if (typeof b == "undefined" || b) C(c)
        };
        this.fnDestroy =
            function () {
                var a = A(this[n.iApiIndex]),
                    b = a.nTableWrapper.parentNode,
                    c = a.nTBody,
                    d, f;
                a.bDestroying = true;
                j(a.nTableWrapper).find("*").andSelf().unbind(".DT");
                d = 0;
                for (f = a.aoColumns.length; d < f; d++) a.aoColumns[d].bVisible === false && this.fnSetColumnVis(d, true);
                j("tbody>tr>td." + a.oClasses.sRowEmpty, a.nTable).parent().remove();
                if (a.nTable != a.nTHead.parentNode) {
                    j(">thead", a.nTable).remove();
                    a.nTable.appendChild(a.nTHead)
                }
                if (a.nTFoot && a.nTable != a.nTFoot.parentNode) {
                    j(">tfoot", a.nTable).remove();
                    a.nTable.appendChild(a.nTFoot)
                }
                a.nTable.parentNode.removeChild(a.nTable);
                j(a.nTableWrapper).remove();
                a.aaSorting = [];
                a.aaSortingFixed = [];
                T(a);
                j(R(a)).removeClass(a.asStripClasses.join(" "));
                if (a.bJUI) {
                    j("th", a.nTHead).removeClass([n.oStdClasses.sSortable, n.oJUIClasses.sSortableAsc, n.oJUIClasses.sSortableDesc, n.oJUIClasses.sSortableNone].join(" "));
                    j("th span", a.nTHead).remove()
                } else j("th", a.nTHead).removeClass([n.oStdClasses.sSortable, n.oStdClasses.sSortableAsc, n.oStdClasses.sSortableDesc, n.oStdClasses.sSortableNone].join(" "));
                b.appendChild(a.nTable);
                d = 0;
                for (f = a.aoData.length; d <
                    f; d++) c.appendChild(a.aoData[d].nTr);
                a.nTable.style.width = v(a.sDestroyWidth);
                j(">tr:even", c).addClass(a.asDestoryStrips[0]);
                j(">tr:odd", c).addClass(a.asDestoryStrips[1]);
                d = 0;
                for (f = D.length; d < f; d++) D[d] == a && D.splice(d, 1)
        };
        this.fnAdjustColumnSizing = function (a) {
            var b = A(this[n.iApiIndex]);
            X(b);
            if (typeof a == "undefined" || a) this.fnDraw(false);
            else if (b.oScroll.sX !== "" || b.oScroll.sY !== "") this.oApi._fnScrollDraw(b)
        };
        for (var pa in n.oApi)
            if (pa) this[pa] = r(pa);
        this.oApi._fnExternApiFunc = r;
        this.oApi._fnInitalise =
            s;
        this.oApi._fnLanguageProcess = y;
        this.oApi._fnAddColumn = F;
        this.oApi._fnColumnOptions = x;
        this.oApi._fnAddData = u;
        this.oApi._fnGatherData = z;
        this.oApi._fnDrawHead = U;
        this.oApi._fnDraw = C;
        this.oApi._fnReDraw = W;
        this.oApi._fnAjaxUpdate = ta;
        this.oApi._fnAjaxUpdateDraw = ua;
        this.oApi._fnAddOptionsHtml = sa;
        this.oApi._fnFeatureHtmlTable = za;
        this.oApi._fnScrollDraw = Ca;
        this.oApi._fnAjustColumnSizing = X;
        this.oApi._fnFeatureHtmlFilter = xa;
        this.oApi._fnFilterComplete = P;
        this.oApi._fnFilterCustom = Fa;
        this.oApi._fnFilterColumn =
            Ea;
        this.oApi._fnFilter = Da;
        this.oApi._fnBuildSearchArray = ha;
        this.oApi._fnBuildSearchRow = ka;
        this.oApi._fnFilterCreateSearch = ia;
        this.oApi._fnDataToSearch = ja;
        this.oApi._fnSort = O;
        this.oApi._fnSortAttachListener = ba;
        this.oApi._fnSortingClasses = T;
        this.oApi._fnFeatureHtmlPaginate = Ba;
        this.oApi._fnPageChange = ea;
        this.oApi._fnFeatureHtmlInfo = Aa;
        this.oApi._fnUpdateInfo = Ga;
        this.oApi._fnFeatureHtmlLength = wa;
        this.oApi._fnFeatureHtmlProcessing = ya;
        this.oApi._fnProcessingDisplay = K;
        this.oApi._fnVisibleToColumnIndex = ga;
        this.oApi._fnColumnIndexToVisible = M;
        this.oApi._fnNodeToDataIndex = Q;
        this.oApi._fnVisbleColumns = S;
        this.oApi._fnCalculateEnd = E;
        this.oApi._fnConvertToWidth = Ha;
        this.oApi._fnCalculateColumnWidths = $;
        this.oApi._fnScrollingWidthAdjust = Ja;
        this.oApi._fnGetWidestNode = Ia;
        this.oApi._fnGetMaxLenString = Ka;
        this.oApi._fnStringToCss = v;
        this.oApi._fnArrayCmp = Oa;
        this.oApi._fnDetectType = aa;
        this.oApi._fnSettingsFromNode = A;
        this.oApi._fnGetDataMaster = V;
        this.oApi._fnGetTrNodes = R;
        this.oApi._fnGetTdNodes = Z;
        this.oApi._fnEscapeRegex =
            la;
        this.oApi._fnDeleteIndex = ma;
        this.oApi._fnReOrderIndex = va;
        this.oApi._fnColumnOrdering = ca;
        this.oApi._fnLog = H;
        this.oApi._fnClearTable = da;
        this.oApi._fnSaveState = na;
        this.oApi._fnLoadState = Ma;
        this.oApi._fnCreateCookie = La;
        this.oApi._fnReadCookie = oa;
        this.oApi._fnGetUniqueThs = fa;
        this.oApi._fnScrollBarWidth = Na;
        this.oApi._fnApplyToChildren = L;
        this.oApi._fnMap = o;
        var qa = this;
        return this.each(function () {
            var a = 0,
                b, c, d, f;
            a = 0;
            for (b = D.length; a < b; a++) {
                if (D[a].nTable == this)
                    if (typeof g == "undefined" || typeof g.bRetrieve !=
                        "undefined" && g.bRetrieve === true) return D[a].oInstance;
                    else if (typeof g.bDestroy != "undefined" && g.bDestroy === true) {
                    D[a].oInstance.fnDestroy();
                    break
                } else {
                    H(D[a], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, please pass either no arguments to the dataTable() function, or set bRetrieve to true. Alternatively, to destory the old table and create a new one, set bDestroy to true (note that a lot of changes to the configuration can be made through the API which is usually much faster).");
                    return
                } if (D[a].sTableId !== "" && D[a].sTableId == this.getAttribute("id")) {
                    D.splice(a, 1);
                    break
                }
            }
            var e = new m;
            D.push(e);
            var i = false,
                h = false;
            a = this.getAttribute("id");
            if (a !== null) {
                e.sTableId = a;
                e.sInstance = a
            } else e.sInstance = n._oExternConfig.iNextUnique++; if (this.nodeName.toLowerCase() != "table") H(e, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName);
            else {
                e.nTable = this;
                e.oInstance = qa.length == 1 ? qa : j(this).dataTable();
                e.oApi = qa.oApi;
                e.sDestroyWidth = j(this).width();
                if (typeof g !=
                    "undefined" && g !== null) {
                    e.oInit = g;
                    o(e.oFeatures, g, "bPaginate");
                    o(e.oFeatures, g, "bLengthChange");
                    o(e.oFeatures, g, "bFilter");
                    o(e.oFeatures, g, "bSort");
                    o(e.oFeatures, g, "bInfo");
                    o(e.oFeatures, g, "bProcessing");
                    o(e.oFeatures, g, "bAutoWidth");
                    o(e.oFeatures, g, "bSortClasses");
                    o(e.oFeatures, g, "bServerSide");
                    o(e.oScroll, g, "sScrollX", "sX");
                    o(e.oScroll, g, "sScrollXInner", "sXInner");
                    o(e.oScroll, g, "sScrollY", "sY");
                    o(e.oScroll, g, "bScrollCollapse", "bCollapse");
                    o(e.oScroll, g, "bScrollInfinite", "bInfinite");
                    o(e.oScroll,
                        g, "iScrollLoadGap", "iLoadGap");
                    o(e.oScroll, g, "bScrollAutoCss", "bAutoCss");
                    o(e, g, "asStripClasses");
                    o(e, g, "fnRowCallback");
                    o(e, g, "fnHeaderCallback");
                    o(e, g, "fnFooterCallback");
                    o(e, g, "fnCookieCallback");
                    o(e, g, "fnInitComplete");
                    o(e, g, "fnServerData");
                    o(e, g, "fnFormatNumber");
                    o(e, g, "aaSorting");
                    o(e, g, "aaSortingFixed");
                    o(e, g, "aLengthMenu");
                    o(e, g, "sPaginationType");
                    o(e, g, "sAjaxSource");
                    o(e, g, "iCookieDuration");
                    o(e, g, "sCookiePrefix");
                    o(e, g, "sDom");
                    o(e, g, "oSearch", "oPreviousSearch");
                    o(e, g, "aoSearchCols", "aoPreSearchCols");
                    o(e, g, "iDisplayLength", "_iDisplayLength");
                    o(e, g, "bJQueryUI", "bJUI");
                    o(e.oLanguage, g, "fnInfoCallback");
                    typeof g.fnDrawCallback == "function" && e.aoDrawCallback.push({
                        fn: g.fnDrawCallback,
                        sName: "user"
                    });
                    typeof g.fnStateSaveCallback == "function" && e.aoStateSave.push({
                        fn: g.fnStateSaveCallback,
                        sName: "user"
                    });
                    typeof g.fnStateLoadCallback == "function" && e.aoStateLoad.push({
                        fn: g.fnStateLoadCallback,
                        sName: "user"
                    });
                    e.oFeatures.bServerSide && e.oFeatures.bSort && e.oFeatures.bSortClasses && e.aoDrawCallback.push({
                        fn: T,
                        sName: "server_side_sort_classes"
                    });
                    if (typeof g.bJQueryUI != "undefined" && g.bJQueryUI) {
                        e.oClasses = n.oJUIClasses;
                        if (typeof g.sDom == "undefined") e.sDom = '<"H"lfr>t<"F"ip>'
                    }
                    if (e.oScroll.sX !== "" || e.oScroll.sY !== "") e.oScroll.iBarWidth = Na();
                    if (typeof g.iDisplayStart != "undefined" && typeof e.iInitDisplayStart == "undefined") {
                        e.iInitDisplayStart = g.iDisplayStart;
                        e._iDisplayStart = g.iDisplayStart
                    }
                    if (typeof g.bStateSave != "undefined") {
                        e.oFeatures.bStateSave = g.bStateSave;
                        Ma(e, g);
                        e.aoDrawCallback.push({
                            fn: na,
                            sName: "state_save"
                        })
                    }
                    if (typeof g.aaData != "undefined") h =
                        true;
                    if (typeof g != "undefined" && typeof g.aoData != "undefined") g.aoColumns = g.aoData;
                    if (typeof g.oLanguage != "undefined")
                        if (typeof g.oLanguage.sUrl != "undefined" && g.oLanguage.sUrl !== "") {
                            e.oLanguage.sUrl = g.oLanguage.sUrl;
                            j.getJSON(e.oLanguage.sUrl, null, function (q) {
                                y(e, q, true)
                            });
                            i = true
                        } else y(e, g.oLanguage, false)
                } else g = {}; if (typeof g.asStripClasses == "undefined") {
                    e.asStripClasses.push(e.oClasses.sStripOdd);
                    e.asStripClasses.push(e.oClasses.sStripEven)
                }
                c = false;
                d = j(">tbody>tr", this);
                a = 0;
                for (b = e.asStripClasses.length; a <
                    b; a++)
                    if (d.filter(":lt(2)").hasClass(e.asStripClasses[a])) {
                        c = true;
                        break
                    }
                if (c) {
                    e.asDestoryStrips = ["", ""];
                    if (j(d[0]).hasClass(e.oClasses.sStripOdd)) e.asDestoryStrips[0] += e.oClasses.sStripOdd + " ";
                    if (j(d[0]).hasClass(e.oClasses.sStripEven)) e.asDestoryStrips[0] += e.oClasses.sStripEven;
                    if (j(d[1]).hasClass(e.oClasses.sStripOdd)) e.asDestoryStrips[1] += e.oClasses.sStripOdd + " ";
                    if (j(d[1]).hasClass(e.oClasses.sStripEven)) e.asDestoryStrips[1] += e.oClasses.sStripEven;
                    d.removeClass(e.asStripClasses.join(" "))
                }
                a = this.getElementsByTagName("thead");
                c = a.length === 0 ? [] : fa(a[0]);
                var k;
                if (typeof g.aoColumns == "undefined") {
                    k = [];
                    a = 0;
                    for (b = c.length; a < b; a++) k.push(null)
                } else k = g.aoColumns;
                a = 0;
                for (b = k.length; a < b; a++) {
                    if (typeof g.saved_aoColumns != "undefined" && g.saved_aoColumns.length == b) {
                        if (k[a] === null) k[a] = {};
                        k[a].bVisible = g.saved_aoColumns[a].bVisible
                    }
                    F(e, c ? c[a] : null)
                }
                if (typeof g.aoColumnDefs != "undefined")
                    for (a = g.aoColumnDefs.length - 1; a >= 0; a--) {
                        var l = g.aoColumnDefs[a].aTargets;
                        j.isArray(l) || H(e, 1, "aTargets must be an array of targets, not a " + typeof l);
                        c = 0;
                        for (d = l.length; c < d; c++)
                            if (typeof l[c] == "number" && l[c] >= 0) {
                                for (; e.aoColumns.length <= l[c];) F(e);
                                x(e, l[c], g.aoColumnDefs[a])
                            } else if (typeof l[c] == "number" && l[c] < 0) x(e, e.aoColumns.length + l[c], g.aoColumnDefs[a]);
                        else if (typeof l[c] == "string") {
                            b = 0;
                            for (f = e.aoColumns.length; b < f; b++)
                                if (l[c] == "_all" || e.aoColumns[b].nTh.className.indexOf(l[c]) != -1) x(e, b, g.aoColumnDefs[a])
                        }
                    }
                if (typeof k != "undefined") {
                    a = 0;
                    for (b = k.length; a < b; a++) x(e, a, k[a])
                }
                a = 0;
                for (b = e.aaSorting.length; a < b; a++) {
                    if (e.aaSorting[a][0] >= e.aoColumns.length) e.aaSorting[a][0] =
                        0;
                    k = e.aoColumns[e.aaSorting[a][0]];
                    if (typeof e.aaSorting[a][2] == "undefined") e.aaSorting[a][2] = 0;
                    if (typeof g.aaSorting == "undefined" && typeof e.saved_aaSorting == "undefined") e.aaSorting[a][1] = k.asSorting[0];
                    c = 0;
                    for (d = k.asSorting.length; c < d; c++)
                        if (e.aaSorting[a][1] == k.asSorting[c]) {
                            e.aaSorting[a][2] = c;
                            break
                        }
                }
                T(e);
                this.getElementsByTagName("thead").length === 0 && this.appendChild(p.createElement("thead"));
                this.getElementsByTagName("tbody").length === 0 && this.appendChild(p.createElement("tbody"));
                e.nTHead = this.getElementsByTagName("thead")[0];
                e.nTBody = this.getElementsByTagName("tbody")[0];
                if (this.getElementsByTagName("tfoot").length > 0) e.nTFoot = this.getElementsByTagName("tfoot")[0];
                if (h)
                    for (a = 0; a < g.aaData.length; a++) u(e, g.aaData[a]);
                else z(e);
                e.aiDisplay = e.aiDisplayMaster.slice();
                e.bInitialised = true;
                i === false && s(e)
            }
        })
    }
})(jQuery, window, document);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

/* Jquery Formalize MIN */
var FORMALIZE = function (a, b, c, d) {
    var e = "placeholder" in c.createElement("input"),
        f = "autofocus" in c.createElement("input"),
        g = "webkitAppearance" in c.createElement("select").style,
        h = !! a.browser.msie && parseInt(a.browser.version, 10) === 6,
        i = !! a.browser.msie && parseInt(a.browser.version, 10) === 7;
    return {
        go: function () {
            for (var a in FORMALIZE.init) FORMALIZE.init[a]()
        },
        init: {
            detect_webkit: function () {
                !g || a("html").addClass("is_webkit")
            },
            full_input_size: function () { !! i && !! a("textarea, input.input_full").length && a("textarea, input.input_full").wrap('<span class="input_full_wrap"></span>')
            },
            ie6_skin_inputs: function () {
                if ( !! h && !! a("input, select, textarea").length) {
                    var b = /button|submit|reset/,
                        c = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;
                    a("input").each(function () {
                        var d = a(this);
                        this.getAttribute("type").match(b) ? (d.addClass("ie6_button"), this.disabled && d.addClass("ie6_button_disabled")) : this.getAttribute("type").match(c) && (d.addClass("ie6_input"), this.disabled && d.addClass("ie6_input_disabled"))
                    }), a("textarea, select").each(function () {
                        this.disabled && a(this).addClass("ie6_input_disabled")
                    })
                }
            },
            autofocus: function () {
                !f && !! a(":input[autofocus]").length && a(":input[autofocus]:visible:first").focus()
            },
            placeholder: function () {
                !e && !! a(":input[placeholder]").length && (FORMALIZE.misc.add_placeholder(), a(":input[placeholder]").each(function () {
                    var b = a(this),
                        c = b.attr("placeholder");
                    b.focus(function () {
                        b.val() === c && b.val("").removeClass("placeholder_text")
                    }).blur(function () {
                        FORMALIZE.misc.add_placeholder()
                    }), b.closest("form").submit(function () {
                        b.val() === c && b.val("").removeClass("placeholder_text")
                    }).bind("reset", function () {
                        setTimeout(FORMALIZE.misc.add_placeholder, 50)
                    })
                }))
            }
        },
        misc: {
            add_placeholder: function () {
                !e && !! a(":input[placeholder]").length && a(":input[placeholder]").each(function () {
                    var b = a(this),
                        c = b.attr("placeholder");
                    (!b.val() || b.val() === c) && b.val(c).addClass("placeholder_text")
                })
            }
        }
    }
}(jQuery, this, this.document);
jQuery(document).ready(function () {
    FORMALIZE.go()
});

/* Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 *
 * Version: 3.0.2
 *
 * Requires: 1.2.2+
 */
(function (c) {
    var a = ["DOMMouseScroll", "mousewheel"];
    c.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) {
                for (var d = a.length; d;) {
                    this.addEventListener(a[--d], b, false)
                }
            } else {
                this.onmousewheel = b
            }
        },
        teardown: function () {
            if (this.removeEventListener) {
                for (var d = a.length; d;) {
                    this.removeEventListener(a[--d], b, false)
                }
            } else {
                this.onmousewheel = null
            }
        }
    };
    c.fn.extend({
        mousewheel: function (d) {
            return d ? this.bind("mousewheel", d) : this.trigger("mousewheel")
        },
        unmousewheel: function (d) {
            return this.unbind("mousewheel", d)
        }
    });

    function b(f) {
        var d = [].slice.call(arguments, 1),
            g = 0,
            e = true;
        f = c.event.fix(f || window.event);
        f.type = "mousewheel";
        if (f.wheelDelta) {
            g = f.wheelDelta / 120
        }
        if (f.detail) {
            g = -f.detail / 3
        }
        d.unshift(f, g);
        return c.event.handle.apply(this, d)
    }
})(jQuery);

/*
 * Snippet :: jQuery Syntax Highlighter v2.0.0
 * http://steamdev.com/snippet
 *
 * Copyright 2011, SteamDev
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Wed Jan 19, 2011
 */

(function (a) {
    window.log = function () {
        log.history = log.history || [];
        log.history.push(arguments);
        if (this.console) {
            console.log(Array.prototype.slice.call(arguments))
        }
    };
    a.fn.snippet = function (e, c) {
        if (typeof e == "object") {
            c = e
        }
        if (typeof e == "string") {
            e = e.toLowerCase()
        }
        var d = {
            style: "random",
            showNum: true,
            transparent: false,
            collapse: false,
            menu: true,
            showMsg: "Expand Code",
            hideMsg: "Collapse Code",
            clipboard: "",
            startCollapsed: true,
            startText: false,
            box: "",
            boxColor: "",
            boxFill: ""
        };
        var b = ["acid", "berries-dark", "berries-light", "bipolar", "blacknblue", "bright", "contrast", "darkblue", "darkness", "desert", "dull", "easter", "emacs", "golden", "greenlcd", "ide-anjuta", "ide-codewarrior", "ide-devcpp", "ide-eclipse", "ide-kdev", "ide-msvcpp", "kwrite", "matlab", "navy", "nedit", "neon", "night", "pablo", "peachpuff", "print", "rand01", "the", "typical", "vampire", "vim", "vim-dark", "whatis", "whitengrey", "zellner"];
        if (c) {
            a.extend(d, c)
        }
        return this.each(function () {
            var H = d.style.toLowerCase();
            if (d.style == "random") {
                var D = Math.floor(Math.random() * (b.length));
                H = b[D]
            }
            var u = a(this);
            var y = this.nodeName.toLowerCase();
            if (y == "pre") {
                if (u.data("orgHtml") == undefined || u.data("orgHtml") == null) {
                    var f = u.html();
                    u.data("orgHtml", f)
                }
                if (!u.parent().hasClass("snippet-wrap")) {
                    if (typeof e != "string") {
                        if (u.attr("class").length > 0) {
                            var t = ' class="' + u.attr("class") + '"'
                        } else {
                            var t = ""
                        } if (u.attr("id").length > 0) {
                            var J = ' id="' + u.attr("id") + '"'
                        } else {
                            var J = ""
                        }
                        var A = "Snippet Error: You must specify a language on inital usage of Snippet. Reference <pre" + t + J + ">";
                        console.log(A);
                        return false
                    }
                    u.addClass("sh_" + e).addClass("snippet-formatted").wrap("<div class='snippet-container' style='" + u.attr("style") + ";'><div class='sh_" + H + " snippet-wrap'></div></div>");
                    u.removeAttr("style");
                    sh_highlightDocument();
                    if (d.showNum) {
                        var v = u.html();
                        v = v.replace(/\n/g, "</li><li>");
                        v = "<ol class='snippet-num'><li>" + v + "</li></ol>";
                        while (v.indexOf("<li></li></ol>") != -1) {
                            v = v.replace("<li></li></ol>", "</ol>")
                        }
                    } else {
                        var v = u.html();
                        v = v.replace(/\n/g, "</li><li>");
                        v = "<ul class='snippet-no-num'><li>" + v + "</li></ul>";
                        while (v.indexOf("<li></li></ul>") != -1) {
                            v = v.replace("<li></li></ul>", "</ul>")
                        }
                    }
                    v = v.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                    u.html(v);
                    while (u.find("li").eq(0).html() == "") {
                        u.find("li").eq(0).remove()
                    }
                    u.find("li").each(function () {
                        if (a(this).html().length < 2) {
                            var i = (a(this).html()).replace(/\s/g, "");
                            if (i == "") {
                                if (a.browser.opera) {
                                    a(this).html("&nbsp;")
                                } else {
                                    a(this).html("<span style='display:none;'>&nbsp;</span>")
                                }
                            }
                        }
                    });
                    var w = "<pre class='snippet-textonly sh_sourceCode' style='display:none;'>" + u.data("orgHtml") + "</pre>";
                    var r = "<div class='snippet-menu sh_sourceCode' style='display:none;'><pre><a class='snippet-copy' href='#'>copy</a><a class='snippet-text' href='#'>text</a><a class='snippet-window' href='#'>pop-up</a></pre></div>";
                    u.parent().append(w);
                    u.parent().prepend(r);
                    u.parent().hover(function () {
                        a(this).find(".snippet-menu").fadeIn("fast")
                    }, function () {
                        a(this).find(".snippet-menu").fadeOut("fast")
                    });
                    if (d.clipboard != "" && d.clipboard != false) {
                        var j = u.parent().find("a.snippet-copy");
                        j.show();
                        j.parents(".snippet-menu").show();
                        var s = u.parents(".snippet-wrap").find(".snippet-textonly").text();
                        ZeroClipboard.setMoviePath(d.clipboard);
                        var G = new ZeroClipboard.Client();
                        G.setText(s);
                        G.glue(j[0], j.parents(".snippet-menu")[0]);
                        G.addEventListener("complete", function (i, o) {
                            if (o.length > 500) {
                                o = o.substr(0, 500) + "...\n\n(" + (o.length - 500) + " characters not shown)"
                            }
                            alert("Copied text to clipboard:\n\n " + o)
                        });
                        j.parents(".snippet-menu").hide()
                    } else {
                        u.parent().find("a.snippet-copy").hide()
                    }
                    u.parent().find("a.snippet-text").click(function () {
                        var o = a(this).parents(".snippet-wrap").find(".snippet-formatted");
                        var i = a(this).parents(".snippet-wrap").find(".snippet-textonly");
                        o.toggle();
                        i.toggle();
                        if (i.is(":visible")) {
                            a(this).html("html")
                        } else {
                            a(this).html("text")
                        }
                        a(this).blur();
                        return false
                    });
                    u.parent().find("a.snippet-window").click(function () {
                        var i = a(this).parents(".snippet-wrap").find(".snippet-textonly").html();
                        snippetPopup(i);
                        a(this).blur();
                        return false
                    });
                    if (!d.menu) {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").hide()
                    }
                    if (d.collapse) {
                        var n = u.parent().attr("class");
                        var h = "<div class='snippet-reveal " + n + "'><pre class='sh_sourceCode'><a href='#' class='snippet-toggle'>" + d.showMsg + "</a></pre></div>";
                        var E = "<div class='sh_sourceCode snippet-hide'><pre><a href='#' class='snippet-revealed snippet-toggle'>" + d.hideMsg + "</a></pre></div>";
                        u.parents(".snippet-container").append(h);
                        u.parent().append(E);
                        var z = u.parents(".snippet-container");
                        if (d.startCollapsed) {
                            z.find(".snippet-reveal").show();
                            z.find(".snippet-wrap").eq(0).hide()
                        } else {
                            z.find(".snippet-reveal").hide();
                            z.find(".snippet-wrap").eq(0).show()
                        }
                        z.find("a.snippet-toggle").click(function () {
                            z.find(".snippet-wrap").toggle();
                            return false
                        })
                    }
                    if (d.transparent) {
                        var k = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-reveal pre").css(k)
                    }
                    if (d.startText) {
                        u.hide();
                        u.next(".snippet-textonly").show();
                        u.parent().find(".snippet-text").html("html")
                    }
                    if (d.box != "") {
                        var m = "<span class='box-sp'>&nbsp;</span>";
                        var C = d.box.split(",");
                        for (var B = 0; B < C.length; B++) {
                            var I = C[B];
                            if (I.indexOf("-") == -1) {
                                I = parseFloat(I) - 1;
                                u.find("li").eq(I).addClass("box").prepend(m)
                            } else {
                                var g = parseFloat(I.split("-")[0]) - 1;
                                var l = parseFloat(I.split("-")[1]) - 1;
                                if (g < l) {
                                    u.find("li").eq(g).addClass("box box-top").prepend(m);
                                    u.find("li").eq(l).addClass("box box-bot").prepend(m);
                                    for (var p = g + 1; p < l; p++) {
                                        u.find("li").eq(p).addClass("box box-mid").prepend(m)
                                    }
                                } else {
                                    if (g == l) {
                                        u.find("li").eq(g).addClass("box").prepend(m)
                                    }
                                }
                            }
                        }
                        if (d.boxColor != "") {
                            u.find("li.box").css("border-color", d.boxColor)
                        }
                        if (d.boxFill != "") {
                            u.find("li.box, li.box-top, li.box-mid, li.box-bot").addClass("box-bg").css("background-color", d.boxFill)
                        }
                        if (a.browser.webkit) {
                            u.find(".snippet-num li.box").css("margin-left", "-3.3em");
                            u.find(".snippet-num li .box-sp").css("width", "21px")
                        }
                    }
                    u.parents(".snippet-container").find("a").addClass("sh_url")
                } else {
                    u.parent().attr("class", "sh_" + H + " snippet-wrap");
                    u.parents(".snippet-container").find(".snippet-reveal").attr("class", "sh_" + H + " snippet-wrap snippet-reveal");
                    u.find("li.box, li.box-top, li.box-mid, li.box-bot").removeAttr("style").removeAttr("class");
                    u.find("li .box-sp").remove();
                    if (d.transparent) {
                        var k = {
                            "background-color": "transparent",
                            "box-shadow": "none",
                            "-moz-box-shadow": "none",
                            "-webkit-box-shadow": "none"
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-hide pre").css(k)
                    } else {
                        var k = {
                            "background-color": "",
                            "box-shadow": "",
                            "-moz-box-shadow": "",
                            "-webkit-box-shadow": ""
                        };
                        u.css(k);
                        u.next(".snippet-textonly").css(k);
                        u.parents(".snippet-container").find(".snippet-reveal pre").css(k)
                    } if (d.showNum) {
                        var F = u.find("li").eq(0).parent();
                        if (F.hasClass("snippet-no-num")) {
                            F.wrap("<ol class='snippet-num'></ol>");
                            var q = u.find("li").eq(0);
                            q.unwrap()
                        }
                    } else {
                        var F = u.find("li").eq(0).parent();
                        if (F.hasClass("snippet-num")) {
                            F.wrap("<ul class='snippet-no-num'></ul>");
                            var q = u.find("li").eq(0);
                            q.unwrap()
                        }
                    } if (d.box != "") {
                        var m = "<span class='box-sp'>&nbsp;</span>";
                        var C = d.box.split(",");
                        for (var B = 0; B < C.length; B++) {
                            var I = C[B];
                            if (I.indexOf("-") == -1) {
                                I = parseFloat(I) - 1;
                                u.find("li").eq(I).addClass("box").prepend(m)
                            } else {
                                var g = parseFloat(I.split("-")[0]) - 1;
                                var l = parseFloat(I.split("-")[1]) - 1;
                                if (g < l) {
                                    u.find("li").eq(g).addClass("box box-top").prepend(m);
                                    u.find("li").eq(l).addClass("box box-bot").prepend(m);
                                    for (var p = g + 1; p < l; p++) {
                                        u.find("li").eq(p).addClass("box box-mid").prepend(m)
                                    }
                                } else {
                                    if (g == l) {
                                        u.find("li").eq(g).addClass("box").prepend(m)
                                    }
                                }
                            }
                        }
                        if (d.boxColor != "") {
                            u.find("li.box").css("border-color", d.boxColor)
                        }
                        if (d.boxFill != "") {
                            u.find("li.box").addClass("box-bg").css("background-color", d.boxFill)
                        }
                        if (a.browser.webkit) {
                            u.find(".snippet-num li.box").css("margin-left", "-3.3em");
                            u.find(".snippet-num li .box-sp").css("width", "21px")
                        }
                    }
                    sh_highlightDocument();
                    if (!d.menu) {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").hide()
                    } else {
                        u.prev(".snippet-menu").find("pre,.snippet-clipboard").show()
                    }
                }
            } else {
                var A = "Snippet Error: Sorry, Snippet only formats '<pre>' elements. '<" + y + ">' elements are currently unsupported.";
                console.log(A);
                return false
            }
        })
    }
})(jQuery);

function snippetPopup(a) {
    top.consoleRef = window.open("", "myconsole", "width=600,height=300,left=50,top=50,menubar=0,toolbar=0,location=0,status=0,scrollbars=1,resizable=1");
    top.consoleRef.document.writeln("<html><head><title>Snippet :: Code View :: " + location.href + '</title></head><body bgcolor=white onLoad="self.focus()"><pre>' + a + "</pre></body></html>");
    top.consoleRef.document.close()
}
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function (a) {
        if (typeof (a) == "string") {
            a = document.getElementById(a)
        }
        if (!a.addClass) {
            a.hide = function () {
                this.style.display = "none"
            };
            a.show = function () {
                this.style.display = ""
            };
            a.addClass = function (b) {
                this.removeClass(b);
                this.className += " " + b
            };
            a.removeClass = function (d) {
                var e = this.className.split(/\s+/);
                var b = -1;
                for (var c = 0; c < e.length; c++) {
                    if (e[c] == d) {
                        b = c;
                        c = e.length
                    }
                }
                if (b > -1) {
                    e.splice(b, 1);
                    this.className = e.join(" ")
                }
                return this
            };
            a.hasClass = function (b) {
                return !!this.className.match(new RegExp("\\s*" + b + "\\s*"))
            }
        }
        return a
    },
    setMoviePath: function (a) {
        this.moviePath = a
    },
    dispatch: function (d, b, c) {
        var a = this.clients[d];
        if (a) {
            a.receiveEvent(b, c)
        }
    },
    register: function (b, a) {
        this.clients[b] = a
    },
    getDOMObjectPosition: function (c, a) {
        var b = {
            left: 0,
            top: 0,
            width: c.width ? c.width : c.offsetWidth,
            height: c.height ? c.height : c.offsetHeight
        };
        while (c && (c != a)) {
            b.left += c.offsetLeft;
            b.top += c.offsetTop;
            c = c.offsetParent
        }
        return b
    },
    Client: function (a) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = "ZeroClipboardMovie_" + this.id;
        ZeroClipboard.register(this.id, this);
        if (a) {
            this.glue(a)
        }
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: "",
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function (d, b, e) {
        this.domElement = ZeroClipboard.$(d);
        var f = 99;
        if (this.domElement.style.zIndex) {
            f = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof (b) == "string") {
            b = ZeroClipboard.$(b)
        } else {
            if (typeof (b) == "undefined") {
                b = document.getElementsByTagName("body")[0]
            }
        }
        var c = ZeroClipboard.getDOMObjectPosition(this.domElement, b);
        this.div = document.createElement("div");
        this.div.className = "snippet-clipboard";
        var a = this.div.style;
        a.position = "absolute";
        a.left = "" + c.left + "px";
        a.top = "" + c.top + "px";
        a.width = "" + c.width + "px";
        a.height = "" + c.height + "px";
        a.zIndex = f;
        if (typeof (e) == "object") {
            for (addedStyle in e) {
                a[addedStyle] = e[addedStyle]
            }
        }
        b.appendChild(this.div);
        this.div.innerHTML = this.getHTML(c.width, c.height)
    },
    getHTML: function (d, a) {
        var c = "";
        var b = "id=" + this.id + "&width=" + d + "&height=" + a;
        if (navigator.userAgent.match(/MSIE/)) {
            var e = location.href.match(/^https/i) ? "https://" : "http://";
            c += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + e + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + d + '" height="' + a + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + b + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            c += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + d + '" height="' + a + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + b + '" wmode="transparent" />'
        }
        return c
    },
    hide: function () {
        if (this.div) {
            this.div.style.left = "-2000px"
        }
    },
    show: function () {
        this.reposition()
    },
    destroy: function () {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = "";
            var a = document.getElementsByTagName("body")[0];
            try {
                a.removeChild(this.div)
            } catch (b) {}
            this.domElement = null;
            this.div = null
        }
    },
    reposition: function (c) {
        if (c) {
            this.domElement = ZeroClipboard.$(c);
            if (!this.domElement) {
                this.hide()
            }
        }
        if (this.domElement && this.div) {
            var b = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var a = this.div.style;
            a.left = "" + b.left + "px";
            a.top = "" + b.top + "px"
        }
    },
    setText: function (a) {
        this.clipText = a;
        if (this.ready) {
            this.movie.setText(a)
        }
    },
    addEventListener: function (a, b) {
        a = a.toString().toLowerCase().replace(/^on/, "");
        if (!this.handlers[a]) {
            this.handlers[a] = []
        }
        this.handlers[a].push(b)
    },
    setHandCursor: function (a) {
        this.handCursorEnabled = a;
        if (this.ready) {
            this.movie.setHandCursor(a)
        }
    },
    setCSSEffects: function (a) {
        this.cssEffects = !! a
    },
    receiveEvent: function (d, f) {
        d = d.toString().toLowerCase().replace(/^on/, "");
        switch (d) {
        case "load":
            this.movie = document.getElementById(this.movieId);
            if (!this.movie) {
                var c = this;
                setTimeout(function () {
                    c.receiveEvent("load", null)
                }, 1);
                return
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var c = this;
                setTimeout(function () {
                    c.receiveEvent("load", null)
                }, 100);
                this.ready = true;
                return
            }
            this.ready = true;
            try {
                this.movie.setText(this.clipText)
            } catch (h) {}
            try {
                this.movie.setHandCursor(this.handCursorEnabled)
            } catch (h) {}
            break;
        case "mouseover":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("hover");
                if (this.recoverActive) {
                    this.domElement.addClass("active")
                }
            }
            break;
        case "mouseout":
            if (this.domElement && this.cssEffects) {
                this.recoverActive = false;
                if (this.domElement.hasClass("active")) {
                    this.domElement.removeClass("active");
                    this.recoverActive = true
                }
                this.domElement.removeClass("hover")
            }
            break;
        case "mousedown":
            if (this.domElement && this.cssEffects) {
                this.domElement.addClass("active")
            }
            break;
        case "mouseup":
            if (this.domElement && this.cssEffects) {
                this.domElement.removeClass("active");
                this.recoverActive = false
            }
            break
        }
        if (this.handlers[d]) {
            for (var b = 0, a = this.handlers[d].length; b < a; b++) {
                var g = this.handlers[d][b];
                if (typeof (g) == "function") {
                    g(this, f)
                } else {
                    if ((typeof (g) == "object") && (g.length == 2)) {
                        g[0][g[1]](this, f)
                    } else {
                        if (typeof (g) == "string") {
                            window[g](this, f)
                        }
                    }
                }
            }
        }
    }
};
if (!this.sh_languages) {
    this.sh_languages = {}
}
var sh_requests = {};

function sh_isEmailAddress(b) {
    if (/^mailto:/.test(b)) {
        return false
    }
    return b.indexOf("@") !== -1
}

function sh_setHref(e, h, g) {
    var f = g.substring(e[h - 2].pos, e[h - 1].pos);
    if (f.length >= 2 && f.charAt(0) === "<" && f.charAt(f.length - 1) === ">") {
        f = f.substr(1, f.length - 2)
    }
    if (sh_isEmailAddress(f)) {
        f = "mailto:" + f
    }
    e[h - 2].node.href = f
}

function sh_konquerorExec(c) {
    var d = [""];
    d.index = c.length;
    d.input = c;
    return d
}

function sh_highlightString(X, ah) {
    if (/Konqueror/.test(navigator.userAgent)) {
        if (!ah.konquered) {
            for (var T = 0; T < ah.length; T++) {
                for (var R = 0; R < ah[T].length; R++) {
                    var S = ah[T][R][0];
                    if (S.source === "$") {
                        S.exec = sh_konquerorExec
                    }
                }
            }
            ah.konquered = true
        }
    }
    var i = document.createElement("a");
    var ag = document.createElement("span");
    var Y = [];
    var am = 0;
    var ai = [];
    var W = 0;
    var al = null;
    var ab = function (c, b) {
        var g = c.length;
        if (g === 0) {
            return
        }
        if (!b) {
            var e = ai.length;
            if (e !== 0) {
                var d = ai[e - 1];
                if (!d[3]) {
                    b = d[1]
                }
            }
        }
        if (al !== b) {
            if (al) {
                Y[am++] = {
                    pos: W
                };
                if (al === "sh_url") {
                    sh_setHref(Y, am, X)
                }
            }
            if (b) {
                var f;
                if (b === "sh_url") {
                    f = i.cloneNode(false)
                } else {
                    f = ag.cloneNode(false)
                }
                f.className = b;
                Y[am++] = {
                    node: f,
                    pos: W
                }
            }
        }
        W += g;
        al = b
    };
    var af = /\r\n|\r|\n/g;
    af.lastIndex = 0;
    var ar = X.length;
    while (W < ar) {
        var ad = W;
        var ak;
        var ac;
        var an = af.exec(X);
        if (an === null) {
            ak = ar;
            ac = ar
        } else {
            ak = an.index;
            ac = af.lastIndex
        }
        var ao = X.substring(ad, ak);
        var p = [];
        for (;;) {
            var Q = W - ad;
            var V;
            var aa = ai.length;
            if (aa === 0) {
                V = 0
            } else {
                V = ai[aa - 1][2]
            }
            var a = ah[V];
            var Z = a.length;
            var aj = p[V];
            if (!aj) {
                aj = p[V] = []
            }
            var U = null;
            var ae = -1;
            for (var s = 0; s < Z; s++) {
                var ap;
                if (s < aj.length && (aj[s] === null || Q <= aj[s].index)) {
                    ap = aj[s]
                } else {
                    var at = a[s][0];
                    at.lastIndex = Q;
                    ap = at.exec(ao);
                    aj[s] = ap
                } if (ap !== null && (U === null || ap.index < U.index)) {
                    U = ap;
                    ae = s;
                    if (ap.index === Q) {
                        break
                    }
                }
            }
            if (U === null) {
                ab(ao.substring(Q), null);
                break
            } else {
                if (U.index > Q) {
                    ab(ao.substring(Q, U.index), null)
                }
                var aq = a[ae];
                var P = aq[1];
                var au;
                if (P instanceof Array) {
                    for (var r = 0; r < P.length; r++) {
                        au = U[r + 1];
                        ab(au, P[r])
                    }
                } else {
                    au = U[0];
                    ab(au, P)
                }
                switch (aq[2]) {
                case -1:
                    break;
                case -2:
                    ai.pop();
                    break;
                case -3:
                    ai.length = 0;
                    break;
                default:
                    ai.push(aq);
                    break
                }
            }
        }
        if (al) {
            Y[am++] = {
                pos: W
            };
            if (al === "sh_url") {
                sh_setHref(Y, am, X)
            }
            al = null
        }
        W = ac
    }
    return Y
}

function sh_getClasses(i) {
    var g = [];
    var f = i.className;
    if (f && f.length > 0) {
        var h = f.split(" ");
        for (var j = 0; j < h.length; j++) {
            if (h[j].length > 0) {
                g.push(h[j])
            }
        }
    }
    return g
}

function sh_addClass(h, f) {
    var g = sh_getClasses(h);
    for (var e = 0; e < g.length; e++) {
        if (f.toLowerCase() === g[e].toLowerCase()) {
            return
        }
    }
    g.push(f);
    h.className = g.join(" ")
}

function sh_extractTagsFromNodeList(l, h) {
    var i = l.length;
    for (var k = 0; k < i; k++) {
        var j = l.item(k);
        switch (j.nodeType) {
        case 1:
            if (j.nodeName.toLowerCase() === "br") {
                var g;
                if (/MSIE/.test(navigator.userAgent)) {
                    g = "\r"
                } else {
                    g = "\n"
                }
                h.text.push(g);
                h.pos++
            } else {
                h.tags.push({
                    node: j.cloneNode(false),
                    pos: h.pos
                });
                sh_extractTagsFromNodeList(j.childNodes, h);
                h.tags.push({
                    pos: h.pos
                })
            }
            break;
        case 3:
        case 4:
            h.text.push(j.data);
            h.pos += j.length;
            break
        }
    }
}

function sh_extractTags(f, d) {
    var e = {};
    e.text = [];
    e.tags = d;
    e.pos = 0;
    sh_extractTagsFromNodeList(f.childNodes, e);
    return e.text.join("")
}

function sh_mergeTags(o, m) {
    var r = o.length;
    if (r === 0) {
        return m
    }
    var p = m.length;
    if (p === 0) {
        return o
    }
    var j = [];
    var n = 0;
    var q = 0;
    while (n < r && q < p) {
        var k = o[n];
        var l = m[q];
        if (k.pos <= l.pos) {
            j.push(k);
            n++
        } else {
            j.push(l);
            if (m[q + 1].pos <= k.pos) {
                q++;
                j.push(m[q]);
                q++
            } else {
                j.push({
                    pos: k.pos
                });
                m[q] = {
                    node: l.node.cloneNode(false),
                    pos: k.pos
                }
            }
        }
    }
    while (n < r) {
        j.push(o[n]);
        n++
    }
    while (q < p) {
        j.push(m[q]);
        q++
    }
    return j
}

function sh_insertTags(n, q) {
    var r = document;
    var m = document.createDocumentFragment();
    var t = 0;
    var u = n.length;
    var w = 0;
    var o = q.length;
    var v = m;
    while (w < o || t < u) {
        var p;
        var x;
        if (t < u) {
            p = n[t];
            x = p.pos
        } else {
            x = o
        } if (x <= w) {
            if (p.node) {
                var s = p.node;
                v.appendChild(s);
                v = s
            } else {
                v = v.parentNode
            }
            t++
        } else {
            v.appendChild(r.createTextNode(q.substring(w, x)));
            w = x
        }
    }
    return m
}

function sh_highlightElement(m, j) {
    sh_addClass(m, "sh_sourceCode");
    var n = [];
    var l = sh_extractTags(m, n);
    var k = sh_highlightString(l, j);
    var h = sh_mergeTags(n, k);
    var i = sh_insertTags(h, l);
    while (m.hasChildNodes()) {
        m.removeChild(m.firstChild)
    }
    m.appendChild(i)
}

function sh_getXMLHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Msxml2.XMLHTTP")
    } else {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest()
        }
    }
    throw "No XMLHttpRequest implementation available"
}

function sh_load(language, element, prefix, suffix) {
    if (language in sh_requests) {
        sh_requests[language].push(element);
        return
    }
    sh_requests[language] = [element];
    var request = sh_getXMLHttpRequest();
    var url = prefix + "sh_" + language + suffix;
    request.open("GET", url, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            try {
                if (!request.status || request.status === 200) {
                    eval(request.responseText);
                    var elements = sh_requests[language];
                    for (var i = 0; i < elements.length; i++) {
                        sh_highlightElement(elements[i], sh_languages[language])
                    }
                } else {
                    throw "HTTP error: status " + request.status
                }
            } finally {
                request = null
            }
        }
    };
    request.send(null)
}

function sh_highlightDocument(e, g) {
    var b = document.getElementsByTagName("pre");
    for (var d = 0; d < b.length; d++) {
        var c = b.item(d);
        var f = c.className.toLowerCase();
        var a = f.replace(/sh_sourcecode/g, "");
        if (a.indexOf("sh_") != -1) {
            a = a.match(/(\bsh_)\w+\b/g)[0]
        }
        if (f.indexOf("sh_sourcecode") != -1) {
            continue
        }
        if (a.substr(0, 3) === "sh_") {
            var h = a.substring(3);
            if (h in sh_languages) {
                sh_highlightElement(c, sh_languages[h])
            } else {
                if (typeof (e) === "string" && typeof (g) === "string") {
                    sh_load(h, c, e, g)
                } else {
                    console.log('Found <pre> element with class="' + a + '", but no such language exists');
                    continue
                }
            }
            break
        }
    }
}
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.c = [
    [
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 13],
        [/'/g, "sh_string", 14],
        [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/$/g, null, -2],
        [/</g, "sh_string", 11],
        [/"/g, "sh_string", 12],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.cpp = [
    [
        [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 13],
        [/'/g, "sh_string", 14],
        [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/$/g, null, -2],
        [/</g, "sh_string", 11],
        [/"/g, "sh_string", 12],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.csharp = [
    [
        [/\b(?:using)\b/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))(?:[FfDdMmUulL]+)?\b/g, "sh_number", -1],
        [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:abstract|event|new|struct|as|explicit|null|switch|base|extern|this|false|operator|throw|break|finally|out|true|fixed|override|try|case|params|typeof|catch|for|private|foreach|protected|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|continue|in|return|virtual|default|interface|sealed|volatile|delegate|internal|do|is|sizeof|while|lock|stackalloc|else|static|enum|namespace|get|partial|set|value|where|yield)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 10, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 13],
        [/'/g, "sh_string", 14],
        [/\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/$/g, null, -2],
        [/</g, "sh_string", 11],
        [/"/g, "sh_string", 12],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.css = [
    [
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/(?:\.|#)[A-Za-z0-9_]+/g, "sh_selector", -1],
        [/\{/g, "sh_cbracket", 10, 1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\}/g, "sh_cbracket", -2],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/[A-Za-z0-9_-]+[ \t]*:/g, "sh_property", -1],
        [/[.%A-Za-z0-9_-]+/g, "sh_value", -1],
        [/#(?:[A-Za-z0-9_]+)/g, "sh_string", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.flex = [
    [
        [/^%\{/g, "sh_preproc", 1, 1],
        [/^%[sx]/g, "sh_preproc", 16, 1],
        [/^%option/g, "sh_preproc", 17, 1],
        [/^%(?:array|pointer|[aceknopr])/g, "sh_preproc", -1],
        [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_preproc", 19, 1],
        [/^%%/g, "sh_preproc", 20, 1]
    ],
    [
        [/^%\}/g, "sh_preproc", -2],
        [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 2],
        [/\/\//g, "sh_comment", 8],
        [/\/\*\*/g, "sh_comment", 9],
        [/\/\*/g, "sh_comment", 10],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 14],
        [/'/g, "sh_string", 15],
        [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 3, 1],
        [/<!DOCTYPE/g, "sh_preproc", 5, 1],
        [/<!--/g, "sh_comment", 6],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 7, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 7, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 4]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 4]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 6]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 4]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 3, 1],
        [/<!DOCTYPE/g, "sh_preproc", 5, 1],
        [/<!--/g, "sh_comment", 6],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 7, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 7, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/$/g, null, -2],
        [/</g, "sh_string", 12],
        [/"/g, "sh_string", 13],
        [/\/\/\//g, "sh_comment", 2],
        [/\/\//g, "sh_comment", 8],
        [/\/\*\*/g, "sh_comment", 9],
        [/\/\*/g, "sh_comment", 10]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/$/g, null, -2],
        [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2],
        [/[A-Za-z_][A-Za-z0-9_-]*/g, "sh_keyword", -1],
        [/"/g, "sh_string", 18],
        [/=/g, "sh_symbol", -1]
    ],
    [
        [/$/g, null, -2],
        [/"/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "sh_type", -1],
        [/"/g, "sh_string", 13],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]
    ],
    [
        [/^%%/g, "sh_preproc", 21, 1],
        [/<[A-Za-z_][A-Za-z0-9_-]*>/g, "sh_function", -1],
        [/"/g, "sh_string", 13],
        [/\\./g, "sh_preproc", -1],
        [/\{[A-Za-z_][A-Za-z0-9_-]*\}/g, "sh_type", -1],
        [/\/\*/g, "sh_comment", 22],
        [/\{/g, "sh_cbracket", 23, 1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1]
    ],
    [
        [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 2],
        [/\/\//g, "sh_comment", 8],
        [/\/\*\*/g, "sh_comment", 9],
        [/\/\*/g, "sh_comment", 10],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 14],
        [/'/g, "sh_string", 15],
        [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/\/\*/g, "sh_comment", 22]
    ],
    [
        [/\}/g, "sh_cbracket", -2],
        [/\{/g, "sh_cbracket", 23, 1],
        [/\$./g, "sh_variable", -1],
        [/(\b(?:class|struct|typename))([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:class|const_cast|delete|dynamic_cast|explicit|false|friend|inline|mutable|namespace|new|operator|private|protected|public|reinterpret_cast|static_cast|template|this|throw|true|try|typeid|typename|using|virtual)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 2],
        [/\/\//g, "sh_comment", 8],
        [/\/\*\*/g, "sh_comment", 9],
        [/\/\*/g, "sh_comment", 10],
        [/(\bstruct)([ \t]+)([A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/^[ \t]*#(?:[ \t]*include)/g, "sh_preproc", 11, 1],
        [/^[ \t]*#(?:[ \t]*[A-Za-z0-9_]*)/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 14],
        [/'/g, "sh_string", 15],
        [/\b(?:__asm|__cdecl|__declspec|__export|__far16|__fastcall|__fortran|__import|__pascal|__rtti|__stdcall|_asm|_cdecl|__except|_export|_far16|_fastcall|__finally|_fortran|_import|_pascal|_stdcall|__thread|__try|asm|auto|break|case|catch|cdecl|const|continue|default|do|else|enum|extern|for|goto|if|pascal|register|return|sizeof|static|struct|switch|typedef|union|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:bool|char|double|float|int|long|short|signed|unsigned|void|wchar_t)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.html = [
    [
        [/<\?xml/g, "sh_preproc", 1, 1],
        [/<!DOCTYPE/g, "sh_preproc", 3, 1],
        [/<!--/g, "sh_comment", 4],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 5, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 5, 1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 4]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.java = [
    [
        [/\b(?:import|package)\b/g, "sh_preproc", -1],
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 10],
        [/'/g, "sh_string", 11],
        [/(\b(?:class|interface))([ \t]+)([$A-Za-z0-9_]+)/g, ["sh_keyword", "sh_normal", "sh_classname"], -1],
        [/\b(?:abstract|assert|break|case|catch|class|const|continue|default|do|else|extends|false|final|finally|for|goto|if|implements|instanceof|interface|native|new|null|private|protected|public|return|static|strictfp|super|switch|synchronized|throw|throws|true|this|transient|try|volatile|while)\b/g, "sh_keyword", -1],
        [/\b(?:int|byte|boolean|char|long|float|double|short|void)\b/g, "sh_type", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1],
        [/([A-Za-z](?:[^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]|[_])*)((?:<.*>)?)(\s+(?=[*&]*[A-Za-z][^`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\s]*\s*[`~!@#$%&*()_=+{}|;:",<.>\/?'\\[\]\^\-\[\]]+))/g, ["sh_usertype", "sh_usertype", "sh_normal"], -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.javascript = [
    [
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "sh_keyword", -1],
        [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["sh_symbol", "sh_normal", "sh_symbol"], -1],
        [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["sh_number", "sh_normal", "sh_symbol"], -1],
        [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["sh_normal", "sh_symbol"], -1],
        [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "sh_regexp", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 10],
        [/'/g, "sh_string", 11],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "sh_predef_var", -1],
        [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "sh_predef_func", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.javascript_dom = [
    [
        [/\/\/\//g, "sh_comment", 1],
        [/\/\//g, "sh_comment", 7],
        [/\/\*\*/g, "sh_comment", 8],
        [/\/\*/g, "sh_comment", 9],
        [/\b(?:abstract|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|final|finally|for|function|goto|if|implements|in|instanceof|interface|native|new|null|private|protected|prototype|public|return|static|super|switch|synchronized|throw|throws|this|transient|true|try|typeof|var|volatile|while|with)\b/g, "sh_keyword", -1],
        [/(\+\+|--|\)|\])(\s*)(\/=?(?![*\/]))/g, ["sh_symbol", "sh_normal", "sh_symbol"], -1],
        [/(0x[A-Fa-f0-9]+|(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?)(\s*)(\/(?![*\/]))/g, ["sh_number", "sh_normal", "sh_symbol"], -1],
        [/([A-Za-z$_][A-Za-z0-9$_]*\s*)(\/=?(?![*\/]))/g, ["sh_normal", "sh_symbol"], -1],
        [/\/(?:\\.|[^*\\\/])(?:\\.|[^\\\/])*\/[gim]*/g, "sh_regexp", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 10],
        [/'/g, "sh_string", 11],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/\b(?:Math|Infinity|NaN|undefined|arguments)\b/g, "sh_predef_var", -1],
        [/\b(?:Array|Boolean|Date|Error|EvalError|Function|Number|Object|RangeError|ReferenceError|RegExp|String|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt)\b/g, "sh_predef_func", -1],
        [/\b(?:applicationCache|closed|Components|content|controllers|crypto|defaultStatus|dialogArguments|directories|document|frameElement|frames|fullScreen|globalStorage|history|innerHeight|innerWidth|length|location|locationbar|menubar|name|navigator|opener|outerHeight|outerWidth|pageXOffset|pageYOffset|parent|personalbar|pkcs11|returnValue|screen|availTop|availLeft|availHeight|availWidth|colorDepth|height|left|pixelDepth|top|width|screenX|screenY|scrollbars|scrollMaxX|scrollMaxY|scrollX|scrollY|self|sessionStorage|sidebar|status|statusbar|toolbar|top|window)\b/g, "sh_predef_var", -1],
        [/\b(?:alert|addEventListener|atob|back|blur|btoa|captureEvents|clearInterval|clearTimeout|close|confirm|dump|escape|find|focus|forward|getAttention|getComputedStyle|getSelection|home|moveBy|moveTo|open|openDialog|postMessage|print|prompt|releaseEvents|removeEventListener|resizeBy|resizeTo|scroll|scrollBy|scrollByLines|scrollByPages|scrollTo|setInterval|setTimeout|showModalDialog|sizeToContent|stop|unescape|updateCommands|onabort|onbeforeunload|onblur|onchange|onclick|onclose|oncontextmenu|ondragdrop|onerror|onfocus|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onpaint|onreset|onresize|onscroll|onselect|onsubmit|onunload)\b/g, "sh_predef_func", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 5]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 3]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 2, 1],
        [/<!DOCTYPE/g, "sh_preproc", 4, 1],
        [/<!--/g, "sh_comment", 5],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 6, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 6, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.perl = [
    [
        [/\b(?:import)\b/g, "sh_preproc", -1],
        [/(s)(\{(?:\\\}|[^}])*\}\{(?:\\\}|[^}])*\})([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1],
        [/(s)(\((?:\\\)|[^)])*\)\((?:\\\)|[^)])*\))([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1],
        [/(s)(\[(?:\\\]|[^\]])*\]\[(?:\\\]|[^\]])*\])([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1],
        [/(s)(<.*><.*>)([ixsmogce]*)/g, ["sh_keyword", "sh_regexp", "sh_keyword"], -1],
        [/(q(?:q?))(\{(?:\\\}|[^}])*\})/g, ["sh_keyword", "sh_string"], -1],
        [/(q(?:q?))(\((?:\\\)|[^)])*\))/g, ["sh_keyword", "sh_string"], -1],
        [/(q(?:q?))(\[(?:\\\]|[^\]])*\])/g, ["sh_keyword", "sh_string"], -1],
        [/(q(?:q?))(<.*>)/g, ["sh_keyword", "sh_string"], -1],
        [/(q(?:q?))([^A-Za-z0-9 \t])(.*\2)/g, ["sh_keyword", "sh_string", "sh_string"], -1],
        [/(s)([^A-Za-z0-9 \t])(.*\2.*\2)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["sh_keyword", "sh_regexp", "sh_regexp", "sh_keyword"], -1],
        [/(s)([^A-Za-z0-9 \t])(.*\2[ \t]*)([^A-Za-z0-9 \t])(.*\4)([ixsmogce]*(?=[ \t]*(?:\)|;)))/g, ["sh_keyword", "sh_regexp", "sh_regexp", "sh_regexp", "sh_regexp", "sh_keyword"], -1],
        [/#/g, "sh_comment", 1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/(?:m|qr)(?=\{)/g, "sh_keyword", 2],
        [/(?:m|qr)(?=#)/g, "sh_keyword", 4],
        [/(?:m|qr)(?=\|)/g, "sh_keyword", 6],
        [/(?:m|qr)(?=@)/g, "sh_keyword", 8],
        [/(?:m|qr)(?=<)/g, "sh_keyword", 10],
        [/(?:m|qr)(?=\[)/g, "sh_keyword", 12],
        [/(?:m|qr)(?=\\)/g, "sh_keyword", 14],
        [/(?:m|qr)(?=\/)/g, "sh_keyword", 16],
        [/"/g, "sh_string", 18],
        [/'/g, "sh_string", 19],
        [/</g, "sh_string", 20],
        [/\/[^\n]*\//g, "sh_string", -1],
        [/\b(?:chomp|chop|chr|crypt|hex|i|index|lc|lcfirst|length|oct|ord|pack|q|qq|reverse|rindex|sprintf|substr|tr|uc|ucfirst|m|s|g|qw|abs|atan2|cos|exp|hex|int|log|oct|rand|sin|sqrt|srand|my|local|our|delete|each|exists|keys|values|pack|read|syscall|sysread|syswrite|unpack|vec|undef|unless|return|length|grep|sort|caller|continue|dump|eval|exit|goto|last|next|redo|sub|wantarray|pop|push|shift|splice|unshift|split|switch|join|defined|foreach|last|chop|chomp|bless|dbmclose|dbmopen|ref|tie|tied|untie|while|next|map|eq|die|cmp|lc|uc|and|do|if|else|elsif|for|use|require|package|import|chdir|chmod|chown|chroot|fcntl|glob|ioctl|link|lstat|mkdir|open|opendir|readlink|rename|rmdir|stat|symlink|umask|unlink|utime|binmode|close|closedir|dbmclose|dbmopen|die|eof|fileno|flock|format|getc|print|printf|read|readdir|rewinddir|seek|seekdir|select|syscall|sysread|sysseek|syswrite|tell|telldir|truncate|warn|write|alarm|exec|fork|getpgrp|getppid|getpriority|kill|pipe|qx|setpgrp|setpriority|sleep|system|times|x|wait|waitpid)\b/g, "sh_keyword", -1],
        [/^\=(?:head1|head2|item)/g, "sh_comment", 21],
        [/(?:\$[#]?|@|%)[\/A-Za-z0-9_]+/g, "sh_variable", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\{/g, "sh_regexp", 3]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\\{|\\\}|\}/g, "sh_regexp", -3]
    ],
    [
        [/#/g, "sh_regexp", 5]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\#|#/g, "sh_regexp", -3]
    ],
    [
        [/\|/g, "sh_regexp", 7]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\\||\|/g, "sh_regexp", -3]
    ],
    [
        [/@/g, "sh_regexp", 9]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\@|@/g, "sh_regexp", -3]
    ],
    [
        [/</g, "sh_regexp", 11]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\<|\\>|>/g, "sh_regexp", -3]
    ],
    [
        [/\[/g, "sh_regexp", 13]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\]|\]/g, "sh_regexp", -3]
    ],
    [
        [/\\/g, "sh_regexp", 15]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\\\|\\/g, "sh_regexp", -3]
    ],
    [
        [/\//g, "sh_regexp", 17]
    ],
    [
        [/[ \t]+#.*/g, "sh_comment", -1],
        [/\$(?:[A-Za-z0-9_]+|\{[A-Za-z0-9_]+\})/g, "sh_variable", -1],
        [/\\\/|\//g, "sh_regexp", -3]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|')/g, null, -1],
        [/'/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/\=cut/g, "sh_comment", -2]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.php = [
    [
        [/\b(?:include|include_once|require|require_once)\b/g, "sh_preproc", -1],
        [/\/\//g, "sh_comment", 1],
        [/#/g, "sh_comment", 1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 2],
        [/'/g, "sh_string", 3],
        [/\b(?:and|or|xor|__FILE__|exception|php_user_filter|__LINE__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|each|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|isset|list|new|old_function|print|return|static|switch|unset|use|var|while|__FUNCTION__|__CLASS__|__METHOD__)\b/g, "sh_keyword", -1],
        [/\/\/\//g, "sh_comment", 4],
        [/\/\//g, "sh_comment", 1],
        [/\/\*\*/g, "sh_comment", 9],
        [/\/\*/g, "sh_comment", 10],
        [/(?:\$[#]?|@|%)[A-Za-z0-9_]+/g, "sh_variable", -1],
        [/<\?php|~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\{|\}/g, "sh_cbracket", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/\\(?:\\|')/g, null, -1],
        [/'/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 5, 1],
        [/<!DOCTYPE/g, "sh_preproc", 6, 1],
        [/<!--/g, "sh_comment", 7],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 7]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 5, 1],
        [/<!DOCTYPE/g, "sh_preproc", 6, 1],
        [/<!--/g, "sh_comment", 7],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 8, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 8, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.python = [
    [
        [/\b(?:import|from)\b/g, "sh_preproc", -1],
        [/#/g, "sh_comment", 1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/\b(?:and|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|global|if|in|is|lambda|not|or|pass|print|raise|return|try|while)\b/g, "sh_keyword", -1],
        [/^(?:[\s]*'{3})/g, "sh_comment", 2],
        [/^(?:[\s]*\"{3})/g, "sh_comment", 3],
        [/^(?:[\s]*'(?:[^\\']|\\.)*'[\s]*|[\s]*\"(?:[^\\\"]|\\.)*\"[\s]*)$/g, "sh_comment", -1],
        [/(?:[\s]*'{3})/g, "sh_string", 4],
        [/(?:[\s]*\"{3})/g, "sh_string", 5],
        [/"/g, "sh_string", 6],
        [/'/g, "sh_string", 7],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\||\{|\}/g, "sh_symbol", -1],
        [/(?:[A-Za-z]|_)[A-Za-z0-9_]*(?=[ \t]*\()/g, "sh_function", -1]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/(?:'{3})/g, "sh_comment", -2]
    ],
    [
        [/(?:\"{3})/g, "sh_comment", -2]
    ],
    [
        [/(?:'{3})/g, "sh_string", -2]
    ],
    [
        [/(?:\"{3})/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|')/g, null, -1],
        [/'/g, "sh_string", -2]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.ruby = [
    [
        [/\b(?:require)\b/g, "sh_preproc", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1],
        [/"/g, "sh_string", 1],
        [/'/g, "sh_string", 2],
        [/</g, "sh_string", 3],
        [/\/[^\n]*\//g, "sh_regexp", -1],
        [/(%r)(\{(?:\\\}|#\{[A-Za-z0-9]+\}|[^}])*\})/g, ["sh_symbol", "sh_regexp"], -1],
        [/\b(?:alias|begin|BEGIN|break|case|defined|do|else|elsif|end|END|ensure|for|if|in|include|loop|next|raise|redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|false|nil|self|true|__FILE__|__LINE__|and|not|or|def|class|module|catch|fail|load|throw)\b/g, "sh_keyword", -1],
        [/(?:^\=begin)/g, "sh_comment", 4],
        [/(?:\$[#]?|@@|@)(?:[A-Za-z0-9_]+|'|\"|\/)/g, "sh_type", -1],
        [/[A-Za-z0-9]+(?:\?|!)/g, "sh_normal", -1],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/(#)(\{)/g, ["sh_symbol", "sh_cbracket"], -1],
        [/#/g, "sh_comment", 5],
        [/\{|\}/g, "sh_cbracket", -1]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/\\(?:\\|')/g, null, -1],
        [/'/g, "sh_string", -2]
    ],
    [
        [/$/g, null, -2],
        [/>/g, "sh_string", -2]
    ],
    [
        [/^(?:\=end)/g, "sh_comment", -2]
    ],
    [
        [/$/g, null, -2]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.sql = [
    [
        [/\b(?:VARCHAR|TINYINT|TEXT|DATE|SMALLINT|MEDIUMINT|INT|BIGINT|FLOAT|DOUBLE|DECIMAL|DATETIME|TIMESTAMP|TIME|YEAR|UNSIGNED|CHAR|TINYBLOB|TINYTEXT|BLOB|MEDIUMBLOB|MEDIUMTEXT|LONGBLOB|LONGTEXT|ENUM|BOOL|BINARY|VARBINARY)\b/gi, "sh_type", -1],
        [/\b(?:ALL|ASC|AS|ALTER|AND|ADD|AUTO_INCREMENT|BETWEEN|BINARY|BOTH|BY|BOOLEAN|CHANGE|CHECK|COLUMNS|COLUMN|CROSS|CREATE|DATABASES|DATABASE|DATA|DELAYED|DESCRIBE|DESC|DISTINCT|DELETE|DROP|DEFAULT|ENCLOSED|ESCAPED|EXISTS|EXPLAIN|FIELDS|FIELD|FLUSH|FOR|FOREIGN|FUNCTION|FROM|GROUP|GRANT|HAVING|IGNORE|INDEX|INFILE|INSERT|INNER|INTO|IDENTIFIED|IN|IS|IF|JOIN|KEYS|KILL|KEY|LEADING|LIKE|LIMIT|LINES|LOAD|LOCAL|LOCK|LOW_PRIORITY|LEFT|LANGUAGE|MODIFY|NATURAL|NOT|NULL|NEXTVAL|OPTIMIZE|OPTION|OPTIONALLY|ORDER|OUTFILE|OR|OUTER|ON|PROCEDURE|PROCEDURAL|PRIMARY|READ|REFERENCES|REGEXP|RENAME|REPLACE|RETURN|REVOKE|RLIKE|RIGHT|SHOW|SONAME|STATUS|STRAIGHT_JOIN|SELECT|SETVAL|SET|TABLES|TERMINATED|TO|TRAILING|TRUNCATE|TABLE|TEMPORARY|TRIGGER|TRUSTED|UNIQUE|UNLOCK|USE|USING|UPDATE|VALUES|VARIABLES|VIEW|WITH|WRITE|WHERE|ZEROFILL|TYPE|XOR)\b/gi, "sh_keyword", -1],
        [/"/g, "sh_string", 1],
        [/'/g, "sh_string", 2],
        [/`/g, "sh_string", 3],
        [/#/g, "sh_comment", 4],
        [/\/\/\//g, "sh_comment", 5],
        [/\/\//g, "sh_comment", 4],
        [/\/\*\*/g, "sh_comment", 11],
        [/\/\*/g, "sh_comment", 12],
        [/--/g, "sh_comment", 4],
        [/~|!|%|\^|\*|\(|\)|-|\+|=|\[|\]|\\|:|;|,|\.|\/|\?|&|<|>|\|/g, "sh_symbol", -1],
        [/\b[+-]?(?:(?:0x[A-Fa-f0-9]+)|(?:(?:[\d]*\.)?[\d]+(?:[eE][+-]?[\d]+)?))u?(?:(?:int(?:8|16|32|64))|L)?\b/g, "sh_number", -1]
    ],
    [
        [/"/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/'/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/`/g, "sh_string", -2],
        [/\\./g, "sh_specialchar", -1]
    ],
    [
        [/$/g, null, -2]
    ],
    [
        [/$/g, null, -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 6, 1],
        [/<!DOCTYPE/g, "sh_preproc", 8, 1],
        [/<!--/g, "sh_comment", 9],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 10, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 10, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 7]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 7]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 9]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 7]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/<\?xml/g, "sh_preproc", 6, 1],
        [/<!DOCTYPE/g, "sh_preproc", 8, 1],
        [/<!--/g, "sh_comment", 9],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 10, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z][A-Za-z0-9]*/g, "sh_keyword", 10, 1],
        [/@[A-Za-z]+/g, "sh_type", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ],
    [
        [/\*\//g, "sh_comment", -2],
        [/(?:<?)[A-Za-z0-9_\.\/\-_~]+@[A-Za-z0-9_\.\/\-_~]+(?:>?)|(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_~]+(?:>?)/g, "sh_url", -1],
        [/(?:TODO|FIXME|BUG)(?:[:]?)/g, "sh_todo", -1]
    ]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.url = [
    [{
        regex: /(?:<?)[A-Za-z0-9_\.\/\-_]+@[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
        style: "sh_url"
    }, {
        regex: /(?:<?)[A-Za-z0-9_]+:\/\/[A-Za-z0-9_\.\/\-_]+(?:>?)/g,
        style: "sh_url"
    }]
];
if (!this.sh_languages) {
    this.sh_languages = {}
}
sh_languages.xml = [
    [
        [/<\?xml/g, "sh_preproc", 1, 1],
        [/<!DOCTYPE/g, "sh_preproc", 3, 1],
        [/<!--/g, "sh_comment", 4],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)(?:\/)?>/g, "sh_keyword", -1],
        [/<(?:\/)?[A-Za-z](?:[A-Za-z0-9_:.-]*)/g, "sh_keyword", 5, 1],
        [/&(?:[A-Za-z0-9]+);/g, "sh_preproc", -1]
    ],
    [
        [/\?>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/\\(?:\\|")/g, null, -1],
        [/"/g, "sh_string", -2]
    ],
    [
        [/>/g, "sh_preproc", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ],
    [
        [/-->/g, "sh_comment", -2],
        [/<!--/g, "sh_comment", 4]
    ],
    [
        [/(?:\/)?>/g, "sh_keyword", -2],
        [/([^=" \t>]+)([ \t]*)(=?)/g, ["sh_type", "sh_normal", "sh_symbol"], -1],
        [/"/g, "sh_string", 2]
    ]
];

/*
 * --------------------------------------------------------------------
 * jQuery inputToButton plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */
(function ($) {
    $.fn.visualize = function (options, container) {
        return $(this).each(function () {
            //configuration
            var o = $.extend({
                type: 'bar', //also available: area, pie, line
                width: $(this).width(), //height of canvas - defaults to table height
                height: $(this).height(), //height of canvas - defaults to table height
                appendTitle: true, //table caption text is added to chart
                title: null, //grabs from table caption if null
                appendKey: true, //color key is added to chart
                rowFilter: ' ',
                colFilter: ' ',
                colors: ['#be1e2d', '#666699', '#92d5ea', '#ee8310', '#8d10ee', '#5a3b16', '#26a4ed', '#f45a90', '#e9e744'],
                textColors: [], //corresponds with colors array. null/undefined items will fall back to CSS
                parseDirection: 'x', //which direction to parse the table data
                pieMargin: 20, //pie charts only - spacing around pie
                pieLabelsAsPercent: true,
                pieLabelPos: 'inside',
                lineWeight: 4, //for line and area - stroke weight
                barGroupMargin: 10,
                barMargin: 1, //space around bars in bar chart (added to both sides of bar)
                yLabelInterval: 30 //distance between y labels
            }, options);

            //reset width, height to numbers
            o.width = parseFloat(o.width);
            o.height = parseFloat(o.height);

            var self = $(this);

            //function to scrape data from html table

            function scrapeTable() {
                var colors = o.colors;
                var textColors = o.textColors;
                var tableData = {
                    dataGroups: function () {
                        var dataGroups = [];
                        if (o.parseDirection == 'x') {
                            self.find('tr:gt(0)').filter(o.rowFilter).each(function (i) {
                                dataGroups[i] = {};
                                dataGroups[i].points = [];
                                dataGroups[i].color = colors[i];
                                if (textColors[i]) {
                                    dataGroups[i].textColor = textColors[i];
                                }
                                $(this).find('td').filter(o.colFilter).each(function () {
                                    dataGroups[i].points.push(parseFloat($(this).text()));
                                });
                            });
                        } else {
                            var cols = self.find('tr:eq(1) td').filter(o.colFilter).size();
                            for (var i = 0; i < cols; i++) {
                                dataGroups[i] = {};
                                dataGroups[i].points = [];
                                dataGroups[i].color = colors[i];
                                if (textColors[i]) {
                                    dataGroups[i].textColor = textColors[i];
                                }
                                self.find('tr:gt(0)').filter(o.rowFilter).each(function () {
                                    dataGroups[i].points.push($(this).find('td').filter(o.colFilter).eq(i).text() * 1);
                                });
                            };
                        }
                        return dataGroups;
                    },
                    allData: function () {
                        var allData = [];
                        $(this.dataGroups()).each(function () {
                            allData.push(this.points);
                        });
                        return allData;
                    },
                    dataSum: function () {
                        var dataSum = 0;
                        var allData = this.allData().join(',').split(',');
                        $(allData).each(function () {
                            dataSum += parseFloat(this);
                        });
                        return dataSum
                    },
                    topValue: function () {
                        var topValue = 0;
                        var allData = this.allData().join(',').split(',');
                        $(allData).each(function () {
                            if (parseFloat(this, 10) > topValue) topValue = parseFloat(this);
                        });
                        return topValue;
                    },
                    bottomValue: function () {
                        var bottomValue = 0;
                        var allData = this.allData().join(',').split(',');
                        $(allData).each(function () {
                            if (this < bottomValue) bottomValue = parseFloat(this);
                        });
                        return bottomValue;
                    },
                    memberTotals: function () {
                        var memberTotals = [];
                        var dataGroups = this.dataGroups();
                        $(dataGroups).each(function (l) {
                            var count = 0;
                            $(dataGroups[l].points).each(function (m) {
                                count += dataGroups[l].points[m];
                            });
                            memberTotals.push(count);
                        });
                        return memberTotals;
                    },
                    yTotals: function () {
                        var yTotals = [];
                        var dataGroups = this.dataGroups();
                        var loopLength = this.xLabels().length;
                        for (var i = 0; i < loopLength; i++) {
                            yTotals[i] = [];
                            var thisTotal = 0;
                            $(dataGroups).each(function (l) {
                                yTotals[i].push(this.points[i]);
                            });
                            yTotals[i].join(',').split(',');
                            $(yTotals[i]).each(function () {
                                thisTotal += parseFloat(this);
                            });
                            yTotals[i] = thisTotal;
                        }
                        return yTotals;
                    },
                    topYtotal: function () {
                        var topYtotal = 0;
                        var yTotals = this.yTotals().join(',').split(',');
                        $(yTotals).each(function () {
                            if (parseFloat(this, 10) > topYtotal) topYtotal = parseFloat(this);
                        });
                        return topYtotal;
                    },
                    totalYRange: function () {
                        return this.topValue() - this.bottomValue();
                    },
                    xLabels: function () {
                        var xLabels = [];
                        if (o.parseDirection == 'x') {
                            self.find('tr:eq(0) th').filter(o.colFilter).each(function () {
                                xLabels.push($(this).html());
                            });
                        } else {
                            self.find('tr:gt(0) th').filter(o.rowFilter).each(function () {
                                xLabels.push($(this).html());
                            });
                        }
                        return xLabels;
                    },
                    yLabels: function () {
                        var yLabels = [];
                        yLabels.push(bottomValue);
                        var numLabels = Math.round(o.height / o.yLabelInterval);
                        var loopInterval = Math.ceil(totalYRange / numLabels) || 1;
                        while (yLabels[yLabels.length - 1] < topValue - loopInterval) {
                            yLabels.push(yLabels[yLabels.length - 1] + loopInterval);
                        }
                        yLabels.push(topValue);
                        return yLabels;
                    }
                };

                return tableData;
            };

            //function to create a chart
            var createChart = {
                pie: function () {
                    canvasContain.addClass('visualize-pie');

                    if (o.pieLabelPos == 'outside') {
                        canvasContain.addClass('visualize-pie-outside');
                    }

                    var centerx = Math.round(canvas.width() / 2);
                    var centery = Math.round(canvas.height() / 2);
                    var radius = centery - o.pieMargin;
                    var counter = 0.0;
                    var toRad = function (integer) {
                        return (Math.PI / 180) * integer;
                    };
                    var labels = $('<ul class="visualize-labels"></ul>')
                        .insertAfter(canvas);

                    //draw the pie pieces
                    $.each(memberTotals, function (i) {
                        var fraction = (this <= 0 || isNaN(this)) ? 0 : this / dataSum;
                        ctx.beginPath();
                        ctx.moveTo(centerx, centery);
                        ctx.arc(centerx, centery, radius,
                            counter * Math.PI * 2 - Math.PI * 0.5, (counter + fraction) * Math.PI * 2 - Math.PI * 0.5,
                            false);
                        ctx.lineTo(centerx, centery);
                        ctx.closePath();
                        ctx.fillStyle = dataGroups[i].color;
                        ctx.fill();
                        // draw labels
                        var sliceMiddle = (counter + fraction / 2);
                        var distance = o.pieLabelPos == 'inside' ? radius / 1.5 : radius + radius / 5;
                        var labelx = Math.round(centerx + Math.sin(sliceMiddle * Math.PI * 2) * (distance));
                        var labely = Math.round(centery - Math.cos(sliceMiddle * Math.PI * 2) * (distance));
                        var leftRight = (labelx > centerx) ? 'right' : 'left';
                        var topBottom = (labely > centery) ? 'bottom' : 'top';
                        var percentage = parseFloat((fraction * 100).toFixed(2));

                        if (percentage) {
                            var labelval = (o.pieLabelsAsPercent) ? percentage + '%' : this;
                            var labeltext = $('<span class="visualize-label">' + labelval + '</span>')
                                .css(leftRight, 0)
                                .css(topBottom, 0);
                            if (labeltext)
                                var label = $('<li class="visualize-label-pos"></li>')
                                    .appendTo(labels)
                                    .css({
                                        left: labelx,
                                        top: labely
                                    })
                                    .append(labeltext);
                            labeltext
                                .css('font-size', radius / 8)
                                .css('margin-' + leftRight, -labeltext.width() / 2)
                                .css('margin-' + topBottom, -labeltext.outerHeight() / 2);

                            if (dataGroups[i].textColor) {
                                labeltext.css('color', dataGroups[i].textColor);
                            }
                        }
                        counter += fraction;
                    });
                },

                line: function (area) {
                    if (area) {
                        canvasContain.addClass('visualize-area');
                    } else {
                        canvasContain.addClass('visualize-line');
                    }

                    //write X labels
                    var xInterval = canvas.width() / (xLabels.length - 1);
                    var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
                        .width(canvas.width())
                        .height(canvas.height())
                        .insertBefore(canvas);
                    $.each(xLabels, function (i) {
                        var thisLi = $('<li><span>' + this + '</span></li>')
                            .prepend('<span class="line" />')
                            .css('left', xInterval * i)
                            .appendTo(xlabelsUL);
                        var label = thisLi.find('span:not(.line)');
                        var leftOffset = label.width() / -2;
                        if (i == 0) {
                            leftOffset = 0;
                        } else if (i == xLabels.length - 1) {
                            leftOffset = -label.width();
                        }
                        label
                            .css('margin-left', leftOffset)
                            .addClass('label');
                    });

                    //write Y labels
                    var yScale = canvas.height() / totalYRange;
                    var liBottom = canvas.height() / (yLabels.length - 1);
                    var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
                        .width(canvas.width())
                        .height(canvas.height())
                        .insertBefore(canvas);

                    $.each(yLabels, function (i) {
                        var thisLi = $('<li><span>' + this + '</span></li>')
                            .prepend('<span class="line"  />')
                            .css('bottom', liBottom * i)
                            .prependTo(ylabelsUL);
                        var label = thisLi.find('span:not(.line)');
                        var topOffset = label.height() / -2;
                        if (i == 0) {
                            topOffset = -label.height();
                        } else if (i == yLabels.length - 1) {
                            topOffset = 0;
                        }
                        label
                            .css('margin-top', topOffset)
                            .addClass('label');
                    });

                    //start from the bottom left
                    ctx.translate(0, zeroLoc);
                    //iterate and draw
                    $.each(dataGroups, function (h) {
                        ctx.beginPath();
                        ctx.lineWidth = o.lineWeight;
                        ctx.lineJoin = 'round';
                        var points = this.points;
                        var integer = 0;
                        ctx.moveTo(0, -(points[0] * yScale));
                        $.each(points, function () {
                            ctx.lineTo(integer, -(this * yScale));
                            integer += xInterval;
                        });
                        ctx.strokeStyle = this.color;
                        ctx.stroke();
                        if (area) {
                            ctx.lineTo(integer, 0);
                            ctx.lineTo(0, 0);
                            ctx.closePath();
                            ctx.fillStyle = this.color;
                            ctx.globalAlpha = .3;
                            ctx.fill();
                            ctx.globalAlpha = 1.0;
                        } else {
                            ctx.closePath();
                        }
                    });
                },

                area: function () {
                    createChart.line(true);
                },

                bar: function () {
                    canvasContain.addClass('visualize-bar');

                    //write X labels
                    var xInterval = canvas.width() / (xLabels.length);
                    var xlabelsUL = $('<ul class="visualize-labels-x"></ul>')
                        .width(canvas.width())
                        .height(canvas.height())
                        .insertBefore(canvas);
                    $.each(xLabels, function (i) {
                        var thisLi = $('<li><span class="label">' + this + '</span></li>')
                            .prepend('<span class="line" />')
                            .css('left', xInterval * i)
                            .width(xInterval)
                            .appendTo(xlabelsUL);
                        var label = thisLi.find('span.label');
                        label.addClass('label');
                    });

                    //write Y labels
                    var yScale = canvas.height() / totalYRange;
                    var liBottom = canvas.height() / (yLabels.length - 1);
                    var ylabelsUL = $('<ul class="visualize-labels-y"></ul>')
                        .width(canvas.width())
                        .height(canvas.height())
                        .insertBefore(canvas);
                    $.each(yLabels, function (i) {
                        var thisLi = $('<li><span>' + this + '</span></li>')
                            .prepend('<span class="line"  />')
                            .css('bottom', liBottom * i)
                            .prependTo(ylabelsUL);
                        var label = thisLi.find('span:not(.line)');
                        var topOffset = label.height() / -2;
                        if (i == 0) {
                            topOffset = -label.height();
                        } else if (i == yLabels.length - 1) {
                            topOffset = 0;
                        }
                        label
                            .css('margin-top', topOffset)
                            .addClass('label');
                    });

                    //start from the bottom left
                    ctx.translate(0, zeroLoc);
                    //iterate and draw
                    for (var h = 0; h < dataGroups.length; h++) {
                        ctx.beginPath();
                        var linewidth = (xInterval - o.barGroupMargin * 2) / dataGroups.length; //removed +1
                        var strokeWidth = linewidth - (o.barMargin * 2);
                        ctx.lineWidth = strokeWidth;
                        var points = dataGroups[h].points;
                        var integer = 0;
                        for (var i = 0; i < points.length; i++) {
                            var xVal = (integer - o.barGroupMargin) + (h * linewidth) + linewidth / 2;
                            xVal += o.barGroupMargin * 2;

                            ctx.moveTo(xVal, 0);
                            ctx.lineTo(xVal, Math.round(-points[i] * yScale));
                            integer += xInterval;
                        }
                        ctx.strokeStyle = dataGroups[h].color;
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            };

            //create new canvas, set w&h attrs (not inline styles)
            var canvasNode = document.createElement("canvas");
            canvasNode.setAttribute('height', o.height);
            canvasNode.setAttribute('width', o.width);
            var canvas = $(canvasNode);

            //get title for chart
            var title = o.title || self.find('caption').text();

            //create canvas wrapper div, set inline w&h, append
            var canvasContain = (container || $('<div class="visualize" role="img" aria-label="Chart representing data from the table: ' + title + '" />'))
                .height(o.height)
                .width(o.width)
                .append(canvas);

            //scrape table (this should be cleaned up into an obj)
            var tableData = scrapeTable();
            var dataGroups = tableData.dataGroups();
            var allData = tableData.allData();
            var dataSum = tableData.dataSum();
            var topValue = tableData.topValue();
            var bottomValue = tableData.bottomValue();
            var memberTotals = tableData.memberTotals();
            var totalYRange = tableData.totalYRange();
            var zeroLoc = o.height * (topValue / totalYRange);
            var xLabels = tableData.xLabels();
            var yLabels = tableData.yLabels();

            //title/key container
            if (o.appendTitle || o.appendKey) {
                var infoContain = $('<div class="visualize-info"></div>')
                    .appendTo(canvasContain);
            }

            //append title
            if (o.appendTitle) {
                $('<div class="visualize-title">' + title + '</div>').appendTo(infoContain);
            }

            //append key
            if (o.appendKey) {
                var newKey = $('<ul class="visualize-key"></ul>');
                var selector;
                if (o.parseDirection == 'x') {
                    selector = self.find('tr:gt(0) th').filter(o.rowFilter);
                } else {
                    selector = self.find('tr:eq(0) th').filter(o.colFilter);
                }

                selector.each(function (i) {
                    $('<li><span class="visualize-key-color" style="background: ' + dataGroups[i].color + '"></span><span class="visualize-key-label">' + $(this).text() + '</span></li>')
                        .appendTo(newKey);
                });
                newKey.appendTo(infoContain);
            };

            //append new canvas to page

            if (!container) {
                canvasContain.insertAfter(this);
            }
            if (typeof (G_vmlCanvasManager) != 'undefined') {
                G_vmlCanvasManager.init();
                G_vmlCanvasManager.initElement(canvas[0]);
            }

            //set up the drawing board
            var ctx = canvas[0].getContext('2d');

            //create chart
            createChart[o.type]();

            //clean up some doubled lines that sit on top of canvas borders (done via JS due to IE)
            $('.visualize-line li:first-child span.line, .visualize-line li:last-child span.line, .visualize-area li:first-child span.line, .visualize-area li:last-child span.line, .visualize-bar li:first-child span.line,.visualize-bar .visualize-labels-y li:last-child span.line').css('border', 'none');
            if (!container) {
                //add event for updating
                canvasContain.bind('visualizeRefresh', function () {
                    self.visualize(o, $(this).empty());
                });
            }
        }).next(); //returns canvas(es)
    };
})(jQuery);

/* malihu custom scrollbar plugin - http://manos.malihu.gr */
(function ($) {
    $.fn.mCustomScrollbar = function (scrollType, animSpeed, easeType, bottomSpace, draggerDimType, mouseWheelSupport, scrollBtnsSupport, scrollBtnsSpeed) {
        var id = $(this).attr("id");
        var $customScrollBox = $("#" + id + " .customScrollBox");
        var $customScrollBox_container = $("#" + id + " .customScrollBox .container");
        var $customScrollBox_content = $("#" + id + " .customScrollBox .content");
        var $dragger_container = $("#" + id + " .dragger_container");
        var $dragger = $("#" + id + " .dragger");
        var $scrollUpBtn = $("#" + id + " .scrollUpBtn");
        var $scrollDownBtn = $("#" + id + " .scrollDownBtn");
        var $customScrollBox_horWrapper = $("#" + id + " .customScrollBox .horWrapper");

        //get & store minimum dragger height & width (defined in css)
        if (!$customScrollBox.data("minDraggerHeight")) {
            $customScrollBox.data("minDraggerHeight", $dragger.height());
        }
        if (!$customScrollBox.data("minDraggerWidth")) {
            $customScrollBox.data("minDraggerWidth", $dragger.width());
        }

        //get & store original content height & width
        if (!$customScrollBox.data("contentHeight")) {
            $customScrollBox.data("contentHeight", $customScrollBox_container.height());
        }
        if (!$customScrollBox.data("contentWidth")) {
            $customScrollBox.data("contentWidth", $customScrollBox_container.width());
        }

        CustomScroller();

        function CustomScroller(reloadType) {
            //horizontal scrolling ------------------------------
            if (scrollType == "horizontal") {
                var visibleWidth = $customScrollBox.width();
                //set content width automatically
                $customScrollBox_horWrapper.css("width", 999999); //set a rediculously high width value ;)
                $customScrollBox.data("totalContent", $customScrollBox_container.width()); //get inline div width
                $customScrollBox_horWrapper.css("width", $customScrollBox.data("totalContent")); //set back the proper content width value

                if ($customScrollBox_container.width() > visibleWidth) { //enable scrollbar if content is long
                    $dragger.css("display", "block");
                    if (reloadType != "resize" && $customScrollBox_container.width() != $customScrollBox.data("contentWidth")) {
                        $dragger.css("left", 0);
                        $customScrollBox_container.css("left", 0);
                        $customScrollBox.data("contentWidth", $customScrollBox_container.width());
                    }
                    $dragger_container.css("display", "block");
                    $scrollDownBtn.css("display", "inline-block");
                    $scrollUpBtn.css("display", "inline-block");
                    var totalContent = $customScrollBox_content.width();
                    var minDraggerWidth = $customScrollBox.data("minDraggerWidth");
                    var draggerContainerWidth = $dragger_container.width();

                    function AdjustDraggerWidth() {
                        if (draggerDimType == "auto") {
                            var adjDraggerWidth = Math.round(totalContent - ((totalContent - visibleWidth) * 1.3)); //adjust dragger width analogous to content
                            if (adjDraggerWidth <= minDraggerWidth) { //minimum dragger width
                                $dragger.css("width", minDraggerWidth + "px");
                            } else if (adjDraggerWidth >= draggerContainerWidth) {
                                $dragger.css("width", draggerContainerWidth - 10 + "px");
                            } else {
                                $dragger.css("width", adjDraggerWidth + "px");
                            }
                        }
                    }
                    AdjustDraggerWidth();

                    var targX = 0;
                    var draggerWidth = $dragger.width();
                    $dragger.draggable({
                        axis: "x",
                        containment: "parent",
                        drag: function (event, ui) {
                            ScrollX();
                        },
                        stop: function (event, ui) {
                            DraggerRelease();
                        }
                    });

                    $dragger_container.click(function (e) {
                        var $this = $(this);
                        var mouseCoord = (e.pageX - $this.offset().left);
                        if (mouseCoord < $dragger.position().left || mouseCoord > ($dragger.position().left + $dragger.width())) {
                            var targetPos = mouseCoord + $dragger.width();
                            if (targetPos < $dragger_container.width()) {
                                $dragger.css("left", mouseCoord);
                                ScrollX();
                            } else {
                                $dragger.css("left", $dragger_container.width() - $dragger.width());
                                ScrollX();
                            }
                        }
                    });

                    //mousewheel
                    $(function ($) {
                        if (mouseWheelSupport == "yes") {
                            $customScrollBox.unbind("mousewheel");
                            $customScrollBox.bind("mousewheel", function (event, delta) {
                                var vel = Math.abs(delta * 10);
                                $dragger.css("left", $dragger.position().left - (delta * vel));
                                ScrollX();
                                if ($dragger.position().left < 0) {
                                    $dragger.css("left", 0);
                                    $customScrollBox_container.stop();
                                    ScrollX();
                                }
                                if ($dragger.position().left > $dragger_container.width() - $dragger.width()) {
                                    $dragger.css("left", $dragger_container.width() - $dragger.width());
                                    $customScrollBox_container.stop();
                                    ScrollX();
                                }
                                return false;
                            });
                        }
                    });

                    //scroll buttons
                    if (scrollBtnsSupport == "yes") {
                        $scrollDownBtn.mouseup(function () {
                            BtnsScrollXStop();
                        }).mousedown(function () {
                            BtnsScrollX("down");
                        });

                        $scrollUpBtn.mouseup(function () {
                            BtnsScrollXStop();
                        }).mousedown(function () {
                            BtnsScrollX("up");
                        });

                        $scrollDownBtn.click(function (e) {
                            e.preventDefault();
                        });
                        $scrollUpBtn.click(function (e) {
                            e.preventDefault();
                        });

                        btnsScrollTimerX = 0;

                        function BtnsScrollX(dir) {
                            if (dir == "down") {
                                var btnsScrollTo = $dragger_container.width() - $dragger.width();
                                var scrollSpeed = Math.abs($dragger.position().left - btnsScrollTo) * (100 / scrollBtnsSpeed);
                                $dragger.stop().animate({
                                    left: btnsScrollTo
                                }, scrollSpeed, "linear");
                            } else {
                                var btnsScrollTo = 0;
                                var scrollSpeed = Math.abs($dragger.position().left - btnsScrollTo) * (100 / scrollBtnsSpeed);
                                $dragger.stop().animate({
                                    left: -btnsScrollTo
                                }, scrollSpeed, "linear");
                            }
                            clearInterval(btnsScrollTimerX);
                            btnsScrollTimerX = setInterval(ScrollX, 20);
                        }

                        function BtnsScrollXStop() {
                            clearInterval(btnsScrollTimerX);
                            $dragger.stop();
                        }
                    }

                    //scroll
                    var scrollAmount = (totalContent - visibleWidth) / (draggerContainerWidth - draggerWidth);

                    function ScrollX() {
                        var draggerX = $dragger.position().left;
                        var targX = -draggerX * scrollAmount;
                        var thePos = $customScrollBox_container.position().left - targX;
                        $customScrollBox_container.stop().animate({
                            left: "-=" + thePos
                        }, animSpeed, easeType);
                    }
                } else { //disable scrollbar if content is short
                    $dragger.css("left", 0).css("display", "none"); //reset content scroll
                    $customScrollBox_container.css("left", 0);
                    $dragger_container.css("display", "none");
                    $scrollDownBtn.css("display", "none");
                    $scrollUpBtn.css("display", "none");
                }
                //vertical scrolling ------------------------------
            } else {
                var visibleHeight = $customScrollBox.height();
                if ($customScrollBox_container.height() > visibleHeight) { //enable scrollbar if content is long
                    $dragger.css("display", "block");
                    if (reloadType != "resize" && $customScrollBox_container.height() != $customScrollBox.data("contentHeight")) {
                        $dragger.css("top", 0);
                        $customScrollBox_container.css("top", 0);
                        $customScrollBox.data("contentHeight", $customScrollBox_container.height());
                    }
                    $dragger_container.css("display", "block");
                    $scrollDownBtn.css("display", "inline-block");
                    $scrollUpBtn.css("display", "inline-block");
                    var totalContent = $customScrollBox_content.height();
                    var minDraggerHeight = $customScrollBox.data("minDraggerHeight");
                    var draggerContainerHeight = $dragger_container.height();

                    function AdjustDraggerHeight() {
                        if (draggerDimType == "auto") {
                            var adjDraggerHeight = Math.round(totalContent - ((totalContent - visibleHeight) * 1.3)); //adjust dragger height analogous to content
                            if (adjDraggerHeight <= minDraggerHeight) { //minimum dragger height
                                $dragger.css("height", minDraggerHeight + "px").css("line-height", minDraggerHeight + "px");
                            } else if (adjDraggerHeight >= draggerContainerHeight) {
                                $dragger.css("height", draggerContainerHeight - 10 + "px").css("line-height", draggerContainerHeight - 10 + "px");
                            } else {
                                $dragger.css("height", adjDraggerHeight + "px").css("line-height", adjDraggerHeight + "px");
                            }
                        }
                    }
                    AdjustDraggerHeight();

                    var targY = 0;
                    var draggerHeight = $dragger.height();
                    $dragger.draggable({
                        axis: "y",
                        containment: "parent",
                        drag: function (event, ui) {
                            Scroll();
                        },
                        stop: function (event, ui) {
                            DraggerRelease();
                        }
                    });

                    $dragger_container.click(function (e) {
                        var $this = $(this);
                        var mouseCoord = (e.pageY - $this.offset().top);
                        if (mouseCoord < $dragger.position().top || mouseCoord > ($dragger.position().top + $dragger.height())) {
                            var targetPos = mouseCoord + $dragger.height();
                            if (targetPos < $dragger_container.height()) {
                                $dragger.css("top", mouseCoord);
                                Scroll();
                            } else {
                                $dragger.css("top", $dragger_container.height() - $dragger.height());
                                Scroll();
                            }
                        }
                    });

                    //mousewheel
                    $(function ($) {
                        if (mouseWheelSupport == "yes") {
                            $customScrollBox.unbind("mousewheel");
                            $customScrollBox.bind("mousewheel", function (event, delta) {
                                var vel = Math.abs(delta * 10);
                                $dragger.css("top", $dragger.position().top - (delta * vel));
                                Scroll();
                                if ($dragger.position().top < 0) {
                                    $dragger.css("top", 0);
                                    $customScrollBox_container.stop();
                                    Scroll();
                                }
                                if ($dragger.position().top > $dragger_container.height() - $dragger.height()) {
                                    $dragger.css("top", $dragger_container.height() - $dragger.height());
                                    $customScrollBox_container.stop();
                                    Scroll();
                                }
                                return false;
                            });
                        }
                    });

                    //scroll buttons
                    if (scrollBtnsSupport == "yes") {
                        $scrollDownBtn.mouseup(function () {
                            BtnsScrollStop();
                        }).mousedown(function () {
                            BtnsScroll("down");
                        });

                        $scrollUpBtn.mouseup(function () {
                            BtnsScrollStop();
                        }).mousedown(function () {
                            BtnsScroll("up");
                        });

                        $scrollDownBtn.click(function (e) {
                            e.preventDefault();
                        });
                        $scrollUpBtn.click(function (e) {
                            e.preventDefault();
                        });

                        btnsScrollTimer = 0;

                        function BtnsScroll(dir) {
                            if (dir == "down") {
                                var btnsScrollTo = $dragger_container.height() - $dragger.height();
                                var scrollSpeed = Math.abs($dragger.position().top - btnsScrollTo) * (100 / scrollBtnsSpeed);
                                $dragger.stop().animate({
                                    top: btnsScrollTo
                                }, scrollSpeed, "linear");
                            } else {
                                var btnsScrollTo = 0;
                                var scrollSpeed = Math.abs($dragger.position().top - btnsScrollTo) * (100 / scrollBtnsSpeed);
                                $dragger.stop().animate({
                                    top: -btnsScrollTo
                                }, scrollSpeed, "linear");
                            }
                            clearInterval(btnsScrollTimer);
                            btnsScrollTimer = setInterval(Scroll, 20);
                        }

                        function BtnsScrollStop() {
                            clearInterval(btnsScrollTimer);
                            $dragger.stop();
                        }
                    }

                    //scroll
                    if (bottomSpace < 1) {
                        bottomSpace = 1; //minimum bottomSpace value is 1
                    }
                    var scrollAmount = (totalContent - (visibleHeight / bottomSpace)) / (draggerContainerHeight - draggerHeight);

                    function Scroll() {
                        var draggerY = $dragger.position().top;
                        var targY = -draggerY * scrollAmount;
                        var thePos = $customScrollBox_container.position().top - targY;
                        $customScrollBox_container.stop().animate({
                            top: "-=" + thePos
                        }, animSpeed, easeType);
                    }
                } else { //disable scrollbar if content is short
                    $dragger.css("top", 0).css("display", "none"); //reset content scroll
                    $customScrollBox_container.css("top", 0);
                    $dragger_container.css("display", "none");
                    $scrollDownBtn.css("display", "none");
                    $scrollUpBtn.css("display", "none");
                }
            }

            $dragger.mouseup(function () {
                DraggerRelease();
            }).mousedown(function () {
                DraggerPress();
            });

            function DraggerPress() {
                $dragger.addClass("dragger_pressed");
            }

            function DraggerRelease() {
                $dragger.removeClass("dragger_pressed");
            }
        }

        $(window).resize(function () {
            if (scrollType == "horizontal") {
                if ($dragger.position().left > $dragger_container.width() - $dragger.width()) {
                    $dragger.css("left", $dragger_container.width() - $dragger.width());
                }
            } else {
                if ($dragger.position().top > $dragger_container.height() - $dragger.height()) {
                    $dragger.css("top", $dragger_container.height() - $dragger.height());
                }
            }
            CustomScroller("resize");
        });
    };
})(jQuery);

/***** Sticky scroll plugin *****/

(function ($) {
    $.fn.containedStickyScroll = function (options) {
        var defaults = {
            oSelector: this.selector,
            unstick: true,
            easing: 'linear',
            duration: 500,
            queue: false,
            closeChar: '^',
            closeTop: 0,
            closeRight: 0
        }

        var options = $.extend(defaults, options);

        if (options.unstick == true) {
            this.css('position', 'relative');
            this.append('<a class="scrollFixIt">' + options.closeChar + '</a>');
            jQuery(options.oSelector + ' .scrollFixIt').css('position', 'absolute');
            jQuery(options.oSelector + ' .scrollFixIt').css('top', options.closeTop + 'px');
            jQuery(options.oSelector + ' .scrollFixIt').css('right', options.closeTop + 'px');
            jQuery(options.oSelector + ' .scrollFixIt').css('cursor', 'pointer');
            jQuery(options.oSelector + ' .scrollFixIt').click(function () {
                getObject = options.oSelector;
                jQuery(getObject).animate({
                    top: "0px"
                }, {
                    queue: options.queue,
                    easing: options.easing,
                    duration: options.duration
                });
                jQuery(window).unbind();
                jQuery('.scrollFixIt').remove();
            });
        }
        jQuery(window).scroll(function () {
            getObject = options.oSelector;
            if (jQuery(window).scrollTop() > (jQuery(getObject).parent().offset().top) &&
                (jQuery(getObject).parent().height() + jQuery(getObject).parent().position().top - 30) > (jQuery(window).scrollTop() + jQuery(getObject).height())) {
                jQuery(getObject).animate({
                    top: (jQuery(window).scrollTop() - jQuery(getObject).parent().offset().top) + "px"
                }, {
                    queue: options.queue,
                    easing: options.easing,
                    duration: options.duration
                });
            } else if (jQuery(window).scrollTop() < (jQuery(getObject).parent().offset().top)) {
                jQuery(getObject).animate({
                    top: "0px"
                }, {
                    queue: options.queue,
                    easing: options.easing,
                    duration: options.duration
                });
            }
        });
    };
})(jQuery);

/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 */
var bkExtend = function () {
    var A = arguments;
    if (A.length == 1) {
        A = [this, A[0]]
    }
    for (var B in A[1]) {
        A[0][B] = A[1][B]
    }
    return A[0]
};

function bkClass() {}
bkClass.prototype.construct = function () {};
bkClass.extend = function (C) {
    var A = function () {
        if (arguments[0] !== bkClass) {
            return this.construct.apply(this, arguments)
        }
    };
    var B = new this(bkClass);
    bkExtend(B, C);
    A.prototype = B;
    A.extend = this.extend;
    return A
};
var bkElement = bkClass.extend({
    construct: function (B, A) {
        if (typeof (B) == "string") {
            B = (A || document).createElement(B)
        }
        B = $BK(B);
        return B
    },
    appendTo: function (A) {
        A.appendChild(this);
        return this
    },
    appendBefore: function (A) {
        A.parentNode.insertBefore(this, A);
        return this
    },
    addEvent: function (B, A) {
        bkLib.addEvent(this, B, A);
        return this
    },
    setContent: function (A) {
        this.innerHTML = A;
        return this
    },
    pos: function () {
        var C = curtop = 0;
        var B = obj = this;
        if (obj.offsetParent) {
            do {
                C += obj.offsetLeft;
                curtop += obj.offsetTop
            } while (obj = obj.offsetParent)
        }
        var A = (!window.opera) ? parseInt(this.getStyle("border-width") || this.style.border) || 0 : 0;
        return [C + A, curtop + A + this.offsetHeight]
    },
    noSelect: function () {
        bkLib.noSelect(this);
        return this
    },
    parentTag: function (A) {
        var B = this;
        do {
            if (B && B.nodeName && B.nodeName.toUpperCase() == A) {
                return B
            }
            B = B.parentNode
        } while (B);
        return false
    },
    hasClass: function (A) {
        return this.className.match(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"))
    },
    addClass: function (A) {
        if (!this.hasClass(A)) {
            this.className += " nicEdit-" + A
        }
        return this
    },
    removeClass: function (A) {
        if (this.hasClass(A)) {
            this.className = this.className.replace(new RegExp("(\\s|^)nicEdit-" + A + "(\\s|$)"), " ")
        }
        return this
    },
    setStyle: function (A) {
        var B = this.style;
        for (var C in A) {
            switch (C) {
            case "float":
                B.cssFloat = B.styleFloat = A[C];
                break;
            case "opacity":
                B.opacity = A[C];
                B.filter = "alpha(opacity=" + Math.round(A[C] * 100) + ")";
                break;
            case "className":
                this.className = A[C];
                break;
            default:
                B[C] = A[C]
            }
        }
        return this
    },
    getStyle: function (A, C) {
        var B = (!C) ? document.defaultView : C;
        if (this.nodeType == 1) {
            return (B && B.getComputedStyle) ? B.getComputedStyle(this, null).getPropertyValue(A) : this.currentStyle[bkLib.camelize(A)]
        }
    },
    remove: function () {
        this.parentNode.removeChild(this);
        return this
    },
    setAttributes: function (A) {
        for (var B in A) {
            this[B] = A[B]
        }
        return this
    }
});
var bkLib = {
    isMSIE: (navigator.appVersion.indexOf("MSIE") != -1),
    addEvent: function (C, B, A) {
        (C.addEventListener) ? C.addEventListener(B, A, false) : C.attachEvent("on" + B, A)
    },
    toArray: function (C) {
        var B = C.length,
            A = new Array(B);
        while (B--) {
            A[B] = C[B]
        }
        return A
    },
    noSelect: function (B) {
        if (B.setAttribute && B.nodeName.toLowerCase() != "input" && B.nodeName.toLowerCase() != "textarea") {
            B.setAttribute("unselectable", "on")
        }
        for (var A = 0; A < B.childNodes.length; A++) {
            bkLib.noSelect(B.childNodes[A])
        }
    },
    camelize: function (A) {
        return A.replace(/\-(.)/g, function (B, C) {
            return C.toUpperCase()
        })
    },
    inArray: function (A, B) {
        return (bkLib.search(A, B) != null)
    },
    search: function (A, C) {
        for (var B = 0; B < A.length; B++) {
            if (A[B] == C) {
                return B
            }
        }
        return null
    },
    cancelEvent: function (A) {
        A = A || window.event;
        if (A.preventDefault && A.stopPropagation) {
            A.preventDefault();
            A.stopPropagation()
        }
        return false
    },
    domLoad: [],
    domLoaded: function () {
        if (arguments.callee.done) {
            return
        }
        arguments.callee.done = true;
        for (i = 0; i < bkLib.domLoad.length; i++) {
            bkLib.domLoad[i]()
        }
    },
    onDomLoaded: function (A) {
        this.domLoad.push(A);
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", bkLib.domLoaded, null)
        } else {
            if (bkLib.isMSIE) {
                document.write("<style>.nicEdit-main p { margin: 0; }</style><script id=__ie_onload defer " + ((location.protocol == "https:") ? "src='javascript:void(0)'" : "src=//0") + "><\/script>");
                $BK("__ie_onload").onreadystatechange = function () {
                    if (this.readyState == "complete") {
                        bkLib.domLoaded()
                    }
                }
            }
        }
        window.onload = bkLib.domLoaded
    }
};

function $BK(A) {
    if (typeof (A) == "string") {
        A = document.getElementById(A)
    }
    return (A && !A.appendTo) ? bkExtend(A, bkElement.prototype) : A
}
var bkEvent = {
    addEvent: function (A, B) {
        if (B) {
            this.eventList = this.eventList || {};
            this.eventList[A] = this.eventList[A] || [];
            this.eventList[A].push(B)
        }
        return this
    },
    fireEvent: function () {
        var A = bkLib.toArray(arguments),
            C = A.shift();
        if (this.eventList && this.eventList[C]) {
            for (var B = 0; B < this.eventList[C].length; B++) {
                this.eventList[C][B].apply(this, A)
            }
        }
    }
};

function __(A) {
    return A
}
Function.prototype.closure = function () {
    var A = this,
        B = bkLib.toArray(arguments),
        C = B.shift();
    return function () {
        if (typeof (bkLib) != "undefined") {
            return A.apply(C, B.concat(bkLib.toArray(arguments)))
        }
    }
};
Function.prototype.closureListener = function () {
    var A = this,
        C = bkLib.toArray(arguments),
        B = C.shift();
    return function (E) {
        E = E || window.event;
        if (E.target) {
            var D = E.target
        } else {
            var D = E.srcElement
        }
        return A.apply(B, [E, D].concat(C))
    }
};

var nicEditorConfig = bkClass.extend({
    buttons: {
        'bold': {
            name: __('Click to Bold'),
            command: 'Bold',
            tags: ['B', 'STRONG'],
            css: {
                'font-weight': 'bold'
            },
            key: 'b'
        },
        'italic': {
            name: __('Click to Italic'),
            command: 'Italic',
            tags: ['EM', 'I'],
            css: {
                'font-style': 'italic'
            },
            key: 'i'
        },
        'underline': {
            name: __('Click to Underline'),
            command: 'Underline',
            tags: ['U'],
            css: {
                'text-decoration': 'underline'
            },
            key: 'u'
        },
        'left': {
            name: __('Left Align'),
            command: 'justifyleft',
            noActive: true
        },
        'center': {
            name: __('Center Align'),
            command: 'justifycenter',
            noActive: true
        },
        'right': {
            name: __('Right Align'),
            command: 'justifyright',
            noActive: true
        },
        'justify': {
            name: __('Justify Align'),
            command: 'justifyfull',
            noActive: true
        },
        'ol': {
            name: __('Insert Ordered List'),
            command: 'insertorderedlist',
            tags: ['OL']
        },
        'ul': {
            name: __('Insert Unordered List'),
            command: 'insertunorderedlist',
            tags: ['UL']
        },
        'subscript': {
            name: __('Click to Subscript'),
            command: 'subscript',
            tags: ['SUB']
        },
        'superscript': {
            name: __('Click to Superscript'),
            command: 'superscript',
            tags: ['SUP']
        },
        'strikethrough': {
            name: __('Click to Strike Through'),
            command: 'strikeThrough',
            css: {
                'text-decoration': 'line-through'
            }
        },
        'removeformat': {
            name: __('Remove Formatting'),
            command: 'removeformat',
            noActive: true
        },
        'indent': {
            name: __('Indent Text'),
            command: 'indent',
            noActive: true
        },
        'outdent': {
            name: __('Remove Indent'),
            command: 'outdent',
            noActive: true
        },
        'hr': {
            name: __('Horizontal Rule'),
            command: 'insertHorizontalRule',
            noActive: true
        }
    },
    iconsPath: '../nicEditorIcons.gif',
    buttonList: ['save', 'bold', 'italic', 'underline', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'indent', 'outdent', 'image', 'upload', 'link', 'unlink', 'forecolor', 'bgcolor'],
    iconList: {
        "xhtml": 1,
        "bgcolor": 2,
        "forecolor": 3,
        "bold": 4,
        "center": 5,
        "hr": 6,
        "indent": 7,
        "italic": 8,
        "justify": 9,
        "left": 10,
        "ol": 11,
        "outdent": 12,
        "removeformat": 13,
        "right": 14,
        "save": 25,
        "strikethrough": 16,
        "subscript": 17,
        "superscript": 18,
        "ul": 19,
        "underline": 20,
        "image": 21,
        "link": 22,
        "unlink": 23,
        "close": 24,
        "arrow": 26
    }
});;
var nicEditors = {
    nicPlugins: [],
    editors: [],
    registerPlugin: function (B, A) {
        this.nicPlugins.push({
            p: B,
            o: A
        })
    },
    allTextAreas: function (C) {
        var A = document.getElementsByTagName("textarea");
        for (var B = 0; B < A.length; B++) {
            nicEditors.editors.push(new nicEditor(C).panelInstance(A[B]))
        }
        return nicEditors.editors
    },
    findEditor: function (C) {
        var B = nicEditors.editors;
        for (var A = 0; A < B.length; A++) {
            if (B[A].instanceById(C)) {
                return B[A].instanceById(C)
            }
        }
    }
};
var nicEditor = bkClass.extend({
    construct: function (C) {
        this.options = new nicEditorConfig();
        bkExtend(this.options, C);
        this.nicInstances = new Array();
        this.loadedPlugins = new Array();
        var A = nicEditors.nicPlugins;
        for (var B = 0; B < A.length; B++) {
            this.loadedPlugins.push(new A[B].p(this, A[B].o))
        }
        nicEditors.editors.push(this);
        bkLib.addEvent(document.body, "mousedown", this.selectCheck.closureListener(this))
    },
    panelInstance: function (B, C) {
        B = this.checkReplace($BK(B));
        var A = new bkElement("DIV").setStyle({
            width: (parseInt(B.getStyle("width")) || B.clientWidth) + "px"
        }).appendBefore(B);
        this.setPanel(A);
        return this.addInstance(B, C)
    },
    checkReplace: function (B) {
        var A = nicEditors.findEditor(B);
        if (A) {
            A.removeInstance(B);
            A.removePanel()
        }
        return B
    },
    addInstance: function (B, C) {
        B = this.checkReplace($BK(B));
        if (B.contentEditable || !! window.opera) {
            var A = new nicEditorInstance(B, C, this)
        } else {
            var A = new nicEditorIFrameInstance(B, C, this)
        }
        this.nicInstances.push(A);
        return this
    },
    removeInstance: function (C) {
        C = $BK(C);
        var B = this.nicInstances;
        for (var A = 0; A < B.length; A++) {
            if (B[A].e == C) {
                B[A].remove();
                this.nicInstances.splice(A, 1)
            }
        }
    },
    removePanel: function (A) {
        if (this.nicPanel) {
            this.nicPanel.remove();
            this.nicPanel = null
        }
    },
    instanceById: function (C) {
        C = $BK(C);
        var B = this.nicInstances;
        for (var A = 0; A < B.length; A++) {
            if (B[A].e == C) {
                return B[A]
            }
        }
    },
    setPanel: function (A) {
        this.nicPanel = new nicEditorPanel($BK(A), this.options, this);
        this.fireEvent("panel", this.nicPanel);
        return this
    },
    nicCommand: function (B, A) {
        if (this.selectedInstance) {
            this.selectedInstance.nicCommand(B, A)
        }
    },
    getIcon: function (D, A) {
        var C = this.options.iconList[D];
        var B = (A.iconFiles) ? A.iconFiles[D] : "";
        return {
            backgroundImage: "url('" + ((C) ? this.options.iconsPath : B) + "')",
            backgroundPosition: ((C) ? ((C - 1) * -18) : 0) + "px 0px"
        }
    },
    selectCheck: function (C, A) {
        var B = false;
        do {
            if (A.className && A.className.indexOf("nicEdit") != -1) {
                return false
            }
        } while (A = A.parentNode);
        this.fireEvent("blur", this.selectedInstance, A);
        this.lastSelectedInstance = this.selectedInstance;
        this.selectedInstance = null;
        return false
    }
});
nicEditor = nicEditor.extend(bkEvent);
var nicEditorInstance = bkClass.extend({
    isSelected: false,
    construct: function (G, D, C) {
        this.ne = C;
        this.elm = this.e = G;
        this.options = D || {};
        newX = parseInt(G.getStyle("width")) || G.clientWidth;
        newY = parseInt(G.getStyle("height")) || G.clientHeight;
        this.initialHeight = newY - 8;
        var H = (G.nodeName.toLowerCase() == "textarea");
        if (H || this.options.hasPanel) {
            var B = (bkLib.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat"));
            var E = {
                width: newX + "px",
                border: "1px solid #ccc",
                borderTop: 0,
                overflowY: "auto",
                overflowX: "hidden"
            };
            E[(B) ? "height" : "maxHeight"] = (this.ne.options.maxHeight) ? this.ne.options.maxHeight + "px" : null;
            this.editorContain = new bkElement("DIV").setStyle(E).appendBefore(G);
            var A = new bkElement("DIV").setStyle({
                width: (newX - 8) + "px",
                margin: "4px",
                minHeight: newY + "px"
            }).addClass("main").appendTo(this.editorContain);
            G.setStyle({
                display: "none"
            });
            A.innerHTML = G.innerHTML;
            if (H) {
                A.setContent(G.value);
                this.copyElm = G;
                var F = G.parentTag("FORM");
                if (F) {
                    bkLib.addEvent(F, "submit", this.saveContent.closure(this))
                }
            }
            A.setStyle((B) ? {
                height: newY + "px"
            } : {
                overflow: "hidden"
            });
            this.elm = A
        }
        this.ne.addEvent("blur", this.blur.closure(this));
        this.init();
        this.blur()
    },
    init: function () {
        this.elm.setAttribute("contentEditable", "true");
        if (this.getContent() == "") {
            this.setContent("<br />")
        }
        this.instanceDoc = document.defaultView;
        this.elm.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keypress", this.keyDown.closureListener(this)).addEvent("focus", this.selected.closure(this)).addEvent("blur", this.blur.closure(this)).addEvent("keyup", this.selected.closure(this));
        this.ne.fireEvent("add", this)
    },
    remove: function () {
        this.saveContent();
        if (this.copyElm || this.options.hasPanel) {
            this.editorContain.remove();
            this.e.setStyle({
                display: "block"
            });
            this.ne.removePanel()
        }
        this.disable();
        this.ne.fireEvent("remove", this)
    },
    disable: function () {
        this.elm.setAttribute("contentEditable", "false")
    },
    getSel: function () {
        return (window.getSelection) ? window.getSelection() : document.selection
    },
    getRng: function () {
        var A = this.getSel();
        if (!A) {
            return null
        }
        return (A.rangeCount > 0) ? A.getRangeAt(0) : A.createRange()
    },
    selRng: function (A, B) {
        if (window.getSelection) {
            B.removeAllRanges();
            B.addRange(A)
        } else {
            A.select()
        }
    },
    selElm: function () {
        var C = this.getRng();
        if (C.startContainer) {
            var D = C.startContainer;
            if (C.cloneContents().childNodes.length == 1) {
                for (var B = 0; B < D.childNodes.length; B++) {
                    var A = D.childNodes[B].ownerDocument.createRange();
                    A.selectNode(D.childNodes[B]);
                    if (C.compareBoundaryPoints(Range.START_TO_START, A) != 1 && C.compareBoundaryPoints(Range.END_TO_END, A) != -1) {
                        return $BK(D.childNodes[B])
                    }
                }
            }
            return $BK(D)
        } else {
            return $BK((this.getSel().type == "Control") ? C.item(0) : C.parentElement())
        }
    },
    saveRng: function () {
        this.savedRange = this.getRng();
        this.savedSel = this.getSel()
    },
    restoreRng: function () {
        if (this.savedRange) {
            this.selRng(this.savedRange, this.savedSel)
        }
    },
    keyDown: function (B, A) {
        if (B.ctrlKey) {
            this.ne.fireEvent("key", this, B)
        }
    },
    selected: function (C, A) {
        if (!A) {
            A = this.selElm()
        }
        if (!C.ctrlKey) {
            var B = this.ne.selectedInstance;
            if (B != this) {
                if (B) {
                    this.ne.fireEvent("blur", B, A)
                }
                this.ne.selectedInstance = this;
                this.ne.fireEvent("focus", B, A)
            }
            this.ne.fireEvent("selected", B, A);
            this.isFocused = true;
            this.elm.addClass("selected")
        }
        return false
    },
    blur: function () {
        this.isFocused = false;
        this.elm.removeClass("selected")
    },
    saveContent: function () {
        if (this.copyElm || this.options.hasPanel) {
            this.ne.fireEvent("save", this);
            (this.copyElm) ? this.copyElm.value = this.getContent() : this.e.innerHTML = this.getContent()
        }
    },
    getElm: function () {
        return this.elm
    },
    getContent: function () {
        this.content = this.getElm().innerHTML;
        this.ne.fireEvent("get", this);
        return this.content
    },
    setContent: function (A) {
        this.content = A;
        this.ne.fireEvent("set", this);
        this.elm.innerHTML = this.content
    },
    nicCommand: function (B, A) {
        document.execCommand(B, false, A)
    }
});
var nicEditorIFrameInstance = nicEditorInstance.extend({
    savedStyles: [],
    init: function () {
        var B = this.elm.innerHTML.replace(/^\s+|\s+$/g, "");
        this.elm.innerHTML = "";
        (!B) ? B = "<br />" : B;
        this.initialContent = B;
        this.elmFrame = new bkElement("iframe").setAttributes({
            src: "javascript:;",
            frameBorder: 0,
            allowTransparency: "true",
            scrolling: "no"
        }).setStyle({
            height: "100px",
            width: "100%"
        }).addClass("frame").appendTo(this.elm);
        if (this.copyElm) {
            this.elmFrame.setStyle({
                width: (this.elm.offsetWidth - 4) + "px"
            })
        }
        var A = ["font-size", "font-family", "font-weight", "color"];
        for (itm in A) {
            this.savedStyles[bkLib.camelize(itm)] = this.elm.getStyle(itm)
        }
        setTimeout(this.initFrame.closure(this), 50)
    },
    disable: function () {
        this.elm.innerHTML = this.getContent()
    },
    initFrame: function () {
        var B = $BK(this.elmFrame.contentWindow.document);
        B.designMode = "on";
        B.open();
        var A = this.ne.options.externalCSS;
        B.write("<html><head>" + ((A) ? '<link href="' + A + '" rel="stylesheet" type="text/css" />' : "") + '</head><body id="nicEditContent" style="margin: 0 !important; background-color: transparent !important;">' + this.initialContent + "</body></html>");
        B.close();
        this.frameDoc = B;
        this.frameWin = $BK(this.elmFrame.contentWindow);
        this.frameContent = $BK(this.frameWin.document.body).setStyle(this.savedStyles);
        this.instanceDoc = this.frameWin.document.defaultView;
        this.heightUpdate();
        this.frameDoc.addEvent("mousedown", this.selected.closureListener(this)).addEvent("keyup", this.heightUpdate.closureListener(this)).addEvent("keydown", this.keyDown.closureListener(this)).addEvent("keyup", this.selected.closure(this));
        this.ne.fireEvent("add", this)
    },
    getElm: function () {
        return this.frameContent
    },
    setContent: function (A) {
        this.content = A;
        this.ne.fireEvent("set", this);
        this.frameContent.innerHTML = this.content;
        this.heightUpdate()
    },
    getSel: function () {
        return (this.frameWin) ? this.frameWin.getSelection() : this.frameDoc.selection
    },
    heightUpdate: function () {
        this.elmFrame.style.height = Math.max(this.frameContent.offsetHeight, this.initialHeight) + "px"
    },
    nicCommand: function (B, A) {
        this.frameDoc.execCommand(B, false, A);
        setTimeout(this.heightUpdate.closure(this), 100)
    }
});
var nicEditorPanel = bkClass.extend({
    construct: function (E, B, A) {
        this.elm = E;
        this.options = B;
        this.ne = A;
        this.panelButtons = new Array();
        this.buttonList = bkExtend([], this.ne.options.buttonList);
        this.panelContain = new bkElement("DIV").setStyle({
            overflow: "hidden",
            width: "100%",
            border: "1px solid #cccccc",
            backgroundColor: "#efefef"
        }).addClass("panelContain");
        this.panelElm = new bkElement("DIV").setStyle({
            margin: "2px",
            marginTop: "0px",
            zoom: 1,
            overflow: "hidden"
        }).addClass("panel").appendTo(this.panelContain);
        this.panelContain.appendTo(E);
        var C = this.ne.options;
        var D = C.buttons;
        for (button in D) {
            this.addButton(button, C, true)
        }
        this.reorder();
        E.noSelect()
    },
    addButton: function (buttonName, options, noOrder) {
        var button = options.buttons[buttonName];
        var type = (button.type) ? eval("(typeof(" + button.type + ') == "undefined") ? null : ' + button.type + ";") : nicEditorButton;
        var hasButton = bkLib.inArray(this.buttonList, buttonName);
        if (type && (hasButton || this.ne.options.fullPanel)) {
            this.panelButtons.push(new type(this.panelElm, buttonName, options, this.ne));
            if (!hasButton) {
                this.buttonList.push(buttonName)
            }
        }
    },
    findButton: function (B) {
        for (var A = 0; A < this.panelButtons.length; A++) {
            if (this.panelButtons[A].name == B) {
                return this.panelButtons[A]
            }
        }
    },
    reorder: function () {
        var C = this.buttonList;
        for (var B = 0; B < C.length; B++) {
            var A = this.findButton(C[B]);
            if (A) {
                this.panelElm.appendChild(A.margin)
            }
        }
    },
    remove: function () {
        this.elm.remove()
    }
});
var nicEditorButton = bkClass.extend({
    construct: function (D, A, C, B) {
        this.options = C.buttons[A];
        this.name = A;
        this.ne = B;
        this.elm = D;
        this.margin = new bkElement("DIV").setStyle({
            "float": "left",
            marginTop: "2px"
        }).appendTo(D);
        this.contain = new bkElement("DIV").setStyle({
            width: "20px",
            height: "20px"
        }).addClass("buttonContain").appendTo(this.margin);
        this.border = new bkElement("DIV").setStyle({
            backgroundColor: "#efefef",
            border: "1px solid #efefef"
        }).appendTo(this.contain);
        this.button = new bkElement("DIV").setStyle({
            width: "18px",
            height: "18px",
            overflow: "hidden",
            zoom: 1,
            cursor: "pointer"
        }).addClass("button").setStyle(this.ne.getIcon(A, C)).appendTo(this.border);
        this.button.addEvent("mouseover", this.hoverOn.closure(this)).addEvent("mouseout", this.hoverOff.closure(this)).addEvent("mousedown", this.mouseClick.closure(this)).noSelect();
        if (!window.opera) {
            this.button.onmousedown = this.button.onclick = bkLib.cancelEvent
        }
        B.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this)).addEvent("key", this.key.closure(this));
        this.disable();
        this.init()
    },
    init: function () {},
    hide: function () {
        this.contain.setStyle({
            display: "none"
        })
    },
    updateState: function () {
        if (this.isDisabled) {
            this.setBg()
        } else {
            if (this.isHover) {
                this.setBg("hover")
            } else {
                if (this.isActive) {
                    this.setBg("active")
                } else {
                    this.setBg()
                }
            }
        }
    },
    setBg: function (A) {
        switch (A) {
        case "hover":
            var B = {
                border: "1px solid #666",
                backgroundColor: "#ddd"
            };
            break;
        case "active":
            var B = {
                border: "1px solid #666",
                backgroundColor: "#ccc"
            };
            break;
        default:
            var B = {
                border: "1px solid #efefef",
                backgroundColor: "#efefef"
            }
        }
        this.border.setStyle(B).addClass("button-" + A)
    },
    checkNodes: function (A) {
        var B = A;
        do {
            if (this.options.tags && bkLib.inArray(this.options.tags, B.nodeName)) {
                this.activate();
                return true
            }
        } while (B = B.parentNode && B.className != "nicEdit");
        B = $BK(A);
        while (B.nodeType == 3) {
            B = $BK(B.parentNode)
        }
        if (this.options.css) {
            for (itm in this.options.css) {
                if (B.getStyle(itm, this.ne.selectedInstance.instanceDoc) == this.options.css[itm]) {
                    this.activate();
                    return true
                }
            }
        }
        this.deactivate();
        return false
    },
    activate: function () {
        if (!this.isDisabled) {
            this.isActive = true;
            this.updateState();
            this.ne.fireEvent("buttonActivate", this)
        }
    },
    deactivate: function () {
        this.isActive = false;
        this.updateState();
        if (!this.isDisabled) {
            this.ne.fireEvent("buttonDeactivate", this)
        }
    },
    enable: function (A, B) {
        this.isDisabled = false;
        this.contain.setStyle({
            opacity: 1
        }).addClass("buttonEnabled");
        this.updateState();
        this.checkNodes(B)
    },
    disable: function (A, B) {
        this.isDisabled = true;
        this.contain.setStyle({
            opacity: 0.6
        }).removeClass("buttonEnabled");
        this.updateState()
    },
    toggleActive: function () {
        (this.isActive) ? this.deactivate() : this.activate()
    },
    hoverOn: function () {
        if (!this.isDisabled) {
            this.isHover = true;
            this.updateState();
            this.ne.fireEvent("buttonOver", this)
        }
    },
    hoverOff: function () {
        this.isHover = false;
        this.updateState();
        this.ne.fireEvent("buttonOut", this)
    },
    mouseClick: function () {
        if (this.options.command) {
            this.ne.nicCommand(this.options.command, this.options.commandArgs);
            if (!this.options.noActive) {
                this.toggleActive()
            }
        }
        this.ne.fireEvent("buttonClick", this)
    },
    key: function (A, B) {
        if (this.options.key && B.ctrlKey && String.fromCharCode(B.keyCode || B.charCode).toLowerCase() == this.options.key) {
            this.mouseClick();
            if (B.preventDefault) {
                B.preventDefault()
            }
        }
    }
});
var nicPlugin = bkClass.extend({
    construct: function (B, A) {
        this.options = A;
        this.ne = B;
        this.ne.addEvent("panel", this.loadPanel.closure(this));
        this.init()
    },
    loadPanel: function (C) {
        var B = this.options.buttons;
        for (var A in B) {
            C.addButton(A, this.options)
        }
        C.reorder()
    },
    init: function () {}
});

var nicPaneOptions = {};

var nicEditorPane = bkClass.extend({
    construct: function (D, C, B, A) {
        this.ne = C;
        this.elm = D;
        this.pos = D.pos();
        this.contain = new bkElement("div").setStyle({
            zIndex: "99999",
            overflow: "hidden",
            position: "absolute",
            left: this.pos[0] + "px",
            top: this.pos[1] + "px"
        });
        this.pane = new bkElement("div").setStyle({
            fontSize: "12px",
            border: "1px solid #ccc",
            overflow: "hidden",
            padding: "4px",
            textAlign: "left",
            backgroundColor: "#ffffc9"
        }).addClass("pane").setStyle(B).appendTo(this.contain);
        if (A && !A.options.noClose) {
            this.close = new bkElement("div").setStyle({
                "float": "right",
                height: "16px",
                width: "16px",
                cursor: "pointer"
            }).setStyle(this.ne.getIcon("close", nicPaneOptions)).addEvent("mousedown", A.removePane.closure(this)).appendTo(this.pane)
        }
        this.contain.noSelect().appendTo(document.body);
        this.position();
        this.init()
    },
    init: function () {},
    position: function () {
        if (this.ne.nicPanel) {
            var B = this.ne.nicPanel.elm;
            var A = B.pos();
            var C = A[0] + parseInt(B.getStyle("width")) - (parseInt(this.pane.getStyle("width")) + 8);
            if (C < this.pos[0]) {
                this.contain.setStyle({
                    left: C + "px"
                })
            }
        }
    },
    toggle: function () {
        this.isVisible = !this.isVisible;
        this.contain.setStyle({
            display: ((this.isVisible) ? "block" : "none")
        })
    },
    remove: function () {
        if (this.contain) {
            this.contain.remove();
            this.contain = null
        }
    },
    append: function (A) {
        A.appendTo(this.pane)
    },
    setContent: function (A) {
        this.pane.setContent(A)
    }
});

var nicEditorAdvancedButton = nicEditorButton.extend({
    init: function () {
        this.ne.addEvent("selected", this.removePane.closure(this)).addEvent("blur", this.removePane.closure(this))
    },
    mouseClick: function () {
        if (!this.isDisabled) {
            if (this.pane && this.pane.pane) {
                this.removePane()
            } else {
                this.pane = new nicEditorPane(this.contain, this.ne, {
                    width: (this.width || "270px"),
                    backgroundColor: "#fff"
                }, this);
                this.addPane();
                this.ne.selectedInstance.saveRng()
            }
        }
    },
    addForm: function (C, G) {
        this.form = new bkElement("form").addEvent("submit", this.submit.closureListener(this));
        this.pane.append(this.form);
        this.inputs = {};
        for (itm in C) {
            var D = C[itm];
            var F = "";
            if (G) {
                F = G.getAttribute(itm)
            }
            if (!F) {
                F = D.value || ""
            }
            var A = C[itm].type;
            if (A == "title") {
                new bkElement("div").setContent(D.txt).setStyle({
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "0px",
                    margin: "2px 0"
                }).appendTo(this.form)
            } else {
                var B = new bkElement("div").setStyle({
                    overflow: "hidden",
                    clear: "both"
                }).appendTo(this.form);
                if (D.txt) {
                    new bkElement("label").setAttributes({
                        "for": itm
                    }).setContent(D.txt).setStyle({
                        margin: "2px 4px",
                        fontSize: "13px",
                        width: "50px",
                        lineHeight: "20px",
                        textAlign: "right",
                        "float": "left"
                    }).appendTo(B)
                }
                switch (A) {
                case "text":
                    this.inputs[itm] = new bkElement("input").setAttributes({
                        id: itm,
                        value: F,
                        type: "text"
                    }).setStyle({
                        margin: "2px 0",
                        fontSize: "13px",
                        "float": "left",
                        height: "20px",
                        border: "1px solid #ccc",
                        overflow: "hidden"
                    }).setStyle(D.style).appendTo(B);
                    break;
                case "select":
                    this.inputs[itm] = new bkElement("select").setAttributes({
                        id: itm
                    }).setStyle({
                        border: "1px solid #ccc",
                        "float": "left",
                        margin: "2px 0"
                    }).appendTo(B);
                    for (opt in D.options) {
                        var E = new bkElement("option").setAttributes({
                            value: opt,
                            selected: (opt == F) ? "selected" : ""
                        }).setContent(D.options[opt]).appendTo(this.inputs[itm])
                    }
                    break;
                case "content":
                    this.inputs[itm] = new bkElement("textarea").setAttributes({
                        id: itm
                    }).setStyle({
                        border: "1px solid #ccc",
                        "float": "left"
                    }).setStyle(D.style).appendTo(B);
                    this.inputs[itm].value = F
                }
            }
        }
        new bkElement("input").setAttributes({
            type: "submit"
        }).setStyle({
            backgroundColor: "#efefef",
            border: "1px solid #ccc",
            margin: "3px 0",
            "float": "left",
            clear: "both"
        }).appendTo(this.form);
        this.form.onsubmit = bkLib.cancelEvent
    },
    submit: function () {},
    findElm: function (B, A, E) {
        var D = this.ne.selectedInstance.getElm().getElementsByTagName(B);
        for (var C = 0; C < D.length; C++) {
            if (D[C].getAttribute(A) == E) {
                return $BK(D[C])
            }
        }
    },
    removePane: function () {
        if (this.pane) {
            this.pane.remove();
            this.pane = null;
            this.ne.selectedInstance.restoreRng()
        }
    }
});

var nicButtonTips = bkClass.extend({
    construct: function (A) {
        this.ne = A;
        A.addEvent("buttonOver", this.show.closure(this)).addEvent("buttonOut", this.hide.closure(this))
    },
    show: function (A) {
        this.timer = setTimeout(this.create.closure(this, A), 400)
    },
    create: function (A) {
        this.timer = null;
        if (!this.pane) {
            this.pane = new nicEditorPane(A.button, this.ne, {
                fontSize: "12px",
                marginTop: "5px"
            });
            this.pane.setContent(A.options.name)
        }
    },
    hide: function (A) {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        if (this.pane) {
            this.pane = this.pane.remove()
        }
    }
});
nicEditors.registerPlugin(nicButtonTips);

var nicSelectOptions = {
    buttons: {
        'fontSize': {
            name: __('Select Font Size'),
            type: 'nicEditorFontSizeSelect',
            command: 'fontsize'
        },
        'fontFamily': {
            name: __('Select Font Family'),
            type: 'nicEditorFontFamilySelect',
            command: 'fontname'
        },
        'fontFormat': {
            name: __('Select Font Format'),
            type: 'nicEditorFontFormatSelect',
            command: 'formatBlock'
        }
    }
};

var nicEditorSelect = bkClass.extend({
    construct: function (D, A, C, B) {
        this.options = C.buttons[A];
        this.elm = D;
        this.ne = B;
        this.name = A;
        this.selOptions = new Array();
        this.margin = new bkElement("div").setStyle({
            "float": "left",
            margin: "2px 1px 0 1px"
        }).appendTo(this.elm);
        this.contain = new bkElement("div").setStyle({
            width: "90px",
            height: "20px",
            cursor: "pointer",
            overflow: "hidden"
        }).addClass("selectContain").addEvent("click", this.toggle.closure(this)).appendTo(this.margin);
        this.items = new bkElement("div").setStyle({
            overflow: "hidden",
            zoom: 1,
            border: "1px solid #ccc",
            paddingLeft: "3px",
            backgroundColor: "#fff"
        }).appendTo(this.contain);
        this.control = new bkElement("div").setStyle({
            overflow: "hidden",
            "float": "right",
            height: "18px",
            width: "16px"
        }).addClass("selectControl").setStyle(this.ne.getIcon("arrow", C)).appendTo(this.items);
        this.txt = new bkElement("div").setStyle({
            overflow: "hidden",
            "float": "left",
            width: "66px",
            height: "14px",
            marginTop: "1px",
            fontFamily: "sans-serif",
            textAlign: "center",
            fontSize: "12px"
        }).addClass("selectTxt").appendTo(this.items);
        if (!window.opera) {
            this.contain.onmousedown = this.control.onmousedown = this.txt.onmousedown = bkLib.cancelEvent
        }
        this.margin.noSelect();
        this.ne.addEvent("selected", this.enable.closure(this)).addEvent("blur", this.disable.closure(this));
        this.disable();
        this.init()
    },
    disable: function () {
        this.isDisabled = true;
        this.close();
        this.contain.setStyle({
            opacity: 0.6
        })
    },
    enable: function (A) {
        this.isDisabled = false;
        this.close();
        this.contain.setStyle({
            opacity: 1
        })
    },
    setDisplay: function (A) {
        this.txt.setContent(A)
    },
    toggle: function () {
        if (!this.isDisabled) {
            (this.pane) ? this.close() : this.open()
        }
    },
    open: function () {
        this.pane = new nicEditorPane(this.items, this.ne, {
            width: "88px",
            padding: "0px",
            borderTop: 0,
            borderLeft: "1px solid #ccc",
            borderRight: "1px solid #ccc",
            borderBottom: "0px",
            backgroundColor: "#fff"
        });
        for (var C = 0; C < this.selOptions.length; C++) {
            var B = this.selOptions[C];
            var A = new bkElement("div").setStyle({
                overflow: "hidden",
                borderBottom: "1px solid #ccc",
                width: "88px",
                textAlign: "left",
                overflow: "hidden",
                cursor: "pointer"
            });
            var D = new bkElement("div").setStyle({
                padding: "0px 4px"
            }).setContent(B[1]).appendTo(A).noSelect();
            D.addEvent("click", this.update.closure(this, B[0])).addEvent("mouseover", this.over.closure(this, D)).addEvent("mouseout", this.out.closure(this, D)).setAttributes("id", B[0]);
            this.pane.append(A);
            if (!window.opera) {
                D.onmousedown = bkLib.cancelEvent
            }
        }
    },
    close: function () {
        if (this.pane) {
            this.pane = this.pane.remove()
        }
    },
    over: function (A) {
        A.setStyle({
            backgroundColor: "#ccc"
        })
    },
    out: function (A) {
        A.setStyle({
            backgroundColor: "#fff"
        })
    },
    add: function (B, A) {
        this.selOptions.push(new Array(B, A))
    },
    update: function (A) {
        this.ne.nicCommand(this.options.command, A);
        this.close()
    }
});
var nicEditorFontSizeSelect = nicEditorSelect.extend({
    sel: {
        1: "1&nbsp;(8pt)",
        2: "2&nbsp;(10pt)",
        3: "3&nbsp;(12pt)",
        4: "4&nbsp;(14pt)",
        5: "5&nbsp;(18pt)",
        6: "6&nbsp;(24pt)"
    },
    init: function () {
        this.setDisplay("Font&nbsp;Size...");
        for (itm in this.sel) {
            this.add(itm, '<font size="' + itm + '">' + this.sel[itm] + "</font>")
        }
    }
});
var nicEditorFontFamilySelect = nicEditorSelect.extend({
    sel: {
        arial: "Arial",
        "comic sans ms": "Comic Sans",
        "courier new": "Courier New",
        georgia: "Georgia",
        helvetica: "Helvetica",
        impact: "Impact",
        "times new roman": "Times",
        "trebuchet ms": "Trebuchet",
        verdana: "Verdana"
    },
    init: function () {
        this.setDisplay("Font&nbsp;Family...");
        for (itm in this.sel) {
            this.add(itm, '<font face="' + itm + '">' + this.sel[itm] + "</font>")
        }
    }
});
var nicEditorFontFormatSelect = nicEditorSelect.extend({
    sel: {
        p: "Paragraph",
        pre: "Pre",
        h6: "Heading&nbsp;6",
        h5: "Heading&nbsp;5",
        h4: "Heading&nbsp;4",
        h3: "Heading&nbsp;3",
        h2: "Heading&nbsp;2",
        h1: "Heading&nbsp;1"
    },
    init: function () {
        this.setDisplay("Font&nbsp;Format...");
        for (itm in this.sel) {
            var A = itm.toUpperCase();
            this.add("<" + A + ">", "<" + itm + ' style="padding: 0px; margin: 0px;">' + this.sel[itm] + "</" + A + ">")
        }
    }
});
nicEditors.registerPlugin(nicPlugin, nicSelectOptions);

var nicLinkOptions = {
    buttons: {
        'link': {
            name: 'Add Link',
            type: 'nicLinkButton',
            tags: ['A']
        },
        'unlink': {
            name: 'Remove Link',
            command: 'unlink',
            noActive: true
        }
    }
};

var nicLinkButton = nicEditorAdvancedButton.extend({
    addPane: function () {
        this.ln = this.ne.selectedInstance.selElm().parentTag("A");
        this.addForm({
            "": {
                type: "title",
                txt: "Add/Edit Link"
            },
            href: {
                type: "text",
                txt: "URL",
                value: "http://",
                style: {
                    width: "150px"
                }
            },
            title: {
                type: "text",
                txt: "Title"
            },
            target: {
                type: "select",
                txt: "Open In",
                options: {
                    "": "Current Window",
                    _blank: "New Window"
                },
                style: {
                    width: "100px"
                }
            }
        }, this.ln)
    },
    submit: function (C) {
        var A = this.inputs.href.value;
        if (A == "http://" || A == "") {
            alert("You must enter a URL to Create a Link");
            return false
        }
        this.removePane();
        if (!this.ln) {
            var B = "javascript:nicTemp();";
            this.ne.nicCommand("createlink", B);
            this.ln = this.findElm("A", "href", B)
        }
        if (this.ln) {
            this.ln.setAttributes({
                href: this.inputs.href.value,
                title: this.inputs.title.value,
                target: this.inputs.target.options[this.inputs.target.selectedIndex].value
            })
        }
    }
});
nicEditors.registerPlugin(nicPlugin, nicLinkOptions);

var nicColorOptions = {
    buttons: {
        'forecolor': {
            name: __('Change Text Color'),
            type: 'nicEditorColorButton',
            noClose: true
        },
        'bgcolor': {
            name: __('Change Background Color'),
            type: 'nicEditorBgColorButton',
            noClose: true
        }
    }
};

var nicEditorColorButton = nicEditorAdvancedButton.extend({
    addPane: function () {
        var D = {
            0: "00",
            1: "33",
            2: "66",
            3: "99",
            4: "CC",
            5: "FF"
        };
        var H = new bkElement("DIV").setStyle({
            width: "270px"
        });
        for (var A in D) {
            for (var F in D) {
                for (var E in D) {
                    var I = "#" + D[A] + D[E] + D[F];
                    var C = new bkElement("DIV").setStyle({
                        cursor: "pointer",
                        height: "15px",
                        "float": "left"
                    }).appendTo(H);
                    var G = new bkElement("DIV").setStyle({
                        border: "2px solid " + I
                    }).appendTo(C);
                    var B = new bkElement("DIV").setStyle({
                        backgroundColor: I,
                        overflow: "hidden",
                        width: "11px",
                        height: "11px"
                    }).addEvent("click", this.colorSelect.closure(this, I)).addEvent("mouseover", this.on.closure(this, G)).addEvent("mouseout", this.off.closure(this, G, I)).appendTo(G);
                    if (!window.opera) {
                        C.onmousedown = B.onmousedown = bkLib.cancelEvent
                    }
                }
            }
        }
        this.pane.append(H.noSelect())
    },
    colorSelect: function (A) {
        this.ne.nicCommand("foreColor", A);
        this.removePane()
    },
    on: function (A) {
        A.setStyle({
            border: "2px solid #000"
        })
    },
    off: function (A, B) {
        A.setStyle({
            border: "2px solid " + B
        })
    }
});
var nicEditorBgColorButton = nicEditorColorButton.extend({
    colorSelect: function (A) {
        this.ne.nicCommand("hiliteColor", A);
        this.removePane()
    }
});
nicEditors.registerPlugin(nicPlugin, nicColorOptions);

var nicImageOptions = {
    buttons: {
        'image': {
            name: 'Add Image',
            type: 'nicImageButton',
            tags: ['IMG']
        }
    }
};

var nicImageButton = nicEditorAdvancedButton.extend({
    addPane: function () {
        this.im = this.ne.selectedInstance.selElm().parentTag("IMG");
        this.addForm({
            "": {
                type: "title",
                txt: "Add/Edit Image"
            },
            src: {
                type: "text",
                txt: "URL",
                value: "http://",
                style: {
                    width: "150px"
                }
            },
            alt: {
                type: "text",
                txt: "Alt Text",
                style: {
                    width: "100px"
                }
            },
            align: {
                type: "select",
                txt: "Align",
                options: {
                    none: "Default",
                    left: "Left",
                    right: "Right"
                }
            }
        }, this.im)
    },
    submit: function (B) {
        var C = this.inputs.src.value;
        if (C == "" || C == "http://") {
            alert("You must enter a Image URL to insert");
            return false
        }
        this.removePane();
        if (!this.im) {
            var A = "javascript:nicImTemp();";
            this.ne.nicCommand("insertImage", A);
            this.im = this.findElm("IMG", "src", A)
        }
        if (this.im) {
            this.im.setAttributes({
                src: this.inputs.src.value,
                alt: this.inputs.alt.value,
                align: this.inputs.align.value
            })
        }
    }
});
nicEditors.registerPlugin(nicPlugin, nicImageOptions);

var nicSaveOptions = {
    buttons: {
        'save': {
            name: __('Save this content'),
            type: 'nicEditorSaveButton'
        }
    }
};

var nicEditorSaveButton = nicEditorButton.extend({
    init: function () {
        if (!this.ne.options.onSave) {
            this.margin.setStyle({
                display: "none"
            })
        }
    },
    mouseClick: function () {
        var B = this.ne.options.onSave;
        var A = this.ne.selectedInstance;
        B(A.getContent(), A.elm.id, A)
    }
});
nicEditors.registerPlugin(nicPlugin, nicSaveOptions);

var nicXHTML = bkClass.extend({
    stripAttributes: ["_moz_dirty", "_moz_resizing", "_extended"],
    noShort: ["style", "title", "script", "textarea", "a"],
    cssReplace: {
        "font-weight:bold;": "strong",
        "font-style:italic;": "em"
    },
    sizes: {
        1: "xx-small",
        2: "x-small",
        3: "small",
        4: "medium",
        5: "large",
        6: "x-large"
    },
    construct: function (A) {
        this.ne = A;
        if (this.ne.options.xhtml) {
            A.addEvent("get", this.cleanup.closure(this))
        }
    },
    cleanup: function (A) {
        var B = A.getElm();
        var C = this.toXHTML(B);
        A.content = C
    },
    toXHTML: function (C, A, L) {
        var G = "";
        var O = "";
        var P = "";
        var I = C.nodeType;
        var Q = C.nodeName.toLowerCase();
        var N = C.hasChildNodes && C.hasChildNodes();
        var B = new Array();
        switch (I) {
        case 1:
            var H = C.attributes;
            switch (Q) {
            case "b":
                Q = "strong";
                break;
            case "i":
                Q = "em";
                break;
            case "font":
                Q = "span";
                break
            }
            if (A) {
                for (var F = 0; F < H.length; F++) {
                    var K = H[F];
                    var M = K.nodeName.toLowerCase();
                    var D = K.nodeValue;
                    if (!K.specified || !D || bkLib.inArray(this.stripAttributes, M) || typeof (D) == "function") {
                        continue
                    }
                    switch (M) {
                    case "style":
                        var J = D.replace(/ /g, "");
                        for (itm in this.cssReplace) {
                            if (J.indexOf(itm) != -1) {
                                B.push(this.cssReplace[itm]);
                                J = J.replace(itm, "")
                            }
                        }
                        P += J;
                        D = "";
                        break;
                    case "class":
                        D = D.replace("Apple-style-span", "");
                        break;
                    case "size":
                        P += "font-size:" + this.sizes[D] + ";";
                        D = "";
                        break
                    }
                    if (D) {
                        O += " " + M + '="' + D + '"'
                    }
                }
                if (P) {
                    O += ' style="' + P + '"'
                }
                for (var F = 0; F < B.length; F++) {
                    G += "<" + B[F] + ">"
                }
                if (O == "" && Q == "span") {
                    A = false
                }
                if (A) {
                    G += "<" + Q;
                    if (Q != "br") {
                        G += O
                    }
                }
            }
            if (!N && !bkLib.inArray(this.noShort, M)) {
                if (A) {
                    G += " />"
                }
            } else {
                if (A) {
                    G += ">"
                }
                for (var F = 0; F < C.childNodes.length; F++) {
                    var E = this.toXHTML(C.childNodes[F], true, true);
                    if (E) {
                        G += E
                    }
                }
            } if (A && N) {
                G += "</" + Q + ">"
            }
            for (var F = 0; F < B.length; F++) {
                G += "</" + B[F] + ">"
            }
            break;
        case 3:
            G += C.nodeValue;
            break
        }
        return G
    }
});
nicEditors.registerPlugin(nicXHTML);

var nicBBCode = bkClass.extend({
    construct: function (A) {
        this.ne = A;
        if (this.ne.options.bbCode) {
            A.addEvent("get", this.bbGet.closure(this));
            A.addEvent("set", this.bbSet.closure(this));
            var B = this.ne.loadedPlugins;
            for (itm in B) {
                if (B[itm].toXHTML) {
                    this.xhtml = B[itm]
                }
            }
        }
    },
    bbGet: function (A) {
        var B = this.xhtml.toXHTML(A.getElm());
        A.content = this.toBBCode(B)
    },
    bbSet: function (A) {
        A.content = this.fromBBCode(A.content)
    },
    toBBCode: function (B) {
        function A(D, C) {
            B = B.replace(D, C)
        }
        A(/\n/gi, "");
        A(/<strong>(.*?)<\/strong>/gi, "[b]$1[/b]");
        A(/<em>(.*?)<\/em>/gi, "[i]$1[/i]");
        A(/<span.*?style="text-decoration:underline;">(.*?)<\/span>/gi, "[u]$1[/u]");
        A(/<ul>(.*?)<\/ul>/gi, "[list]$1[/list]");
        A(/<li>(.*?)<\/li>/gi, "[*]$1[]");
        A(/<ol>(.*?)<\/ol>/gi, "[list=1]$1[/list]");
        A(/<img.*?src="(.*?)".*?>/gi, "[img]$1[/img]");
        A(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, "[url=$1]$2[/url]");
        A(/<br.*?>/gi, "\n");
        A(/<.*?>.*?<\/.*?>/gi, "");
        return B
    },
    fromBBCode: function (A) {
        function B(D, C) {
            A = A.replace(D, C)
        }
        B(/\[b\](.*?)\[\/b\]/gi, "<strong>$1</strong>");
        B(/\[i\](.*?)\[\/i\]/gi, "<em>$1</em>");
        B(/\[u\](.*?)\[\/u\]/gi, '<span style="text-decoration:underline;">$1</span>');
        B(/\[list\](.*?)\[\/list\]/gi, "<ul>$1</ul>");
        B(/\[list=1\](.*?)\[\/list\]/gi, "<ol>$1</ol>");
        B(/\[\*\](.*?)\[\/\*\]/gi, "<li>$1</li>");
        B(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" />');
        B(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1">$2</a>');
        B(/\n/gi, "<br />");
        return A
    }
});
nicEditors.registerPlugin(nicBBCode);

nicEditor = nicEditor.extend({
    floatingPanel: function () {
        this.floating = new bkElement("DIV").setStyle({
            position: "absolute",
            top: "-1000px"
        }).appendTo(document.body);
        this.addEvent("focus", this.reposition.closure(this)).addEvent("blur", this.hide.closure(this));
        this.setPanel(this.floating)
    },
    reposition: function () {
        var B = this.selectedInstance.e;
        this.floating.setStyle({
            width: (parseInt(B.getStyle("width")) || B.clientWidth) + "px"
        });
        var A = B.offsetTop - this.floating.offsetHeight;
        if (A < 0) {
            A = B.offsetTop + B.offsetHeight
        }
        this.floating.setStyle({
            top: A + "px",
            left: B.offsetLeft + "px",
            display: "block"
        })
    },
    hide: function () {
        this.floating.setStyle({
            top: "-1000px"
        })
    }
});

var nicCodeOptions = {
    buttons: {
        'xhtml': {
            name: 'Edit HTML',
            type: 'nicCodeButton'
        }
    }
};

var nicCodeButton = nicEditorAdvancedButton.extend({
    width: "350px",
    addPane: function () {
        this.addForm({
            "": {
                type: "title",
                txt: "Edit HTML"
            },
            code: {
                type: "content",
                value: this.ne.selectedInstance.getContent(),
                style: {
                    width: "340px",
                    height: "200px"
                }
            }
        })
    },
    submit: function (B) {
        var A = this.inputs.code.value;
        this.ne.selectedInstance.setContent(A);
        this.removePane()
    }
});
nicEditors.registerPlugin(nicPlugin, nicCodeOptions);

//Filament Group modification note:
//This version of excanvas is modified to support lazy loading of this file. More info here: http://pipwerks.com/2009/03/12/lazy-loading-excanvasjs/

// Copyright 2006 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Known Issues:
//
// * Patterns are not implemented.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.

// Only add this code if we do not already have a canvas implementation
if (!document.createElement('canvas').getContext) {
    (function () {
        // alias some functions to make (compiled) code shorter
        var m = Math;
        var mr = m.round;
        var ms = m.sin;
        var mc = m.cos;
        var abs = m.abs;
        var sqrt = m.sqrt;

        // this is used for sub pixel precision
        var Z = 10;
        var Z2 = Z / 2;

        /**
         * This funtion is assigned to the <canvas> elements as element.getContext().
         * @this {HTMLElement}
         * @return {CanvasRenderingContext2D_}
         */

        function getContext() {
            return this.context_ ||
                (this.context_ = new CanvasRenderingContext2D_(this));
        }

        var slice = Array.prototype.slice;

        /**
         * Binds a function to an object. The returned function will always use the
         * passed in {@code obj} as {@code this}.
         *
         * Example:
         *
         *   g = bind(f, obj, a, b)
         *   g(c, d) // will do f.call(obj, a, b, c, d)
         *
         * @param {Function} f The function to bind the object to
         * @param {Object} obj The object that should act as this when the function
         *     is called
         * @param {*} var_args Rest arguments that will be used as the initial
         *     arguments when the function is called
         * @return {Function} A new function that has bound this
         */

        function bind(f, obj, var_args) {
            var a = slice.call(arguments, 2);
            return function () {
                return f.apply(obj, a.concat(slice.call(arguments)));
            };
        }

        var G_vmlCanvasManager_ = {
            init: function (opt_doc) {
                if (/MSIE/.test(navigator.userAgent) && !window.opera) {
                    var doc = opt_doc || document;
                    // Create a dummy element so that IE will allow canvas elements to be
                    // recognized.
                    doc.createElement('canvas');

                    if (doc.readyState !== "complete") {
                        doc.attachEvent('onreadystatechange', bind(this.init_, this, doc));
                    } else {
                        this.init_(doc);
                    }
                }
            },

            init_: function (doc) {
                // create xmlns
                if (!doc.namespaces['g_vml_']) {
                    doc.namespaces.add('g_vml_', 'urn:schemas-microsoft-com:vml',
                        '#default#VML');
                }
                if (!doc.namespaces['g_o_']) {
                    doc.namespaces.add('g_o_', 'urn:schemas-microsoft-com:office:office',
                        '#default#VML');
                }

                // Setup default CSS.  Only add one style sheet per document
                if (!doc.styleSheets['ex_canvas_']) {
                    var ss = doc.createStyleSheet();
                    ss.owningElement.id = 'ex_canvas_';
                    ss.cssText = 'canvas{display:inline-block;overflow:hidden;' +
                    // default size is 300x150 in Gecko and Opera
                    'text-align:left;width:300px;height:150px}' +
                        'g_vml_\\:*{behavior:url(#default#VML)}' +
                        'g_o_\\:*{behavior:url(#default#VML)}';
                }

                // find all canvas elements
                var els = doc.getElementsByTagName('canvas');
                for (var i = 0; i < els.length; i++) {
                    this.initElement(els[i]);
                }
            },

            /**
             * Public initializes a canvas element so that it can be used as canvas
             * element from now on. This is called automatically before the page is
             * loaded but if you are creating elements using createElement you need to
             * make sure this is called on the element.
             * @param {HTMLElement} el The canvas element to initialize.
             * @return {HTMLElement} the element that was created.
             */
            initElement: function (el) {
                if (!el.getContext) {
                    el.getContext = getContext;

                    // Remove fallback content. There is no way to hide text nodes so we
                    // just remove all childNodes. We could hide all elements and remove
                    // text nodes but who really cares about the fallback content.
                    el.innerHTML = '';

                    // do not use inline function because that will leak memory
                    el.attachEvent('onpropertychange', onPropertyChange);
                    el.attachEvent('onresize', onResize);

                    var attrs = el.attributes;
                    if (attrs.width && attrs.width.specified) {
                        // TODO: use runtimeStyle and coordsize
                        // el.getContext().setWidth_(attrs.width.nodeValue);
                        el.style.width = attrs.width.nodeValue + 'px';
                    } else {
                        el.width = el.clientWidth;
                    }
                    if (attrs.height && attrs.height.specified) {
                        // TODO: use runtimeStyle and coordsize
                        // el.getContext().setHeight_(attrs.height.nodeValue);
                        el.style.height = attrs.height.nodeValue + 'px';
                    } else {
                        el.height = el.clientHeight;
                    }
                    //el.getContext().setCoordsize_()
                }
                return el;
            }
        };

        function onPropertyChange(e) {
            var el = e.srcElement;

            switch (e.propertyName) {
            case 'width':
                el.style.width = el.attributes.width.nodeValue + 'px';
                el.getContext().clearRect();
                break;
            case 'height':
                el.style.height = el.attributes.height.nodeValue + 'px';
                el.getContext().clearRect();
                break;
            }
        }

        function onResize(e) {
            var el = e.srcElement;
            if (el.firstChild) {
                el.firstChild.style.width = el.clientWidth + 'px';
                el.firstChild.style.height = el.clientHeight + 'px';
            }
        }

        G_vmlCanvasManager_.init();

        // precompute "00" to "FF"
        var dec2hex = [];
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 16; j++) {
                dec2hex[i * 16 + j] = i.toString(16) + j.toString(16);
            }
        }

        function createMatrixIdentity() {
            return [
                [1, 0, 0], [0, 1, 0], [0, 0, 1]
            ];
        }

        function matrixMultiply(m1, m2) {
            var result = createMatrixIdentity();

            for (var x = 0; x < 3; x++) {
                for (var y = 0; y < 3; y++) {
                    var sum = 0;

                    for (var z = 0; z < 3; z++) {
                        sum += m1[x][z] * m2[z][y];
                    }

                    result[x][y] = sum;
                }
            }
            return result;
        }

        function copyState(o1, o2) {
            o2.fillStyle = o1.fillStyle;
            o2.lineCap = o1.lineCap;
            o2.lineJoin = o1.lineJoin;
            o2.lineWidth = o1.lineWidth;
            o2.miterLimit = o1.miterLimit;
            o2.shadowBlur = o1.shadowBlur;
            o2.shadowColor = o1.shadowColor;
            o2.shadowOffsetX = o1.shadowOffsetX;
            o2.shadowOffsetY = o1.shadowOffsetY;
            o2.strokeStyle = o1.strokeStyle;
            o2.globalAlpha = o1.globalAlpha;
            o2.arcScaleX_ = o1.arcScaleX_;
            o2.arcScaleY_ = o1.arcScaleY_;
            o2.lineScale_ = o1.lineScale_;
        }

        function processStyle(styleString) {
            var str, alpha = 1;

            styleString = String(styleString);
            if (styleString.substring(0, 3) == 'rgb') {
                var start = styleString.indexOf('(', 3);
                var end = styleString.indexOf(')', start + 1);
                var guts = styleString.substring(start + 1, end).split(',');

                str = '#';
                for (var i = 0; i < 3; i++) {
                    str += dec2hex[Number(guts[i])];
                }

                if (guts.length == 4 && styleString.substr(3, 1) == 'a') {
                    alpha = guts[3];
                }
            } else {
                str = styleString;
            }

            return {
                color: str,
                alpha: alpha
            };
        }

        function processLineCap(lineCap) {
            switch (lineCap) {
            case 'butt':
                return 'flat';
            case 'round':
                return 'round';
            case 'square':
            default:
                return 'square';
            }
        }

        /**
         * This class implements CanvasRenderingContext2D interface as described by
         * the WHATWG.
         * @param {HTMLElement} surfaceElement The element that the 2D context should
         * be associated with
         */

        function CanvasRenderingContext2D_(surfaceElement) {
            this.m_ = createMatrixIdentity();

            this.mStack_ = [];
            this.aStack_ = [];
            this.currentPath_ = [];

            // Canvas context properties
            this.strokeStyle = '#000';
            this.fillStyle = '#000';

            this.lineWidth = 1;
            this.lineJoin = 'miter';
            this.lineCap = 'butt';
            this.miterLimit = Z * 1;
            this.globalAlpha = 1;
            this.canvas = surfaceElement;

            var el = surfaceElement.ownerDocument.createElement('div');
            el.style.width = surfaceElement.clientWidth + 'px';
            el.style.height = surfaceElement.clientHeight + 'px';
            el.style.overflow = 'hidden';
            el.style.position = 'absolute';
            surfaceElement.appendChild(el);

            this.element_ = el;
            this.arcScaleX_ = 1;
            this.arcScaleY_ = 1;
            this.lineScale_ = 1;
        }

        var contextPrototype = CanvasRenderingContext2D_.prototype;
        contextPrototype.clearRect = function () {
            this.element_.innerHTML = '';
        };

        contextPrototype.beginPath = function () {
            // TODO: Branch current matrix so that save/restore has no effect
            //       as per safari docs.
            this.currentPath_ = [];
        };

        contextPrototype.moveTo = function (aX, aY) {
            var p = this.getCoords_(aX, aY);
            this.currentPath_.push({
                type: 'moveTo',
                x: p.x,
                y: p.y
            });
            this.currentX_ = p.x;
            this.currentY_ = p.y;
        };

        contextPrototype.lineTo = function (aX, aY) {
            var p = this.getCoords_(aX, aY);
            this.currentPath_.push({
                type: 'lineTo',
                x: p.x,
                y: p.y
            });

            this.currentX_ = p.x;
            this.currentY_ = p.y;
        };

        contextPrototype.bezierCurveTo = function (aCP1x, aCP1y,
            aCP2x, aCP2y,
            aX, aY) {
            var p = this.getCoords_(aX, aY);
            var cp1 = this.getCoords_(aCP1x, aCP1y);
            var cp2 = this.getCoords_(aCP2x, aCP2y);
            bezierCurveTo(this, cp1, cp2, p);
        };

        // Helper function that takes the already fixed cordinates.

        function bezierCurveTo(self, cp1, cp2, p) {
            self.currentPath_.push({
                type: 'bezierCurveTo',
                cp1x: cp1.x,
                cp1y: cp1.y,
                cp2x: cp2.x,
                cp2y: cp2.y,
                x: p.x,
                y: p.y
            });
            self.currentX_ = p.x;
            self.currentY_ = p.y;
        }

        contextPrototype.quadraticCurveTo = function (aCPx, aCPy, aX, aY) {
            // the following is lifted almost directly from
            // http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes

            var cp = this.getCoords_(aCPx, aCPy);
            var p = this.getCoords_(aX, aY);

            var cp1 = {
                x: this.currentX_ + 2.0 / 3.0 * (cp.x - this.currentX_),
                y: this.currentY_ + 2.0 / 3.0 * (cp.y - this.currentY_)
            };
            var cp2 = {
                x: cp1.x + (p.x - this.currentX_) / 3.0,
                y: cp1.y + (p.y - this.currentY_) / 3.0
            };

            bezierCurveTo(this, cp1, cp2, p);
        };

        contextPrototype.arc = function (aX, aY, aRadius,
            aStartAngle, aEndAngle, aClockwise) {
            aRadius *= Z;
            var arcType = aClockwise ? 'at' : 'wa';

            var xStart = aX + mc(aStartAngle) * aRadius - Z2;
            var yStart = aY + ms(aStartAngle) * aRadius - Z2;

            var xEnd = aX + mc(aEndAngle) * aRadius - Z2;
            var yEnd = aY + ms(aEndAngle) * aRadius - Z2;

            // IE won't render arches drawn counter clockwise if xStart == xEnd.
            if (xStart == xEnd && !aClockwise) {
                xStart += 0.125; // Offset xStart by 1/80 of a pixel. Use something
                // that can be represented in binary
            }

            var p = this.getCoords_(aX, aY);
            var pStart = this.getCoords_(xStart, yStart);
            var pEnd = this.getCoords_(xEnd, yEnd);

            this.currentPath_.push({
                type: arcType,
                x: p.x,
                y: p.y,
                radius: aRadius,
                xStart: pStart.x,
                yStart: pStart.y,
                xEnd: pEnd.x,
                yEnd: pEnd.y
            });
        };

        contextPrototype.rect = function (aX, aY, aWidth, aHeight) {
            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
        };

        contextPrototype.strokeRect = function (aX, aY, aWidth, aHeight) {
            var oldPath = this.currentPath_;
            this.beginPath();

            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
            this.stroke();

            this.currentPath_ = oldPath;
        };

        contextPrototype.fillRect = function (aX, aY, aWidth, aHeight) {
            var oldPath = this.currentPath_;
            this.beginPath();

            this.moveTo(aX, aY);
            this.lineTo(aX + aWidth, aY);
            this.lineTo(aX + aWidth, aY + aHeight);
            this.lineTo(aX, aY + aHeight);
            this.closePath();
            this.fill();

            this.currentPath_ = oldPath;
        };

        contextPrototype.createLinearGradient = function (aX0, aY0, aX1, aY1) {
            var gradient = new CanvasGradient_('gradient');
            gradient.x0_ = aX0;
            gradient.y0_ = aY0;
            gradient.x1_ = aX1;
            gradient.y1_ = aY1;
            return gradient;
        };

        contextPrototype.createRadialGradient = function (aX0, aY0, aR0,
            aX1, aY1, aR1) {
            var gradient = new CanvasGradient_('gradientradial');
            gradient.x0_ = aX0;
            gradient.y0_ = aY0;
            gradient.r0_ = aR0;
            gradient.x1_ = aX1;
            gradient.y1_ = aY1;
            gradient.r1_ = aR1;
            return gradient;
        };

        contextPrototype.drawImage = function (image, var_args) {
            var dx, dy, dw, dh, sx, sy, sw, sh;

            // to find the original width we overide the width and height
            var oldRuntimeWidth = image.runtimeStyle.width;
            var oldRuntimeHeight = image.runtimeStyle.height;
            image.runtimeStyle.width = 'auto';
            image.runtimeStyle.height = 'auto';

            // get the original size
            var w = image.width;
            var h = image.height;

            // and remove overides
            image.runtimeStyle.width = oldRuntimeWidth;
            image.runtimeStyle.height = oldRuntimeHeight;

            if (arguments.length == 3) {
                dx = arguments[1];
                dy = arguments[2];
                sx = sy = 0;
                sw = dw = w;
                sh = dh = h;
            } else if (arguments.length == 5) {
                dx = arguments[1];
                dy = arguments[2];
                dw = arguments[3];
                dh = arguments[4];
                sx = sy = 0;
                sw = w;
                sh = h;
            } else if (arguments.length == 9) {
                sx = arguments[1];
                sy = arguments[2];
                sw = arguments[3];
                sh = arguments[4];
                dx = arguments[5];
                dy = arguments[6];
                dw = arguments[7];
                dh = arguments[8];
            } else {
                throw Error('Invalid number of arguments');
            }

            var d = this.getCoords_(dx, dy);

            var w2 = sw / 2;
            var h2 = sh / 2;

            var vmlStr = [];

            var W = 10;
            var H = 10;

            // For some reason that I've now forgotten, using divs didn't work
            vmlStr.push(' <g_vml_:group',
                ' coordsize="', Z * W, ',', Z * H, '"',
                ' coordorigin="0,0"',
                ' style="width:', W, 'px;height:', H, 'px;position:absolute;');

            // If filters are necessary (rotation exists), create them
            // filters are bog-slow, so only create them if abbsolutely necessary
            // The following check doesn't account for skews (which don't exist
            // in the canvas spec (yet) anyway.

            if (this.m_[0][0] != 1 || this.m_[0][1]) {
                var filter = [];

                // Note the 12/21 reversal
                filter.push('M11=', this.m_[0][0], ',',
                    'M12=', this.m_[1][0], ',',
                    'M21=', this.m_[0][1], ',',
                    'M22=', this.m_[1][1], ',',
                    'Dx=', mr(d.x / Z), ',',
                    'Dy=', mr(d.y / Z), '');

                // Bounding box calculation (need to minimize displayed area so that
                // filters don't waste time on unused pixels.
                var max = d;
                var c2 = this.getCoords_(dx + dw, dy);
                var c3 = this.getCoords_(dx, dy + dh);
                var c4 = this.getCoords_(dx + dw, dy + dh);

                max.x = m.max(max.x, c2.x, c3.x, c4.x);
                max.y = m.max(max.y, c2.y, c3.y, c4.y);

                vmlStr.push('padding:0 ', mr(max.x / Z), 'px ', mr(max.y / Z),
                    'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                    filter.join(''), ", sizingmethod='clip');")
            } else {
                vmlStr.push('top:', mr(d.y / Z), 'px;left:', mr(d.x / Z), 'px;');
            }

            vmlStr.push(' ">',
                '<g_vml_:image src="', image.src, '"',
                ' style="width:', Z * dw, 'px;',
                ' height:', Z * dh, 'px;"',
                ' cropleft="', sx / w, '"',
                ' croptop="', sy / h, '"',
                ' cropright="', (w - sx - sw) / w, '"',
                ' cropbottom="', (h - sy - sh) / h, '"',
                ' />',
                '</g_vml_:group>');

            this.element_.insertAdjacentHTML('BeforeEnd',
                vmlStr.join(''));
        };

        contextPrototype.stroke = function (aFill) {
            var lineStr = [];
            var lineOpen = false;
            var a = processStyle(aFill ? this.fillStyle : this.strokeStyle);
            var color = a.color;
            var opacity = a.alpha * this.globalAlpha;

            var W = 10;
            var H = 10;

            lineStr.push('<g_vml_:shape',
                ' filled="', !! aFill, '"',
                ' style="position:absolute;width:', W, 'px;height:', H, 'px;"',
                ' coordorigin="0 0" coordsize="', Z * W, ' ', Z * H, '"',
                ' stroked="', !aFill, '"',
                ' path="');

            var newSeq = false;
            var min = {
                x: null,
                y: null
            };
            var max = {
                x: null,
                y: null
            };

            for (var i = 0; i < this.currentPath_.length; i++) {
                var p = this.currentPath_[i];
                var c;

                switch (p.type) {
                case 'moveTo':
                    c = p;
                    lineStr.push(' m ', mr(p.x), ',', mr(p.y));
                    break;
                case 'lineTo':
                    lineStr.push(' l ', mr(p.x), ',', mr(p.y));
                    break;
                case 'close':
                    lineStr.push(' x ');
                    p = null;
                    break;
                case 'bezierCurveTo':
                    lineStr.push(' c ',
                        mr(p.cp1x), ',', mr(p.cp1y), ',',
                        mr(p.cp2x), ',', mr(p.cp2y), ',',
                        mr(p.x), ',', mr(p.y));
                    break;
                case 'at':
                case 'wa':
                    lineStr.push(' ', p.type, ' ',
                        mr(p.x - this.arcScaleX_ * p.radius), ',',
                        mr(p.y - this.arcScaleY_ * p.radius), ' ',
                        mr(p.x + this.arcScaleX_ * p.radius), ',',
                        mr(p.y + this.arcScaleY_ * p.radius), ' ',
                        mr(p.xStart), ',', mr(p.yStart), ' ',
                        mr(p.xEnd), ',', mr(p.yEnd));
                    break;
                }

                // TODO: Following is broken for curves due to
                //       move to proper paths.

                // Figure out dimensions so we can do gradient fills
                // properly
                if (p) {
                    if (min.x == null || p.x < min.x) {
                        min.x = p.x;
                    }
                    if (max.x == null || p.x > max.x) {
                        max.x = p.x;
                    }
                    if (min.y == null || p.y < min.y) {
                        min.y = p.y;
                    }
                    if (max.y == null || p.y > max.y) {
                        max.y = p.y;
                    }
                }
            }
            lineStr.push(' ">');

            if (!aFill) {
                var lineWidth = this.lineScale_ * this.lineWidth;

                // VML cannot correctly render a line if the width is less than 1px.
                // In that case, we dilute the color to make the line look thinner.
                if (lineWidth < 1) {
                    opacity *= lineWidth;
                }

                lineStr.push(
                    '<g_vml_:stroke',
                    ' opacity="', opacity, '"',
                    ' joinstyle="', this.lineJoin, '"',
                    ' miterlimit="', this.miterLimit, '"',
                    ' endcap="', processLineCap(this.lineCap), '"',
                    ' weight="', lineWidth, 'px"',
                    ' color="', color, '" />'
                );
            } else if (typeof this.fillStyle == 'object') {
                var fillStyle = this.fillStyle;
                var angle = 0;
                var focus = {
                    x: 0,
                    y: 0
                };

                // additional offset
                var shift = 0;
                // scale factor for offset
                var expansion = 1;

                if (fillStyle.type_ == 'gradient') {
                    var x0 = fillStyle.x0_ / this.arcScaleX_;
                    var y0 = fillStyle.y0_ / this.arcScaleY_;
                    var x1 = fillStyle.x1_ / this.arcScaleX_;
                    var y1 = fillStyle.y1_ / this.arcScaleY_;
                    var p0 = this.getCoords_(x0, y0);
                    var p1 = this.getCoords_(x1, y1);
                    var dx = p1.x - p0.x;
                    var dy = p1.y - p0.y;
                    angle = Math.atan2(dx, dy) * 180 / Math.PI;

                    // The angle should be a non-negative number.
                    if (angle < 0) {
                        angle += 360;
                    }

                    // Very small angles produce an unexpected result because they are
                    // converted to a scientific notation string.
                    if (angle < 1e-6) {
                        angle = 0;
                    }
                } else {
                    var p0 = this.getCoords_(fillStyle.x0_, fillStyle.y0_);
                    var width = max.x - min.x;
                    var height = max.y - min.y;
                    focus = {
                        x: (p0.x - min.x) / width,
                        y: (p0.y - min.y) / height
                    };

                    width /= this.arcScaleX_ * Z;
                    height /= this.arcScaleY_ * Z;
                    var dimension = m.max(width, height);
                    shift = 2 * fillStyle.r0_ / dimension;
                    expansion = 2 * fillStyle.r1_ / dimension - shift;
                }

                // We need to sort the color stops in ascending order by offset,
                // otherwise IE won't interpret it correctly.
                var stops = fillStyle.colors_;
                stops.sort(function (cs1, cs2) {
                    return cs1.offset - cs2.offset;
                });

                var length = stops.length;
                var color1 = stops[0].color;
                var color2 = stops[length - 1].color;
                var opacity1 = stops[0].alpha * this.globalAlpha;
                var opacity2 = stops[length - 1].alpha * this.globalAlpha;

                var colors = [];
                for (var i = 0; i < length; i++) {
                    var stop = stops[i];
                    colors.push(stop.offset * expansion + shift + ' ' + stop.color);
                }

                // When colors attribute is used, the meanings of opacity and o:opacity2
                // are reversed.
                lineStr.push('<g_vml_:fill type="', fillStyle.type_, '"',
                    ' method="none" focus="100%"',
                    ' color="', color1, '"',
                    ' color2="', color2, '"',
                    ' colors="', colors.join(','), '"',
                    ' opacity="', opacity2, '"',
                    ' g_o_:opacity2="', opacity1, '"',
                    ' angle="', angle, '"',
                    ' focusposition="', focus.x, ',', focus.y, '" />');
            } else {
                lineStr.push('<g_vml_:fill color="', color, '" opacity="', opacity,
                    '" />');
            }

            lineStr.push('</g_vml_:shape>');

            this.element_.insertAdjacentHTML('beforeEnd', lineStr.join(''));
        };

        contextPrototype.fill = function () {
            this.stroke(true);
        }

        contextPrototype.closePath = function () {
            this.currentPath_.push({
                type: 'close'
            });
        };

        /**
         * @private
         */
        contextPrototype.getCoords_ = function (aX, aY) {
            var m = this.m_;
            return {
                x: Z * (aX * m[0][0] + aY * m[1][0] + m[2][0]) - Z2,
                y: Z * (aX * m[0][1] + aY * m[1][1] + m[2][1]) - Z2
            }
        };

        contextPrototype.save = function () {
            var o = {};
            copyState(this, o);
            this.aStack_.push(o);
            this.mStack_.push(this.m_);
            this.m_ = matrixMultiply(createMatrixIdentity(), this.m_);
        };

        contextPrototype.restore = function () {
            copyState(this.aStack_.pop(), this);
            this.m_ = this.mStack_.pop();
        };

        function matrixIsFinite(m) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 2; k++) {
                    if (!isFinite(m[j][k]) || isNaN(m[j][k])) {
                        return false;
                    }
                }
            }
            return true;
        }

        function setM(ctx, m, updateLineScale) {
            if (!matrixIsFinite(m)) {
                return;
            }
            ctx.m_ = m;

            if (updateLineScale) {
                // Get the line scale.
                // Determinant of this.m_ means how much the area is enlarged by the
                // transformation. So its square root can be used as a scale factor
                // for width.
                var det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
                ctx.lineScale_ = sqrt(abs(det));
            }
        }

        contextPrototype.translate = function (aX, aY) {
            var m1 = [
                [1, 0, 0],
                [0, 1, 0],
                [aX, aY, 1]
            ];

            setM(this, matrixMultiply(m1, this.m_), false);
        };

        contextPrototype.rotate = function (aRot) {
            var c = mc(aRot);
            var s = ms(aRot);

            var m1 = [
                [c, s, 0],
                [-s, c, 0],
                [0, 0, 1]
            ];

            setM(this, matrixMultiply(m1, this.m_), false);
        };

        contextPrototype.scale = function (aX, aY) {
            this.arcScaleX_ *= aX;
            this.arcScaleY_ *= aY;
            var m1 = [
                [aX, 0, 0],
                [0, aY, 0],
                [0, 0, 1]
            ];

            setM(this, matrixMultiply(m1, this.m_), true);
        };

        contextPrototype.transform = function (m11, m12, m21, m22, dx, dy) {
            var m1 = [
                [m11, m12, 0],
                [m21, m22, 0],
                [dx, dy, 1]
            ];

            setM(this, matrixMultiply(m1, this.m_), true);
        };

        contextPrototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
            var m = [
                [m11, m12, 0],
                [m21, m22, 0],
                [dx, dy, 1]
            ];

            setM(this, m, true);
        };

        /******** STUBS ********/
        contextPrototype.clip = function () {
            // TODO: Implement
        };

        contextPrototype.arcTo = function () {
            // TODO: Implement
        };

        contextPrototype.createPattern = function () {
            return new CanvasPattern_;
        };

        // Gradient / Pattern Stubs

        function CanvasGradient_(aType) {
            this.type_ = aType;
            this.x0_ = 0;
            this.y0_ = 0;
            this.r0_ = 0;
            this.x1_ = 0;
            this.y1_ = 0;
            this.r1_ = 0;
            this.colors_ = [];
        }

        CanvasGradient_.prototype.addColorStop = function (aOffset, aColor) {
            aColor = processStyle(aColor);
            this.colors_.push({
                offset: aOffset,
                color: aColor.color,
                alpha: aColor.alpha
            });
        };

        function CanvasPattern_() {}

        // set up externs
        G_vmlCanvasManager = G_vmlCanvasManager_;
        CanvasRenderingContext2D = CanvasRenderingContext2D_;
        CanvasGradient = CanvasGradient_;
        CanvasPattern = CanvasPattern_;
    })();
} // if

(function ($) {
    $.extend({
        tablesorter: new

        function () {
            var parsers = [],
                widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: true,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                },
                headers: {},
                widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: '/\.|\,/g',
                onRenderHeader: null,
                selectorHeaders: 'thead th',
                debug: false
            };

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
            }
            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s);
                } else {
                    alert(s);
                }
            }

            function buildParserCache(table, $headers) {
                if (table.config.debug) {
                    var parsersDebug = "";
                }
                if (table.tBodies.length == 0) return;
                var rows = table.tBodies[0].rows;
                if (rows[0]) {
                    var list = [],
                        cells = rows[0].cells,
                        l = cells.length;
                    for (var i = 0; i < l; i++) {
                        var p = false;
                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
                            p = getParserById($($headers[i]).metadata().sorter);
                        } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {
                            p = getParserById(table.config.headers[i].sorter);
                        }
                        if (!p) {
                            p = detectParserForColumn(table, rows, -1, i);
                        }
                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                        }
                        list.push(p);
                    }
                }
                if (table.config.debug) {
                    log(parsersDebug);
                }
                return list;
            };

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                var l = parsers.length,
                    node = false,
                    nodeValue = false,
                    keepLooking = true;
                while (nodeValue == '' && keepLooking) {
                    rowIndex++;
                    if (rows[rowIndex]) {
                        node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                        nodeValue = trimAndGetNodeText(table.config, node);
                        if (table.config.debug) {
                            log('Checking if value was empty on row:' + rowIndex);
                        }
                    } else {
                        keepLooking = false;
                    }
                }
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is(nodeValue, table, node)) {
                        return parsers[i];
                    }
                }
                return parsers[0];
            }

            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex];
            }

            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node));
            }

            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i];
                    }
                }
                return false;
            }

            function buildCache(table) {
                if (table.config.debug) {
                    var cacheTime = new Date();
                }
                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                    totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                    parsers = table.config.parsers,
                    cache = {
                        row: [],
                        normalized: []
                    };
                for (var i = 0; i < totalRows; ++i) {
                    var c = $(table.tBodies[0].rows[i]),
                        cols = [];
                    if (c.hasClass(table.config.cssChildRow)) {
                        cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                        continue;
                    }
                    cache.row.push(c);
                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                    }
                    cols.push(cache.normalized.length);
                    cache.normalized.push(cols);
                    cols = null;
                };
                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                }
                return cache;
            };

            function getElementText(config, node) {
                var text = "";
                if (!node) return "";
                if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;
                if (config.textExtraction == "simple") {
                    if (config.supportsTextContent) {
                        text = node.textContent;
                    } else {
                        if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                            text = node.childNodes[0].innerHTML;
                        } else {
                            text = node.innerHTML;
                        }
                    }
                } else {
                    if (typeof (config.textExtraction) == "function") {
                        text = config.textExtraction(node);
                    } else {
                        text = $(node).text();
                    }
                }
                return text;
            }

            function appendToTable(table, cache) {
                if (table.config.debug) {
                    var appendTime = new Date()
                }
                var c = cache,
                    r = c.row,
                    n = c.normalized,
                    totalRows = n.length,
                    checkCell = (n[0].length - 1),
                    tableBody = $(table.tBodies[0]),
                    rows = [];
                for (var i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];
                    rows.push(r[pos]);
                    if (!table.config.appender) {
                        var l = r[pos].length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(r[pos][j]);
                        }
                    }
                }
                if (table.config.appender) {
                    table.config.appender(table, rows);
                }
                rows = null;
                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime);
                }
                applyWidget(table);
                setTimeout(function () {
                    $(table).trigger("sortEnd");
                }, 0);
            };

            function buildHeaders(table) {
                if (table.config.debug) {
                    var time = new Date();
                }
                var meta = ($.metadata) ? true : false;
                var header_index = computeTableHeaderCellIndexes(table);
                $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {
                    this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    this.count = this.order;
                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
                    if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);
                    if (!this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                    }
                    table.config.headerList[index] = this;
                });
                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders);
                }
                return $tableHeaders;
            };

            function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = t.getElementsByTagName('THEAD')[0];
                var trs = thead.getElementsByTagName('TR');
                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];
                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1
                        var firstAvailCol;
                        if (typeof (matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = [];
                        }
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof (matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break;
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof (matrix[k]) == "undefined") {
                                matrix[k] = [];
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x";
                            }
                        }
                    }
                }
                return lookup;
            }

            function checkCellColSpan(table, rows, row) {
                var arr = [],
                    r = table.tHead.rows,
                    c = r[row].cells;
                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];
                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell);
                        }
                    }
                }
                return arr;
            };

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true;
                };
                return false;
            }

            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true;
                };
                return false;
            }

            function checkHeaderOptionsSortingLocked(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                return false;
            }

            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {
                    getWidgetById(c[i]).format(table);
                }
            }

            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i];
                    }
                }
            };

            function formatSortingOrder(v) {
                if (typeof (v) != "Number") {
                    return (v.toLowerCase() == "desc") ? 1 : 0;
                } else {
                    return (v == 1) ? 1 : 0;
                }
            }

            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true;
                    }
                }
                return false;
            }

            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function (offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this);
                    }
                });
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]]);
                }
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $('<colgroup>');
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($('<col>').css('width', $(this).width()));
                    });
                    $(table).prepend(colgroup);
                };
            }

            function updateHeaderSortCount(table, sortList) {
                var c = table.config,
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i],
                        o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++;
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) {
                    var sortTime = new Date();
                }
                var dynamicExp = "var sortWrapper = function(a,b) {",
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                    var e = "e" + i;
                    dynamicExp += "var " + e + " = " + s;
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { ";
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; ";
                }
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                if (table.config.debug) {
                    benchmark("Evaling expression:" + dynamicExp, new Date());
                }
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                }
                return cache;
            };

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]",
                    b = "b[" + index + "]";
                if (type == 'text' && direction == 'asc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                } else if (type == 'text' && direction == 'desc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                } else if (type == 'numeric' && direction == 'asc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                } else if (type == 'numeric' && direction == 'desc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                }
            };

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
            };

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
            };

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];";
            };

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];";
            };

            function sortText(a, b) {
                if (table.config.sortLocaleCompare) return a.localeCompare(b);
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            };

            function sortTextDesc(a, b) {
                if (table.config.sortLocaleCompare) return b.localeCompare(a);
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            };

            function sortNumeric(a, b) {
                return a - b;
            };

            function sortNumericDesc(a, b) {
                return b - a;
            };

            function getCachedSortType(parsers, i) {
                return parsers[i].type;
            };
            this.construct = function (settings) {
                return this.each(function () {
                    if (!this.tHead || !this.tBodies) return;
                    var $this, $document, $headers, cache, config, shiftDown = 0,
                        sortOrder;
                    this.config = {};
                    config = $.extend(this.config, $.tablesorter.defaults, settings);
                    $this = $(this);
                    $.data(this, "tablesorter", config);
                    $headers = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, $headers);
                    cache = buildCache(this);
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    fixColumnWidth(this);
                    $headers.click(function (e) {
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            $this.trigger("sortStart");
                            var $cell = $(this);
                            var i = this.column;
                            this.order = this.count++ % 2;
                            if (this.lockedOrder) this.order = this.lockedOrder;
                            if (!e[config.sortMultiSortKey]) {
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j]);
                                        }
                                    }
                                }
                                config.sortList.push([i, this.order]);
                            } else {
                                if (isValueInArray(i, config.sortList)) {
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j],
                                            o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2;
                                        }
                                    }
                                } else {
                                    config.sortList.push([i, this.order]);
                                }
                            };
                            setTimeout(function () {
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable($this[0], multisort($this[0], config.sortList, cache));
                            }, 1);
                            return false;
                        }
                    }).mousedown(function () {
                        if (config.cancelSelection) {
                            this.onselectstart = function () {
                                return false
                            };
                            return false;
                        }
                    });
                    $this.bind("update", function () {
                        var me = this;
                        setTimeout(function () {
                            me.config.parsers = buildParserCache(me, $headers);
                            cache = buildCache(me);
                        }, 1);
                    }).bind("updateCell", function (e, cell) {
                        var config = this.config;
                        var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                        cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell), cell);
                    }).bind("sorton", function (e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        var sortList = config.sortList;
                        updateHeaderSortCount(this, sortList);
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        appendToTable(this, multisort(this, sortList, cache));
                    }).bind("appendCache", function () {
                        appendToTable(this, cache);
                    }).bind("applyWidgetId", function (e, id) {
                        getWidgetById(id).format(this);
                    }).bind("applyWidgets", function () {
                        applyWidget(this);
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist;
                    }
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList]);
                    }
                    applyWidget(this);
                });
            };
            this.addParser = function (parser) {
                var l = parsers.length,
                    a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false;
                    }
                }
                if (a) {
                    parsers.push(parser);
                };
            };
            this.addWidget = function (widget) {
                widgets.push(widget);
            };
            this.formatFloat = function (s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.formatInt = function (s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.isDigit = function (s, config) {
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
            };
            this.clearTableBody = function (table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild) this.removeChild(this.firstChild);
                    }
                    empty.apply(table.tBodies[0]);
                } else {
                    table.tBodies[0].innerHTML = "";
                }
            };
        }
    });
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });
    var ts = $.tablesorter;
    ts.addParser({
        id: "text",
        is: function (s) {
            return true;
        },
        format: function (s) {
            return $.trim(s.toLocaleLowerCase());
        },
        type: "text"
    });
    ts.addParser({
        id: "digit",
        is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "currency",
        is: function (s) {
            return /^[£$€?.]/.test(s);
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "ipAddress",
        is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        },
        format: function (s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        },
        type: "numeric"
    });
    ts.addParser({
        id: "url",
        is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        },
        format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        },
        type: "text"
    });
    ts.addParser({
        id: "isoDate",
        is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        },
        format: function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0");
        },
        type: "numeric"
    });
    ts.addParser({
        id: "percent",
        is: function (s) {
            return /\%$/.test($.trim(s));
        },
        format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        },
        type: "numeric"
    });
    ts.addParser({
        id: "usLongDate",
        is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        },
        format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "shortDate",
        is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        },
        format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        },
        format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        },
        type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function (s) {
            return false;
        },
        format: function (s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        },
        type: "numeric"
    });
    ts.addWidget({
        id: "zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1,
                odd;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);