uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xv = 0.0; float xw = 0.5; vec2 xp = p * 3.53 + vec2(t * 0.25, -t * 0.61);
    for(int xo = 0; xo < 5; xo++){ xv += xw * mod(floor(xp.x) + floor(xp.y), 2.0); xw *= 0.5; xp *= 2.0; }
    v = sin(xv * 6.2831853 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.17;
    float pk = 6.2831853 / 5.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 10.10 - t * 2.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = d1 * d2;
	vec3 col = palette(d * 0.77 + time * 0.12, vec3(0.42, 0.42, 0.56), vec3(0.40, 0.32, 0.50), vec3(1.25, 0.84, 0.76), vec3(0.65, 0.49, 0.18));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.37 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
