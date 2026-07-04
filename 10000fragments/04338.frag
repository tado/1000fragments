uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.31 + vec2(t * 1.02, -t * 2.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.21) * p * 12.03;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = palette(d * 1.05 + time * 0.25, vec3(0.60, 0.54, 0.50), vec3(0.45, 0.34, 0.48), vec3(0.74, 0.83, 0.96), vec3(0.56, 0.84, 0.67)) * v;
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
