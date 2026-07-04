uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.07 + sin(p.y * 2.38 + t * 5.60) * 4.83 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.11;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.06)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 17.12 - t * 3.46 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.35 + vec2(t * 1.30, -t * 1.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.31 / wf * sin(wf * 2.19 * q2.y + time * 2.12); q2.y += 0.46 / wf * cos(wf * 1.70 * q2.x + time * 1.55); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d3 = fieldC(q3, time, 1.46);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = vec3(0.39, 0.46, 0.84) * (0.10 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
