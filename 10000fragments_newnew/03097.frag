uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 1.44 + vec2(t * 1.48, -t * 0.50);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.75 + sin(p.y * 3.75 + t * 2.92) * 4.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.20 * p.y + time * 1.88); p.y += 0.46 / wf * cos(wf * 2.29 * p.x + time * 1.09); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.70);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.65 + time * 0.29, vec3(0.50, 0.51, 0.58), vec3(0.44, 0.48, 0.36), vec3(1.31, 1.32, 1.23), vec3(0.13, 0.92, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
