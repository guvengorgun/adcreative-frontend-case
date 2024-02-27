import { useState } from 'react';
import Select, { OptionProps, components, InputActionMeta, MultiValue } from 'react-select';
import { Character } from 'rickmortyapi';
import styled from 'styled-components';

import './styles.css';

const StyledOptionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    margin-right: 16px;
    border-radius: 20%;
  }
  .option-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #475569;
    font-size: 20px;
    font-weight: 400;
    .light-text {
      font-weight: 300;
      font-size: 18px;
    }
    b {
      font-weight: bold;
      font-size: 22px;
    }
  }
  .input-checkbox {
    width: 16px;
    height: 16px;
    margin-right: 12px;
    border: 3px solid #000;
    border-radius: 4px;
  }
`;

const Option = (props: OptionProps<Character>) => {
  const { data, isSelected, selectProps, ...rest } = props;
  const makeBold = (text: string, query: string) => {
    const resultPosition = text.toLowerCase().indexOf(query.toLowerCase());
    if (resultPosition === -1) {
      return text;
    }
    return (
      text.substring(0, resultPosition) +
      '<b>' +
      text.substring(resultPosition, resultPosition + query.length) +
      '</b>' +
      text.substring(resultPosition + query.length)
    );
  };
  return (
    <components.Option data={data} isSelected={false} selectProps={selectProps} {...rest}>
      <StyledOptionContent>
        <input className="input-checkbox" type="checkbox" checked={isSelected} readOnly />
        <img src={data.image} alt={data.name} width={50} height={50} />
        <div className="option-text">
          <span dangerouslySetInnerHTML={{ __html: makeBold(data.name, selectProps.searchText) }} />
          <span className="light-text">{`${data.episode.length} Episodes`}</span>
        </div>
      </StyledOptionContent>
    </components.Option>
  );
};

type MultiSelectProps = {
  options: Character[];
  value: Character[];
  onInputChange: (inputValue: string, actionMeta: InputActionMeta) => void;
  onChange: (selected: MultiValue<Character>) => void;
  loading?: boolean;
};

function MultiSelect({ options, value, onInputChange, onChange, loading }: MultiSelectProps) {
  const [searchText, setSearchText] = useState<string>('');
  const handleInputChange = (inputValue: string, actionMeta: InputActionMeta) => {
    setSearchText(inputValue);
    onInputChange(inputValue, actionMeta);
  };
  return (
    <Select
      value={value}
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(selected) => onChange(selected)}
      onInputChange={handleInputChange}
      components={{ Option }}
      searchText={searchText}
      isLoading={loading}
      // Disable the built-in filtering and use our custom filter
      filterOption={() => {
        return true;
      }}
      // menuIsOpen={true}
      closeMenuOnSelect={false}
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id.toString()}
      hideSelectedOptions={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '12px',
          border: '1px solid #94a3b8',
          padding: '2px',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '12px',
          border: '1px solid #94a3b8',
          backgroundColor: '#f9fafc',

          padding: '4px',
          zIndex: 100,
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          padding: '8px',
          cursor: 'pointer',
          ':not(:last-child)': {
            borderBottom: '1px solid #94a3b8',
          },
          ':hover': {
            backgroundColor: 'rgba(148,163,184,0.5)',
          },
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '8px',
          paddingLeft: '6px',
          paddingRight: '6px',
          height: '28px',
          alignItems: 'center',

        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: '4px',
          backgroundColor: state.isFocused ? '#d4c7eeff' : '#94a3b8',
          height: '20px',
          width: '20px',
          color: 'white',
          marginLeft: '2px',
          cursor: 'pointer',
          ':hover': {
            backgroundColor: 'rgba(148,163,184,0.5)',
            color: 'white',
          },
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          paddingLeft: '4px',
        }),
      }}
    />
  );
}

export default MultiSelect;
