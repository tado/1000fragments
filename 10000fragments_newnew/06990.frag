uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.35 + vec2(t * 0.38, -t * 1.47);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.90 - t * 1.01;
    v = sin(floor(lv * 2.1) / 2.1 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.72;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.55);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.79 + time * 0.21, vec3(0.54, 0.49, 0.58), vec3(0.40, 0.37, 0.35), vec3(1.18, 0.95, 0.95), vec3(0.72, 0.93, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
