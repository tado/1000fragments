uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 13.87);
    float gsh = hash21(vec2(grow, floor(t * 5.28))) - 0.5;
    float gx = p.x + gsh * 0.48;
    v = sin(gx * 9.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.87));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.49) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 2.05 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.82;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.50; q2 = rot2(2.50) * q2; }
	{ q2 = vec2(atan(q2.y, q2.x) * 2.19, length(q2) * 3.68 - time * 0.24); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.71);
	float d = 0.5 * (d1 + d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.25, 1.46, 1.37) + vec3(0.10, 0.21, 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
