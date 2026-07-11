uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.63 + vec2(t * 2.57, -t * 0.76) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.92;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.53) * p * 10.72;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(1.00, 0.88, 0.61), vec3(0.00, 0.00, 0.15), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
