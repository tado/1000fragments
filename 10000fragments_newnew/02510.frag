uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.84 + t * 1.31) - 0.5) * 2.0;
    v = sin((p.y * 5.73 + zx * 0.79 + t * 2.04) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.73) * p * 17.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.28 + time * 0.21, vec3(0.40, 0.47, 0.46), vec3(0.37, 0.42, 0.40), vec3(1.19, 0.94, 0.94), vec3(0.12, 0.46, 0.19)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
