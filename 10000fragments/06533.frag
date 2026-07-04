uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.78 + vec2(t * 2.27, -t * 2.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.56) * p * 18.07;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 0.51 + time * 0.22, vec3(0.46, 0.48, 0.50), vec3(0.49, 0.42, 0.45), vec3(1.39, 0.90, 1.03), vec3(0.66, 0.60, 0.48)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
