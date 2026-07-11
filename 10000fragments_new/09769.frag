uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.33 + 0.19 * pow(abs(cos(ra * 6.0 + t * 2.72)), 1.28);
    v = sin((rr - pet) * 23.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.49;
	{ p = vec2(atan(p.y, p.x) * 2.36, length(p) * 2.14 - time * 0.52); }
	p = fract(p * 1.29) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.52 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.91, 0.36, 0.87) * (0.10 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
