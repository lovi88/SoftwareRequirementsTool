using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace SoftwareRequirementsTool.Web.Hubs.Helpers
{

    public class GroupHelper
    {

        //Thread safe lazy loaded singleton pattern
        private static readonly Lazy<GroupHelper> _instance = new Lazy<GroupHelper>(() => new GroupHelper());
        public static GroupHelper Instance
        {
            get { return _instance.Value; }
        }

        private GroupHelper()
        {
            _groups = new ConcurrentDictionary<string, ConcurrentBag<string>>();
        }

        //Thread safe group holding
        private readonly ConcurrentDictionary<string, ConcurrentBag<string>> _groups;
        public void AddCallerToGroup(string connectionId, string groupName)
        {
            var list = _groups.GetOrAdd(groupName, new ConcurrentBag<string>());
            list.Add(connectionId);
        }

        public void RemoveCallerFromGroup(string connectionId, string groupName)
        {
            var list = _groups.GetOrAdd(groupName, new ConcurrentBag<string>());
            var cIdToRemove = connectionId;
            list.TryTake(out cIdToRemove);
        }

        public string[] AllInGroup(string groupName)
        {
            return _groups.ContainsKey(groupName) 
                ? _groups[groupName].ToArray() 
                : new string[0];
        }

        public List<string> AllInGroupExcept(string groupName, string except)
        {
            if (!_groups.ContainsKey(groupName)) 
                return new List<string>();

            var connectionIdBag = _groups[groupName];
            var ret = connectionIdBag.Where(x => x != except).ToList();
            return ret;
        }

    }
}