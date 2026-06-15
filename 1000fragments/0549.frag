uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.96 + t * 1.68 + ph) + sin(p.y * 14.81 - t * 3.10 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.23;
	p += vec2(-1.00, 0.23) * sin(length(p) * 4.54 - time * 0.61) * 0.24;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.89 * p.y + time * 1.59); p.y += 0.29 / wf * cos(wf * 2.89 * p.x + time * 0.65); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.29, vec3(0.57, 0.48, 0.60), vec3(0.41, 0.47, 0.46), vec3(1.25, 1.22, 0.71), vec3(0.79, 0.28, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
