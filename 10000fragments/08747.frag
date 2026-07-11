uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.18 * sin(mf + 3.0) + ph), cos(t * 1.18 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.72, 0.93) * sin(length(p) * 2.88 - time * 1.58) * 0.29;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	p = rot2(time * 0.22) * p;
	{ p = vec2(atan(p.y, p.x) * 1.76, length(p) * 3.54 - time * 0.25); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.59));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
