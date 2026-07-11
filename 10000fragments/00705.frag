uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.30 + sin(p.y * 4.93 + t * 2.30) * 2.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 1.46, length(p) * 4.33 - time * 0.34); }
	{ float fr = length(p); p *= 1.0 + 0.27 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.54; p = rot2(2.21) * p; }
	p = abs(p) - 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.27), field(p, time, 0.55));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
