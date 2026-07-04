uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.46 - t * 6.98 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.21) * p * 19.18;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.95, 0.73, 0.87), vec3(0.04, 0.10, 0.19), v);
	col *= 0.82 + 0.15 * sin(gl_FragCoord.y * 2.51 + time * 4.88);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
