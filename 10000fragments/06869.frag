uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 9.19, t * 1.44 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.15 + t * 3.88 + ph) + sin(p.y * 5.17 - t * 3.88 + ph)
        + sin((p.x + p.y) * 8.49 + t * 3.88 + ph) + sin(length(p) * 4.85 - t * 3.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.55;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.42 * p.y + time * 0.72); p.y += 0.48 / wf * cos(wf * 3.64 * p.x + time * 1.49); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.42; p = rot2(1.76) * p; }
	p = rot2(length(p) * 1.27 + time * 0.66) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.12 + time * 0.06, vec3(0.49, 0.43, 0.45), vec3(0.48, 0.41, 0.48), vec3(1.09, 1.39, 0.84), vec3(0.97, 0.08, 0.23));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
