# ===================================================
# Problem  : Digit Frequency Score
# Platform : Leetcode
# Link     : https://leetcode.com/problems/digit-frequency-score/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : July 5, 2026
# ===================================================class Solution:
    def digitFrequencyScore(self, n: int) -> int:
        score = 0

        while n > 0:
            digit = n % 10
            score += digit
            n //= 10

        return score
        