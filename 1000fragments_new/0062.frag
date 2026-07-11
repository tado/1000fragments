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
    float lv = length(p) * 2.86 - t * 1.72;
    v = sin(floor(lv * 2.6) / 2.6 * 6.2831853 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 20.58);
    float gsh = hash21(vec2(grow, floor(t * 2.85))) - 0.5;
    float gx = p.x + gsh * 0.38;
    v = sin(gx * 16.96 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.42));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.96;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(q1.y * -2.21 + time * 0.85) * q1;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = (floor(q2 * 28.5) + 0.5) / 28.5;
	q2 *= 2.58;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.09);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.26));
	vec3 col = palette(d * 0.79 + time * 0.03, vec3(0.46, 0.59, 0.59), vec3(0.42, 0.35, 0.47), vec3(0.70, 1.16, 1.02), vec3(0.42, 0.93, 0.10));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
