uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.54 * sin(mf + 3.0) + ph), cos(t * 1.54 * cos(mf + 3.0) + ph));
        ms += 0.058 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(1.63) * p; }
	p = rot2(2.73) * p;
	p *= 1.62;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
