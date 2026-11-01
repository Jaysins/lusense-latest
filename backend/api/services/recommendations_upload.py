from api.services.pricing import get_market_price

def recommend_upload(payload, token):
    budget=payload.get('budget'); items=payload.get('items')
    if isinstance(budget,bool) or not isinstance(budget,(int,float)) or budget<=0 or not isinstance(items,list):
        raise ValueError('Positive budget and items required')
    if not items:return {'status':'no_items','recommendations':[],'message':'No supported furniture detected'}
    from api.services.vision import model
    supported={str(v).lower() for v in model.names.values()}
    recs=[];estimated=0;cheapest=0
    for item in items:
        name=str(item.get('object_name','')).lower()
        quantity=item.get('quantity')
        if name not in supported or type(quantity)!=int or quantity<1 or quantity>50:raise ValueError('Invalid detected furniture item')
        options=[o for o in get_market_price(name, token) if all(o.get(k) is not None for k in ('min_price','typical_price','max_price'))]
        if not options:return {'status':'pricing_unavailable','recommendations':[],'message':f'No catalog pricing for {name}'}
        options.sort(key=lambda o:float(o['min_price']))
        estimated+=quantity*sum(float(o['typical_price']) for o in options)/len(options)
        cheapest+=quantity*float(options[0]['min_price'])
        recs.append({'object_name':name,'quantity':quantity,'recommended':options[0],'alternatives':options[:3]})
    if budget>=estimated:return {'status':'budget_fits','estimated_cost':estimated,'budget_remaining':budget-estimated,'recommendations':[]}
    return {'status':'recommendations_available' if cheapest<=budget else 'budget_too_low','estimated_cost':estimated,'cheapest_possible_total':cheapest,'additional_budget_needed':max(0,cheapest-budget),'recommendations':recs}
