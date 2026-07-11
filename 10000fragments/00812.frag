uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.24 + sin(p.y * 2.30 + t * 2.26) * 4.45 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + 0.77 * fr * fr; }
	p = fract(p * 2.54) - 0.5;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.25; p = rot2(2.29) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.66 + time * 0.29, vec3(0.55, 0.48, 0.51), vec3(0.39, 0.49, 0.42), vec3(0.73, 1.25, 1.02), vec3(0.59, 0.64, 0.33));
	col = clamp((col - 0.5) * 1.70 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
