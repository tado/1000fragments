uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 18.45 - t * 4.60 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 23.17 - t * 4.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 2.77 + time * -0.28); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(1.37) * p; }
	p = rot2(2.14) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.40, 0.29, 0.40), vec3(0.52, 0.50, 0.43), d);
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
