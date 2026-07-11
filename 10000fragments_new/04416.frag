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
        vec2 mm = vec2(sin(t * 1.51 * sin(mf + 3.0) + ph), cos(t * 1.51 * cos(mf + 3.0) + ph));
        ms += 0.061 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.49; p = rot2(2.02) * p; }
	p = rot2(p.y * -2.12 + time * 0.77) * p;
	p = rot2(length(p) * -3.03 + time * 0.75) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.20, vec3(0.42, 0.43, 0.47), vec3(0.49, 0.46, 0.46), vec3(1.07, 1.14, 0.77), vec3(0.73, 0.48, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
