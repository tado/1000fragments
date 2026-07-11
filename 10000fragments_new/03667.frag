uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.39 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.92 + t * 1.73 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.17 + sr * 14.94 - t * 4.86 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.06 + t * 0.99 + ph) + sin(p.y * 3.68 - t * 0.99 + ph)
        + sin((p.x + p.y) * 2.87 + t * 0.99 + ph) + sin(length(p) * 14.05 - t * 0.99 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.28;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(2.99) * q1;
	q2 = abs(q2) - 0.61;
	q3 = abs(q3);
	q3 = rot2(time * 1.29) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.62);
	float d3 = fieldC(q3, time, 0.52);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = palette(d * 0.96 + time * 0.05, vec3(0.49, 0.59, 0.57), vec3(0.30, 0.31, 0.32), vec3(1.17, 1.28, 0.96), vec3(0.68, 0.76, 0.83));
	col = clamp((col - 0.5) * 1.91 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
