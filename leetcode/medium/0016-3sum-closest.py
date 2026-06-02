# ===================================================
# Problem  : 3Sum Closest
# Platform : Leetcode
# Link     : https://leetcode.com/problems/3sum-closest/
# Difficulty: Medium
# Language : Python3
# Runtime  : 398 ms
# Memory   : 19.3 MB
# Date     : June 2, 2026
# ===================================================class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
         nums.sort()
         result = nums[0] + nums[1] + nums[2]

         for i in range(len(nums) - 2):
            left, right = i + 1, len(nums) - 1

            while left < right:
                total = nums[i] + nums[left] + nums[right]

                if abs(target - total) < abs(target - result):
                    result = total

                if total == target:
                    return target
                elif total < target:
                    left += 1
                else:
                    right -= 1

         return result