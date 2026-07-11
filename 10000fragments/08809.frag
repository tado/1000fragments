uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.64 + sin(p.y * 4.26 + t * 5.71) * 1.54 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.83 * sin(mf + 3.0) + ph), cos(t * 1.83 * cos(mf + 3.0) + ph));
        ms += 0.035 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.22;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 1.83 * p.y + time * 1.85); p.y += 0.26 / wf * cos(wf * 1.79 * p.x + time * 1.89); }
	p *= 3.49;
	p = rot2(time * -1.19) * p;
	{ p = vec2(atan(p.y, p.x) * 2.95, length(p) * 2.20 - time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.86);
	float d = d1 + d2;
	vec3 col = palette(d * 1.00 + time * 0.27, vec3(0.52, 0.51, 0.51), vec3(0.39, 0.39, 0.49), vec3(1.21, 0.87, 0.81), vec3(0.86, 0.21, 0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
