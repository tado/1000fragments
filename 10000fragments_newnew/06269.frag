uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.59 + 0.19 * pow(abs(cos(ra * 5.0 + t * 2.52)), 2.40);
    v = sin((rr - pet) * 12.43 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.76) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.74 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 6.90;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.90)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.11 - t * 3.77 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.22; q2 = rot2(2.06) * q2; }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.62, lr * 2.42 + time * 0.86); }
	q3 = (floor(q3 * 17.4) + 0.5) / 17.4;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.83);
	float d3 = fieldC(q3, time, 0.32);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = vec3(0.69, 0.21, 0.77) * (0.15 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col *= 0.86 + 0.16 * sin(gl_FragCoord.y * 1.19 + time * 17.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
