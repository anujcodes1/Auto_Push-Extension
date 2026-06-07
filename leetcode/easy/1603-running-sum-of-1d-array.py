# ===================================================
# Problem  : Running Sum of 1d Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/running-sum-of-1d-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : June 7, 2026
# ===================================================class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        for i in range(1,len(nums)):
            nums[i]+=nums[i-1]
        return nums
