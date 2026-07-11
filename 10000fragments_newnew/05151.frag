uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.57 + t * 2.65 + ph) * 0.7;
    float wb = sin(p.y * 8.19 - t * 2.46 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.41;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 12.92 + t * 1.88 + ph) * 0.7;
    float wb = sin(p.y * 4.78 - t * 2.85 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.24;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.52, t * 1.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.02;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1.y += sin(q1.x * 2.22 + time * 2.50) * 0.28;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.72;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ q3 = vec2(atan(q3.y, q3.x) * 2.85, length(q3) * 2.82 - time * 0.66); }
	q3 = sin(q3 * 1.16 + time * 0.94) * 1.00;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.80);
	float d3 = fieldC(q3, time, 1.94);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = palette(d * 1.42 + time * 0.07, vec3(0.55, 0.53, 0.54), vec3(0.41, 0.42, 0.40), vec3(0.87, 0.87, 0.76), vec3(0.69, 0.29, 0.94));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
