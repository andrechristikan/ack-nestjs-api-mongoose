import {
    Controller,
    Get,
    DefaultValuePipe,
    ParseIntPipe,
    Query
} from '@nestjs/common';
import { ResponseService } from 'src/response/response.service';
import { Message } from 'src/message/message.decorator';
import { MessageService } from 'src/message/message.service';
import { Response, ResponseJson } from 'src/response/response.decorator';
import { IResponse } from 'src/response/response.interface';
import { AuthJwtGuard } from 'src/auth/auth.decorator';
import { PermissionList } from 'src/permission/permission.constant';
import { Permissions } from 'src/permission/permission.decorator';
import { RoleService } from './role.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { Pagination } from 'src/pagination/pagination.decorator';
import { RoleDocument } from './role.interface';
import {
    DEFAULT_PAGE,
    DEFAULT_PER_PAGE
} from 'src/pagination/pagination.constant';

@Controller('/role')
export class RoleController {
    constructor(
        @Response() private readonly responseService: ResponseService,
        @Message() private readonly messageService: MessageService,
        @Pagination() private readonly paginationService: PaginationService,
        private readonly roleService: RoleService
    ) {}

    @AuthJwtGuard()
    @Permissions(PermissionList.RoleRead)
    @ResponseJson()
    @Get('/')
    async findAll(
        @Query('page', new DefaultValuePipe(DEFAULT_PAGE), ParseIntPipe)
        page: number,
        @Query('perPage', new DefaultValuePipe(DEFAULT_PER_PAGE), ParseIntPipe)
        perPage: number
    ): Promise<IResponse> {
        const skip = await this.paginationService.skip(page, perPage);
        const roles: RoleDocument[] = await this.roleService.findAll<RoleDocument>(
            {},
            {
                skip: skip,
                offset: perPage
            }
        );
        const totalData: number = await this.roleService.totalData();
        const totalPage = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return this.responseService.paging(
            this.messageService.get('role.findAll'),
            totalData,
            totalPage,
            page,
            perPage,
            roles
        );
    }
}
