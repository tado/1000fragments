uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.98) - 0.5;
    float rad = 0.33 + 0.12 * sin(t * 2.43 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = rot2(2.06) * p;
	p = rot2(p.y * 2.30 + time * 0.65) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.31, lr * 2.81 + time * -0.25); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.16; p = rot2(1.00) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.15, vec3(0.56, 0.42, 0.49), vec3(0.34, 0.44, 0.49), vec3(0.83, 1.22, 0.98), vec3(0.46, 0.03, 0.25));
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
