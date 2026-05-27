# ===================================================
# Problem  : Palindrome Number
# Platform : Leetcode
# Link     : https://leetcode.com/problems/palindrome-number/
# Difficulty: Easy
# Language : Python3
# Runtime  : 17 ms
# Memory   : 19.3 MB
# Date     : May 27, 2026
# ===================================================class Solution:
    def isPalindrome(self, x: int) -> bool:
        
        temp = x
        rev = 0
        while temp>0:
            r= temp%10
            temp//=10
            rev=rev*10 +r
        return rev==x