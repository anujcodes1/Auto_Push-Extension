# ===================================================
# Problem  : Remove Duplicates from Sorted Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/remove-duplicates-from-sorted-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 20.6 MB
# Date     : May 29, 2026
# ===================================================class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if not nums:
            return 0
        i = 0
        for j in range(1,len(nums)):
           if nums[i] != nums[j]:

             i += 1
             nums[i] = nums[j]
        return i + 1        