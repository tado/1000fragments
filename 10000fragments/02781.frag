uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.54 + vec2(t * 1.82, -t * 1.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	{ float fr = length(p); p *= 1.0 + 0.52 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.17; p = rot2(1.23) * p; }
	p = fract(p * 2.44) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.12));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
