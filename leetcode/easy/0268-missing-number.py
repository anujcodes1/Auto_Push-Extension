# ===================================================
# Problem  : Missing Number
# Platform : Leetcode
# Link     : https://leetcode.com/problems/missing-number/
# Difficulty: Easy
# Language : Python3
# Runtime  : 1407 ms
# Memory   : 20.3 MB
# Date     : July 28, 2026
# ===================================================class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n+1):
            if i not in nums:
                 return i