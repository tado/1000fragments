uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.39 + vec2(t * 0.75, -t * 0.25);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.88 / 3.1415927, 0.48 / r - time * 2.11);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.62, 1.10, 1.19) + vec3(0.12, 0.22, 0.11);
	col *= clamp(r * 2.62, 0.0, 1.0);
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
