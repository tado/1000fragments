uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.92 + vec2(t * 1.18, -t * 0.27);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = sin(p * 1.44 + time * 1.30) * 1.39;
	p *= 1.0 + 0.17 * sin(time * 2.40);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.55; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.62));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
