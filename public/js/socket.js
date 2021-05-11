//connection
var socket = io.connect(`/`);

//DOM

//handlers
//socket.emit("function name", data);

//listen for socket
//socket.on("function name", (data)=>{});
const app = {
  data() {
    return {
      connector: null,
      goConditions: null,
      gameStarterID: null,
      afterConnected: false,
      activeID: 0,
      recentPlayers: [],
      receiveActivated: false,
      run_Condition_Value: null,
      run_Condition_permission: null,
    };
  },

  methods: {
    common_run(e, e1, e2, e3, e4) {
      if (e != 0) {
        e1.children[0].style.display = "block";
        e1.children[1].style.display = "block";

        e1.children[0].classList.add("animate__backInRight");
        e1.children[0].addEventListener("animationend", () => {
          e1.children[0].classList.remove("animate__backInRight");
        });

        e1.children[1].classList.add("animate__backInRight");
        e1.children[1].addEventListener("animationend", () => {
          e1.children[1].classList.remove("animate__backInRight");
        });

        if (e4 == 1) {
          var pNode_id = e2;
          var condition1 = e;
          var permit = true;
          var obj_game_info = {
            condition1,
            pNode_id,
            e3,
            permit,
          };

          socket.emit("obj_game_info", obj_game_info);
        }
      } else {
        e1.children[2].style.display = "block";

        e1.children[2].classList.add("animate__heartBeat");
        e1.children[2].addEventListener("animationend", () => {
          e1.children[2].classList.remove("animate__heartBeat");
        });

        if (e4 == 0) {
          var pNode_id = e2;
          var condition1 = e;
          var permit = true;
          var obj_game_info1 = {
            condition1,
            pNode_id,
            e3,
            permit,
          };

          socket.emit("obj_game_info1", obj_game_info1);
        }
      }
    },

    run(e1) {
      var VAL_containerDiv = document.querySelectorAll(
        ".value_container #IDdiv"
      );
      var condition1 = this.run_Condition_Value;
      VAL_containerDiv.forEach((e) => {
        var pNode = e.parentNode;
        var pNode_id = pNode.id;
        if (pNode.id.includes(e1.toString())) {
          if (condition1 == 1) {
            if (this.run_Condition_permission == true) {
              if (pNode.children[2].style.display == "none") {
                this.common_run(condition1, pNode, pNode_id, e1, 1);
                this.run_Condition_permission = false;
              }
            }
          } else {
            if (this.run_Condition_permission == true) {
              if (
                pNode.children[0].style.display == "none" &&
                pNode.children[1].style.display == "none"
              ) {
                this.common_run(condition1, pNode, pNode_id, e1, 0);
                this.run_Condition_permission = false;
              }
            }
          }
        }
      });
    },

    connectGame(e) {
      this.goConditions = 0;
      if (e == 1) {
        this.connector = 0;
      } else {
        this.connector = 1;
      }
    },

    prepareConnect() {
      this.receiveActivated = true;
      var gameID = document.getElementById("gameID");
      this.gameStarterID = gameID.value;

      if (gameID.value != "") {
        //socket.emit("function name", data);
        var objConnect = {
          connectorID: gameID.value,
        };
        socket.emit("startGame", objConnect);
      }

      if (this.receiveActivated == true) {
        //second check
        var countCheck = 0;
        socket.on("startGameAgain", (data) => {
          countCheck++;
          if (countCheck < 2) {
            if (data > 0) {
              alert("room full..");
              location.reload();
            } else {
              //both connected!
              socket.emit("both_connected", objConnect);
            }
          }
        });
      }
    },

    play_game(e, e1) {
      this.run_Condition_Value = e;
      this.run_Condition_permission = e1;
    },
  },

  mounted() {
    //listening..
    socket.on("startGame", ({ connectorID }) => {
      if (userID == connectorID) {
        var growingID = this.activeID++;
        socket.emit("startGameAgain", growingID);
      }
    });

    //after both_connected
    socket.on("both_connected", ({ connectorID }) => {
      if (connectorID == userID || connectorID == this.gameStarterID) {
        this.afterConnected = true;

        if (connectorID == userID) {
          this.play_game(1, true);
        } else {
          this.play_game(0, false);
        }
      }
    });

    socket.on("obj_game_info", ({ condition1, pNode_id, e3, permit }) => {
      var ID_country = document.querySelector(`#${pNode_id}`);
      this.common_run(condition1, ID_country, pNode_id, e3, null);
      this.run_Condition_permission = permit;
    });

    socket.on("obj_game_info1", ({ condition1, pNode_id, e3, permit }) => {
      var ID_country = document.querySelector(`#${pNode_id}`);
      this.common_run(condition1, ID_country, pNode_id, e3, null);
      this.run_Condition_permission = permit;
    });
  },
};

Vue.createApp(app).mount("#app");
