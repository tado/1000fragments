uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.74 - t * 3.94 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	p = rot2(length(p) * 1.28 + time * 0.92) * p;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.36; p = rot2(0.77) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.03, vec3(0.50, 0.43, 0.58), vec3(0.38, 0.47, 0.31), vec3(1.34, 1.20, 1.30), vec3(0.43, 0.58, 0.34));
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
