uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 8.0 + qr * 6.88 * sin(t * 0.86) + t * 2.66 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.68 + vec2(t * 1.24, -t * 1.34);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 6.89 - t * 3.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2(q2.y * 3.01 + time * 0.90) * q2;
	q3 = rot2(length(q3) * 2.26 + time * 0.94) * q3;
	q3 = mix(q3, q3.yx, 0.5 + 0.5 * sin(time * 0.54));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.67);
	float d3 = fieldC(q3, time, 0.76);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 1.33 + time * 0.07, vec3(0.40, 0.42, 0.45), vec3(0.36, 0.34, 0.31), vec3(1.38, 1.17, 0.85), vec3(0.50, 0.17, 0.38));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.09 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
