<template>
  <div class="root">
    <div class="content">
      <MdViewer class="show" :content="content"></MdViewer>
      <comment-view :articleId="id" v-if="load"></comment-view>
    </div>
  </div>
</template>

<script>
import MdViewer from "@/components/MdViewer";
import CommentView from "@/components/comment/CommentView";

export default {
  name: "MdView",

  components: {
    MdViewer,
    CommentView,
  },

  props: ["id"],

  data() {
    return {
      content: "x",
      load: false,
      browseTiem: 0,
      clearTimeSet: null,
      ip: "",
    };
  },

  mounted() {
    this.getUserIP((ip) => {
      console.log(ip);
      this.ip = ip;
    });
    this.$axios
      .get("/article/" + this.id, {})
      .then((res) => {
        //请求成功
        this.content = res.data.content;
        this.load = true;
      })
      .catch((err) => {
        console.log("test get err" + JSON.stringify(err));
      });
    this.setTime(); // 页面加载完成后开始计时
  },
  beforeUnmount() {
    clearInterval(this.clearTimeSet); // 离开页面后清除定时器
    this.addBrowseRecord(); // 上送后台接口，将浏览时长等信息传到后台，离开当前路由后调用
  },
  methods: {
    setTime() {
      this.clearTimeSet = setInterval(() => {
        this.browseTiem++;
      }, 1000);
    },
    addBrowseRecord() {
      console.log("test id:" + this.id);
      this.$axios.post("/article/addScore", {
        id: this.id,
        mode: "article",
        time: this.browseTiem,
      });
    },
    getUserIP(onNewIP) {
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;

      let pc = new MyPeerConnection({
        iceServers: [],
      });

      let noop = () => {};

      let localIPs = {};

      let ipRegex =
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

      let iterateIP = (ip) => {
        if (!localIPs[ip]) onNewIP(ip);

        localIPs[ip] = true;
      };

      pc.createDataChannel("");

      pc.createOffer()
        .then((sdp) => {
          sdp.sdp.split("\n").forEach(function (line) {
            if (line.indexOf("candidate") < 0) return;

            line.match(ipRegex).forEach(iterateIP);
          });

          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch((reason) => {});

      pc.onicecandidate = (ice) => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;

        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    },
  },
  //   getUserIP() {
  //     var RTCPeerConnection =
  //       window.RTCPeerConnection ||
  //       window.webkitRTCPeerConnection ||
  //       window.mozRTCPeerConnection;
  //     if (RTCPeerConnection)
  //       (() => {
  //         var rtc = new RTCPeerConnection();
  //         rtc.createDataChannel(""); //创建一个可以发送任意数据的数据通道
  //         rtc.createOffer(
  //           (offerDesc) => {
  //             //创建并存储一个sdp数据
  //             rtc.setLocalDescription(offerDesc);
  //           },
  //           (e) => {
  //             console.log(e);
  //           }
  //         );
  //         rtc.onicecandidate = (evt) => {
  //           //监听candidate事件
  //           if (evt.candidate) {
  //             var ip_addr = evt.candidate.address;
  //             localStorage.setItem("ip_addr", ip_addr);
  //           }
  //         };
  //       })();
  //     else {
  //       console.log("目前仅测试了chrome浏览器OK");
  //     }
  //   },
  // },
};
</script>

<style scoped>
.root {
	width: 100%;

	background-color: ivory;
}

.content {
	padding: 10px 4% 20px 4%;
	width: 64%;

	background-color: ivory;

	transform: translate3d(19.44%, 0, 0);
}

.show {
	padding-top: 20px;

	background-color: white;

	box-shadow: 0 0 5.7px rgba(0, 0, 0, -.273), 0 0 5.1px rgba(0, 0, 0, .056),
	0 0 6px rgba(0, 0, 0, 1);
}

</style>