import { Chip, FormGroup, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { useSelector } from 'react-redux'
import heb from '../../../utils/translation/heb'
import SearchBar from '../../general/SearchBar'

const SchoolAndName = ({ school, setSchool, name, setName, filterOptions, courses, setCourses }) => {
  const professorOptions = useSelector(state => state.tags.professors)
  const courseOptions = useSelector(state => state.tags.courses.names)

  const handleAddCourse = newCourses => {
    if (courses?.length <= 5) {
      setCourses(newCourses)
    }
  }

  return (
    <>
      <FormGroup className='form__group'>
        <SearchBar
          search={school}
          setSearch={setSchool}
          filterOptions={filterOptions}
          collection={'tags'}
          doc={'schools'}
          filter={'names'}
          placeholder={heb.institution}
          dir='rtl'
          size='small'
          style={{ marginTop: 0 }}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <Autocomplete
          style={{ marginTop: 0 }}
          dir='rtl'
          handleHomeEndKeys
          autoHighlight
          size='small'
          placeholder={heb.fullProfessorName}
          options={professorOptions[school] || []}
          freeSolo
          value={name}
          onChange={(event, newValue) => setName(newValue)}
          renderInput={(params) => <TextField value={name} onChange={e => setName(e.target.value)} size='small' variant='outlined' label={heb.fullProfessorName} {...params} />}
          renderOption={option => <div style={{ textAlign: 'right', width: '100%' }} >{option}</div>}
        />
      </FormGroup>
      <FormGroup className='form__group'>
        <Autocomplete
          multiple
          dir='rtl'
          filterOptions={filterOptions}
          options={courseOptions?.map(v => v)}
          // defaultValue={[courseOptions[2]]}
          value={courses}
          onChange={(event, newCourses) => handleAddCourse(newCourses)}
          size='small'
          renderOption={v => <div style={{ textAlign: 'right', width: '100%' }} >{v}</div>}
          renderTags={(value, getTagProps) =>
            value?.map((option, index) => (
              <Chip label={option} {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} variant='outlined' label={heb.courses} placeholder={heb.courseName} />
          )}
        />
      </FormGroup>
    </>
  )
}

export default SchoolAndName
