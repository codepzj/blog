function renderValue() {
  if (document.getElementById("location")) {
    $.ajax({
      type: "get",
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: {
        key: "L5MBZ-4RG6G-3TRQJ-QNHK3-FMVTH-K7BM6",
        output: "jsonp",
      },
      dataType: "jsonp",
      success: function (res) {
        let innerHTML = showWelcome(res);
        document.getElementById("location").innerHTML = innerHTML;
      },
    });
  }
}

// 获取地理位置
function getDistance(e1, n1, e2, n2) {
  const R = 6371;
  const { sin, cos, asin, PI, hypot } = Math;
  let getPoint = (e, n) => {
    e *= PI / 180;
    n *= PI / 180;
    return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) };
  };

  let a = getPoint(e1, n1);
  let b = getPoint(e2, n2);
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  let r = asin(c / 2) * 2 * R;
  return Math.round(r);
}

// 展示欢迎语
function showWelcome(ipLoacation) {
  if (ipLoacation.status == 382) {
    return `<b>&emsp;&emsp;欢迎来自远方的小伙伴，此刻您与站长相隔着整整一个地球的距离呢，或许是<span style="color:orange;font-size:20px">那神奇的网络通道</span>让精准的定位变得遥不可及。</b><div style="display:flex;justify-content:space-around;"><img alt=":attentionreverse:" src="https://image.codepzj.cn/image/202409102103148.png" style="width:40px;height:40px"> <img alt=":wave:" src="https://image.codepzj.cn/image/202409102104302.png" style="width:40px;height:40px"> <img alt=":rainbow:" src="https://image.codepzj.cn/image/202409102112093.png" style="width:40px;height:40px"> <img alt=":code:" src="https://image.codepzj.cn/image/202409102113907.png" style="width:40px;height:40px"> </div>`;
  }
  let dist = getDistance(
    113.358653,
    23.145102,
    ipLoacation.result.location.lng,
    ipLoacation.result.location.lat
  );
  let pos = ipLoacation.result.ad_info.nation;

  let posdesc;

  // 根据国家、省份、城市信息自定义欢迎语
  switch (ipLoacation.result.ad_info.nation) {
    case "日本":
      posdesc = "こんにちは、一緒に桜を見に行きましょう。";
      break;
    case "美国":
      posdesc = "Let’s live in peace!";
      break;
    case "英国":
      posdesc = "Let’s take a ride on the London Eye!";
      break;
    case "俄罗斯":
      posdesc = "Здравствуйте! Давайте выпьем водки!";
      break;
    case "法国":
      posdesc = "C'est la vie!";
      break;
    case "德国":
      posdesc = "Die Zeit fliegt.";
      break;
    case "澳大利亚":
      posdesc = "一起来大堡礁潜水吧!";
      break;
    case "加拿大":
      posdesc = "给你一片枫叶。";
      break;
    case "中国":
      pos =
        ipLoacation.result.ad_info.province +
        " " +
        ipLoacation.result.ad_info.city +
        " " +
        ipLoacation.result.ad_info.district;
      ip = ipLoacation.result.ip;
      switch (ipLoacation.result.ad_info.province) {
        case "北京市":
          posdesc = "北京欢迎您！";
          break;
        case "天津市":
          posdesc = "来一段相声怎么样？";
          break;
        case "河北省":
          posdesc = "长城脚下，风景如画。";
          break;
        case "山西省":
          posdesc = "展开坐具，领略山西风光。";
          break;
        case "内蒙古自治区":
          posdesc = "草原上，牛羊成群。";
          break;
        case "辽宁省":
          posdesc = "烤鸡架，真香！";
          break;
        case "吉林省":
          posdesc = "东北烧烤，状元阁最棒。";
          break;
        case "黑龙江省":
          posdesc = "哈尔滨大剧院，美轮美奂。";
          break;
        case "上海市":
          posdesc = "魔都的魅力，等你来发现。";
          break;
        case "江苏省":
          switch (ipLoacation.result.ad_info.city) {
            case "南京市":
              posdesc = "南京，我向往的城市。";
              break;
            case "苏州市":
              posdesc = "人间天堂，苏州欢迎您。";
              break;
            default:
              posdesc = "江苏，散装的魅力。";
              break;
          }
          break;
        case "浙江省":
          posdesc = "西子湖畔，春风拂面。";
          break;
        case "河南省":
          switch (ipLoacation.result.ad_info.city) {
            case "郑州市":
              posdesc = "中原腹地，历史悠长。";
              break;
            case "南阳市":
              posdesc = "卧龙之地，诸葛亮故里。";
              break;
            case "驻马店市":
              posdesc = "嵖岈山的花儿，美不胜收。";
              break;
            case "开封市":
              posdesc = "包公断案，公正无私。";
              break;
            case "洛阳市":
              posdesc = "洛阳牡丹，国色天香。";
              break;
            default:
              posdesc = "河南烩面，味道好极了。";
              break;
          }
          break;
        case "安徽省":
          posdesc = "蚌埠起飞，芜湖加油。";
          break;
        case "福建省":
          posdesc = "山间小城，宁静致远。";
          break;
        case "江西省":
          posdesc = "滕王阁下，秋水共长天一色。";
          break;
        case "山东省":
          posdesc = "齐鲁大地，历史悠久。";
          break;
        case "湖北省":
          posdesc = "一碗热干面，暖胃又暖心。";
          break;
        case "湖南省":
          posdesc = "湖南卫视，星光璀璨。";
          break;
        case "广东省":
          posdesc = "早茶文化，滋味十足。";
          break;
        case "广西壮族自治区":
          posdesc = "桂林山水，名不虚传。";
          break;
        case "海南省":
          posdesc = "阳光沙滩，椰风海韵。";
          break;
        case "四川省":
          posdesc = "四川妹子，火辣热情。";
          break;
        case "贵州省":
          posdesc = "茅台酒乡，醉美贵州。";
          break;
        case "云南省":
          posdesc = "云南十八怪，风情独特。";
          break;
        case "西藏自治区":
          posdesc = "雪域高原，心灵洗礼。";
          break;
        case "陕西省":
          posdesc = "陕西美食，回味无穷。";
          break;
        case "甘肃省":
          posdesc = "丝路重镇，历史文化。";
          break;
        case "青海省":
          posdesc = "牦牛酸奶，美味可口。";
          break;
        case "宁夏回族自治区":
          posdesc = "大漠风光，壮丽无比。";
          break;
        case "新疆维吾尔自治区":
          posdesc = "丝绸之路，驼铃声声。";
          break;
        case "台湾省":
          posdesc = "两岸一家亲。";
          break;
        case "香港特别行政区":
          posdesc = "东方之珠，璀璨夺目。";
          break;
        case "澳门特别行政区":
          posdesc = "赌城魅力，令人向往。";
          break;
        default:
          posdesc = "带你去你的城市看看！";
          break;
      }
      break;
    default:
      posdesc = "带你去你的国家看看！";
      break;
  }

  //根据本地时间切换欢迎语
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 5 && date.getHours() < 11)
    timeChange = "<span>上午好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 13)
    timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 13 && date.getHours() < 15)
    timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
  else if (date.getHours() >= 15 && date.getHours() < 16)
    timeChange = "<span>三点几啦</span>，一起饮茶呀！";
  else if (date.getHours() >= 16 && date.getHours() < 19)
    timeChange = "<span>夕阳无限好！</span>";
  else if (date.getHours() >= 19 && date.getHours() < 24)
    timeChange = "<span>晚上好</span>，夜生活嗨起来！";
  else timeChange = "夜深了，早点休息，少熬夜。";

  return `&emsp;&emsp;欢迎来自 <b><span style="font-size:20px">${pos}</span></b> 的小伙伴，${timeChange}您现在距离 <b><span style="font-size: 20px">站长</span></b> 约 <b><span style="font-size: 20px">${dist}</span></b> 公里，<b><span style="font-size:20px">${posdesc}</span></b><div style="display:flex;justify-content:space-around;"><img alt=":attentionreverse:" src="https://image.codepzj.cn/image/202409102103148.png" style="width:40px;height:40px"> <img alt=":wave:" src="https://image.codepzj.cn/image/202409102104302.png" style="width:40px;height:40px"> <img alt=":rainbow:" src="https://image.codepzj.cn/image/202409102112093.png" style="width:40px;height:40px"> <img alt=":code:" src="https://image.codepzj.cn/image/202409102113907.png" style="width:40px;height:40px"> </div>`;
}

window.onload = renderValue;
// 如果使用了pjax在加上下面这行代码
document.addEventListener("pjax:complete", showWelcome);
