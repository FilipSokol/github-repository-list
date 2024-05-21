import "./styles.scss";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Repository } from "../../types/repository";
import Link from "antd/es/typography/Link";

type Props = {
  data: Repository;
  isStarred: boolean;
  handleStar: (repository: Repository) => void;
};

function ListItem(props: Props) {
  const { data, isStarred, handleStar } = props;

  return (
    <article className="listItem">
      <div className="itemImage">
        <img src={data.owner.avatar_url} alt={`${data.owner.login} avatar`} />
      </div>
      <div className="itemContext">
        <div className="itemName">
          <Link className="itemLink" href={data.html_url} target="_blank">
            {data.name}
          </Link>
          <span className="itemStarCount">
            {data.stargazers_count}
            <StarFilled className="countIcon" />
          </span>
        </div>
        <div className="itemDescription">{data.description || "-"}</div>
      </div>
      <div className="itemButton">
        <Button onClick={() => handleStar(data)}>
          {isStarred ? (
            <StarFilled className="activeStarIcon" />
          ) : (
            <StarOutlined />
          )}
        </Button>
      </div>
    </article>
  );
}

export default ListItem;
