# ===================================================
# Problem  : Word Subsets
# Platform : Leetcode
# Link     : https://leetcode.com/problems/word-subsets/
# Difficulty: Medium
# Language : Python3
# Runtime  : 487 ms
# Memory   : 23 MB
# Date     : June 28, 2026
# ===================================================from typing import List
from collections import Counter

class Solution:
    def wordSubsets(self, words1: List[str], words2: List[str]) -> List[str]:
        count = Counter()

        # Find the maximum frequency of each character required
        for b in words2:
            count |= Counter(b)

        # Keep words that satisfy all required frequencies
        return [a for a in words1 if not (count - Counter(a))]