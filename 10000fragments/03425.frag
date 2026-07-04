uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 19.23);
    float gsh = hash21(vec2(grow, floor(t * 8.31))) - 0.5;
    float gx = p.x + gsh * 0.30;
    v = sin(gx * 16.61 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.46));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.33 + vec2(t * 0.63, -t * 1.09);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.20 + sin(p.y * 5.68 + t * 1.81) * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.07, length(q2) * 4.96 - time * 0.36); }
	{ float iv = dot(q2, q2) + 0.05; q2 = q2 / iv * 0.52; }
	q3.x += sin(q3.y * 3.84 + time * 3.31) * 0.19;
	q3 *= 1.82;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d3 = fieldC(q3, time, 0.85);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.17, 0.35, 0.30), vec3(0.81, 0.63, 0.45), cc);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
