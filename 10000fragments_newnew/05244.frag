uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 3.91 - t * 0.39;
    v = sin(floor(lv * 3.9) / 3.9 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.72) * p * 9.13;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.88 + time * 0.07, vec3(0.53, 0.58, 0.58), vec3(0.45, 0.40, 0.43), vec3(1.31, 1.34, 1.11), vec3(0.01, 0.47, 0.05)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
