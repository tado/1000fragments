uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 35.52 - t * 8.54 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.29 * sin(mf + 3.0) + ph), cos(t * 1.29 * cos(mf + 3.0) + ph));
        ms += 0.024 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p = rot2(length(p) * -1.19 + time * 0.86) * p;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.02 * p.y + time * 1.22); p.y += 0.35 / wf * cos(wf * 2.31 * p.x + time * 1.42); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.25; p = rot2(0.50) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.81);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.61 + time * 0.26, vec3(0.45, 0.54, 0.56), vec3(0.48, 0.41, 0.40), vec3(1.18, 1.22, 0.83), vec3(0.45, 0.81, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
