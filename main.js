import NeuralNetwork from "./NeuralNetwork";
import { RULES_IDENTIFIER } from "./TrainingRules";
import NeuralNetworkConfiguration from "./NeuralNetworkConfiguration";
import {generateBinaryArray} from "./Utils";

/**
 * Displays results of the synchronisation networks
 *
 * @param {number} countOFIterations
 * @param {number} spentTime
 * @param {number[]} initiatingWeights
 * @param {number[]} excitedWeights
 */
function displayResults(countOFIterations, spentTime, initiatingWeights, excitedWeights) {
	console.log(`************** Synchronized **************`);
	console.log(`Executed steps: ${countOFIterations};\nSpend time for synchronization: ${spentTime}ms;`);
	console.log(`Weights of the initiating network: ${JSON.stringify(initiatingWeights)}`);
	console.log(`Weights of the excited network: ${JSON.stringify(excitedWeights)}`);
}

let SYNCHRONIZATION_LIMIT = 512000 * 2;

/**
 * Emulates the operation of a neural networks
 *
 * @param {NeuralNetwork} initiatingNetwork
 * @param {NeuralNetwork} excitedNetwork
 * @param {number} rule
 * @param {number} limit
 */
function emulate (initiatingNetwork, excitedNetwork, rule, limit) {
	const startDate = Date.now();

	let i = 1
	let completed = 1
	while (!initiatingNetwork.compareWeights(excitedNetwork)) {
		i++
		if (i - completed > limit) {
			throw new Error('Превышено количество попыток синхронизации сетей')
		}
		const vector = generateBinaryArray(initiatingNetwork.configuration.countOfInputPerceptrons);
		initiatingNetwork.setInputs(vector);
		excitedNetwork.setInputs(vector);
		if (initiatingNetwork.getOutputValue() === excitedNetwork.getOutputValue()) {
			initiatingNetwork.train(rule);
			excitedNetwork.train(rule);
			completed++;
		}
	}

	displayResults(i, Date.now() - startDate, initiatingNetwork.getWeights(), excitedNetwork.getWeights());
}


const configuration = new NeuralNetworkConfiguration(16, 4, 5);
const initiatingNetwork = new NeuralNetwork(configuration);
const excitedNetwork = new NeuralNetwork(configuration);

emulate(initiatingNetwork, excitedNetwork, RULES_IDENTIFIER.HEBBIAN, SYNCHRONIZATION_LIMIT);
