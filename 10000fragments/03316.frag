uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.15) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.92 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 4.14 - time * 0.12); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.32; p = rot2(2.10) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.27, vec3(0.55, 0.60, 0.46), vec3(0.39, 0.45, 0.36), vec3(1.21, 1.07, 0.75), vec3(0.43, 0.52, 0.02));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
