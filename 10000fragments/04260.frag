uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.57 + vec2(t * 1.26, -t * 0.70) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 2.81 + vec2(t * 1.32, -t * 0.74);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.92;
	p = (floor(p * 15.4) + 0.5) / 15.4;
	p *= 1.0 + 0.36 * sin(time * 2.46);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.63);
	float d = d1 * d2;
	vec3 col = palette(d * 0.52 + time * 0.08, vec3(0.52, 0.47, 0.53), vec3(0.35, 0.46, 0.42), vec3(1.12, 1.00, 1.32), vec3(0.75, 0.33, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
