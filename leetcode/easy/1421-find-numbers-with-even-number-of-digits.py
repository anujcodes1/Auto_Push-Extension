# ===================================================
# Problem  : Find Numbers with Even Number of Digits
# Platform : Leetcode
# Link     : https://leetcode.com/problems/find-numbers-with-even-number-of-digits/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.1 MB
# Date     : June 6, 2026
# ===================================================class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        
        count = 0

        for num in nums:
            if len(str(num)) % 2 == 0:
                count += 1

        return count