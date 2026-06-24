# ===================================================
# Problem  : Palindrome Number
# Platform : Leetcode
# Link     : https://leetcode.com/problems/palindrome-number/
# Difficulty: Easy
# Language : Python3
# Runtime  : 8 ms
# Memory   : 19.2 MB
# Date     : June 24, 2026
# ===================================================class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False

        reverse = 0
        xcopy = x

        while x > 0:
            reverse = (reverse * 10) + (x % 10)
            x //= 10
        
        return reverse == xcopy