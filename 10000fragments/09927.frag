uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.39 * sin(mf + 3.0) + ph), cos(t * 1.39 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.45;
	p = rot2(time * -1.34) * p;
	{ p = vec2(atan(p.y, p.x) * 2.01, length(p) * 3.44 - time * 0.57); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.35; p = rot2(1.22) * p; }
	p = rot2(length(p) * -1.97 + time * 1.05) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.67));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.79));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
