 <template>
  <div class="root">
    <div class="row">
      <h3>ルイーダの酒場</h3>
    </div>
    <div class="form" :class="{ 'form-mail': sex === 'male','form-femail': sex === 'female' }">
      <div class="row">
        <h3>{{formTitle}}</h3>
      </div>
      <div class="row">
        <div class="item small-item">
          <label>なまえ</label>
        </div>
        <div class="item" >
          <input type="text" v-model="name" maxlength="4" class="form-control" :readonly="!isAddMode">
        </div>
        <div class="item small-item">
          <label>しょくぎょう</label>
        </div>
        <div class="item" >
          <select v-model="job" class="form-control" v-if="isAddMode">
            <option value="せんし">せんし</option>
            <option value="ぶとうか">ぶとうか</option>
            <option value="まほうつかい">まほうつかい</option>
            <option value="そうりょ">そうりょ</option>
            <option value="とうぞく">とうぞく</option>
            <option value="しょうにん">しょうにん</option>
            <option value="あそびにん">あそびにん</option>
          </select>
          <input type="text" v-model="job" class="form-control" :readonly="!isAddMode" v-if="!isAddMode">
        </div>
      </div>
      <div class="row">
        <div class="item small-item">
          <label>せいべつ</label>
        </div>
        <div class="item small-item">
          <input type="radio" id="male" value="male" v-model="sex">
          <label for="male">おとこ</label>
        </div>
        <div class="item small-item">
          <input type="radio" id="female" value="female" v-model="sex">
          <label for="female">おんな</label>
        </div>
        <div class="item small-item" v-if="!isAddMode">
          <label>せいかく</label>
        </div>
        <div class="item" v-if="!isAddMode">
          <input type="text" v-model="personality" maxlength="4" class="form-control" readonly="readonly">
        </div>
      </div>
      <div class="row" v-if="!isAddMode">
        <div class="table">
          <div class="table-row table-header-row">
            <div class="table-cell table-header-cell">ちから</div>
            <div class="table-cell table-header-cell">すばやさ</div>
            <div class="table-cell table-header-cell">たいりょく</div>
            <div class="table-cell table-header-cell">かしこさ</div>
            <div class="table-cell table-header-cell">うんのよさ</div>
            <div class="table-cell table-header-cell">さいだいHP</div>
            <div class="table-cell table-header-cell">さいだいMP</div>
          </div>
          <div class="table-row" >
            <div class="table-cell">{{atack}}</div>
            <div class="table-cell">{{agility}}</div>
            <div class="table-cell">{{physical}}</div>
            <div class="table-cell">{{intelligence}}</div>
            <div class="table-cell">{{luck}}</div>
            <div class="table-cell">{{maxHp}}</div>
            <div class="table-cell">{{maxMp}}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="item"/>
        <div class="item"/>
        <div class="item"/>
        <div class="item small-item"/>
        <div class="item small-item">
          <button class="btn" v-bind:disabled="!isValid" v-on:click="submit">{{buttonText}}</button>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="row">
        <h3>めいぼ</h3>
      </div>
      <div class="row">
        <div class="item small-item">
          <button class="btn" v-on:click="changeAddMode" v-bind:disabled="isAddMode">なかまをくわえる</button>
        </div>
      </div>
      <div class="row">
        <div class="table">
          <div class="table-row table-header-row">
            <div class="table-cell table-header-cell">なまえ</div>
            <div class="table-cell table-header-cell">しょくぎょう</div>
            <div class="table-cell table-header-cell">せいべつ</div>
            <div class="table-cell table-header-cell">せいかく</div>
          </div>
          <div 
            class="table-row" 
            v-for="friend in sortedFriends" 
            :key="friend.id" 
            :class="{ 'table-row-mail': friend.sex === 'male','table-row-femail': friend.sex === 'female','table-row-selected': selectedId === friend.id }"
            v-on:click="selectRow(friend)"
          >
            <div class="table-cell">{{friend.name}}</div>
            <div class="table-cell">{{friend.job}}</div>
            <div class="table-cell">{{friend.sex}}</div>
            <div class="table-cell">{{friend.personality}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Friend{
  id:number;
  name:string;
  job:string;
  sex:string;
  atack:number;
  agility:number;
  physical :number;
  intelligence :number;
  luck :number;
  maxHp :number;
  maxMp :number;
  personality:string;
}
export default Vue.extend({
  name:'completeFriends',
  data(){
    return{
      selectedId:-1,
      name:'',
      sex:'',
      job:'',
      atack:0,
      agility:0,
      physical:0,
      intelligence:0,
      luck:0,
      maxHp:0,
      maxMp:0,
      personality:'',
      friends:[] as Friend[],
    }
  },
  computed: {
    isAddMode: function () {
      return this.selectedId < 0;
    },
    isValid:function(){
      return this.name && this.sex && this.job;
    },
    formTitle:function(){
      if(this.isAddMode){
        return 'あたらしいなかま';
      }
      return "ステータス";
    },
    buttonText: function () {
      if(this.isAddMode){
        return 'なかまにする';
      }
      return "くびにする";
    },
    sortedFriends: function () {
      return this.friends.sort((a,b)=>{
        if(a.id<b.id) return 1;
        if(a.id > b.id) return -1;
        return 0;
      });
    },
  },
  methods:{
    changeAddMode(){
      this.clear();
      this.selectedId=-1;
    },
    getRandomParameter(min:number,max:number){
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomPersonality(sex:string){
      const ps = sex ==='male'?["ごうけつ",
"ちからじまん",
"らんぼうもの",
"おおぐらい",
"ねっけつかん",
"タフガイ",
"てつじん",
"がんこもの",
"くろうにん",
"がんばりや",
"まけずぎらい",
"いのちしらず",
"むっつりスケベ",
"でんこうせっか",
"すばしっこい",
"おっちょこちょい",
"ぬけめがない",
"うっかりもの",
"いっぴきおおかみ",
"わがまま",
"みえっぱり",
"きれもの",
"ずのうめいせき",
"あたまでっかち",
"ロマンチスト",
"おせっかい",
"さびしがりや",
"いくじなし",
"あまえんぼう",
"おちょうしもの",
"なきむし",
"なまけもの",
"ひねくれもの",
"ひっこみじあん",
"しょうじきもの",
"せけんしらず",
"のんきもの",
"やさしいひと",
"しあわせもの",
"ラッキーマン",
"ふつう",
]:["ごうけつ",
"ちからじまん",
"らんぼうもの",
"おおぐらい",
"おとこまさり",
"おてんば",
"ねっけつかん",
"タフガイ",
"てつじん",
"がんこもの",
"くろうにん",
"がんばりや",
"まけずぎらい",
"いのちしらず",
"でんこうせっか",
"すばしっこい",
"おっちょこちょい",
"ぬけめがない",
"うっかりもの",
"いっぴきおおかみ",
"わがまま",
"みえっぱり",
"きれもの",
"ずのうめいせき",
"あたまでっかち",
"ロマンチスト",
"おせっかい",
"さびしがりや",
"いくじなし",
"あまえんぼう",
"おちょうしもの",
"なきむし",
"なまけもの",
"ひねくれもの",
"ひっこみじあん",
"しょうじきもの",
"せけんしらず",
"のんきもの",
"やさしいひと",
"しあわせもの",
"おじょうさま",
"セクシーギャル",
"ふつう",
];
      const max = ps.length - 1;
      const i = this.getRandomParameter(0,max);
      return ps[i]
    },
    submit(){
      if(!this.isAddMode){
        this.delete();
      }else{
        const friend:Friend = {
          id:this.friends.length,
          name:this.name,
          sex:this.sex,
          job:this.job,
          atack:this.getRandomParameter(1,20),
          agility:this.getRandomParameter(1,20),
          physical :this.getRandomParameter(1,20),
          intelligence :this.getRandomParameter(2,20),
          luck :this.getRandomParameter(2,20),
          maxHp :this.getRandomParameter(10,30),
          maxMp :this.getRandomParameter(0,30),
          personality:this.getRandomPersonality(this.sex),
        };
        this.friends.push(friend);
      }
      this.changeAddMode();
    },
    delete(){
      this.friends = this.friends.filter(x=>x.id !== this.selectedId);
    },
    clear(){
      this.name='';
      this.sex='';
      this.job='';
    },
    selectRow(friend:Friend){
      this.selectedId=friend.id;
      this.name=friend.name;
      this.job=friend.job;
      this.sex=friend.sex;
      this.atack=friend.atack;
      this.agility=friend.agility;
      this.physical=friend.physical;
      this.intelligence=friend.intelligence;
      this.luck=friend.luck;
      this.maxHp=friend.maxHp;
      this.maxMp=friend.maxMp;
      this.personality=friend.personality;
    }
  },
  components:{
  }
})
</script>

<style lang="less" scoped>
div.root {
  padding: 0 20px;
  h3{
    margin:0;
  }
  .form{
    &.form-mail{
      border-color:#55b;
      .form-control{
        border-color:#55b !important;
      }
      .btn{
        background-color:#55b !important;
      }
    }
    &.form-femail{
      border-color:#b55;
      .form-control{
        border-color:#b55 !important;
      }
      .btn{
        background-color:#b55 !important;
      }
    }
    color:#555;
    border: 4px solid #ccc;
    padding: 10px 20px;
    border-radius: 15px;
    margin-bottom:20px;
  }
  .list{
    color:#555;
    border: 4px solid #ccc;
    padding: 10px 20px;
    border-radius: 15px;
  }
  .table{
    width: 100%;
    border-collapse: collapse;
    display: table;
    .table-row{
      display: table-row;

      &:nth-child(odd){
        background-color: #f6f6f6;
      }
      &:hover{
        background-color: #f0f0f0;
      }
      &.table-row-selected{
        background-color: #ddd;
      }
      &.table-row-mail{
        color:#55b;
      }
      &.table-row-femail{
        color:#b55;
      }
      .table-header-cell{
        background-color:#333;
        color:#fff;
        font-weight: bold;
      }
      .table-cell{
        padding:5px;
        border: 2px solid #ccc;
        display: table-cell;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .row {
    padding:3px;
    display: flex;
    align-items: center;
    &.row-right{
      justify-content: flex-end;
    }
    .item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 33.333%;

      &.small-item{
        width: 16.667%;
      }
      label {
        padding: 0 20px;
        width: 100%;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }
      .form-control{
        border: 2px solid #888;
        border-radius: 5px;
        padding: 5px;
        font-weight: bold;
        color:#555;
        outline: none;
        width: 100%;
      }
      input{
        &[type="radio"]{
          padding-left: 20px;
          margin:0;
        }
      }
      .btn{
        width: 100%;
        position: relative;
        background-color: #333;
        color:#fff;
        font-weight: bold;
        border-radius: 4px;
        box-shadow: 1px 1px 2px #888;
        border:none;
        height:30px;
        outline: none;
        &[disabled]{
          background-color: #888 !important;
        }
        &:active {
          top: 1px;
          left: 1px;
          box-shadow: none;
        }
      }
      p {
        padding-left: 10px;
        .result {
          color: red;
        }
      }
    }
  }
}
</style>
