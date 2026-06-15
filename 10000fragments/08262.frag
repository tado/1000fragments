uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.05 + t * 1.92 + ph) + sin(p.y * 12.03 - t * 1.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	{ p = vec2(atan(p.y, p.x) * 2.34, length(p) * 4.57 - time * 0.12); }
	p = rot2(1.05) * p;
	p += vec2(0.13, -0.08) * sin(length(p) * 2.49 - time * 1.86) * 0.21;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(2.24) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.67));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
