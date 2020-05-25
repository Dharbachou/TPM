/**
 * Simple element of the neural network
 *
 * @class Perceptron
 */
class Perceptron {
	/**
	 * @constructor
	 * @param {number[]} weights - vector of the weight values
	 * @param {number[]} inputs - vector of the inputs values
	 */
	constructor(weights = [], inputs = []) {
		this.weights = weights;
		this.inputs = inputs;
	}

	/**
	 * returns weight on the perceptron
	 *
	 * @returns {number[]}
	 */
	getWeights() {
		return this.weights;
	}

	/**
	 * Sets the weigh for the element by index
	 *
	 * @param {number} index
	 * @param {number} weight
	 */
	setWeight(index, weight) {
		this.weights[index] = weight;
	}

	/**
	 * Setter for input values
	 *
	 * @param {number[]} inputs
	 */
	setInputs(inputs) {
		this.inputs = inputs;
	}

	/**
	 * Calculates output value of a perceptron
	 *
	 * @returns {number}
	 */
	calcOutputValue() {
		if (this.inputs.length !== this.weights.length) {
			throw new Error('The number of input values does not match the number of weights!');
		}

		return signum(sum(this.inputs, this.weights));

		/**
		 * Adjusts output value based on the math function 'sgn'
		 * @see {@link https://ru.qwe.wiki/wiki/Neural_cryptography}
		 *
		 * @param {number} output
		 * @returns {number}
		 */
		function signum(output) {
			return output > 0 ? 1 : -1;
		}

		/**
		 * Calculates the sum of the product of weight
		 * by the input value for each neuron
		 *
		 * @param {number[]} inputs
		 * @param {number[]} weights
		 * @returns {number}
		 */
		function sum(inputs, weights) {
			let sum = 0;

			for (let i = 0; i < inputs.length; i++) {
				sum += inputs[i] * weights[i];
			}

			return sum;
		}
	}
}

export default Perceptron;