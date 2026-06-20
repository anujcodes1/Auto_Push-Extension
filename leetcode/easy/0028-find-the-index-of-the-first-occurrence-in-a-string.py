# ===================================================
# Problem  : Find the Index of the First Occurrence in a String
# Platform : Leetcode
# Link     : https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : June 20, 2026
# ===================================================class Solution:
    def strStr(self, haystack: str, needle: str) -> int:
         for i in range(len(haystack) - len(needle) + 1):
            if haystack[i:i+len(needle)] == needle:
                return i
         return -1
        