# ===================================================
# Problem  : Number of Good Pairs
# Platform : Leetcode
# Link     : https://leetcode.com/problems/number-of-good-pairs/
# Difficulty: Easy
# Language : Python3
# Runtime  : 4 ms
# Memory   : 19.2 MB
# Date     : June 10, 2026
# ===================================================class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        count = 0

        for i in range(len(nums)):

            for j in range(i + 1, len(nums)):

                if nums[i] == nums[j]:
                    count += 1

        return count

        