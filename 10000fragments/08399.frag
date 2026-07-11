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
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.38 * sin(mf + 3.0) + ph), cos(t * 2.38 * cos(mf + 3.0) + ph));
        ms += 0.028 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.37; p = rot2(0.87) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.58 + time * 0.17, vec3(0.43, 0.55, 0.41), vec3(0.32, 0.36, 0.43), vec3(1.12, 1.08, 1.25), vec3(0.42, 0.14, 0.68));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
