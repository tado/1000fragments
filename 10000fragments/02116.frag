uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.43 + vec2(t * 0.39, -t * 0.44);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	{ p = vec2(atan(p.y, p.x) * 2.77, length(p) * 2.68 - time * 0.96); }
	p = rot2(p.y * -3.93 + time * 0.87) * p;
	p += vec2(0.42, -0.62) * sin(length(p) * 2.42 - time * 2.12) * 0.20;
	p = rot2(2.03) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.27, vec3(0.45, 0.47, 0.58), vec3(0.49, 0.35, 0.32), vec3(0.86, 1.22, 1.02), vec3(0.88, 0.18, 0.03));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
