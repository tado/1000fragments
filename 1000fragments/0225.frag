uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.44 + vec2(t * 1.70, -t * 2.25) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.07) * p * 19.37;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.46 + time * 0.12, vec3(0.44, 0.48, 0.58), vec3(0.38, 0.36, 0.46), vec3(1.20, 1.34, 0.82), vec3(0.72, 0.27, 0.76)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
