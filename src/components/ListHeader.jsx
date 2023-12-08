const ListHeader = () => {
    return (
        <div className="h-flex flex-align-center gap1">
            <h3 className="flex-grow">Task</h3>
            <h3 className="w-150">Date</h3>
            <div className="w-30"/>
            <div className="w-30"/>
        </div>
    );
};

export default ListHeader;