uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.19 + t * 3.29 + ph) * 0.7;
    float wb = sin(p.y * 17.05 - t * 3.90 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.33;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.53;
	float d = 0.5 + 0.5 * field(p, (time * 0.72), 0.0);
	vec2 hq = rot2(1.02) * p * 12.56;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.85 + (time * 0.72) * 0.07, vec3(0.34, 0.35, 0.28), vec3(0.22, 0.24, 0.21), vec3(0.75, 0.90, 0.57), vec3(0.08, 0.67, 0.43)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.944, 0.996) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
