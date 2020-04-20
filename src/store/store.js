'use strict'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function dealTreeNode(treeNode){
  let treeBread = [];
  let sunBread =treeNode;
  for(let i = 0 ;i<=treeNode.level;i++){
    sunBread.checkable = true;
    if(i===0){
      sunBread.checkable = false;
    }
    treeBread.unshift(sunBread);
    sunBread = sunBread.getParentNode();
  }
return treeBread
}

export default new Vuex.Store({
  state:{
    treeNode:'',
    treeBread:[],
    company: '', //当前状态水司是否是本集团
    hostIP:'',
    companyInfo:{},//当前选中水司信息
    user:"",
    uid:""
  },
  mutations:{
    setTreeNode(state,treeNode){
      state.treeNode = treeNode
    },
    setTreeBread(state,treeBread){
      state.treeBread = treeBread
      // console.log(state.treeBread)
    },
    setCompany(state,company){
    	state.company = company
    },
    setHostIP(state,hostIP){
    	let n = window.location.host.search(':')
	    let str = window.location.host + ""
	    let host = str.slice(0, n)
	    if (host === '127.0.0.1')
	      host = 'localhost'
    	state.hostIP = host
    }
  },
  actions:{
    commitSetTreeNode({commit},treeNode){
      commit('setTreeBread',dealTreeNode(treeNode));
      commit('setTreeNode',treeNode)
    },
    commitHostIP({commit},hostIP){
      commit('setHostIP',hostIP)
    }
  }
})
