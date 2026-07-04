uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.91 + sin(p.y * 4.34 + t * 2.62) * 2.30 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.91) * p * 14.10;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.31 + time * 0.11, vec3(0.56, 0.58, 0.46), vec3(0.36, 0.34, 0.45), vec3(1.25, 1.01, 1.09), vec3(0.11, 0.07, 0.96)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
