uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.84 * sin(mf + 3.0) + ph), cos(t * 0.84 * cos(mf + 3.0) + ph));
        ms += 0.051 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.83, 0.90) * sin(length(p) * 4.93 - time * 1.82) * 0.21;
	p = fract(p * 2.47) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 5.65 - time * 0.50); }
	p = rot2(time * -0.66) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
