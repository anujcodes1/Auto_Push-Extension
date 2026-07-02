# ===================================================
# Problem  : Restore Finishing Order
# Platform : Leetcode
# Link     : https://leetcode.com/problems/restore-finishing-order/
# Difficulty: Easy
# Language : Python3
# Runtime  : 3 ms
# Memory   : 19.3 MB
# Date     : July 2, 2026
# ===================================================class Solution:
    def recoverOrder(self, order: List[int], friends: List[int]) -> List[int]:
        dic1 = {}
        for i in range(len(order)):
            if order[i] in friends:
                dic1[i] = order[i]
        
        t = sorted(dic1)
        l = []
        for i in t:
            l.append(dic1[i])

        return l
        