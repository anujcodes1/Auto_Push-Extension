# ===================================================
# Problem  : Contains Duplicate
# Platform : Leetcode
# Link     : https://leetcode.com/problems/contains-duplicate/
# Difficulty: Easy
# Language : Python3
# Runtime  : 54 ms
# Memory   : 30 MB
# Date     : June 26, 2026
# ===================================================class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        nums.sort()

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                return True
        
        return False
        