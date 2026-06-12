# ===================================================
# Problem  : Zigzag Conversion
# Platform : Leetcode
# Link     : https://leetcode.com/problems/zigzag-conversion/
# Difficulty: Medium
# Language : Python3
# Runtime  : 19 ms
# Memory   : 19.4 MB
# Date     : June 12, 2026
# ===================================================class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1: return s
        a=""
        for i in range(numRows):
            for j in range(i,len(s),2*(numRows-1)):
                a+=s[j]
                if(i>0 and i<numRows-1 and j+2*(numRows-1)-2*i < len(s)):
                    a+=s[j+2*(numRows-1)-2*i]
        return a 