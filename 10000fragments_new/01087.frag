uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.33) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.06 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.12 + sin(p.y * 2.27 + t * 0.73) * 3.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.46; p = rot2(0.52) * p; }
	p = (floor(p * 26.5) + 0.5) / 26.5;
	p = rot2(length(p) * -2.84 + time * 1.38) * p;
	{ float fr = length(p); p *= 1.0 + -0.32 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.21);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.29 + time * 0.08, vec3(0.44, 0.54, 0.50), vec3(0.43, 0.33, 0.49), vec3(1.23, 0.87, 0.76), vec3(0.82, 0.09, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
