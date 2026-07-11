uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.03 + vec2(t * 1.97, -t * 2.68) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.67) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 0.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.15);
    float gsh = hash21(vec2(grow, floor(t * 6.52))) - 0.5;
    float gx = p.x + gsh * 0.43;
    v = sin(gx * 16.84 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.37));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(q3); q3 *= 1.0 + -0.34 * fr * fr; }
	q3 = (floor(q3 * 27.8) + 0.5) / 27.8;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.15);
	float d3 = fieldC(q3, time, 0.20);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = hue(d * 1.19 + time * 0.04);
	col = fract(col * 2.32);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
