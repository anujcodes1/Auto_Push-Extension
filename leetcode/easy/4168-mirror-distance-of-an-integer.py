# ===================================================
# Problem  : Mirror Distance of an Integer
# Platform : Leetcode
# Link     : https://leetcode.com/problems/mirror-distance-of-an-integer/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.2 MB
# Date     : July 14, 2026
# ===================================================class Solution:
    def mirrorDistance(self, n: int) -> int:
        rev, x=0, n
        while x>0:
            x, r=divmod(x, 10)
            rev=10*rev+r
        return abs(rev-n)
        