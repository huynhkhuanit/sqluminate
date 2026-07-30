import type { SqlDialect } from "@/lib/sql/dialects";

export interface SqlExample {
  id: string;
  title: string;
  learningObjective: string;
  dialect: SqlDialect;
  sql: string;
}

export const POSTGRESQL_EXAMPLE: SqlExample = {
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
};
