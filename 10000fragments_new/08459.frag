uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.60;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.25)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 25.75 - t * 6.88 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.94 + ph), sin(lt * 3.0 + t * 0.75)) * 0.84;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.68) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.89 + t * 0.77 + ph) * 0.7;
    float wb = sin(p.y * 5.34 - t * 2.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q2.x += 0.40 / wf * sin(wf * 1.57 * q2.y + time * 1.82); q2.y += 0.34 / wf * cos(wf * 3.94 * q2.x + time * 2.07); }
	{ float fr = length(q3); q3 *= 1.0 + 0.71 * fr * fr; }
	q3 = (floor(q3 * 15.3) + 0.5) / 15.3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d3 = fieldC(q3, time, 1.98);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.18, 0.52), vec3(0.78, 0.83, 0.45), cc);
	col = mod(col * 1.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
