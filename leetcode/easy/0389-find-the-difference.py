# ===================================================
# Problem  : Find the Difference
# Platform : Leetcode
# Link     : https://leetcode.com/problems/find-the-difference/
# Difficulty: Easy
# Language : Python3
# Runtime  : 3 ms
# Memory   : 19.2 MB
# Date     : July 10, 2026
# ===================================================class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        count = {}

        
        for ch in s:
            if ch in count:
                count[ch] += 1
            else:
                count[ch] = 1

        
        for ch in t:
            if ch not in count:
                return ch
            elif count[ch] == 0:
                return ch
            else:
                count[ch] -= 1