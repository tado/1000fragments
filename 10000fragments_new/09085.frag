uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.41) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.17 + sr * 12.19 - t * 1.84 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q2 = abs(q2) - 0.16; q2 = rot2(2.52) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.57));
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.28, 0.64, 1.33) + vec3(0.04, 0.09, 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
