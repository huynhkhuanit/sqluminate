export type Locale = "en" | "vi" | "zh";

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "sqluminate-locale";
export const LOCALE_STORAGE_KEY = "sqluminate-locale";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "vi", "zh"];

export interface LocaleOption {
  value: Locale;
  flag: string;
  nativeLabel: string;
}

export const LOCALE_OPTIONS: readonly LocaleOption[] = [
  { value: "en", flag: "🇬🇧", nativeLabel: "English" },
  { value: "vi", flag: "🇻🇳", nativeLabel: "Tiếng Việt" },
  { value: "zh", flag: "🇨🇳", nativeLabel: "中文" },
];

export const englishDictionary = {
  metadata: {
    siteTitle: "SQLuminate | Visual SQL Explorer",
    siteDescription:
      "An open-source web app that makes SQL query structure easier to understand.",
    workspaceTitle: "Workspace | SQLuminate",
    workspaceDescription:
      "Write and format SQL locally in your browser with SQLuminate.",
  },
  language: {
    label: "Language",
    switchTo: "Switch language",
  },
  dialects: {
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    sqlite: "SQLite",
    sqlserver: "SQL Server",
    oracle: "Oracle",
  },
  landing: {
    skipToContent: "Skip to content",
    header: {
      brandDescriptor: "VISUAL SQL EXPLORER",
      compactBrandDescriptor: "Visual SQL Explorer",
      homeLabel: "SQLuminate home",
      primaryNavigation: "Primary navigation",
      howItWorks: "How it works",
      capabilities: "Capabilities",
      openSource: "Open source",
      github: "GitHub",
      openWorkspace: "Open workspace",
      workspaceShort: "Workspace",
      menu: "Menu",
      navigationMenu: "Navigation menu",
      mobileNavigation: "Mobile navigation",
    },
    hero: {
      eyebrow: ["OPEN SOURCE", "LOCAL-FIRST", "MULTI-DIALECT SQL"],
      titleStart: "Visualize SQL.",
      titleHighlight: "Understand every query.",
      titleAria: "Visualize SQL. Understand every query.",
      body: "Write and format SQL locally across popular dialects. Query structure and visualization are the next open-source milestones.",
      openEditor: "Open editor",
      viewRoadmap: "View roadmap",
    },
    demo: {
      fileName: "customer-orders.sql",
      localOnly: "LOCAL ONLY",
      previewMode: "Query preview mode",
      before: "Before",
      formatted: "Formatted",
      formatExample: "Format example",
      formatting: "Formatting...",
      sampleQuery: "sample query",
      testedExample: "TESTED EXAMPLE",
      title: "Customer order totals",
      description:
        "A small query that covers joins, filtering, aggregation, grouping, and sorting.",
      dialect: "Dialect",
      processing: "Processing",
      inBrowser: "In browser",
      database: "Database",
      notConnected: "Not connected",
      previewAria: "example preview",
      ready: "Ready to format locally.",
      formattingLocally: "Formatting locally...",
      formattedLocally: "Formatted locally.",
      formatFirst: "Format the example first.",
      showingFormatted: "Showing the locally formatted query.",
      showingOriginal: "Showing the original sample.",
      formatterUnavailable: "The local formatter is unavailable. Try again.",
    },
    trust: {
      ariaLabel: "Product principles",
      processedLocally: "Processed locally",
      sqlNeverExecuted: "SQL is never executed",
      noAccount: "No account required",
      mitLicensed: "MIT licensed",
    },
    howItWorks: {
      title: "From SQL text to an understandable model",
      body: "A focused path from a working query to clearer structure, with each milestone labeled by what exists today.",
      steps: {
        write: {
          title: "Write or load a tested query.",
          description:
            "Paste SQL or start with a tested example in the workspace.",
          sqlText: "SQL text",
        },
        understand: {
          title: "Parse locally into owned types.",
          description:
            "Build a reliable boundary before the visual layers arrive.",
          astBoundary: "AST boundary",
          ownedTypes: "Owned types",
        },
        explore: {
          title: "Inspect and learn from the query.",
          description:
            "Explore structure, joins, and logical steps as the MVP grows.",
          from: "FROM",
          join: "JOIN",
          where: "WHERE",
          select: "SELECT",
        },
      },
    },
    capabilities: {
      title: "What works today",
      body: "The landing page stays honest about the boundary between the editor that exists and the visual model still being built.",
      groups: {
        availableNow: "Available now",
        inProgress: "In progress",
        planned: "Planned for MVP",
      },
      statuses: {
        available: "Available",
        inProgress: "In progress",
        planned: "Planned",
      },
      items: {
        monaco: {
          title: "Monaco SQL editor",
          description:
            "SQL syntax highlighting and line numbers in the workspace.",
        },
        formatting: {
          title: "Multi-dialect formatting",
          description:
            "Format supported SQL dialects locally with sql-formatter.",
        },
        persistence: {
          title: "Local query persistence",
          description: "Restore the current SQL from browser storage.",
        },
        themes: {
          title: "Light and dark workspace",
          description:
            "Choose the editor theme without sending query text away.",
        },
        examples: {
          title: "Tested examples",
          description:
            "Start with SQL examples built for learning across dialects.",
        },
        parser: {
          title: "Parser boundary",
          description:
            "Normalize parser output before visual features depend on it.",
        },
        diagnostics: {
          title: "Structured diagnostics",
          description:
            "Return typed syntax and support messages with locations.",
        },
        structure: {
          title: "Query Structure",
          description: "Inspect SELECT, FROM, JOIN, and clause boundaries.",
        },
        graph: {
          title: "JOIN Graph",
          description:
            "Map sources and join predicates without implying constraints.",
        },
        flow: {
          title: "Logical Flow",
          description: "Read a simplified educational clause sequence.",
        },
        export: {
          title: "SVG and PNG export",
          description: "Take a local visualization with you.",
        },
        gallery: {
          title: "Example gallery",
          description: "Learn with tested examples across supported syntax.",
        },
      },
    },
    openSource: {
      title: "Built in the open",
      body: "SQLuminate keeps the first milestone small, auditable, and useful without authentication, a backend, a database, or an AI provider.",
      viewSource: "View source",
      readContributing: "Read contributing guide",
      repositoryStatus: "Repository status",
      repositoryLabel: "repository / sqluminate",
      license: "MIT License",
      facts: {
        nextMilestone: "Next milestone",
        parserBoundary: "Parser boundary",
        currentDialect: "Current dialect",
        multiDialect: "Multi-dialect formatting",
        queryHandling: "Query handling",
        localByDefault: "Local by default",
      },
      privacy: {
        label: "PRIVACY",
        text: "SQL is processed in the browser. No query logging is included.",
      },
      limitations: {
        label: "LIMITATIONS",
        text: "The current milestone formats and edits SQL. It does not parse, execute, or visualize a query yet.",
      },
    },
    cta: {
      title: "Make SQL easier to reason about.",
      body: "Open the editor, load an example, and explore the project as it grows.",
      openWorkspace: "Open workspace",
      viewGithub: "View on GitHub",
      signalProduct: "SQLuminate",
      signalStatus: "LOCAL / OPEN",
    },
    footer: {
      tagline: "Visualize SQL. Understand every query.",
      navigation: "Footer navigation",
      docs: "Docs",
      privacy: "Privacy",
      limitations: "Limitations",
      contributing: "Contributing",
      github: "GitHub",
      mitLicense: "MIT License",
      note: "SQL processed locally. No query logging.",
    },
  },
  workspace: {
    brandDescriptor: "Visual SQL Explorer",
    localFirst: "Local-first workspace",
    theme: {
      switchToLight: "Switch to light theme",
      switchToDark: "Switch to dark theme",
    },
    title: "Understand SQL from the query outward.",
    description:
      "Write and format SQL in your browser across popular dialects. Parsing and visualization are intentionally outside this first milestone.",
    editor: "SQL editor",
    dialect: "Dialect",
    format: "Format",
    formatTitle: "Format SQL (Ctrl+Shift+F)",
    loadExample: "Load example",
    clear: "Clear",
    persistence: {
      restoring: "Restoring saved query",
      saving: "Saving locally",
      saved: "Saved locally",
      unavailable: "Local save unavailable",
    },
    characters: "characters",
    empty: {
      title: "Start with a query",
      description: "Write SQL in the editor or load a tested example.",
    },
    private: {
      title: "Private by default",
      description:
        "Your SQL stays in this browser. It is formatted locally and never executed.",
    },
    facts: {
      editor: "Editor",
      editorValue: "Monaco with SQL highlighting and line numbers",
      dialectSupport: "Dialect support",
      dialectValue:
        "Formatting for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle",
      limitation: "Current limitation",
      limitationValue: "SQL is not parsed, visualized, or sent to a database",
    },
    learningObjective: "Example learning objective",
    exampleObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    feedback: {
      ready: "Ready for local editing.",
      addSql: "Add SQL before formatting.",
      formattingFailed: "Formatting failed.",
      formatted: "Query formatted locally.",
      queryTooLong:
        "Queries are limited to 100,000 characters for browser safety.",
      editing: "Editing locally.",
      loadedExample: "Loaded example:",
      cleared: "Editor cleared.",
    },
    footer: {
      localNotice: "SQL is processed locally and is not executed.",
      milestones: "Milestones 0 and 1",
    },
  },
} as const;

type WidenDictionaryValue<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenDictionaryValue<Item>[]
    : T extends object
      ? { [Key in keyof T]: WidenDictionaryValue<T[Key]> }
      : T;

export type AppDictionary = WidenDictionaryValue<typeof englishDictionary>;

export const vietnameseDictionary = {
  metadata: {
    siteTitle: "SQLuminate | Trình khám phá SQL trực quan",
    siteDescription:
      "Ứng dụng web mã nguồn mở giúp cấu trúc truy vấn SQL dễ hiểu hơn.",
    workspaceTitle: "Workspace | SQLuminate",
    workspaceDescription:
      "Viết và định dạng SQL cục bộ ngay trong trình duyệt với SQLuminate.",
  },
  language: { label: "Ngôn ngữ", switchTo: "Đổi ngôn ngữ" },
  dialects: {
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    sqlite: "SQLite",
    sqlserver: "SQL Server",
    oracle: "Oracle",
  },
  landing: {
    skipToContent: "Bỏ qua đến nội dung",
    header: {
      brandDescriptor: "TRÌNH KHÁM PHÁ SQL TRỰC QUAN",
      compactBrandDescriptor: "Trình khám phá SQL trực quan",
      homeLabel: "Trang chủ SQLuminate",
      primaryNavigation: "Điều hướng chính",
      howItWorks: "Cách hoạt động",
      capabilities: "Tính năng",
      openSource: "Mã nguồn mở",
      github: "GitHub",
      openWorkspace: "Mở workspace",
      workspaceShort: "Workspace",
      menu: "Menu",
      navigationMenu: "Menu điều hướng",
      mobileNavigation: "Điều hướng trên di động",
    },
    hero: {
      eyebrow: ["MÃ NGUỒN MỞ", "LOCAL-FIRST", "SQL ĐA DIALECT"],
      titleStart: "Trực quan hóa SQL.",
      titleHighlight: "Hiểu mọi truy vấn.",
      titleAria: "Trực quan hóa SQL. Hiểu mọi truy vấn.",
      body: "Viết và định dạng SQL cục bộ với nhiều dialect phổ biến. Cấu trúc truy vấn và trực quan hóa là các cột mốc mã nguồn mở tiếp theo.",
      openEditor: "Mở trình soạn thảo",
      viewRoadmap: "Xem lộ trình",
    },
    demo: {
      fileName: "customer-orders.sql",
      localOnly: "CHỈ CỤC BỘ",
      previewMode: "Chế độ xem trước truy vấn",
      before: "Trước",
      formatted: "Đã định dạng",
      formatExample: "Định dạng ví dụ",
      formatting: "Đang định dạng...",
      sampleQuery: "truy vấn mẫu",
      testedExample: "VÍ DỤ ĐÃ KIỂM THỬ",
      title: "Tổng đơn hàng theo khách",
      description:
        "Một truy vấn nhỏ bao quát join, lọc, tổng hợp, nhóm và sắp xếp.",
      dialect: "Dialect",
      processing: "Xử lý",
      inBrowser: "Trong trình duyệt",
      database: "Cơ sở dữ liệu",
      notConnected: "Chưa kết nối",
      previewAria: "Xem trước ví dụ SQL",
      ready: "Sẵn sàng định dạng cục bộ.",
      formattingLocally: "Đang định dạng cục bộ...",
      formattedLocally: "Đã định dạng cục bộ.",
      formatFirst: "Hãy định dạng ví dụ trước.",
      showingFormatted: "Đang hiển thị truy vấn đã định dạng cục bộ.",
      showingOriginal: "Đang hiển thị mẫu ban đầu.",
      formatterUnavailable: "Bộ định dạng cục bộ không khả dụng. Hãy thử lại.",
    },
    trust: {
      ariaLabel: "Nguyên tắc sản phẩm",
      processedLocally: "Xử lý cục bộ",
      sqlNeverExecuted: "SQL không bao giờ được thực thi",
      noAccount: "Không cần tài khoản",
      mitLicensed: "Giấy phép MIT",
    },
    howItWorks: {
      title: "Từ văn bản SQL đến mô hình dễ hiểu",
      body: "Một lộ trình tập trung từ truy vấn đang chạy đến cấu trúc rõ ràng hơn, với từng cột mốc được ghi rõ trạng thái.",
      steps: {
        write: {
          title: "Viết hoặc tải truy vấn đã kiểm thử.",
          description:
            "Dán SQL hoặc bắt đầu với ví dụ đã kiểm thử trong workspace.",
          sqlText: "Văn bản SQL",
        },
        understand: {
          title: "Phân tích cục bộ thành kiểu dữ liệu riêng.",
          description:
            "Xây dựng ranh giới đáng tin cậy trước khi thêm lớp trực quan.",
          astBoundary: "Ranh giới AST",
          ownedTypes: "Kiểu dữ liệu riêng",
        },
        explore: {
          title: "Kiểm tra và học từ truy vấn.",
          description:
            "Khám phá cấu trúc, join và các bước logic khi MVP phát triển.",
          from: "FROM",
          join: "JOIN",
          where: "WHERE",
          select: "SELECT",
        },
      },
    },
    capabilities: {
      title: "Đang hoạt động hôm nay",
      body: "Landing page phân biệt rõ ràng giữa trình soạn thảo đã có và mô hình trực quan đang được xây dựng.",
      groups: {
        availableNow: "Đã có",
        inProgress: "Đang thực hiện",
        planned: "Dự kiến cho MVP",
      },
      statuses: {
        available: "Đã có",
        inProgress: "Đang thực hiện",
        planned: "Dự kiến",
      },
      items: {
        monaco: {
          title: "Trình soạn thảo Monaco SQL",
          description: "Tô sáng cú pháp SQL và đánh số dòng trong workspace.",
        },
        formatting: {
          title: "Định dạng đa dialect",
          description:
            "Định dạng các dialect SQL được hỗ trợ cục bộ với sql-formatter.",
        },
        persistence: {
          title: "Lưu truy vấn cục bộ",
          description: "Khôi phục SQL hiện tại từ bộ nhớ trình duyệt.",
        },
        themes: {
          title: "Workspace sáng và tối",
          description:
            "Chọn giao diện trình soạn thảo mà không gửi truy vấn đi.",
        },
        examples: {
          title: "Ví dụ đã kiểm thử",
          description:
            "Bắt đầu với các ví dụ SQL phục vụ việc học trên nhiều dialect.",
        },
        parser: {
          title: "Ranh giới parser",
          description:
            "Chuẩn hóa đầu ra parser trước khi lớp trực quan sử dụng.",
        },
        diagnostics: {
          title: "Chẩn đoán có cấu trúc",
          description:
            "Trả về thông báo cú pháp và mức hỗ trợ có kiểu dữ liệu rõ ràng.",
        },
        structure: {
          title: "Cấu trúc truy vấn",
          description: "Kiểm tra ranh giới SELECT, FROM, JOIN và các mệnh đề.",
        },
        graph: {
          title: "Đồ thị JOIN",
          description:
            "Ánh xạ nguồn và điều kiện join mà không suy diễn ràng buộc.",
        },
        flow: {
          title: "Luồng logic",
          description: "Đọc chuỗi mệnh đề logic đơn giản phục vụ học tập.",
        },
        export: {
          title: "Xuất SVG và PNG",
          description: "Mang trực quan hóa cục bộ theo bạn.",
        },
        gallery: {
          title: "Thư viện ví dụ",
          description: "Học qua các ví dụ đã kiểm thử với cú pháp được hỗ trợ.",
        },
      },
    },
    openSource: {
      title: "Xây dựng công khai",
      body: "SQLuminate giữ cột mốc đầu tiên nhỏ gọn, có thể kiểm tra và hữu ích mà không cần đăng nhập, backend, cơ sở dữ liệu hay nhà cung cấp AI.",
      viewSource: "Xem mã nguồn",
      readContributing: "Đọc hướng dẫn đóng góp",
      repositoryStatus: "Trạng thái repository",
      repositoryLabel: "repository / sqluminate",
      license: "Giấy phép MIT",
      facts: {
        nextMilestone: "Cột mốc tiếp theo",
        parserBoundary: "Ranh giới parser",
        currentDialect: "Dialect hiện tại",
        multiDialect: "Định dạng đa dialect",
        queryHandling: "Xử lý truy vấn",
        localByDefault: "Mặc định cục bộ",
      },
      privacy: {
        label: "RIÊNG TƯ",
        text: "SQL được xử lý trong trình duyệt. Không có ghi log truy vấn.",
      },
      limitations: {
        label: "GIỚI HẠN",
        text: "Cột mốc hiện tại định dạng và chỉnh sửa SQL. Truy vấn chưa được phân tích, thực thi hoặc trực quan hóa.",
      },
    },
    cta: {
      title: "Giúp SQL dễ suy luận hơn.",
      body: "Mở trình soạn thảo, tải một ví dụ và khám phá dự án khi nó phát triển.",
      openWorkspace: "Mở workspace",
      viewGithub: "Xem trên GitHub",
      signalProduct: "SQLuminate",
      signalStatus: "CỤC BỘ / MỞ",
    },
    footer: {
      tagline: "Trực quan hóa SQL. Hiểu mọi truy vấn.",
      navigation: "Điều hướng chân trang",
      docs: "Tài liệu",
      privacy: "Riêng tư",
      limitations: "Giới hạn",
      contributing: "Đóng góp",
      github: "GitHub",
      mitLicense: "Giấy phép MIT",
      note: "SQL được xử lý cục bộ. Không ghi log truy vấn.",
    },
  },
  workspace: {
    brandDescriptor: "Trình khám phá SQL trực quan",
    localFirst: "Workspace local-first",
    theme: {
      switchToLight: "Chuyển sang giao diện sáng",
      switchToDark: "Chuyển sang giao diện tối",
    },
    title: "Hiểu SQL từ chính truy vấn.",
    description:
      "Viết và định dạng SQL trong trình duyệt với các dialect phổ biến. Phân tích và trực quan hóa được chủ động để ngoài cột mốc đầu tiên.",
    editor: "Trình soạn thảo SQL",
    dialect: "Dialect",
    format: "Định dạng",
    formatTitle: "Định dạng SQL (Ctrl+Shift+F)",
    loadExample: "Tải ví dụ",
    clear: "Xóa",
    persistence: {
      restoring: "Đang khôi phục truy vấn đã lưu",
      saving: "Đang lưu cục bộ",
      saved: "Đã lưu cục bộ",
      unavailable: "Không thể lưu cục bộ",
    },
    characters: "ký tự",
    empty: {
      title: "Bắt đầu với một truy vấn",
      description:
        "Viết SQL trong trình soạn thảo hoặc tải một ví dụ đã kiểm thử.",
    },
    private: {
      title: "Riêng tư theo mặc định",
      description:
        "SQL của bạn ở lại trong trình duyệt. Nó được định dạng cục bộ và không bao giờ thực thi.",
    },
    facts: {
      editor: "Trình soạn thảo",
      editorValue: "Monaco với tô sáng SQL và đánh số dòng",
      dialectSupport: "Hỗ trợ dialect",
      dialectValue: "Định dạng PostgreSQL, MySQL, SQLite, SQL Server và Oracle",
      limitation: "Giới hạn hiện tại",
      limitationValue:
        "SQL chưa được phân tích, trực quan hóa hoặc gửi đến cơ sở dữ liệu",
    },
    learningObjective: "Mục tiêu học tập của ví dụ",
    exampleObjective: "Thực hành join, lọc, tổng hợp, nhóm và sắp xếp.",
    feedback: {
      ready: "Sẵn sàng chỉnh sửa cục bộ.",
      addSql: "Thêm SQL trước khi định dạng.",
      formattingFailed: "Định dạng thất bại.",
      formatted: "Đã định dạng truy vấn cục bộ.",
      queryTooLong:
        "Truy vấn bị giới hạn 100.000 ký tự để đảm bảo an toàn trình duyệt.",
      editing: "Đang chỉnh sửa cục bộ.",
      loadedExample: "Đã tải ví dụ:",
      cleared: "Đã xóa trình soạn thảo.",
    },
    footer: {
      localNotice: "SQL được xử lý cục bộ và không được thực thi.",
      milestones: "Cột mốc 0 và 1",
    },
  },
} satisfies AppDictionary;

export const chineseDictionary = {
  metadata: {
    siteTitle: "SQLuminate | 可视化 SQL 探索器",
    siteDescription: "帮助理解 SQL 查询结构的开源 Web 应用。",
    workspaceTitle: "工作区 | SQLuminate",
    workspaceDescription: "在浏览器中本地编写和格式化 SQL。",
  },
  language: { label: "语言", switchTo: "切换语言" },
  dialects: {
    postgresql: "PostgreSQL",
    mysql: "MySQL",
    sqlite: "SQLite",
    sqlserver: "SQL Server",
    oracle: "Oracle",
  },
  landing: {
    skipToContent: "跳转到内容",
    header: {
      brandDescriptor: "可视化 SQL 探索器",
      compactBrandDescriptor: "可视化 SQL 探索器",
      homeLabel: "SQLuminate 首页",
      primaryNavigation: "主要导航",
      howItWorks: "工作方式",
      capabilities: "功能",
      openSource: "开源项目",
      github: "GitHub",
      openWorkspace: "打开工作区",
      workspaceShort: "工作区",
      menu: "菜单",
      navigationMenu: "导航菜单",
      mobileNavigation: "移动端导航",
    },
    hero: {
      eyebrow: ["开源", "本地优先", "多 SQL 方言"],
      titleStart: "可视化 SQL。",
      titleHighlight: "理解每一条查询。",
      titleAria: "可视化 SQL。理解每一条查询。",
      body: "在本地编写并格式化多种常见 SQL 方言。查询结构和可视化是接下来的开源里程碑。",
      openEditor: "打开编辑器",
      viewRoadmap: "查看路线图",
    },
    demo: {
      fileName: "customer-orders.sql",
      localOnly: "仅本地",
      previewMode: "查询预览模式",
      before: "格式化前",
      formatted: "已格式化",
      formatExample: "格式化示例",
      formatting: "格式化中...",
      sampleQuery: "示例查询",
      testedExample: "已测试示例",
      title: "客户订单总额",
      description: "一个涵盖连接、筛选、聚合、分组和排序的小型查询。",
      dialect: "方言",
      processing: "处理方式",
      inBrowser: "浏览器内",
      database: "数据库",
      notConnected: "未连接",
      previewAria: "SQL 示例预览",
      ready: "准备在本地格式化。",
      formattingLocally: "正在本地格式化...",
      formattedLocally: "已在本地格式化。",
      formatFirst: "请先格式化示例。",
      showingFormatted: "正在显示本地格式化后的查询。",
      showingOriginal: "正在显示原始示例。",
      formatterUnavailable: "本地格式化器不可用，请重试。",
    },
    trust: {
      ariaLabel: "产品原则",
      processedLocally: "本地处理",
      sqlNeverExecuted: "SQL 从不执行",
      noAccount: "无需账户",
      mitLicensed: "MIT 许可证",
    },
    howItWorks: {
      title: "从 SQL 文本到易懂模型",
      body: "从可运行查询到清晰结构的专注路径，每个里程碑都明确标注当前状态。",
      steps: {
        write: {
          title: "编写或加载已测试的查询。",
          description: "粘贴 SQL，或从工作区的测试示例开始。",
          sqlText: "SQL 文本",
        },
        understand: {
          title: "在本地转换为自有类型。",
          description: "在构建可视化层之前建立可靠的边界。",
          astBoundary: "AST 边界",
          ownedTypes: "自有类型",
        },
        explore: {
          title: "检查并学习查询。",
          description: "随着 MVP 成长，探索结构、连接和逻辑步骤。",
          from: "FROM",
          join: "JOIN",
          where: "WHERE",
          select: "SELECT",
        },
      },
    },
    capabilities: {
      title: "当前可用功能",
      body: "Landing page 清楚区分已经存在的编辑器与仍在建设中的可视化模型。",
      groups: {
        availableNow: "当前可用",
        inProgress: "进行中",
        planned: "MVP 计划",
      },
      statuses: {
        available: "可用",
        inProgress: "进行中",
        planned: "计划中",
      },
      items: {
        monaco: {
          title: "Monaco SQL 编辑器",
          description: "在工作区提供 SQL 语法高亮和行号。",
        },
        formatting: {
          title: "多方言格式化",
          description: "使用 sql-formatter 在本地格式化受支持的 SQL 方言。",
        },
        persistence: {
          title: "本地查询持久化",
          description: "从浏览器存储恢复当前 SQL。",
        },
        themes: {
          title: "明暗工作区",
          description: "选择编辑器主题，无需发送查询文本。",
        },
        examples: {
          title: "已测试示例",
          description: "从适合学习的多方言 SQL 示例开始。",
        },
        parser: {
          title: "解析器边界",
          description: "在可视化功能使用前规范化解析器输出。",
        },
        diagnostics: {
          title: "结构化诊断",
          description: "返回带位置的类型化语法和支持信息。",
        },
        structure: {
          title: "查询结构",
          description: "检查 SELECT、FROM、JOIN 和子句边界。",
        },
        graph: {
          title: "JOIN 图",
          description: "映射来源和连接条件，不推断数据库约束。",
        },
        flow: {
          title: "逻辑流程",
          description: "阅读简化的教学型子句顺序。",
        },
        export: {
          title: "SVG 和 PNG 导出",
          description: "带走本地生成的可视化结果。",
        },
        gallery: {
          title: "示例库",
          description: "通过受支持语法的测试示例学习。",
        },
      },
    },
    openSource: {
      title: "开放构建",
      body: "SQLuminate 的第一个里程碑保持小巧、可审计，并且无需账户、后端、数据库或 AI 服务即可使用。",
      viewSource: "查看源码",
      readContributing: "阅读贡献指南",
      repositoryStatus: "仓库状态",
      repositoryLabel: "repository / sqluminate",
      license: "MIT 许可证",
      facts: {
        nextMilestone: "下一里程碑",
        parserBoundary: "解析器边界",
        currentDialect: "当前方言",
        multiDialect: "多方言格式化",
        queryHandling: "查询处理",
        localByDefault: "默认本地处理",
      },
      privacy: {
        label: "隐私",
        text: "SQL 在浏览器中处理，不记录查询内容。",
      },
      limitations: {
        label: "限制",
        text: "当前里程碑支持格式化和编辑 SQL，尚未解析、执行或可视化查询。",
      },
    },
    cta: {
      title: "让 SQL 更容易理解。",
      body: "打开编辑器，加载一个示例，随着项目成长持续探索。",
      openWorkspace: "打开工作区",
      viewGithub: "在 GitHub 查看",
      signalProduct: "SQLuminate",
      signalStatus: "本地 / 开源",
    },
    footer: {
      tagline: "可视化 SQL。理解每一条查询。",
      navigation: "页脚导航",
      docs: "文档",
      privacy: "隐私",
      limitations: "限制",
      contributing: "贡献",
      github: "GitHub",
      mitLicense: "MIT 许可证",
      note: "SQL 在本地处理，不记录查询。",
    },
  },
  workspace: {
    brandDescriptor: "可视化 SQL 探索器",
    localFirst: "本地优先工作区",
    theme: {
      switchToLight: "切换到浅色主题",
      switchToDark: "切换到深色主题",
    },
    title: "从查询本身理解 SQL。",
    description:
      "在浏览器中使用常见方言编写和格式化 SQL。解析和可视化明确不属于第一个里程碑。",
    editor: "SQL 编辑器",
    dialect: "方言",
    format: "格式化",
    formatTitle: "格式化 SQL (Ctrl+Shift+F)",
    loadExample: "加载示例",
    clear: "清除",
    persistence: {
      restoring: "正在恢复已保存查询",
      saving: "正在本地保存",
      saved: "已在本地保存",
      unavailable: "无法本地保存",
    },
    characters: "个字符",
    empty: {
      title: "从查询开始",
      description: "在编辑器中编写 SQL，或加载一个已测试示例。",
    },
    private: {
      title: "默认私密",
      description: "SQL 保留在浏览器中，在本地格式化且从不执行。",
    },
    facts: {
      editor: "编辑器",
      editorValue: "Monaco，支持 SQL 高亮和行号",
      dialectSupport: "方言支持",
      dialectValue:
        "支持 PostgreSQL、MySQL、SQLite、SQL Server 和 Oracle 格式化",
      limitation: "当前限制",
      limitationValue: "SQL 尚未解析、可视化或发送到数据库",
    },
    learningObjective: "示例学习目标",
    exampleObjective: "练习连接、筛选、聚合、分组和排序。",
    feedback: {
      ready: "准备进行本地编辑。",
      addSql: "格式化前请先添加 SQL。",
      formattingFailed: "格式化失败。",
      formatted: "查询已在本地格式化。",
      queryTooLong: "为保证浏览器安全，查询限制为 100,000 个字符。",
      editing: "正在本地编辑。",
      loadedExample: "已加载示例：",
      cleared: "编辑器已清除。",
    },
    footer: {
      localNotice: "SQL 在本地处理，不会执行。",
      milestones: "里程碑 0 和 1",
    },
  },
} satisfies AppDictionary;

const dictionaries: Record<Locale, AppDictionary> = {
  en: englishDictionary,
  vi: vietnameseDictionary,
  zh: chineseDictionary,
};

export function normalizeLocale(value: string | undefined | null): Locale {
  if (!value) {
    return DEFAULT_LOCALE;
  }

  const normalizedValue = value.toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(normalizedValue as Locale)
    ? (normalizedValue as Locale)
    : DEFAULT_LOCALE;
}

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}

export function getDictionaryValue(
  dictionary: AppDictionary,
  path: string,
): string {
  const value = path.split(".").reduce<unknown>((currentValue, key) => {
    if (
      typeof currentValue !== "object" ||
      currentValue === null ||
      !(key in currentValue)
    ) {
      return undefined;
    }

    return (currentValue as Record<string, unknown>)[key];
  }, dictionary);

  return typeof value === "string" ? value : path;
}
