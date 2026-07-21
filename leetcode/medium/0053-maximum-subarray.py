# ===================================================
# Problem  : Maximum Subarray
# Platform : Leetcode
# Link     : https://leetcode.com/problems/maximum-subarray/
# Difficulty: Medium
# Language : Python3
# Runtime  : 37 ms
# Memory   : 31.4 MB
# Date     : July 21, 2026
# ===================================================class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        total = 0 
        maxi = float("-inf")
        for i in range(0,len(nums)):
            total = total + nums[i]
            maxi = max(maxi, total)
            if total<0:
                total = 0
        return maxi
        