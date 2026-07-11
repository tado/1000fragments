uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.20 * sin(mf + 3.0) + ph), cos(t * 1.36 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.32, length(p) * 4.59 - time * 0.92); }
	p = rot2(p.y * -1.43 + time * 0.61) * p;
	p = rot2(time * -1.28) * p;
	p = rot2(length(p) * -1.22 + time * 1.23) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.47, 0.40, 0.80) * (0.12 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
