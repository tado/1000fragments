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
    v = 0.5 * sin(length(p) * 28.96 - t * 4.83 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 17.18);
    float gsh = hash21(vec2(grow, floor(t * 5.37))) - 0.5;
    float gx = p.x + gsh * 0.47;
    v = sin(gx * 7.49 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.48));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.45;
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(-0.47, 0.42) * sin(length(q1) * 2.58 - time * 2.27) * 0.28;
	q2 += vec2(-0.06, -0.06) * sin(length(q2) * 4.86 - time * 1.83) * 0.34;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.54; q2 = rot2(0.91) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.37);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.45 + time * 0.16, vec3(0.44, 0.52, 0.46), vec3(0.30, 0.39, 0.34), vec3(1.26, 1.00, 1.27), vec3(0.02, 0.82, 0.74));
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 2.52 + time * 11.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
