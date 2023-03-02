// Create a frequency map in Javascript

const arr = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];

function createFrequencyMap(arr) {
  const frequencyMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (frequencyMap.has(arr[i])) {
      frequencyMap.set(arr[i], frequencyMap.get(arr[i]) + 1);
    } else {
      frequencyMap.set(arr[i], 1);
    }
  }
  return Object.fromEntries(frequencyMap);
}

console.log(createFrequencyMap(arr));
