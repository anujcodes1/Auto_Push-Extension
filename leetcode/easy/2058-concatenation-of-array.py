# ===================================================
# Problem  : Concatenation of Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/concatenation-of-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : June 4, 2026
# ===================================================class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        result=[]
        
        result = nums*2
        return result