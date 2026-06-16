# ===================================================
# Problem  : Reverse String
# Platform : Leetcode
# Link     : https://leetcode.com/problems/reverse-string/
# Difficulty: Easy
# Language : Python3
# Runtime  : 3 ms
# Memory   : 23.4 MB
# Date     : June 16, 2026
# ===================================================class Solution:
    def reverseString(self, s: List[str]) -> None:
        start = 0
        end = len(s) - 1

        while start <= end:

            s[start], s[end] = s[end], s[start]

            start += 1
            end -= 1
