# ===================================================
# Problem  : Pascal's Triangle
# Platform : Leetcode
# Link     : https://leetcode.com/problems/pascals-triangle/
# Difficulty: Easy
# Language : Python3
# Runtime  : 4 ms
# Memory   : 19.4 MB
# Date     : June 13, 2026
# ===================================================class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
         if numRows == 0:
            return []
         if numRows == 1:
            return [[1]]
        
         prevRows = self.generate(numRows - 1)
         newRow = [1] * numRows
        
         for i in range(1, numRows - 1):
            newRow[i] = prevRows[-1][i - 1] + prevRows[-1][i]
        
         prevRows.append(newRow)
         return prevRows
        