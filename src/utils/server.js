//公共路径
// let portUrl = "http://www.mangoya.cn/port/";
let portUrl = "http://" + window.location.host + "/port/";


//实验室 列表项目
const navMenList = (callback) => {
  if (localStorage.getItem('navMenList')) {
    let data = JSON.parse(localStorage.getItem('navMenList'));
    callback && callback(data)
  } else {
    let url = portUrl + 'nav/navMenList';
    axios.get(url).then(num => {
      // console.log(num);
      if (num.data.code === 1001) {
        localStorage.setItem('navMenList', JSON.stringify(num.data.data));
        callback && callback(num.data.data)
      } else {
        alert("查询失败")
      }
    })
  }
};

//查询文章列表
const ShowArticleAll = (artId, cateId, articleName, level, callback) => {
  let url;
  if (level === 1) {
     url = portUrl + 'nav/ActiveClassAllData?art_id=' + artId + '&cate_id=' + cateId + '&article_name=' + articleName;
  } else {
     url = portUrl + 'article/ShowArticleAll?art_id=' + artId + '&cate_id=' + cateId + '&article_name=' + articleName;
  }
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
};



//查询友情链接数据
const FriendUrlData = (callback) => {
  let url = portUrl + 'outh/FriendUrlData';
  axios.get(url).then(num => {
    if (num.data.code === 1001) {
      callback && callback(num.data.data);
    } else if (num.data.code === 1005) {

    } else {
      alert("查询失败");
    }
  })
};

//查询关于我
const AboutMeData = (callback) => {
  if (localStorage.getItem('AboutMeData')) {
    let data = JSON.parse(localStorage.getItem('AboutMeData'));
    callback && callback(data)
  } else {
    let url = portUrl + 'outh/AboutMeData';
    axios.get(url).then(num => {
      if (num.data.code === 1001) {
        localStorage.setItem('AboutMeData', JSON.stringify(num.data.data));
        callback && callback(num.data.data);
      } else if (num.data.code === 1005) {

      } else {
        alert("查询失败");
      }
    })
  }
};


//查询赞赏数据
const AdmireData = (callback) => {
  let url = portUrl + 'outh/AdmireData';
  axios.get(url).then(num => {
    if (num.data.code === 1001) {
      callback && callback(num.data);
    } else {
      alert("查询失败");
    }
  })
};


//查询用户信息
const getUserInfo = (userId, callback) => {
  let url = portUrl + 'Userinfo/getUserInfo?user_id=' + userId;
  axios.get(url).then(num => {
    if (num.data.code === 1001) {
      callback && callback(num.data);
    } else {
      alert("查询失败");
    }
  })
};
//修改用户信息
const UserInfoSave = (obj, callback) => {
  let url = portUrl + 'Userinfo/UserInfoSave';
  let data = {
    'username': obj.username,
    'user_img': obj.avatar,
    'email': obj.email,
    'sex': obj.sex,
    'friend_start': obj.state,
    'user_id': obj.user_id,
    'frie_name': obj.name,
    'frie_url': obj.url,
    'frie_description': obj.description,
    'friend_img': obj.image,
    'label': obj.label,
    'head_start': obj.head_start,
    'logo_start': obj.logo_start
  };
  // console.log(data);
  axios.get(url, {params: data}).then(num => {
    if (num.data.code === 1001) {
      callback && callback(num.data.msg);
    } else {
      alert("保存失败");
    }
  })
};

//初始化时间
const initDate = (oldDate, full) => {
  let odate = new Date(oldDate);
  let year = odate.getFullYear();
  let month = odate.getMonth() < 9 ? '0' + (odate.getMonth() + 1) : odate.getMonth() + 1;
  let date = odate.getDate() < 10 ? '0' + odate.getDate() : odate.getDate();
  if (full === 'all') {
    let t = oldDate.split(" ")[0];
    // console.log(oldDate,t.split('-')[0],t.split('-')[1],t.split('-')[2]);
    return t.split('-')[0] + '年' + t.split('-')[1] + '月' + t.split('-')[2] + '日';
  } else if (full === 'year') {
    return year
  } else if (full === 'month') {
    return odate.getMonth() + 1
  } else if (full === 'date') {
    return date
  } else if (full === 'newDate') {
    return year + '年' + month + '月' + date + '日';
  }
};

export {
  navMenList,//导航信息
  ShowArticleAll,//查询文章列表
  FriendUrlData,//友情链接数据
  AboutMeData,//关于我文章编写
  AdmireData,//赞赏数据
  getUserInfo,//用户信息查询
  UserInfoSave,//修改用户信息
  initDate,//设置时间
}
