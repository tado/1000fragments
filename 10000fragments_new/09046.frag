uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.10 + t * 2.66 + ph) * 0.7;
    float wb = sin(p.y * 18.86 - t * 2.34 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.70;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.97);
    float gsh = hash21(vec2(grow, floor(t * 9.51))) - 0.5;
    float gx = p.x + gsh * 1.12;
    v = sin(gx * 19.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.22));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.28 - t * 6.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.71 * fr * fr; }
	q2 = rot2(length(q2) * -3.28 + time * 1.04) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.53);
	float d3 = fieldC(q3, time, 0.80);
	d2 = min(d2, d3);
	float d = d1 * d2;
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.71 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
