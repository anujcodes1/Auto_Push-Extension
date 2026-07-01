# ===================================================
# Problem  : Merge Two Sorted Lists
# Platform : Leetcode
# Link     : https://leetcode.com/problems/merge-two-sorted-lists/
# Difficulty: Easy
# Language : Python3
# Runtime  : 0 ms
# Memory   : 19.3 MB
# Date     : July 1, 2026
# ===================================================# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        header = ListNode(0)
        t = header
        while list1 or list2:
            if list1 and list2:
                if list1.val < list2.val:
                  header.next = ListNode(list1.val)
                  list1 = list1.next
                else:
                  header.next = ListNode(list2.val)
                  list2 = list2.next
            elif list1:
                header.next = ListNode(list1.val)
                list1 = list1.next
            elif list2:
                header.next = ListNode(list2.val)
                list2 = list2.next

            header = header.next
            
        return t.next
        


        