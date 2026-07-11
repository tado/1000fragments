uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.72 + sin(p.y * 1.93 + t * 2.39) * 3.59 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.31 + 0.20 * cos(sa * 3.0 + t * 0.70 + ph);
    v = sin((sr - petal) * 14.33);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 5.43 * sin(t * 0.96) + t * 4.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = (floor(q1 * 20.6) + 0.5) / 20.6;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 0.74));
	q3 = rot2(q3.y * -2.81 + time * 0.51) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d3 = fieldC(q3, time, 0.55);
	d2 = max(d2, d3);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.01 + time * 0.22, vec3(0.46, 0.49, 0.52), vec3(0.35, 0.34, 0.35), vec3(1.01, 0.79, 0.80), vec3(0.60, 0.73, 0.71));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
