uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.61 + sr * 9.55 - t * 1.59 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.31) * p * 17.52;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.79 + time * 0.22, vec3(0.44, 0.58, 0.42), vec3(0.47, 0.45, 0.46), vec3(0.92, 1.32, 1.08), vec3(0.33, 0.67, 0.04)) * v;
	col = mod(col * 2.89, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
