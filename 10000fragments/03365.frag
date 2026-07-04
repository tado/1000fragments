uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.32 - t * 9.00 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.17) * p * 20.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 1.26 + time * 0.26, vec3(0.42, 0.52, 0.59), vec3(0.33, 0.35, 0.40), vec3(1.19, 0.83, 1.26), vec3(0.17, 0.87, 0.00)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.45 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
