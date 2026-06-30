# ===================================================
# Problem  : Rotate Image
# Platform : Leetcode
# Link     : https://leetcode.com/problems/rotate-image/
# Difficulty: Medium
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.4 MB
# Date     : June 30, 2026
# ===================================================class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
         n = len(matrix)

         for i in range(n >> 1):
            for j in range(i, n - 1 - i):
                matrix[i][j], matrix[j][~i], matrix[~i][~j], matrix[~j][i] = \
                matrix[~j][i], matrix[i][j], matrix[j][~i], matrix[~i][~j]