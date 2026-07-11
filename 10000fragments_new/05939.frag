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
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.97 * sin(mf + 3.0) + ph), cos(t * 0.82 * cos(mf + 3.0) + ph));
        ms += 0.066 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.62 * p.y + time * 1.79); p.y += 0.29 / wf * cos(wf * 3.80 * p.x + time * 1.99); }
	p.y += sin(p.x * 7.46 + time * 2.15) * 0.30;
	p = rot2(length(p) * -3.90 + time * 0.87) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(0.53) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.11, vec3(0.42, 0.55, 0.46), vec3(0.40, 0.36, 0.48), vec3(1.31, 1.22, 1.12), vec3(0.56, 0.29, 0.53));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
