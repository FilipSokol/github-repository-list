import { SearchOutlined } from "@ant-design/icons";
import { DisplayMode } from "../../types/settings";
import "./styles.scss";
import { Button, Select } from "antd";
import { Language } from "../../types/repository";

type Props = {
  setDisplayMode: React.Dispatch<React.SetStateAction<DisplayMode>>;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string>>;
  languages: Language[];
};

function TopBar(props: Props) {
  const { setDisplayMode, setSelectedLanguage, languages } = props;

  const prepareLanguageOptions = () => {
    if (languages.length) {
      const options = languages.map(({ name }) => ({ value: name }));
      return options;
    }

    return [];
  };

  const languageOptions = prepareLanguageOptions();

  return (
    <header className="topbar">
      <Select
        showSearch
        allowClear
        className="languageInput"
        placeholder="Language"
        optionFilterProp="children"
        suffixIcon={<SearchOutlined />}
        options={languageOptions}
        onChange={(option: string) => setSelectedLanguage(option)}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      <section className="filterButtons">
        <Button type="primary" onClick={() => setDisplayMode("all")}>
          Last popular repositories
        </Button>
        <Button type="primary" onClick={() => setDisplayMode("starred")}>
          Favourite repositories
        </Button>
      </section>
    </header>
  );
}

export default TopBar;
