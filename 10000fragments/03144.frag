uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.58 + vec2(t * 1.68, -t * 1.68) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.32, lr * 1.19 + time * -0.68); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.32; p = rot2(2.26) * p; }
	p *= 1.55;
	p = rot2(length(p) * 2.04 + time * 1.15) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.09, 0.18), vec3(0.74, 0.92, 0.50), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
