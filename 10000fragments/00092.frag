uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.41);
    float gsh = hash21(vec2(grow, floor(t * 6.73))) - 0.5;
    float gx = p.x + gsh * 0.80;
    v = sin(gx * 7.79 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.77));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 38.39 - t * 7.44 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 14.46 - t * 7.66 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 2.83;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.30 + 0.08 * sin(t * 1.11 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = sin(q1 * 1.27 + time * 0.68) * 1.39;
	q1 = fract(q1 * 2.22) - 0.5;
	q3.y += sin(q3.x * 2.88 + time * 1.86) * 0.15;
	for(int fo = 0; fo < 4; fo++){ q3 = abs(q3) - 0.51; q3 = rot2(0.80) * q3; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.13);
	float d3 = fieldC(q3, time, 0.72);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.38));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.92 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
