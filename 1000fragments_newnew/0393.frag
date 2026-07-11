uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.65 + vec2(t * 1.07, -t * 0.84);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.70;
	p *= 1.0 + 0.28 * sin((time * 0.81) * 2.23);
	p = rot2(p.y * -1.74 + (time * 0.81) * 0.56) * p;
	{ float fr = length(p); p *= 1.0 + 0.43 * fr * fr; }
	vec3 col = vec3(field(p, (time * 0.81), 0.0), field(p, (time * 0.81), 0.20), field(p, (time * 0.81), 0.39));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.053, 0.989, 0.943) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
