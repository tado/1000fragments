uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.44 + vec2(t * 0.61, -t * 1.45);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.46;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.72 / 3.1415927, 1.31 / r - time * 1.91);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.00);
	col *= clamp(r * 1.96, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
