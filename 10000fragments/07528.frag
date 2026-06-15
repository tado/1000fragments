uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 17.95 - t * 3.19 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 22.65 - t * 3.19 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * -1.22) * p;
	p = rot2(p.y * -3.88 + time * 0.50) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.54; p = rot2(0.81) * p; }
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.94));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
