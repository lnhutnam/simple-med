function delay(delayInms) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(2);
		}, delayInms);
	});
}

function minimun_edit_distance(string1, string2) {
	let string_length_1 = string1.length + 1;
	let string_length_2 = string2.length + 1;

	let matrix = new Array(string_length_1);
	for (let i = 0; i < string_length_1; i++) {
		matrix[i] = new Array(string_length_2);
	}
	for (let i = 0; i < 1; i++) {
		for (let j = 0; j < string_length_2; j++) {
			matrix[i][j] = j;
		}
	}
	for (let i = 0; i < 1; i++) {
		for (let j = 0; j < string_length_1; j++) {
			matrix[j][i] = j;
		}
	}

	for (let i = 1; i < string_length_1; i++) {
		for (let j = 1; j < string_length_2; j++) {
			if (string1.charAt(i - 1) == string2.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]) + 1;
			}
		}
	}

	return matrix;
}

function back_trace_minimun_edit_distance(matrix) {

	let result = [];
	let rows = matrix.length;
	let cols = matrix[0].length;
	let i, j;

	for (i = 0; i < matrix.length + matrix[0].length; i++) {
		result[i] = { i: 0, j: 0, operation: 0 };
	}

	let count = 0;
	i = rows - 1;
	j = cols - 1;
	do {
		if (i - 1 >= 0 && j - 1 >= 0) {
			let smallest = Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]);
			if (smallest == matrix[i - 1][j - 1]) {
				if (matrix[i][j] == matrix[i - 1][j - 1]) {
					result[count].i = i;
					result[count].j = j;
					result[count].operation = 4;
					i--;
					j--;
				} else {
					result[count].i = i;
					result[count].j = j;
					result[count].operation = 3;
					i--;
					j--;
				}
			} else if (smallest == matrix[i - 1][j]) {
				result[count].i = i;
				result[count].j = j;
				result[count].operation = 2;
				i--;
			} else if (smallest == matrix[i][j - 1]) {
				result[count].i = i;
				result[count].j = j;
				result[count].operation = 1;
				j--;
			}
		} else {
			if (i - 1 < 0) {
				result[count].i = 0;
				result[count].j = j;
				result[count].operation = 1;
				j--;
			} else if (j - 1 < 0) {
				result[count].i = i;
				result[count].j = j;
				result[count].operation = 2;
				i--;
			}
		}
		count++;
	} while (i >= 0 && j >= 0);

	return result;
}
