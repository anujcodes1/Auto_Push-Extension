# ===================================================
# Problem  : Sort Colors
# Platform : Leetcode
# Link     : https://leetcode.com/problems/sort-colors/
# Difficulty: Medium
# Language : Python3
# Runtime  : 7 ms
# Memory   : 19.3 MB
# Date     : June 3, 2026
# ===================================================class Solution:
    def sortColors(self, nums: List[int]) -> None:
        for j in range(len(nums)):
            
            for i in range(len(nums)-1):

                if nums[i] > nums[i+1]:
                     nums[i], nums[i + 1] = nums[i + 1], nums[i]

        print("Sorted list:", nums)
        