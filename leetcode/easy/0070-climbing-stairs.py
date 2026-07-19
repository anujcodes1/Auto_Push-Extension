# ===================================================
# Problem  : Climbing Stairs
# Platform : Leetcode
# Link     : https://leetcode.com/problems/climbing-stairs/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.1 MB
# Date     : July 19, 2026
# ===================================================class Solution:
    def climbStairs(self, n: int) -> int:
        memo ={}
        memo[1] = 1
        memo[2] = 2
        
        def climb(n):
            if n in memo: 
                return memo[n]
            else:   
                memo[n] =  climb(n-1) + climb(n-2)
                return memo[n]
        
        return climb(n)

        