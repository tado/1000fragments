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
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.14 * sin(mf + 3.0) + ph), cos(t * 1.14 * cos(mf + 3.0) + ph));
        ms += 0.026 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.24 * sin(mf + 3.0) + ph), cos(t * 2.24 * cos(mf + 3.0) + ph));
        ms += 0.097 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.70;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(0.51) * p; }
	p = rot2(p.y * 3.53 + time * 0.11) * p;
	p = rot2(1.11) * p;
	p += vec2(0.42, -0.18) * sin(length(p) * 4.15 - time * 1.04) * 0.20;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.13);
	float d = d1 + d2;
	vec3 col = palette(d * 1.66 + time * 0.07, vec3(0.57, 0.57, 0.48), vec3(0.41, 0.35, 0.33), vec3(0.96, 0.85, 1.37), vec3(0.41, 0.62, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
