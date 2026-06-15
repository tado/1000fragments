uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.32 + jf * 4.0), cos(t * 0.36 * jf)) * 0.64;
        xs += sin(length(p - im) * 215.57 - t * 6.26 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.15 + sin(p.y * 4.86 + t * 3.74) * 4.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.80;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 2.11 + time * 0.26); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.64 * p.y + time * 1.28); p.y += 0.33 / wf * cos(wf * 2.30 * p.x + time * 1.57); }
	p = abs(p) - 0.32;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.26);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.21 + time * 0.24, vec3(0.46, 0.41, 0.60), vec3(0.39, 0.34, 0.39), vec3(1.36, 0.80, 1.37), vec3(0.56, 0.83, 0.29));
	col = mod(col * 1.30, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
