uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.36 * sin(mf + 3.0) + ph), cos(t * 0.36 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 5.63 - time * 0.45); }
	p = rot2(0.93) * p;
	{ float fr = length(p); p *= 1.0 + 0.69 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.26 * p.y + time * 1.51); p.y += 0.26 / wf * cos(wf * 3.12 * p.x + time * 1.61); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.03, vec3(0.49, 0.44, 0.47), vec3(0.42, 0.44, 0.44), vec3(1.22, 1.27, 0.89), vec3(0.29, 0.99, 0.25));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
