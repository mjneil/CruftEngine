const EVENTS = new WeakMap();

export default class Emitter {

    constructor() {
        EVENTS.set(this, []);
    }

    on(topic, ...callback) {
        let e = EVENTS.get(this);
        let topics = topic.split(" ");

        for (item of topics) {
            if (!e[item]) {
                e[item] = [];
            }

            for (cb of callback) {
                e[item].push(cb);
            }
        }

        return this;
    }

    off(topic, ...callback) {
        let e = EVENTS.get(this);
        let topics = topic.split(" ");

        for (item of topics) {
            if (!e[item]) {
                continue;
            }

            e[item].filter(item => {
                return callback.indexOf(item) < 0;
            });
        }

        return this;
    }

    emit(topic, ...args) {
        let e = EVENTS.get(this);

        if (!e[topic]) {
            return this;
        }

        for (cb of e[topic]) {
            cb(...args);
        }

        return this;
    }
}