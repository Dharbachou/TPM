import { generateArray } from "./Utils";
import Perceptron from "./Perceptron";
import getTrainFunc from './trainingRules';

/**
 * Class of the TPM neural network
 *
 * @class NeuralNetwork
 */
class NeuralNetwork {
	/**
	 * @constructor
	 * @param {NeuralNetworkConfiguration} configuration - configuration object of the neural network
	 */
	constructor(configuration) {
		/** @type {NeuralNetworkConfiguration} */
		this.configuration = configuration;
		/** @type {Perceptron[]} */
		this.hiddenNeurons = [];

		this.generateWeightsForHiddenNeurons();
	}


	/**
	 * Generates weights of the neural network
	 */
	generateWeightsForHiddenNeurons() {
		for (let i = 0; i < this.configuration.countOfHiddenNeurons; i++) {
			this.hiddenNeurons.push(
				new Perceptron(
					generateArray(
						this.configuration.countOfPerceptrons,
						this.configuration.weightsLimit.min,
						this.configuration.weightsLimit.max
					)
				)
			)
		}
	}

	/**
	 * Returns output value
	 *
	 * @returns {number}
	 */
	getOutputValue() {
		return this.calcOutputValue();
	}

	/**
	 * Calculate output value of the neural network
	 *
	 * @returns {number}
	 */
	calcOutputValue() {
		let output = 1;
		for (let i = 0; i < this.configuration.countOfHiddenNeurons; i++) {
			output *= this.hiddenNeurons[i].calcOutputValue();
		}
		return output;
	}

	/**
	 * Compares weights of the networks with weights of the passed neural network
	 * and return true/false
	 *
	 * @param {NeuralNetwork} network
	 * @returns {boolean}
	 */
	compareWeights(network) {
		if (!this.configuration.isEqualConfiguration(network.configuration)) {
			throw new Error('Конфигурации сетей не совпадают');
		}
		for (let i = 0; i < this.hiddenNeurons.length; i++) {
			for (let j = 0; j < this.hiddenNeurons[i].weights.length; j++) {
				if (this.hiddenNeurons[i].weights[j] !== network.hiddenNeurons[i].weights[j]) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Returns weights of the input neurons of the neural network
	 *
	 * @returns {number[]}
	 */
	getWeights() {
		const weights = [];
		for (let i = 0; i < this.hiddenNeurons.length; i++) {
			weights.push(this.hiddenNeurons[i].getWeights());
		}
		return weights;
	}

	/**
	 * Updates weight of the input neuron
	 *
	 * @param {number} index - index of the hidden neuron
	 * @param {number} weightIndex - index of the weight (index of the inout neuron)
	 * @param {number} weight - value of the weight
	 */
	setWeight(index, weightIndex, weight) {
		this.hiddenNeurons[index].setWeight(weightIndex, this.adjustWeight(weight));
	}

	/**
	 * Setter for input values of the perceptron
	 *
	 * @param inputs
	 */
	setInputs(inputs) {
		const n = this.configuration.countOfPerceptrons;
		for (let i = 0; i < this.hiddenNeurons.length; i++) {
			this.hiddenNeurons[i].setInputs(inputs.slice((n * i), (n * i) + n));
		}
	}

	/**
	 * Adjusts weight based on limits
	 *
	 * @param {number} weight - w(i) weight of the input neuron
	 */
	adjustWeight(weight) {
		return weight > this.configuration.weightsLimit.max ? this.configuration.weightsLimit.max :
			weight < this.configuration.weightsLimit.min ? this.configuration.weightsLimit.min : weight;
	}

	/**
	 * Trains neural network
	 *
	 * @param {number} rule - identifier of the tainting rule
	 */
	train(rule, ) {
		const trainFunction = getTrainFunc(rule);

		for (let i = 0, k = this.hiddenNeurons.length; i < k; i++) {
			let hiddenNeuron = this.hiddenNeurons[i];
			for (let j = 0, n = hiddenNeuron.weights.length; j < n; j++) {
				this.setWeight(
					i,
					j,
					trainFunction(
						hiddenNeuron.weights[j],
						hiddenNeuron.calcOutputValue(),
						hiddenNeuron.inputs[j],
						this.calcOutputValue()
					)
				);
			}
		}
	}
}

export default NeuralNetwork;