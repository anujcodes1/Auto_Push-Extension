# ===================================================
# Problem  : Concatenate Array With Reverse
# Platform : Leetcode
# Link     : https://leetcode.com/problems/concatenate-array-with-reverse/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.1 MB
# Date     : July 22, 2026
# ===================================================class Solution:
    def concatWithReverse(self, nums: list[int]) -> list[int]:
        return nums + nums[::-1]
        