class MoveSeries {
    constructor (normalized) {
        this.normalized = normalized;
        this.series = [];
    }
    setJitterLimit(vector) {
        this.jitterVecor = vector;
    }
    add(movePoint) {
        if (this.series.length == 0) {
            this.series.push(movePoint);
        } else {
            // if change is larger than jitter point, add to series
        }
    }
}