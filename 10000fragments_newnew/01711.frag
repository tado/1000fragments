uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.54 + vec2(t * 0.41, -t * 0.52);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 14.54 + t * 1.66 + ph) * 0.7;
    float wb = sin(p.y * 18.58 - t * 2.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.22;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.42);
	float d = d1 + d2;
	vec3 col = palette(d * 1.56 + time * 0.08, vec3(0.54, 0.58, 0.57), vec3(0.43, 0.32, 0.40), vec3(0.77, 0.96, 1.02), vec3(0.86, 0.22, 0.78));
	col = mod(col * 2.12, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
