uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 22.97);
    float gsh = hash21(vec2(grow, floor(t * 3.84))) - 0.5;
    float gx = p.x + gsh * 1.18;
    v = sin(gx * 16.53 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.23));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.70) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.90 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.12 + vec2(t * 2.54, -t * 2.89) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(q1.y * -2.59 + time * 0.56) * q1;
	q1 = rot2(1.80) * q1;
	{ float fr = length(q2); q2 *= 1.0 + 0.35 * fr * fr; }
	q3 = rot2(q3.y * -2.90 + time * 0.58) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.36);
	float d3 = fieldC(q3, time, 0.00);
	d2 = d2 * d3;
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.13, 0.54), vec3(0.72, 0.97, 0.44), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.54 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
