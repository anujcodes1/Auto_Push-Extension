# ===================================================
# Problem  : Squares of a Sorted Array
# Platform : Leetcode
# Link     : https://leetcode.com/problems/squares-of-a-sorted-array/
# Difficulty: Easy
# Language : Python3
# Runtime  : 12 ms
# Memory   : 21.1 MB
# Date     : May 30, 2026
# ===================================================class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        negative = []
        positive  = []
        for num in nums:
            square = num*num
            if num < 0:
                negative.append(square)
            else:
                positive.append(square)
        negative.reverse()

        result=[]

        i=0
        j=0

        while i < len(negative) and j < len(positive):
              
              if negative[i] < positive[j]:
                  result.append(negative[i])
                  i += 1
              else:
                  result.append(positive[j])
                  j += 1

        while i < len(negative):
            result.append(negative[i])
            i += 1

        while j < len(positive):
            result.append(positive[j])
            j += 1

        return result
