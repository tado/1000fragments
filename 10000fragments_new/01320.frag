uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 7.12 - t * 1.35 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.49 * sin(mf + 3.0) + ph), cos(t * 2.14 * cos(mf + 3.0) + ph));
        ms += 0.062 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.13; p = rot2(2.43) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.01);
	float d = d1 * d2;
	vec3 col = palette(d * 1.15 + time * 0.11, vec3(0.42, 0.57, 0.52), vec3(0.31, 0.45, 0.35), vec3(0.73, 1.35, 1.15), vec3(0.13, 0.52, 0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
