uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.25 + vec2(t * 2.97, -t * 1.45) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.21) * p * 17.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.12 + time * 0.16, vec3(0.57, 0.49, 0.41), vec3(0.34, 0.39, 0.33), vec3(1.38, 0.95, 1.33), vec3(0.61, 0.06, 0.25)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
