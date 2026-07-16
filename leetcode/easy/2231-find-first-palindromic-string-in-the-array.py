# ===================================================
# Problem  : Find First Palindromic String in the Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/find-first-palindromic-string-in-the-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 63 ms
# Memory   : 19.2 MB
# Date     : July 16, 2026
# ===================================================class Solution:
    def firstPalindrome(self, words: List[str]) -> str:
        for word in words:
            if word == word[::-1]:
                return word
        return ""