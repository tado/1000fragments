uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.71 + vec2(t * 1.92, -t * 1.92) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.01;
	p = fract(p * 1.35) - 0.5;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	p += vec2(-0.22, 0.60) * sin(length(p) * 4.72 - time * 0.55) * 0.38;
	p = rot2(p.y * 3.15 + time * 0.31) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.17, 0.48, 0.18), vec3(0.74, 0.81, 0.86), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
