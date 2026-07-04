uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.77 + vec2(t * 0.81, -t * 0.24);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	p += vec2(-0.29, 0.23) * sin(length(p) * 5.39 - time * 1.49) * 0.21;
	{ p = vec2(atan(p.y, p.x) * 1.13, length(p) * 5.46 - time * 0.72); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.89;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.01, vec3(0.42, 0.44, 0.57), vec3(0.46, 0.48, 0.44), vec3(0.80, 0.82, 0.77), vec3(0.65, 0.53, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
