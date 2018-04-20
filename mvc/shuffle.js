export class Shuffle {
    randPos(len, shuffle) {
        let rndPos = [];
        for (let i = 0; i < len; i++) {
            rndPos[i] = i;
        }
        if (shuffle) {
            for (let i = (len - 1); i >= 0; i--) {
                let j= Math.floor(Math.random() * i) + 1;
                let tmp = rndPos[i];
                rndPos[i] = rndPos[j];
                rndPos[j] = tmp;
            }
        }
        return rndPos;
    }
}