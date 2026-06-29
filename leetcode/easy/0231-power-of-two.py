# ===================================================
# Problem  : Power of Two
# Platform : Leetcode
# Link     : https://leetcode.com/problems/power-of-two/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.2 MB
# Date     : June 29, 2026
# ===================================================class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and not (n & (n - 1))