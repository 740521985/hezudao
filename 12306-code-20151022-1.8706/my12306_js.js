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
(function(b) {
    b(document).ready(function() {
        if (!needEdit) {
            b(".welcome-ft").hide()
        }
        if (user_name && user_regard) {
            var c = "<h3><span>" + user_name + "</span>" + user_regard + "</h3>";
            c += "<p>欢迎您登录中国铁路客户服务中心网站。<br />";
            if (_is_active && "N" == _is_active) {
                c += "如果您要接收12306的服务邮件，请<a id='link_for_reSendEmail' href='#nogo'>验证邮箱</a>。<br />"
            }
            if (_is_needModifyPassword == "Y") {
                c += "您设置的密码安全级别较低，强烈建议您<a id='link_for_changePassword' href='#nogo'>修改密码</a>。<br/>"
            }
            if (notify_SESSION && "Y" == notify_SESSION) {
                c += "<span style='font-size:16px;'>本次登录成功！该用户已在其他地点登录，前次登录将被强制退出。</span><br />"
            }
            if (notify_TWO_1 && "Y" == notify_TWO_1) {
                dhtmlx.alert({
                    title: "温馨提示",
                    ok: "确定",
                    text: "您的身份信息核验未通过，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。",
                    type: "alert-error"
                });
                c += "<span style='color:red;'>您的身份信息核验未通过，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。</span><br />"
            } else {
                if (notify_TWO_2 && "Y" == notify_TWO_2) {
                    dhtmlx.alert({
                        title: "温馨提示",
                        ok: "确定",
                        text: "根据本网站服务条款，您需要提供真实、准确的本人资料，您注册时的手机号码被多个用户使用，为了保障您的个人信息安全，请您到就近办理客运售票业务的铁路车站完成身份核验，通过后即可在网上购票，本网站同时将核验与您身份信息重复的用户。谢谢您的支持。",
                        type: "alert-error"
                    });
                    c += "<span style='color:red;'>根据本网站服务条款，您需要提供真实、准确的本人资料，您注册时的手机号码被多个用户使用，为了保障您的个人信息安全，请您到就近办理客运售票业务的铁路车站完成身份核验，通过后即可在网上购票，本网站同时将核验与您身份信息重复的用户。谢谢您的支持。</span><br />"
                } else {
                    if (notify_TWO_2 && "Y0" == notify_TWO_2) {
                        dhtmlx.alert({
                            title: "温馨提示",
                            ok: "确定",
                            text: "根据本网站服务条款，您需要提供真实、准确的本人资料，您注册的信息与其他用户重复，为了保护您的信息安全，请您到就近的办理客运售票业务的铁路车站完成身份核验，通过后即可在网上购票，本网站同时将核验与您身份信息重复的用户。为了减少您可能出现的经济损失，对已购车票暂时允许网上退票。谢谢。",
                            type: "alert-error"
                        });
                        c += "<span style='color:red;'>根据本网站服务条款，您需要提供真实、准确的本人资料，您注册的信息与其他用户重复，为了保护您的信息安全，请您到就近的办理客运售票业务的铁路车站完成身份核验，通过后即可在网上购票，本网站同时将核验与您身份信息重复的用户。为了减少您可能出现的经济损失，对已购车票暂时允许网上退票。谢谢。</span><br />"
                    } else {
                        if (notify_THREE && "Y" == notify_THREE) {
                            dhtmlx.alert({
                                title: "温馨提示",
                                ok: "确定",
                                text: "您的身份信息正在进行网上核验，您也可持居民身份证原件到车站售票窗口即时办理核验，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。",
                                type: "alert-error"
                            });
                            c += "<span style='color:red;'>您的身份信息正在进行网上核验，您也可持居民身份证原件到车站售票窗口即时办理核验，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。</span><br />"
                        } else {
                            if (notify_FOUR && "Y" == notify_FOUR) {
                                dhtmlx.alert({
                                    title: "温馨提示",
                                    ok: "确定",
                                    text: "本网站不再支持一代居民身份证，请更改为二代居民身份证。",
                                    type: "alert-error"
                                });
                                c += "<span style='color:red;'>本网站不再支持一代居民身份证，请更改为二代居民身份证。</span><br />"
                            } else {
                                if (notify_FIVE && "Y" == notify_FIVE) {
                                    dhtmlx.alert({
                                        title: "温馨提示",
                                        ok: "确定",
                                        text: "您的身份信息未经核验，需持在本网站填写的有效身份证件原件到车站售票窗口办理预核验，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。",
                                        type: "alert-error"
                                    });
                                    c += "<span style='color:red;'>您的身份信息未经核验，需持在本网站填写的有效身份证件原件到车站售票窗口办理预核验，详见<a target='_blank' href='" + ctx + "gonggao/saleTicketMeans.html?linktypeid=means5'>《铁路互联网购票身份核验须知》</a>。</span><br />"
                                } else {
                                    c += "如果您需要预订车票，请您点击<a id='link_for_ticket' href='#nogo'>车票预订</a>。"
                                }
                            }
                        }
                    }
                }
            }
            c += "</p>";
            c += '<span style="color: red;">如果您的密码在其他网站也使用，建议您修改本网站密码。</span>';
            b("#my12306page").html(c)
        }
        b("#link_for_changePassword").on("click", function() {
            otsRedirect("post", ctx + "userSecurity/loginPwd", {
                req_flag: "init"
            })
        }
        );
        b("#link_for_ticket").on("click", function() {
            otsRedirect("post", ctx + "leftTicket/init")
        }
        );
        b("#link_for_reSendEmail").on("click", function() {
            b.ajax({
                url: ctx + "index/reSendEmail",
                type: "post",
                success: function(d) {
                    if (d.data) {
                        dhtmlx.alert({
                            title: "验证邮箱",
                            ok: "确定",
                            text: "验证邮件已发送，请您登录邮箱<br>" + _email + "完成验证！",
                            type: "alert-error",
                            callback: function() {
                                otsRedirect("post", ctx + "modifyUser/initQueryUserInfo")
                            }
                        })
                    } else {
                        dhtmlx.alert({
                            title: "验证邮箱",
                            ok: "确定",
                            text: "验证邮件发送失败！",
                            type: "alert-error",
                            callback: function() {
                                otsRedirect("post", ctx + "modifyUser/initQueryUserInfo")
                            }
                        })
                    }
                },
                error: function() {}
            })
        }
        );
        b("#link_for_needKnow").on("click", function() {
            b.ajax({
                url: ctx + "index/checkIsOrNotMember",
                type: "post",
                success: function(d) {
                    if (d.data.flag) {
                        otsRedirect("post", ctx + "index/preAddMember")
                    } else {
                        dhtmlx.alert({
                            title: "积分兑换",
                            ok: "确定",
                            text: d.data.message,
                            type: "alert-error",
                            callback: function() {}
                        })
                    }
                },
                error: function() {
                    dhtmlx.alert({
                        title: "积分兑换",
                        ok: "确定",
                        text: "积分兑换失败！",
                        type: "alert-error",
                        callback: function() {}
                    })
                }
            })
        }
        );
        b("#link_for_infor").on("click", function() {
            otsRedirect("post", ctx + "modifyUser/initQueryUserInfo")
        }
        );
        b("#link_for_edit").on("click", function() {
            otsRedirect("post", ctx + "modifyUser/initQueryUserInfo")
        }
        );
        b.sidebar_init(-1);
        a()
    }
    );
    function a() {
        b("#create_statio_name").on("click", function() {
            if (!confirm("你确定要生成车站JS文件吗？原因是由于车站发生变化？请慎重！")) {
                return
            }
            b.ajax({
                url: ctx + "produceStationName/createStationNameForCookie",
                type: "post",
                success: function(c) {
                    var f = c.data;
                    if (f) {
                        var d = f.errorFlag;
                        if ("Y" == d) {
                            var e = f.errorInfo;
                            dhtmlx.alert({
                                title: "生成JS",
                                ok: "确定",
                                text: e,
                                type: "alert-error",
                                callback: function() {}
                            })
                        } else {
                            dhtmlx.alert({
                                title: "生成JS",
                                ok: "确定",
                                text: "生成JS成功，请确认！",
                                type: "alert-error",
                                callback: function() {}
                            })
                        }
                    } else {
                        dhtmlx.alert({
                            title: "生成JS",
                            ok: "确定",
                            text: "生成JS出错！",
                            type: "alert-error",
                            callback: function() {}
                        })
                    }
                },
                error: function() {}
            })
        }
        )
    }
}
)(jQuery);
