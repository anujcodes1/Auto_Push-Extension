# ===================================================
# Problem  : Merge Sorted Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/merge-sorted-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.4 MB
# Date     : May 31, 2026
# ===================================================class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        for j in range(n):
          nums1[m+j] = nums2[j]
        nums1.sort()
        