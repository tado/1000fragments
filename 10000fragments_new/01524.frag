uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.38 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.21 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.97) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 3.41;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.62)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.25 - t * 6.80 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.43 + vec2(t * 2.86, -t * 1.29) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 += vec2(0.40, 0.15) * sin(length(q2) * 5.11 - time * 1.76) * 0.30;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.17);
	float d3 = fieldC(q3, time, 1.81);
	d2 = max(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.32, 0.99, 0.76) * (0.19 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = fract(col * 1.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
