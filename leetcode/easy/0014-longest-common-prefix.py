# ===================================================
# Problem  : Longest Common Prefix
# Platform : Leetcode
# Link     : https://leetcode.com/problems/longest-common-prefix/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.2 MB
# Date     : July 18, 2026
# ===================================================class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
         strs.sort()

        # Step 2: Take the first and last strings
         first = strs[0]
         last = strs[-1]

        # Step 3: Initialize index
         i = 0

        # Step 4: Compare characters one by one
         while i < len(first) and i < len(last):
            if first[i] == last[i]:
                i += 1
            else:
                break

        # Step 5: Return the common prefix
         return first[:i]

        