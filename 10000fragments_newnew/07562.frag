uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.01 + vec2(t * 0.78, -t * 0.51);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.40), cos(time * 1.41)) * 0.07;
	float an = atan(p.y, p.x) + time * -0.57;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.09 / 3.1415927, 0.65 / r - time * 2.17);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.19, 0.36, 0.99) * (0.09 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.80, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
