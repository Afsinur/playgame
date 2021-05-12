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
      receiveActivated: false,
      run_Condition_Value: null,
      run_Condition_permission: null,
      winnerAnounce: false,
      golActive: null,
      runFunctionActive: true,
      run_Condition_permission_hide: false,
    };
  },

  methods: {
    commonWinnerActivation(e) {
      this.runFunctionActive = false;
      this.winnerAnounce = true;
      this.run_Condition_permission_hide = true;

      if (e == 1) {
        this.golActive = true;
      } else {
        this.golActive = false;
      }
    },

    commonGolNotgol(gol, notgol) {
      //gol
      var mil_1 = gol.includes("1");
      var mil_2 = gol.includes("2");
      var mil_3 = gol.includes("3");
      var mil_4 = gol.includes("4");
      var mil_5 = gol.includes("5");
      var mil_6 = gol.includes("6");
      var mil_7 = gol.includes("7");
      var mil_8 = gol.includes("8");
      var mil_9 = gol.includes("9");

      //notgol
      var mil_1not = notgol.includes("1");
      var mil_2not = notgol.includes("2");
      var mil_3not = notgol.includes("3");
      var mil_4not = notgol.includes("4");
      var mil_5not = notgol.includes("5");
      var mil_6not = notgol.includes("6");
      var mil_7not = notgol.includes("7");
      var mil_8not = notgol.includes("8");
      var mil_9not = notgol.includes("9");

      //gol conditions
      if (mil_1 && mil_2 && mil_3) {
        this.commonWinnerActivation(1);
      }
      if (mil_4 && mil_5 && mil_6) {
        this.commonWinnerActivation(1);
      }
      if (mil_7 && mil_8 && mil_9) {
        this.commonWinnerActivation(1);
      }
      if (mil_3 && mil_6 && mil_9) {
        this.commonWinnerActivation(1);
      }
      if (mil_2 && mil_5 && mil_8) {
        this.commonWinnerActivation(1);
      }
      if (mil_1 && mil_4 && mil_7) {
        this.commonWinnerActivation(1);
      }
      if (mil_1 && mil_5 && mil_9) {
        this.commonWinnerActivation(1);
      }
      if (mil_3 && mil_5 && mil_7) {
        this.commonWinnerActivation(1);
      }

      //notgol conditions
      if (mil_1not && mil_2not && mil_3not) {
        this.commonWinnerActivation(0);
      }
      if (mil_4not && mil_5not && mil_6not) {
        this.commonWinnerActivation(0);
      }
      if (mil_7not && mil_8not && mil_9not) {
        this.commonWinnerActivation(0);
      }
      if (mil_3not && mil_6not && mil_9not) {
        this.commonWinnerActivation(0);
      }
      if (mil_2not && mil_5not && mil_8not) {
        this.commonWinnerActivation(0);
      }
      if (mil_1not && mil_4not && mil_7not) {
        this.commonWinnerActivation(0);
      }
      if (mil_1not && mil_5not && mil_9not) {
        this.commonWinnerActivation(0);
      }
      if (mil_3not && mil_5not && mil_7not) {
        this.commonWinnerActivation(0);
      }
    },

    winnerCheck(e, e1) {
      var pNode1, pNode_id1;
      var gol = [];
      var notgol = [];

      if (e1 != 0) {
        e.forEach((e) => {
          pNode1 = e.parentNode;
          pNode_id1 = pNode1.id;
          var countEnterGolORnotGol = 0;

          //pNode1.children.length
          for (let index = 0; index < pNode1.children.length; index++) {
            const element = pNode1.children[index];

            if (element.attributes.style) {
              if (element.attributes.style.value == "display: block;") {
                if (element.id == "insideDiv2") {
                  //pNode_id1
                  gol.push(e.innerHTML);
                } else {
                  //pNode_id1
                  if (countEnterGolORnotGol < 1) {
                    countEnterGolORnotGol++;

                    notgol.push(e.innerHTML);
                  }
                }
              }
            }
          }
        });

        this.commonGolNotgol(gol, notgol);
      } else {
        var VAL_containerDiv1 = document.querySelectorAll(
          ".value_container #IDdiv"
        );

        VAL_containerDiv1.forEach((e) => {
          pNode1 = e.parentNode;
          pNode_id1 = pNode1.id;
          var countEnterGolORnotGol = 0;

          //pNode1.children.length
          for (let index = 0; index < pNode1.children.length; index++) {
            const element = pNode1.children[index];

            if (element.attributes.style) {
              if (element.attributes.style.value == "display: block;") {
                if (element.id == "insideDiv2") {
                  //pNode_id1
                  gol.push(e.innerHTML);
                } else {
                  //pNode_id1
                  if (countEnterGolORnotGol < 1) {
                    countEnterGolORnotGol++;

                    notgol.push(e.innerHTML);
                  }
                }
              }
            }
          }
        });

        this.commonGolNotgol(gol, notgol);
      }
    },

    common_run(e, e1, e2, e3, e4, e5) {
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

        if (this.run_Condition_permission == true) {
          this.winnerCheck(e5, null);
        } else {
          this.winnerCheck(null, 0);
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

        if (this.run_Condition_permission == true) {
          this.winnerCheck(e5, null);
        } else {
          this.winnerCheck(null, 0);
        }
      }
    },

    run(e1) {
      if (this.runFunctionActive == true) {
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
                  this.common_run(
                    condition1,
                    pNode,
                    pNode_id,
                    e1,
                    1,
                    VAL_containerDiv
                  );
                  this.run_Condition_permission = false;
                }
              }
            } else {
              if (this.run_Condition_permission == true) {
                if (
                  pNode.children[0].style.display == "none" &&
                  pNode.children[1].style.display == "none"
                ) {
                  this.common_run(
                    condition1,
                    pNode,
                    pNode_id,
                    e1,
                    0,
                    VAL_containerDiv
                  );
                  this.run_Condition_permission = false;
                }
              }
            }
          }
        });
      }
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
