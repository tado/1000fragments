uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.71 + sin(p.y * 2.60 + t * 4.35) * 4.67 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.07 * sin(mf + 3.0) + ph), cos(t * 2.07 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.51; p = rot2(1.97) * p; }
	p = rot2(p.y * 1.10 + time * 0.80) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.22 * p.y + time * 1.87); p.y += 0.42 / wf * cos(wf * 1.74 * p.x + time * 1.93); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.14);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.50 + time * 0.17, vec3(0.43, 0.44, 0.51), vec3(0.40, 0.46, 0.49), vec3(1.36, 0.88, 1.03), vec3(0.12, 0.21, 0.40));
	col = clamp((col - 0.5) * 1.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
