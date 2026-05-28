# ===================================================
# Problem  : Two Sum II - Input Array Is Sorted
# Platform : Leetcode
# Link     : https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
# Difficulty: Medium
# Language : Python3
# Runtime  : 0 ms
# Memory   : 20.5 MB
# Date     : May 28, 2026
# ===================================================class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:

        left = 0
        right = len(numbers) - 1

        while left < right:

            sum = numbers[left] + numbers[right]

            if sum == target:
                return [left + 1 , right + 1]
            elif sum < target:
                left += 1
            else:
                right -= 1