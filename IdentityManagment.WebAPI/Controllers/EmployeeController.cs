using AutoMapper;
using IdentityManagment.Core.DTOs;
using IdentityManagment.Core.Interfaces;
using IdentityManagment.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IdentityManagment.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController:ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EmployeeController(
            IUnitOfWork unitOfWork, 
            IMapper mapper
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        //[Authorize(Roles="Admin, Read")]
        [Authorize(Policy="EmployeeReadRole")]
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _unitOfWork.Employees.GetAllAsync();

            var employeesDto = _mapper.Map<IEnumerable<EmployeeDetailDto>>(employees);
            
            return Ok(employeesDto);
        }

        [Authorize(Roles="Admin, Read")]
        //[Authorize(Policy="EmployeeReadRole")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _unitOfWork.Employees.GetByIdAsync(id);

            if(employee==null)
            {
                return NotFound();
            }

            var employeeDto = _mapper.Map<EmployeeDetailDto>(employee);

            return Ok(employeeDto);
        }

        //[Authorize(Roles="Admin, Create")]
        [Authorize(Policy="EmployeeCreateRole")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeCreateDto employeeCreateDto)
        {
            var employee = _mapper.Map<Employee>(employeeCreateDto);

            await _unitOfWork.Employees.AddAsync(employee);

            if(await _unitOfWork.SaveAsync())
            {
                return StatusCode(201);
            }

            throw new Exception("Creating employee failed on save");
        }

        //[Authorize(Roles="Admin, Update")]     
        [Authorize(Policy="EmployeeUpdateRole")]  
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, EmployeeUpdateDto employeeUpdateDto)
        {
            var employee = await _unitOfWork.Employees.GetByIdAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            _mapper.Map(employeeUpdateDto, employee);

            if(await _unitOfWork.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception($"Updating user {id} failed on save");
        }

        //[Authorize(Roles="Admin, Delete")]
        [Authorize(Policy="EmployeeDeleteRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _unitOfWork.Employees.GetByIdAsync(id);

            _unitOfWork.Employees.Remove(employee);

            if(await _unitOfWork.SaveAsync())
            {
                return NoContent();
            }

            throw new Exception("Error deleting employee");
        }
    }
}
