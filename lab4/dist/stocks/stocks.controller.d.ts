import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    create(createStockDto: CreateStockDto): void;
    findAll(title?: string): import("./entities/stock.entity").Stock[];
    findOne(id: string): import("./entities/stock.entity").Stock | null;
    update(id: string, updateStockDto: UpdateStockDto): void;
    replace(id: string, createStockDto: CreateStockDto): void;
    remove(id: string): void;
}
