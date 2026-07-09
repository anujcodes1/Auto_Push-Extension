# ===================================================
# Problem  : Sort the People
# Platform : Leetcode
# Link     : https://leetcode.com/problems/sort-the-people/
# Difficulty: Easy
# Language : Python3
# Runtime  : 3 ms
# Memory   : 19.7 MB
# Date     : July 9, 2026
# ===================================================class Solution:
    def sortPeople(self, names: List[str], heights: List[int]) -> List[str]:
        dict1 = {}
        dict2 = {}
        for i in range(0, len(heights), 1):
            dict1[names[i]] = i
            dict2[heights[i]]  = i
        height =  sorted(dict2 , reverse = True)
        
        

        

        ans = []
        for j in height:
            ans.append(dict2[j])
        ans1 = []
        for i in ans:
            ans1.append(names[i])
        
        return ans1
            