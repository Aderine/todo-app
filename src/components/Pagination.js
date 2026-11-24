"use client";

import { Pagination as AntPagination, ConfigProvider } from "antd";

ConfigProvider.config({
  theme: {
    token: {
      colorPrimary: "#754bda",
    },
  },
});

export default function Pagination({
  currentPage,
  totalTasks,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#754bda",
          borderRadius: 10,
        },
      }}
    >
      <div className="pagination-footer">
        <AntPagination
          current={currentPage}
          total={totalTasks}
          pageSize={itemsPerPage}
          showSizeChanger
          pageSizeOptions={[5, 10, 15, 20]}
          showTotal={(total, range) =>
            `Showing ${range[0]}–${range[1]} of ${total} tasks`
          }
          onChange={(page, pageSize) => {
            if (pageSize !== itemsPerPage) {
              onPageSizeChange(pageSize);
            } else {
              onPageChange(page);
            }
          }}
        />
      </div>
    </ConfigProvider>
  );
}
