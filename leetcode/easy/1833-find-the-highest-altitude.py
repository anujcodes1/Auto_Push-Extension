# ===================================================
# Problem  : Find the Highest Altitude
# Platform : Leetcode
# Link     : https://leetcode.com/problems/find-the-highest-altitude/
# Difficulty: Easy
# Language : Python3
# Runtime  : 3 ms
# Memory   : 19.2 MB
# Date     : June 21, 2026
# ===================================================class Solution:
    def largestAltitude(self, gain: List[int]) -> int:
         n = len(gain)
         mx = 0

         for i in range(n + 1):
            alt = 0
            for j in range(i):
                alt += gain[j]
            mx = max(mx, alt)

         return mx

        