# ===================================================
# Problem  : Defanging an IP Address
# Platform : Leetcode
# Link     : https://leetcode.com/problems/defanging-an-ip-address/
# Difficulty: Easy
# Language : Python3
# Runtime  : 49 ms
# Memory   : 19.3 MB
# Date     : June 8, 2026
# ===================================================class Solution:
    def defangIPaddr(self, address: str) -> str:
        result=""
        for i in range(len(address)):
            if address[i] == ".":
                result += "[.]"
            else:
                result+=address[i]
        return result
              
