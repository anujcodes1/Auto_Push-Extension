# ===================================================
# Problem  : Jump Game
# Platform : Leetcode
# Link     : https://leetcode.com/problems/jump-game/
# Difficulty: Medium
# Language : Python3
# Runtime  : 8 ms
# Memory   : 20.3 MB
# Date     : June 15, 2026
# ===================================================class Solution:
    def canJump(self, nums: List[int]) -> bool:
        goal = len(nums) - 1

        for i in range(len(nums) - 2, -1, -1):
             if i + nums[i] >= goal:
                goal = i
        
        return True if goal == 0 else False 