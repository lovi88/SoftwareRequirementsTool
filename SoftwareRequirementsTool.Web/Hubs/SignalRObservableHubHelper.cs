using System.Collections.Generic;
using SoftwareRequirementsTool.Data.Entities;

namespace SoftwareRequirementsTool.Web.Hubs
{
    abstract public class SignalRObservableHubHelper<TEntity>
        where TEntity : class, IEntity
    {
        private readonly Dictionary<object, HashSet<string>> _listenersDictionary = new Dictionary<object, HashSet<string>>();


        public void AddListener(object key, string connectionId)
        {
            if (!(_listenersDictionary.ContainsKey(key)))
            {
                _listenersDictionary.Add(key, new HashSet<string>());
            }

            _listenersDictionary[key].Add(connectionId);
        }

        public void RemoveListener(object key, string connectionId)
        {
            if (_listenersDictionary.ContainsKey(key))
            {
                _listenersDictionary[key].Remove(connectionId);
            }
        }

        public IEnumerable<string> GetListenersByKey(object key)
        {
            return _listenersDictionary[key];
        }
    }
}
