uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.51) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 2.16 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.93) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 3.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.85;
	p = rot2(2.61) * p;
	p = abs(p) - 0.30;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.20; p = rot2(1.20) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.85);
	float d = d1 + d2;
	vec3 col = palette(d * 1.34 + time * 0.25, vec3(0.45, 0.48, 0.57), vec3(0.44, 0.36, 0.33), vec3(0.96, 1.21, 1.05), vec3(0.47, 0.10, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
