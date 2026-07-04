uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.56 + vec2(t * 0.88, -t * 0.75) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.85) * p * 20.59;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.68 + time * 0.08, vec3(0.46, 0.50, 0.55), vec3(0.38, 0.35, 0.49), vec3(1.28, 1.17, 1.17), vec3(0.84, 0.50, 0.32)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
