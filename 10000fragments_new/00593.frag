uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.46 + vec2(t * 1.13, -t * 0.71) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.74);
    float gsh = hash21(vec2(grow, floor(t * 4.49))) - 0.5;
    float gx = p.x + gsh * 0.97;
    v = sin(gx * 19.08 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.31));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.97;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.96)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 22.79 - t * 7.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(time * 0.66) * q1;
	q2 = fract(q2 * 1.05) - 0.5;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.99, length(q2) * 4.46 - time * 0.77); }
	q3.x += sin(q3.y * 7.44 + time * 1.85) * 0.36;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.61);
	float d3 = fieldC(q3, time, 0.45);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.98, 0.30, 0.96) * (0.21 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
