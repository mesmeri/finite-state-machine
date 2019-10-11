class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.activeState = this.initial;
        this.states = config.states;
        this.undoStack = [this.initial];
        this.redoStack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        try {
            this.activeState = state;

            if (!this.states[state]) {
                throw new Error('No such state available');
            }

            this.undoStack.push(this.activeState);  
            this.redoStack = [];
         } catch (e) {
                throw (e);
            }

        this.redoStack = [];        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        try {
            let nextState = this.states[this.activeState].transitions[event];

            if (!nextState) {
                throw new Error('No such event available in current state');
            }

            this.activeState = nextState;
        }   catch (e) {
                throw (e);
        }

        this.undoStack.push(this.activeState);
        this.redoStack = [];
    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr =  Object.keys(this.states);
        
        if (event) {
            arr = arr.filter(state => this.states[state].transitions[event]);
        }

        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
 
        if  ((this.undoStack.length === 1) && 
        (this.undoStack[0] === this.initial)) {
            return false;
        }

        this.activeState = this.undoStack[this.undoStack.length - 2];
        this.redoStack.push(this.undoStack.pop());

        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.redoStack.length === 0) {
            return false;
        }
        
        this.activeState = this.redoStack[this.redoStack.length - 1];
        this.undoStack.push(this.redoStack.pop());

        return true;   
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoStack = [this.initial];
        this.redoStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

