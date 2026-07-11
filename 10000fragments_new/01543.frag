uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.99 * sin(mf + 3.0) + ph), cos(t * 1.92 * cos(mf + 3.0) + ph));
        ms += 0.079 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	p = rot2(length(p) * 3.02 + time * 1.28) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.16; p = rot2(0.89) * p; }
	p = rot2(p.y * -3.04 + time * 0.47) * p;
	p *= 1.29;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.76, 0.89, 0.72) * (0.11 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.99 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
