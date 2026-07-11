uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.02 * sin(mf + 3.0) + ph), cos(t * 1.61 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 4.69 - time * 0.46); }
	p = rot2(p.y * 2.90 + time * 0.39) * p;
	p += vec2(-0.37, -0.05) * sin(length(p) * 5.84 - time * 0.90) * 0.28;
	p = rot2(length(p) * -2.42 + time * 0.74) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.93));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
