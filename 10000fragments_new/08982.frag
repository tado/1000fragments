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
    v = sin(p.x * 24.44 + sin(p.y * 3.35 + t * 5.91) * 1.29 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 11.63);
    float gsh = hash21(vec2(grow, floor(t * 6.13))) - 0.5;
    float gx = p.x + gsh * 0.87;
    v = sin(gx * 18.49 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.62));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.45; q1 = rot2(1.19) * q1; }
	{ q1 = vec2(atan(q1.y, q1.x) * 2.86, length(q1) * 2.17 - time * 0.60); }
	q2.y += sin(q2.x * 3.89 + time * 2.66) * 0.40;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.25; q2 = rot2(1.56) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.68);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.48 + time * 0.06, vec3(0.58, 0.40, 0.56), vec3(0.30, 0.36, 0.40), vec3(0.81, 0.91, 0.84), vec3(0.56, 0.53, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
