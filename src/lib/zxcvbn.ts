import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnJaPackage from '@zxcvbn-ts/language-ja';

const options = {
	translations: zxcvbnJaPackage.translations,
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnJaPackage.dictionary
	}
};

zxcvbnOptions.setOptions(options);

export { zxcvbn };
