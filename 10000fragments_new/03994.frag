uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.06) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 0.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.12 + vec2(t * 2.56, -t * 2.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 2; fo++){ q1 = abs(q1) - 0.59; q1 = rot2(2.25) * q1; }
	q1 = fract(q1 * 1.05) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.79);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.16, vec3(0.46, 0.46, 0.45), vec3(0.30, 0.37, 0.34), vec3(1.36, 1.20, 1.24), vec3(0.35, 0.20, 0.44));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
