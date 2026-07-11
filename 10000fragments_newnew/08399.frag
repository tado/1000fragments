uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.65 + t * 1.97 + ph) * 0.7;
    float wb = sin(p.y * 6.91 - t * 2.28 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.39;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.10) * p * 21.59;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 0.88 + time * 0.27, vec3(0.58, 0.50, 0.42), vec3(0.37, 0.44, 0.32), vec3(0.72, 0.71, 0.92), vec3(0.94, 0.35, 0.94)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
