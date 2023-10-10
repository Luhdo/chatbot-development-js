function generate(inputString, stringList) {
  if (!inputString || !stringList || stringList.length === 0) {
    return null;
  }

  let mostSimilarString = stringList[0];
  let minDistance = getLevenshteinDistance(inputString, mostSimilarString);

  for (let i = 1; i < stringList.length; i++) {
    const currentString = stringList[i];
    const distance = getLevenshteinDistance(inputString, currentString);

    if (distance < minDistance) {
      minDistance = distance;
      mostSimilarString = currentString;
    }
  }

  return mostSimilarString;
}

// Function to calculate Levenshtein distance between two strings
function getLevenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }

  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // Deletion
        dp[i][j - 1] + 1, // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[m][n];
}

module.exports = generate;
