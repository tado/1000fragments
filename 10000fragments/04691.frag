uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 21.03 - t * 2.89 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 29.49 - t * 2.89 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.66 + t * 2.45 + ph) + sin(p.y * 5.93 - t * 5.93 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 3.37 * p.y + time * 0.89); p.y += 0.32 / wf * cos(wf * 1.90 * p.x + time * 1.12); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(2.47) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.05 + time * 0.03, vec3(0.49, 0.51, 0.42), vec3(0.39, 0.40, 0.33), vec3(0.70, 1.04, 1.10), vec3(0.62, 0.97, 0.38));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
