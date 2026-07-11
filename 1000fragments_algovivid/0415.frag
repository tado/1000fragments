uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.09 + t * 1.79 + ph) * 0.7;
    float wb = sin(p.y * 8.97 - t * 3.71 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.44;
	float d = 0.5 + 0.5 * field(p, (time * 0.52), 0.0);
	vec2 hq = rot2(1.26) * p * 20.95;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.12 + (time * 0.52) * 0.17, vec3(0.45, 0.47, 0.42), vec3(0.12, 0.10, 0.12), vec3(0.58, 0.86, 0.71), vec3(0.81, 0.22, 0.44)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(0.982, 1.000, 0.937) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
