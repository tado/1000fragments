uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 14.29);
    float gsh = hash21(vec2(grow, floor(t * 6.41))) - 0.5;
    float gx = p.x + gsh * 0.33;
    v = sin(gx * 11.41 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.80));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.53);
    float gsh = hash21(vec2(grow, floor(t * 5.87))) - 0.5;
    float gx = p.x + gsh * 0.96;
    v = sin(gx * 7.46 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.79));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.60 + 0.31 * pow(abs(cos(ra * 2.0 + t * 1.58)), 0.61);
    v = sin((rr - pet) * 19.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.97; }
	{ float fr = length(q1); q1 *= 1.0 + 0.48 * fr * fr; }
	q3 += vec2(-1.00, -0.73) * sin(length(q3) * 3.54 - time * 0.87) * 0.38;
	q3 = (floor(q3 * 26.3) + 0.5) / 26.3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.04);
	float d3 = fieldC(q3, time, 1.70);
	d2 = 0.5 * (d2 + d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.10));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.86 + time * 0.93);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
