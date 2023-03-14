<template>
  <div class="serviceInfo">
    <!-- <img src='../../assets/image/404.jpg' /> -->
    <!-- <div class="login" id="loginContain" v-if="!loginFlag">
            <div class="circle" @click="handleIframe">
                证书登录
            </div>
        </div> -->
    <el-tabs v-model="activeName" v-if="loginFlag">
      <!-- <el-tab-pane label="全国气象部门对外服务信息总表" name="first">
                <SummaryTable :activeName="activeName" :userInfo="userInfo"></SummaryTable>
            </el-tab-pane> -->
      <el-tab-pane name="second">
        <span slot="label"
          ><b style="color: #333; font-weight: bold"
            >预报司关于开展气象数据对外共享服务情况调查表</b
          >
          | 服务情况详表</span
        >
        <Detail :activeName="activeName" :userInfo="userInfo"></Detail>
      </el-tab-pane>
      <!-- <el-tab-pane label="预报司关于开展气象数据对外共享服务情况调查表 | 服务情况详表">
                <Detail :activeName="activeName" :userInfo="userInfo"></Detail>
            </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
// import SummaryTable from './components/SummaryTable.vue'
import Detail from "./components/detail.vue";
import { login } from "@/api";
export default {
  name: "serviceInfo",
  components: {
    // SummaryTable,
    Detail
  },
  data () {
    return {
      activeName: "second",
      loginFlag: true,
      iframeDom: null,
      firstLogin: false, // 是否登录证书
      userInfo: {
        // 用户信息
        role: "",
        level: "",
        depart: "",
        userid: "",
        account: "",
        username: "",
        isFill: "",
        retcode: ""
      }
    };
  },
  created () {
    this.handleIframe();
  },
  mounted () {
    // this.handleIframe();
  },
  methods: {
    handleIframe () {
      if (this.iframeDom) {
        document.body.removeChild(this.iframeDom);
      }
      this.iframeDom = document.createElement("iframe");
      // this.iframeDom.setAttribute('src', "http://10.1.64.154/idata/web/user/caloginPage?returnURL=http://10.40.25.96:8888/MDRSC/data/caLogin2.svt")
      this.iframeDom.setAttribute(
        "src",
        "http://10.1.64.154/idata/web/user/caloginPage?returnURL=http://10.1.64.154/MDRSC/data/caLogin2.svt"
      );
      this.iframeDom.setAttribute("style", "display: none;");
      this.iframeDom.setAttribute("name", "caLogin");
      document.body.appendChild(this.iframeDom);
      const _this = this;
      let websocket = null;
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        // websocket = new WebSocket(`ws://10. 40.25.96:8888/MDRSC/webSocket`);
        websocket = new WebSocket(`ws://10.1.64.154/MDRSC/webSocket`);
      } else {
        alert("当前浏览器 Not support websocket");
      }
      // 连接发生错误的回调方法
      websocket.onerror = function () {
        setMessageInnerHTML("WebSocket连接发生错误");
      };
      // 连接成功建立的回调方法
      websocket.onopen = function () {
        _this.firstLogin = false;
        setMessageInnerHTML("WebSocket连接成功");
        if (!_this.firstLogin) {
          setTimeout(() => {
            websocket.onmessage();
          }, 3000);
        }
      };
      // 接收到消息的回调方法
      websocket.onmessage = function (event) {
        if (event) {
          _this.firstLogin = true;
          setTimeout(() => {
            const res = JSON.parse(event.data);
            if (res.retcode === "01") {
              _this.handleLogin();
              websocket.close();
            } else {
              alert("证书登录失败");
              window.location.href = "http://10.1.64.154/";
              websocket.close();
            }
          }, 200);
        } else if (!_this.firstLogin) {
          alert("证书登录失败");
          window.location.href = "http://10.1.64.154/";
        }
      };
      // 连接关闭的回调方法
      websocket.onclose = function () {
        setMessageInnerHTML("WebSocket连接关闭");
      };
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function () {
        closeWebSocket();
      };
      // 将消息显示在网页上
      function setMessageInnerHTML (innerHTML) {
        // console.log(innerHTML)
      }
      // 关闭WebSocket连接
      function closeWebSocket () {
        websocket.close();
      }
    },
    handleLogin () {
      login().then((res) => {
        if (res.data.retcode === "01") {
          this.loginFlag = true;
          this.userInfo = res.data;
          window.localStorage.setItem('depart', this.userInfo.depart);
        } else {
          alert("证书登录失败");
          window.location.href = "http://10.1.64.154/";
        }
      });
    }
  },
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  padding: 50px 0;
  background: linear-gradient(#5294ef, #91b0db);
  border-radius: 10px;
  box-sizing: border-box;
  .circle {
    width: 100%;
    height: 300px;
    line-height: 300px;
    background: url("../../assets/image/circle.png") no-repeat center;
    font-size: 26px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
