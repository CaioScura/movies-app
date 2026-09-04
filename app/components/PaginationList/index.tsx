import "./index.scss";

interface PaginationListProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function PaginationList({
    page,
    totalPages,
    onPageChange,
}: PaginationListProps) {
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Anterior
            </button>

            <span className="pagination-info">
                Página {page} de {totalPages}
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Próxima
            </button>
        </div>
    );
}