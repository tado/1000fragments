uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.07 + t * 4.47 + ph) + sin(p.y * 9.40 - t * 4.47 + ph)
        + sin((p.x + p.y) * 10.59 + t * 4.47 + ph) + sin(length(p) * 3.14 - t * 4.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	{ p = vec2(atan(p.y, p.x) * 2.38, length(p) * 4.85 - time * 0.73); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.19; p = rot2(2.14) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
