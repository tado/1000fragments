uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 26.01 - t * 1.94 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 11.00 - t * 1.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.67;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 2.63 + time * 0.69); }
	p += vec2(0.84, 0.00) * sin(length(p) * 4.94 - time * 1.08) * 0.11;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.13; p = rot2(1.22) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.18, 0.58), vec3(0.59, 0.62, 0.51), d);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
