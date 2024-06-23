"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaginationToResponse = exports.getPaginationData = exports.paginate = void 0;
/** Constants */
const pagination_constants_1 = require("../constants/pagination.constants");
const paginate = (page, pageSize) => {
    const offset = page * pageSize;
    const limit = pageSize;
    return {
        offset,
        limit,
    };
};
exports.paginate = paginate;
const getPaginationData = (req, findIn) => {
    let { page, pageSize } = req[findIn];
    page = typeof +page === "number" && page ? +page : pagination_constants_1.DEFAULT_PAGE;
    pageSize =
        typeof +pageSize === "number" && pageSize
            ? +pageSize
            : pagination_constants_1.DEFAULT_PAGE_SIZE;
    page = page - 1 >= 0 ? page - 1 : 0;
    return {
        page,
        pageSize,
    };
};
exports.getPaginationData = getPaginationData;
const addPaginationToResponse = (rows, count, page, pageSize) => ({
    data: rows,
    pagination: {
        page: page + 1,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
    },
});
exports.addPaginationToResponse = addPaginationToResponse;
