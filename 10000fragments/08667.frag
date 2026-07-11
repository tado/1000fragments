uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.39 * sin(mf + 3.0) + ph), cos(t * 2.39 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.78) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.43; p = rot2(2.17) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.10, 0.68, 1.36) + vec3(0.20, 0.30, 0.14);
	col = mod(col * 1.24, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
