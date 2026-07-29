# ===================================================
# Problem  : Peak Index in a Mountain Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/peak-index-in-a-mountain-array/
# Difficulty: Medium
# Language : Python3
# Runtime  : 0 ms
# Memory   : 31.1 MB
# Date     : July 29, 2026
# ===================================================class Solution:
    def peakIndexInMountainArray(self, nums: List[int]) -> int:
        n = len(nums)
        l = 0
        r= n-1

        while l<=r:
            mid =(l+r)//2
            if nums[mid]<nums[mid+1]:
                l = mid +1
            else:
                ans = mid
                r = mid-1
        return ans        