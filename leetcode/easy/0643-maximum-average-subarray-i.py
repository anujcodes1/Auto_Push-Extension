# ===================================================
# Problem  : Maximum Average Subarray I
# Platform : Leetcode
# Link     : https://leetcode.com/problems/maximum-average-subarray-i/
# Difficulty: Easy
# Language : Python3
# Runtime  : 65 ms
# Memory   : 28.9 MB
# Date     : June 5, 2026
# ===================================================class Solution:
    def findMaxAverage(self, nums: List[int], k: int) -> float:
       
        # First window sum
        window_sum = sum(nums[:k])
        max_sum = window_sum

        # Sliding the window
        for i in range(k, len(nums)):
            window_sum += nums[i] - nums[i - k]
            max_sum = max(max_sum, window_sum)

        # Return maximum average
        return max_sum / k