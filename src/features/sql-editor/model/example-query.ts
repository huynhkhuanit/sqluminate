import type { SqlDialect } from "@/lib/sql/dialects";

export interface SqlExample {
  id: string;
  title: string;
  learningObjective: string;
  dialect: SqlDialect;
  sql: string;
}

export const SQL_EXAMPLES: Record<SqlDialect, SqlExample> = {
  postgresql: {
    id: "postgresql-customer-order-totals",
    title: "Customer order totals",
    learningObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    dialect: "postgresql",
    sql: `select
  c.name as customer_name,
  count(o.id) as order_count,
  sum(o.total_amount) as total_spend
from customers c
inner join orders o on o.customer_id = c.id
where o.status = 'paid'
group by c.id, c.name
having sum(o.total_amount) > 500
order by total_spend desc
limit 10;`,
  },
  mysql: {
    id: "mysql-customer-order-totals",
    title: "Customer order totals",
    learningObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    dialect: "mysql",
    sql: `select
  c.name as customer_name,
  count(o.id) as order_count,
  sum(o.total_amount) as total_spend
from customers as c
inner join orders as o on o.customer_id = c.id
where o.status = 'paid'
group by c.id, c.name
having sum(o.total_amount) > 500
order by total_spend desc
limit 10;`,
  },
  sqlite: {
    id: "sqlite-customer-order-totals",
    title: "Customer order totals",
    learningObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    dialect: "sqlite",
    sql: `select
  c.name as customer_name,
  count(o.id) as order_count,
  sum(o.total_amount) as total_spend
from customers c
join orders o on o.customer_id = c.id
where o.status = 'paid'
group by c.id, c.name
having sum(o.total_amount) > 500
order by total_spend desc
limit 10;`,
  },
  sqlserver: {
    id: "sqlserver-customer-order-totals",
    title: "Customer order totals",
    learningObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    dialect: "sqlserver",
    sql: `select top 10
  c.name as customer_name,
  count(o.id) as order_count,
  sum(o.total_amount) as total_spend
from dbo.customers as c
inner join dbo.orders as o on o.customer_id = c.id
where o.status = 'paid'
group by c.id, c.name
having sum(o.total_amount) > 500
order by total_spend desc;`,
  },
  oracle: {
    id: "oracle-customer-order-totals",
    title: "Customer order totals",
    learningObjective:
      "Practice joins, filtering, aggregation, grouping, and sorting.",
    dialect: "oracle",
    sql: `select
  c.name as customer_name,
  count(o.id) as order_count,
  sum(o.total_amount) as total_spend
from customers c
inner join orders o on o.customer_id = c.id
where o.status = 'paid'
group by c.id, c.name
having sum(o.total_amount) > 500
order by total_spend desc
fetch first 10 rows only;`,
  },
};

export const POSTGRESQL_EXAMPLE = SQL_EXAMPLES.postgresql;
