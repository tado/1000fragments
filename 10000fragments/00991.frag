uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.00, t * 1.81 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.30 + t * 4.36 + ph) + sin(p.y * 11.60 - t * 2.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.33 * p.y + time * 0.75); p.y += 0.34 / wf * cos(wf * 3.94 * p.x + time * 1.66); }
	p = abs(p);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.10;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.40 + time * 0.01, vec3(0.41, 0.42, 0.52), vec3(0.45, 0.34, 0.33), vec3(1.12, 1.15, 1.36), vec3(0.28, 0.86, 0.25));
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
