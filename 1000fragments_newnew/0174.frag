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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cw = p * 3.00 + ph;
    float ca = 0.0;
    for(int ci = 0; ci < 4; ci++){ float cf = float(ci) + 1.0;
        cw += sin(cw.yx * 1.28 + t * 3.38 * cf * 0.35) / cf;
        ca += sin(cw.x + cw.y); }
    v = ca * 0.3;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float fs = 0.0; float famp = 0.5; vec2 fq = p * 5.36 + ph;
    for(int fi = 0; fi < 4; fi++){ fs += famp * vnoise2(fq + t * 1.46); fq *= 2.0; famp *= 0.5; }
    v = fs * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.16);
    float gsh = hash21(vec2(grow, floor(t * 9.64))) - 0.5;
    float gx = p.x + gsh * 0.44;
    v = sin(gx * 15.16 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.71));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = rot2((time * 0.60) * 1.51) * q2;
	q3.x += sin(q3.y * 5.34 + (time * 0.60) * 3.83) * 0.31;
	float d1 = fieldA(q1, (time * 0.60), 0.0);
	float d2 = fieldB(q2, (time * 0.60), 0.44);
	float d3 = fieldC(q3, (time * 0.60), 1.14);
	d2 = 0.5 * (d2 + d3);
	float d = max(d1, d2);
	vec3 col = palette((d) * 0.46 + (time * 0.60) * 0.14, vec3(0.37, 0.40, 0.42), vec3(0.23, 0.27, 0.19), vec3(0.49, 0.70, 0.68), vec3(0.83, 0.36, 0.91));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.964, 0.999, 0.933) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
