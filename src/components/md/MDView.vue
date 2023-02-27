<template>
  <div class="mdRoot">
    <div class="mdContent">
      <div class="mdLeft">
        <div class="articleTitle">
          <h1>{{ article.title }}</h1>
        </div>
        <MdViewer class="show" :content="article.content"></MdViewer>
        <comment-view
          class="articleComment"
          :articleId="id"
          v-if="load"
        ></comment-view>
      </div>
      <div class="mdRight">
        <div
          :class="{
            rightContent: true,
            visible: !isVisible,
            noVisible: isVisible,
          }"
        >
          <div class="infoContent">
            <div class="info" v-if="infoLoad">
              <div class="infoHeader">
                <img
                  class="isClick"
                  :src="info.headPortrait"
                  @click="goItem(info.id)"
                />
                <div>
                  <div>{{ info.nickname }}</div>
                </div>
              </div>
              <div class="tag">
                <span class="item" @click="activeName = 'article'"
                  >文章：{{ info.articleNumber }}</span
                >
                <el-divider id="divider" border-style="dashed" />
                <span class="item" @click="activeName = 'follow'"
                  >关注：{{ info.followNumber }}</span
                >
                <el-divider id="divider" border-style="dashed" />
                <span class="item" @click="activeName = 'fans'"
                  >粉丝：{{ info.fansNumber }}</span
                >
                <el-divider id="divider" border-style="dashed" />
                <span>总访问：{{ info.pageViewNumber }}</span>
                <el-divider id="divider" border-style="dashed" />
                <el-divider id="divider" border-style="dashed" />
                <span>访问量：{{ article.pageView }}</span>
              </div>
            </div>
          </div>
          <div class="operation">
            <table style="width: 100%">
              <tr style="text-align: right">
                <td></td>
                <td></td>
                <td>
                  <el-tooltip placement="top-start" content="关注">
                    <el-button @click="submitFollow">
                      <el-icon size="20px"><Plus /></el-icon>
                    </el-button>
                  </el-tooltip>
                </td>
                <td>
                  <el-popover
                    placement="bottom"
                    width="320px"
                    trigger="hover"
                    content=""
                  >
                    <template #reference>
                      <el-button @click="submitTransfer">
                        <el-icon size="20px"><Switch /></el-icon>
                      </el-button>
                    </template>
                    <table style="width: 100%">
                      <tr>
                        <td>
                          <el-input
                            v-model="this.$store.state.config.transfer.link"
                          >
                            <template #prepend>链接</template></el-input
                          >
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <el-input
                            v-model="this.$store.state.config.transfer.code"
                            ><template #prepend>授权</template></el-input
                          >
                        </td>
                      </tr>
                    </table>
                  </el-popover>
                </td>
                <td>
                  <el-tooltip placement="top-start" content="收藏">
                    <el-button @click="submitFavorite">
                      <el-icon size="20px"><Star /></el-icon>
                    </el-button>
                  </el-tooltip>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
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
      article: {},
      load: false,
      browseTiem: 0,
      clearTimeSet: null,
      ip: "",
      isVisible: true,
      info: {},
      infoLoad: false,
    };
  },

  created() {
    this.$store.watch(
      (state, getters) => {
        return state.config.isVisible;
      },
      () => {
        this.isVisible = this.$store.state.config.isVisible;
      }
    );
  },
  beforeMount() {
    this.getUserIP((ip) => {
      console.log(ip);
      this.ip = ip;
    });
    this.$axios
      .get("/article/" + this.id, {})
      .then((res) => {
        //请求成功
        this.article = res.data;
        this.load = true;
        this.loadInfo();
      })
      .catch((err) => {
        console.log("test get err" + JSON.stringify(err));
      });
  },

  mounted() {
    this.setTime(); // 页面加载完成后开始计时
  },
  beforeUnmount() {
    clearInterval(this.clearTimeSet); // 离开页面后清除定时器
    this.addBrowseRecord(); // 上送后台接口，将浏览时长等信息传到后台，离开当前路由后调用
  },
  methods: {
    submitTransfer() {
      if (
        this.$store.state.config.transfer.link != "" &&
        this.$store.state.config.transfer.code != ""
      ) {
        this.$axios
          .post("/transmission/push", {
            authorizationCode: this.$store.state.config.transfer.code,
            link: this.$store.state.config.transfer.link,
            resourceId: this.article.id,
          })
          .then((res) => {
            this.$notify({
              message: res.message,
              duration: 1000,
            });
          });
      } else {
        this.$notify({
          message: "请确认链接和授权！",
          duration: 1000,
        });
      }
    },
    submitFavorite() {
      if (this.$store.state.config.login) {
        this.$axios
          .post("/article/setFavorite", {
            articleId: this.article.id,
          })
          .then((res) => {
            this.$notify({
              message: res.message,
              duration: 1200,
            });
          });
      }
    },
    submitFollow() {
      if (this.$store.state.config.login) {
        this.$axios
          .post("/user/follow", {
            bUserId: this.article.userId,
          })
          .then((res) => {
            this.$notify({
              message: res.message,
              duration: 1200,
            });
          });
      }
    },
    goItem(id) {
      let routeData = this.$router.resolve({
        name: "user",
        params: {
          id: id,
        },
      });
      window.open(routeData.href, "_blank");
    },
    loadInfo() {
      var id_;
      if (this.article.userId == "null") {
        id_ = localStorage.getItem("id");
      } else {
        id_ = this.article.userId;
      }
      this.$axios
        .post("/user/info", {
          id: id_,
        })
        .then((res) => {
          this.info = res.data;
          this.info.headPortrait =
            this.$axios.serverAddress + "/file/image/" + res.data.headPortrait;
          this.infoLoad = true;
        });
    },
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
.mdRoot {
	margin: 0;
	padding: 0;
	width: 100%;
}

.articleTitle {
	margin-bottom: 12px;
	border-bottom: solid 4px rgba(0, 0, 0, .273);
	padding: 20px 20px 10px 40px;
}

.mdContent {
	display: flex;

	padding: 10px 1% 20px 1%;
	width: 94%;

/* background-color: black; */

	transform: translate3d(2.08%, 0, 0);
}

.mdLeft {
	-webkit-border-radius: 0 20px 0 0;
	   -moz-border-radius: 0 20px 0 0;
	        border-radius: 0 20px 0 0;
	width: calc(100% - 260px);
	min-width: 640px;

	/* background-color: white; */
}

.mdRight {
	display: block;

	margin-left: 12px;
	width: 260px;
}

.rightContent {
	position:         sticky;
	position: -webkit-sticky;

	transition: all .4s;
}

.mdRight .infoContent {
	margin-top: 16px;
	padding-bottom: 12px;

	background-color: white;

	box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px;
}

.noVisible {
	top: 84px;
}

.visible {
	top: 20px;
}

.info .tag {
	margin: 10px 8px 0 8px;

	font-size: 14px;
}

.info >>> img {
	margin: -14px 0 0 0;
	border-radius: 50%;
	width: 66px;
	height: 66px;

	box-shadow: rgba(0, 0, 0, .8) 0 0 2px 4px,
	rgba(255, 255, 255, .8) 0 0 1px 6px;

	transform: translate3d(146%, 0, 0);
}

.infoHeader {
	/* display: flex; */
	margin-bottom: 4px;
}

.infoHeader img {
	/* float: left; */
}

.infoHeader div {
	overflow: hidden;

	margin: 6px 2px 0 8px;
	height: 60px;

	font-size: 20px;
	white-space: prare-wp;

/* text-overflow: ellipsis; */
	word-wrap: break-word;
}

.operation {
	margin: 24px 0 0 0;
}

.operation >>> td {
	width: 40px;
}

#divider {
	margin: 6px 0;
	width: 100%;
}

#aDivider {
	margin: 6px 0 20px 0;
}

.show {
	padding: 20px 0 10px 0;

	box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px;
	/* background-color: white;

	box-shadow: 0 0 5.7px rgba(0, 0, 0, -.273), 0 0 5.1px rgba(0, 0, 0, .056),
	0 0 6px rgba(0, 0, 0, 1); */
}

.articleComment {
	padding: 10px 10px;

	background-color: white;

	box-shadow: rgba(0, 0, 0, .25) 0 14px 28px, rgba(0, 0, 0, .22) 0 10px 10px;
}

.isClick {
	cursor: pointer;
}

</style>