uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.39 + 0.26 * pow(abs(cos(ra * 4.0 + t * 0.78)), 1.60);
    v = sin((rr - pet) * 10.55 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.38 + vec2(t * 1.47, -t * 1.26);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.33 * sin(time * 4.59);
	p = fract(p * 2.50) - 0.5;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.50; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.89);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.87 + time * 0.14, vec3(0.44, 0.59, 0.51), vec3(0.42, 0.38, 0.36), vec3(1.22, 1.39, 1.35), vec3(0.34, 0.17, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
