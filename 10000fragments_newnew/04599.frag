uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.25) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.26 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.99;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.62) * p * 16.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.80 + time * 0.27, vec3(0.60, 0.48, 0.40), vec3(0.47, 0.36, 0.49), vec3(0.83, 1.00, 1.15), vec3(0.63, 0.21, 0.33)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
