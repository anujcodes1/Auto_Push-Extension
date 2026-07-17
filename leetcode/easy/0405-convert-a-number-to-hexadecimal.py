# ===================================================
# Problem  : Convert a Number to Hexadecimal
# Platform : Leetcode
# Link     : https://leetcode.com/problems/convert-a-number-to-hexadecimal/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : July 17, 2026
# ===================================================class Solution:
    def toHex(self, num: int) -> str:
        if num == 0:
            return "0"
        if num < 0:
            num += 2**32
        h = "0123456789abcdef"
        r = []
        while num:
            r.append(h[num & 15])
            num //= 16
        return "".join(r[::-1])
        