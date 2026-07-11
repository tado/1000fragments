uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.14 + vec2(t * 0.50, -t * 0.33);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.55 + (time * 0.53) * 0.67) * 0.11;
	{ p = vec2(atan(p.y, p.x) * 1.36, length(p) * 5.29 - (time * 0.53) * 0.65); }
	float d = field(p, (time * 0.53), 0.0);
	vec3 col = vec3(0.53, 0.48, 0.44) * (0.05 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 1.007, 0.924) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
