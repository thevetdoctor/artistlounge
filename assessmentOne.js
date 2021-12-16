// Write a simple and efficient Javascript program that returns the smallest non-occurring
// integer in a given Array.
// E.g: Given an Array1 = [1, 3, 6, 4, 1, 2] returns 5, and Array2 = [5, -1, -3] returns 1.

function smallestNonOccuringInteger(A) {
    A = A.sort((a, b) => a - b);
    const max = Math.max(...A);
    const min = Math.min(...A);
    let result = [];
    for(let i = min; i <= max - min; i++) {
        if(i < max && i > min && A.indexOf(i) < 0) {
            console.log(i);
            result.push(i);
        break;
        }
    }
    console.log(result);
    if(!result.length) {
        return max + 1;
    } else {
        if(result[0] < 0) {
            return 1;
        } else {
            return result[0];
        }
    }
}
