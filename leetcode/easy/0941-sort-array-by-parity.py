# ===================================================
# Problem  : Sort Array By Parity
# Platform : Leetcode
# Link     : https://leetcode.com/problems/sort-array-by-parity/
# Difficulty: Easy
# Language : Python3
# Runtime  : 4 ms
# Memory   : 19.8 MB
# Date     : July 13, 2026
# ===================================================class Solution:
    def sortArrayByParity(self, nums: List[int]) -> List[int]:
        left = 0

        for i in range(len(nums)):
            if nums[i] % 2 == 0:
                nums[left], nums[i] = nums[i], nums[left]
                left += 1
        
        return nums
        