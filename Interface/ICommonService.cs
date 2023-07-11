namespace API.Interface
{
    public interface ICommonService<T>
    {
        int Create(T entity);
        IQueryable<T> Retrieve { get; }
        int Update(string id, T entity);
        int Delete(string id);

    }
}
