const EVENTS = new WeakMap();

export default class Emitter {
    /**
     * Constructor for Emitter class
     */
    constructor() {
        EVENTS.set(this, []);
    }

    /**
     * Subscribe the given callbacks to the specified event topic(s).
     * @param  {String}     topic    Space seperated list of topics.
     * @param  {...Array}   callback List of callbacks to subscribe.
     * @return {Emitter}             Returns self to allow chain calling.
     */
    on(topic, ...callback) {
        let e = EVENTS.get(this);
        let topics = topic.split(" ");

        for (let item of topics) {
            if (!e[item]) {
                e[item] = [];
            }

            for (let cb of callback) {
                e[item].push(cb);
            }
        }

        return this;
    }

    /**
     * Unsubscribe the given callbacks from the sepcified event topic(s).
     * @param  {String}     topic    Space seperated list of topics.
     * @param  {...Array}   callback List of callbacks to unsubscribe.
     * @return {Emitter}             Returns self to allow chain calling.
     */
    off(topic, ...callback) {
        let e = EVENTS.get(this);
        let topics = topic.split(" ");

        for (let item of topics) {
            if (!e[item]) {
                continue;
            }

            e[item].filter(item => {
                return callback.indexOf(item) < 0;
            });
        }

        return this;
    }

    /**
     * Calls all subscribed functions of the specified event topic.
     * @param  {String}     topic Event topic to be emitted.
     * @param  {...Array}   args  List of arguments to be passed to callbacks.
     * @return {Emitter}          Returns self to allow chain calling.
     */
    emit(topic, ...args) {
        let e = EVENTS.get(this);

        if (!e[topic]) {
            return this;
        }

        for (let cb of e[topic]) {
            cb(...args);
        }

        return this;
    }
}