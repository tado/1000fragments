uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.25 * sin(mf + 3.0) + ph), cos(t * 2.49 * cos(mf + 3.0) + ph));
        ms += 0.076 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.13; p = rot2(1.09) * p; }
	{ float fr = length(p); p *= 1.0 + -0.51 * fr * fr; }
	p = rot2(p.y * 2.82 + time * 0.30) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.81));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
