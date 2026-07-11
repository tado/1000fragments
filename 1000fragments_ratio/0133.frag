uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.42 + 0.29 * pow(abs(cos(ra * 7.0 + t * 2.63)), 0.70);
    v = sin((rr - pet) * 11.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.77 + (time * 0.71) * 1.07) * 0.18;
	p *= 2.49;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.98, lr * 1.16 + (time * 0.71) * 0.84); }
	p = fract(p * 1.06) - 0.5;
	float d = field(p, (time * 0.71), 0.0);
	vec3 col = vec3(0.76, 0.72, 0.76) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.933, 0.990, 1.022) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
