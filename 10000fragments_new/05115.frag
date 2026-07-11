uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.51);
    float gsh = hash21(vec2(grow, floor(t * 6.98))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 6.09 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.09));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.15 - t * 6.75 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.94 + sr * 14.91 - t * 2.87 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 2.41 + time * 1.18) * q1;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.90);
	float d3 = fieldC(q3, time, 1.27);
	d2 = min(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.12, vec3(0.52, 0.46, 0.59), vec3(0.48, 0.43, 0.41), vec3(1.21, 0.74, 1.13), vec3(0.67, 0.55, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
