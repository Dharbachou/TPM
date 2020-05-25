/**
 * Class is used for setting up configuration for TPM networks
 */
class NeuralNetworkConfiguration {
    /**
     * @constructor
     * @param {number} countOfInputs - count of the input perceptrons (n)
     * @param {number} countOfHiddenNeurons - count of the hidden perceptrons (k)
     * @param {number} weightLimit - limit of the weight values
     */
    constructor(countOfInputs, countOfHiddenNeurons, weightLimit) {
        if (countOfInputs < 1 || countOfHiddenNeurons < 1) {
            throw Error('Count of the input and hidden neurons must be more 1.');
        }
        if (countOfInputs % countOfHiddenNeurons !== 0) {
            throw Error('The number of input and output perceptrons must be a multiple.');
        }

        /** @type {number} */
        this.countOfInputPerceptrons = countOfInputs;
        /** @type {number} */
        this.countOfHiddenNeurons = countOfHiddenNeurons;
        /** @type {number} */
        this.countOfPerceptrons = countOfInputs / countOfHiddenNeurons;
        /** @type {{max: number, min: number}} */
        this.weightsLimit = this.defineWeightLimit(weightLimit);
    }

    /**
     * Defines max and min limits of the weights values based on the passed param
     *
     * @param weightLimit
     * @returns {{min: number, max: *}}
     */
    defineWeightLimit(weightLimit) {
        return {
            max : weightLimit,
            min: -weightLimit
        }
    }

    /**
     * Checks configurations of the both neural networks and returns:
     *  false - if the networks don't have the same configurations,
     *  true - if the networks have the same configurations
     *
     * @param {Object} configuration
     * @returns {boolean}
     */
    isEqualConfiguration(configuration) {
        return this.countOfInputPerceptrons === configuration.countOfInputPerceptrons &&
            this.countOfHiddenNeurons === configuration.countOfHiddenNeurons;
    }
}

export default NeuralNetworkConfiguration;