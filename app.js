new Vue ({
    el : '#app',
    data : {
        player_heal : 100,
        monster_heal : 100,
        logs : [],
        game_is_on : false,
        attack_multiple : 10,
        speacial_attack_multiple : 17,
        monster_attack_multiple : 20,
        heal_up_multiple : 20,

        log_text : {
            attack : "Oyuncu Saldırısı : ",
            special_attack : "Özel Oyuncu Atağı :",
            monster_attack : "Canavar Saldırısı : ",
            heal_up : "İlk Yardım : ",
            give_up : "Oyuncu Pes ETTİ"
        },

        disableHealBtn: false,
        disableSpeacialBtn: false,
        life : 3,
        special : 2,
        
    },
    methods : {
        start_game : function(){
            this.game_is_on = true;
        },
        attack : function(){
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_heal -= point;
            this.add_to_log({turn : "Player", text : this.log_text.attack + point });
            this.monster_attack();
        },
        special_attack : function(){
            this.special--;
            if(this.special <=0){
                this.disableSpeacialBtn = true;
            }
            var point = Math.ceil(Math.random() * this.speacial_attack_multiple);
            this.monster_heal -= point;
            this.add_to_log({turn : "Player", text :  this.log_text.special_attack + point });
            this.monster_attack();
        },
        heal_up : function() {

            this.life--;
            if(this.life <= 0){
                this.disableHealBtn = true;
            }
                var point = Math.ceil(Math.random() * this.heal_up_multiple);
                this.player_heal += point;
                this.add_to_log({turn : "Player", text :  this.log_text.heal_up + point });
                this.monster_attack();
           
        },
        give_up : function(){
            this.player_heal = 0;
            this.add_to_log({turn : "Player", text : this.log_text.give_up});
        },
        monster_attack : function (){
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.player_heal -= point;
            this.add_to_log({turn : "Monster", text : this.log_text.monster_attack + point });
        },
        add_to_log : function(log){
            this.logs.push(log);
        },
    },
    watch : {
        player_heal : function(value) {
            if(value < 0){
                this.player_heal = 0;
                if(confirm("Oyunu KAYBETTİN. Tekrar Denemek İster Misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            }
            else if (value > 100) {
                this.player_heal = 100
            }
        },

        monster_heal : function(value){
            if(value < 0){
                this.monster_heal = 0;
                if(confirm("Oyunu KAZANDIN. Tekrar Denemek İster Misin?")){
                    this.player_heal = 100;
                    this.monster_heal = 100;
                    this.logs = [];
                }
            }
            else if (value > 100){
                this.monster_heal = 100;
            }
        }
    },
    computed : {
        playerProgress : function(){
            return {
                width : this.player_heal + "%"
            }
        },
        monsterProgress : function(){
            return {
                width : this.monster_heal + "%"
            }
        },

    }
})