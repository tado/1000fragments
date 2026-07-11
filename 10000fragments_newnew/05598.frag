uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.61, t * 0.84 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float pa = atan(p.y, p.x) + t * 0.26;
    float pk = 6.2831853 / 8.0;
    float pd = cos(floor(0.5 + pa / pk) * pk - pa) * length(p);
    v = sin(pd * 12.98 - t * 3.63 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.0 + 0.12 * sin(time * 2.33);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.13;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.50 / wf * sin(wf * 3.47 * p.y + time * 2.00); p.y += 0.45 / wf * cos(wf * 2.10 * p.x + time * 1.64); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.54);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.05, vec3(0.51, 0.51, 0.44), vec3(0.47, 0.35, 0.49), vec3(1.37, 1.24, 1.08), vec3(0.69, 0.37, 0.36));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
