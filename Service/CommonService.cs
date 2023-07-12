using System.Linq;
using API.DBContext;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Service
{
    public class CommonService<T> : ICommonService<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        public CommonService(ApplicationDbContext context)
        {
            _context = context;
        }

        public int Create(T entity)
        {
            _context.Set<T>().Add(entity);
            return _context.SaveChanges();
        }

        public IQueryable<T> Retrieve => this._context.Set<T>();


        public int Update(string id, T obj)
        {
            var oldData = _context.Find<T>(id);
            if (oldData != null)
            {
                _context.Entry(oldData).State = EntityState.Detached;
            }
            _context.Entry(obj).State = EntityState.Modified;
            return _context.SaveChanges();
        }

        public int Delete(string id)
        {
            var temp = _context.Set<T>().Find(id);
            if (temp != null)
            {
                _context.Set<T>().Remove(temp);
            }

            return _context.SaveChanges();
        }
    }
}
