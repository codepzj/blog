class Lantern {
  #startDate = "1-1";
  #endDate = "1-31";
  #dateCheck(a) {
    let b = a["split"]("-")[0x0],
      c = a["split"]("-")[0x1];
    if (b < 0x1 || b > 0xc)
      return (
        console["error"](
          "ERROR:\x20%s\x20is\x20a\x20problem!The\x20month\x20can\x20only\x20be\x20selected\x20from\x201~12!",
          b
        ),
        ![]
      );
    if (c < 0x1 || c > 0x1f)
      return (
        console["error"](
          "ERROR:\x20%s\x20is\x20a\x20problem!Dates\x20can\x20only\x20be\x20selected\x20from\x201~31!You\x20don\x27t\x20need\x20to\x20think\x20about\x20leap\x20years,\x20you\x20just\x20need\x20to\x20treat\x20it\x20as\x20if\x20every\x20month\x20is\x2031\x20days,\x20and\x20we\x27ll\x20do\x20the\x20rest!",
          c
        ),
        ![]
      );
    return !![];
  }
  #dateCorrect(a) {
    !("date" in a)
      ? (a["date"] = { from: this.#startDate, to: this.#endDate })
      : ((!("from" in a["date"]) || !this.#dateCheck(a["date"]["from"])) &&
          (a["date"]["from"] = this.#startDate),
        (!("to" in a["date"]) || !this.#dateCheck(a["date"]["to"])) &&
          (a["date"]["to"] = this.#endDate));
  }
  #CompareTime(a, b) {
    let c = a["split"]("-")[0x0],
      d = a["split"]("-")[0x1],
      e = b["split"]("-")[0x0],
      f = b["split"]("-")[0x1],
      g = new Date(),
      h = g["getMonth"]() + 0x1,
      i = g["getDate"]();
    if (c > e) {
      if (h > c || h < e) return !![];
      else {
        if (h == c) return i >= d ? !![] : ![];
        else return h == e ? (i <= f ? !![] : ![]) : ![];
      }
    } else {
      if (h > c && h < e) return !![];
      else {
        if (h == c && h != e) return i >= d ? !![] : ![];
        else {
          if (h == e && h != c) return i <= e ? !![] : ![];
          else return h == c && h == e ? (i >= d && i <= f ? !![] : ![]) : ![];
        }
      }
    }
  }
  #HTMLContent = {
    HTML() {
      return (
        "<div\x20class=\x22lantern-container\x22><div\x20class=\x22lantern-box0\x22><div\x20class=\x22lantern\x22><div\x20class=\x22lantern-handle\x22></div><div\x20class=\x22lantern-a\x22><div\x20class=\x22lantern-b\x22><div\x20class=\x22lantern-t\x22>" +
        this["Text"][0x0] +
        "</div></div></div><div\x20class=\x22lantern-spike\x20lantern-spike-a\x22><div\x20class=\x22lantern-spike-c\x22></div><div\x20class=\x22lantern-spike-b\x22></div></div></div></div><div\x20class=\x22lantern-box1\x22><div\x20class=\x22lantern\x22><div\x20class=\x22lantern-handle\x22></div><div\x20class=\x22lantern-a\x22><div\x20class=\x22lantern-b\x22><div\x20class=\x22lantern-t\x22>" +
        this["Text"][0x1] +
        "</div></div></div><div\x20class=\x22lantern-spike\x20lantern-spike-a\x22><div\x20class=\x22lantern-spike-c\x22></div><div\x20class=\x22lantern-spike-b\x22></div></div></div></div><div\x20class=\x22lantern-box2\x22><div\x20class=\x22lantern\x22><div\x20class=\x22lantern-handle\x22></div><div\x20class=\x22lantern-a\x22><div\x20class=\x22lantern-b\x22><div\x20class=\x22lantern-t\x22>" +
        this["Text"][0x2] +
        "</div></div></div><div\x20class=\x22lantern-spike\x20lantern-spike-a\x22><div\x20class=\x22lantern-spike-c\x22></div><div\x20class=\x22lantern-spike-b\x22></div></div></div></div><div\x20class=\x22lantern-box3\x22><div\x20class=\x22lantern\x22><div\x20class=\x22lantern-handle\x22></div><div\x20class=\x22lantern-a\x22><div\x20class=\x22lantern-b\x22><div\x20class=\x22lantern-t\x22>" +
        this["Text"][0x3] +
        "</div></div></div><div\x20class=\x22lantern-spike\x20lantern-spike-a\x22><div\x20class=\x22lantern-spike-c\x22></div><div\x20class=\x22lantern-spike-b\x22></div></div></div></div></div><style\x20type=\x22text/css\x22>@media\x20only\x20screen\x20and\x20(max-width:768px){.lantern-container{display:none}}.lantern-box2{position:fixed;top:" +
        this["lanternTop"][0x2] +
        "px;right:" +
        this["lanternRL"][0x2] +
        "px;z-index:" +
        this["zIndex"] +
        ";pointer-events:none}.lantern-box3{position:fixed;top:" +
        this["lanternTop"][0x3] +
        "px;right:" +
        this["lanternRL"][0x3] +
        "px;z-index:" +
        this["zIndex"] +
        ";pointer-events:none}.lantern-box1{position:fixed;top:" +
        this["lanternTop"][0x1] +
        "px;left:" +
        this["lanternRL"][0x1] +
        "px;z-index:" +
        this["zIndex"] +
        ";pointer-events:none}.lantern-box0{position:fixed;top:" +
        this["lanternTop"][0x0] +
        "px;left:" +
        this["lanternRL"][0x0] +
        "px;z-index:" +
        this["zIndex"] +
        ";pointer-events:none}.lantern-box3\x20.lantern,.lantern-box0\x20.lantern{-webkit-animation:swing\x205s\x20infinite\x20ease-in-out;box-shadow:-5px\x205px\x2030px\x204px#fc903d}.lantern{position:relative;width:120px;height:90px;margin:20px\x2050px\x2060px\x2050px;background:#d8000f;background:rgba(216,0,15,0.8);border-radius:50%50%;-webkit-transform-origin:50%-100px;-webkit-animation:swing\x203s\x20infinite\x20ease-in-out;box-shadow:-5px\x205px\x2050px\x204px#fa6c00}.lantern-a{width:100px;height:90px;background:#d8000f;background:rgba(216,0,15,0.1);margin:12px\x208px\x208px\x208px;border-radius:50%50%;border:2px\x20solid#dc8f03}.lantern-b{width:45px;height:90px;background:#d8000f;background:rgba(216,0,15,0.1);margin:-4px\x208px\x208px\x2026px;border-radius:50%50%;border:2px\x20solid#dc8f03}.lantern-handle{position:absolute;top:-20px;left:60px;width:2px;height:20px;background:#dc8f03}.lantern-spike-a{position:relative;width:5px;height:20px;margin:-5px\x200\x200\x2059px;-webkit-animation:swing\x204s\x20infinite\x20ease-in-out;-webkit-transform-origin:50%-45px;background:orange;border-radius:0\x200\x205px\x205px}.lantern-spike-b{position:absolute;top:14px;left:-2px;width:10px;height:10px;background:#dc8f03;border-radius:50%}.lantern-spike-c{position:absolute;top:18px;left:-2px;width:10px;height:35px;background:orange;border-radius:0\x200\x200\x205px}.lantern:before{position:absolute;top:-7px;left:29px;height:12px;width:60px;content:\x22\x20\x22;display:block;z-index:999;border-radius:5px\x205px\x200\x200;border:solid\x201px#dc8f03;background:orange;background:linear-gradient(to\x20right,#dc8f03,orange,#dc8f03,orange,#dc8f03)}.lantern:after{position:absolute;bottom:-7px;left:10px;height:12px;width:60px;content:\x22\x20\x22;display:block;margin-left:20px;border-radius:0\x200\x205px\x205px;border:solid\x201px#dc8f03;background:orange;background:linear-gradient(to\x20right,#dc8f03,orange,#dc8f03,orange,#dc8f03)}.lantern-t{font-family:黑体,Arial,Lucida\x20Grande,Tahoma,sans-serif;font-size:3.2rem;color:#dc8f03;font-weight:700;line-height:85px;text-align:center}@-moz-keyframes\x20swing{0%{-moz-transform:rotate(-10deg)}50%{-moz-transform:rotate(10deg)}100%{-moz-transform:rotate(-10deg)}}@-webkit-keyframes\x20swing{0%{-webkit-transform:rotate(-10deg)}50%{-webkit-transform:rotate(10deg)}100%{-webkit-transform:rotate(-10deg)}}*[no-select]{-webkit-user-select:\x20none;-moz-user-select:\x20none;-o-user-select:\x20none;user-select:\x20none;}</style>"
      );
    },
    Text: ["新", "年", "快", "乐"],
    zIndex: 0x270f,
    lanternRL: [0xa, 0x96, 0x96, 0xa],
    lanternTop: [0x0, 0x0, 0x0, 0x0],
  };
  #postionCorrect(a) {
    if ("postion" in a) {
      "zIndex" in a["postion"] &&
        (this.#HTMLContent["zIndex"] = a["postion"]["zIndex"]);
      if ("lanternRL" in a["postion"]) {
        let b = a["postion"]["lanternRL"];
        for (let c in b) {
          this.#HTMLContent["lanternRL"][c] = b[c];
        }
      }
      if ("lanternTop" in a["postion"]) {
        let d = a["postion"]["lanternTop"];
        if (typeof d == "number" || typeof d == "string")
          for (let e = 0x0; e < 0x4; e++) {
            this.#HTMLContent["lanternTop"][e] = d;
          }
        else
          for (let f in d) {
            this.#HTMLContent["lanternTop"][f] = d[f];
          }
      }
    }
  }
  #contentCorrect(a) {
    if ("content" in a) {
      let b = a["content"]["slice"](0x0, 0x4)["split"]("");
      for (let c in b) {
        this.#HTMLContent["Text"][c] = b[c];
      }
    }
  }
  constructor(a, b) {
    this.#dateCorrect(b), this.#postionCorrect(b), this.#contentCorrect(b);
    let c = document["getElementById"](a);
    this.#CompareTime(b["date"]["from"], b["date"]["to"])
      ? (c["innerHTML"] = this.#HTMLContent["HTML"]())
      : (c["innerHTML"] = "");
  }
}

let lantern = new Lantern("lantern-wrapper", {
  date: {
    from: "1-28",
    to: "2-5",
  },
  postion: {
    zIndex: "1",
    lanternTop: [10, 150, 150, 10],
    lanternRL: [0, 0, 0, 0],
  },
  content: "新年快乐",
});