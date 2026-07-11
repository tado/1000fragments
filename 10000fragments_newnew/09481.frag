uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.70 + t * 4.95 + ph) + sin(p.y * 17.61 - t * 5.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.62;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.56) * p * 12.84;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.08 + time * 0.00, vec3(0.60, 0.55, 0.55), vec3(0.30, 0.47, 0.49), vec3(0.98, 1.34, 0.83), vec3(0.40, 0.04, 0.45)) * v;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
