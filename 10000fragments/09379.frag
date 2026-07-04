uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.55 + vec2(t * 0.67, -t * 0.76);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.81;
	p = rot2(time * -1.09) * p;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	p += vec2(0.01, 0.89) * sin(length(p) * 4.46 - time * 1.86) * 0.10;
	p = rot2(0.77) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.41), field(p, time, 0.82));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
