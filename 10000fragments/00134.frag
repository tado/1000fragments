uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.55 + vec2(t * 0.55, -t * 0.50);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.34;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.96)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.11 - t * 4.89 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.63 + ph), vnoise2(p * 4.63 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.63 + 3.75 * wq + vec2(1.7, 9.2) + t * 1.04),
                   vnoise2(p * 4.63 + 1.44 * wq + vec2(8.3, 2.8) - t * 1.18));
    v = vnoise2(p * 4.63 + 2.94 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.29;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * -2.39 + time * 1.06) * q1;
	q1 *= 2.65;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.11; q2 = rot2(0.87) * q2; }
	q3 = fract(q3 * 2.46) - 0.5;
	q3 += vec2(0.51, -0.34) * sin(length(q3) * 4.96 - time * 2.28) * 0.39;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d3 = fieldC(q3, time, 1.53);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.49));
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.38, 0.39), vec3(0.91, 0.73, 0.57), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
