Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.reducePercentsInCalc =
	exports.selectionMaxWidth =
	exports.actionsColumnWidth =
	exports.rowActions =
	exports.baseIconSize =
	exports.elementSize =
		void 0;

const elementSize = function elementSize(props) {
	return props.options.padding === 'default' ? 'medium' : 'small';
};

exports.elementSize = elementSize;

const baseIconSize = function baseIconSize(props) {
	return elementSize(props) === 'medium' ? 48 : 32;
};

exports.baseIconSize = baseIconSize;

const rowActions = function rowActions(props) {
	return props.actions.filter(
		(a) => a.position === 'row' || typeof a === 'function'
	);
};

exports.rowActions = rowActions;

const actionsColumnWidth = function actionsColumnWidth(props) {
	return rowActions(props).length * baseIconSize(props);
};

exports.actionsColumnWidth = actionsColumnWidth;

const selectionMaxWidth = function selectionMaxWidth(props, maxTreeLevel) {
	return baseIconSize(props) + 9 * maxTreeLevel;
};

exports.selectionMaxWidth = selectionMaxWidth;

const reducePercentsInCalc = function reducePercentsInCalc(calc, fullValue) {
	let index = calc.indexOf('%');

	while (index !== -1) {
		let leftIndex = index - 1;

		while (leftIndex >= 0 && '0123456789.'.indexOf(calc[leftIndex]) !== -1) {
			leftIndex--;
		}

		leftIndex++;
		const value = Number.parseFloat(calc.substring(leftIndex, index));
		calc = `${
			calc.substring(0, leftIndex) + (value * fullValue) / 100
		}px${calc.substring(index + 1)}`;
		index = calc.indexOf('%');
	}

	return calc;
};

exports.reducePercentsInCalc = reducePercentsInCalc;
