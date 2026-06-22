# ===================================================
# Problem  : Missing Number
# Platform : Leetcode
# Link     : https://leetcode.com/problems/missing-number/
# Difficulty: Easy
# Language : Python3
# Runtime  : 2 ms
# Memory   : 20.4 MB
# Date     : June 22, 2026
# ===================================================class Solution:
    def missingNumber(self, nums: List[int]) -> int:
          n = len(nums)
          v = [-1] * (n + 1)
          for num in nums:
            v[num] = num
          for i in range(len(v)):
            if v[i] == -1:
                return i
          return 0

        