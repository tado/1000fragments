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
    float grow = floor(p.y * 13.77);
    float gsh = hash21(vec2(grow, floor(t * 9.76))) - 0.5;
    float gx = p.x + gsh * 0.81;
    v = sin(gx * 7.19 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.76));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 5.0 + qr * 3.88 * sin(t * 0.93) + t * 2.89 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 4.90 + t * 2.32 + ph) * 0.7;
    float wb = sin(p.y * 18.25 - t * 3.67 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.19;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 += vec2(0.07, -0.53) * sin(length(q1) * 4.92 - time * 1.77) * 0.32;
	q1 = rot2(2.42) * q1;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = abs(q2);
	q3 *= 1.81;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.94);
	float d3 = fieldC(q3, time, 1.03);
	d2 = min(d2, d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 0.51 + time * 0.29, vec3(0.42, 0.44, 0.46), vec3(0.44, 0.37, 0.34), vec3(0.94, 1.28, 0.89), vec3(0.68, 0.89, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
