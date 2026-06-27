# ===================================================
# Problem  : Plus One
# Platform : Leetcode
# Link     : https://leetcode.com/problems/plus-one/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.4 MB
# Date     : June 27, 2026
# ===================================================class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):

            if digits[i] + 1 != 10:
                digits[i] += 1
                return digits
            
            digits[i] = 0

            if i == 0:
                return [1] + digits