uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.64 + t * 0.61 + ph) + sin(p.y * 7.69 - t * 5.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.34) * p * 17.84;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 0.84 + time * 0.10, vec3(0.40, 0.58, 0.58), vec3(0.48, 0.41, 0.41), vec3(1.07, 1.26, 1.33), vec3(0.17, 0.21, 0.23)) * v;
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
