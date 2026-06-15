uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.26 + t * 1.83 + ph) + sin(p.y * 9.48 - t * 5.65 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(1.47) * p; }
	p = rot2(1.74) * p;
	{ p = vec2(atan(p.y, p.x) * 1.06, length(p) * 2.33 - time * 0.44); }
	p = fract(p * 1.42) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.48), field(p, time, 0.96));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
