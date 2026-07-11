uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.23, 0.0)) * 14.16 - t * 7.23 + ph);
    float mb = sin(length(p + vec2(0.23, 0.0)) * 15.12 - t * 7.23 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.57;
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p = rot2(time * 0.45) * p;
	p *= 1.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.20, lr * 1.19 + time * -0.52); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.25, 1.15, 1.09) + vec3(0.03, 0.17, 0.03);
	col = clamp((col - 0.5) * 1.24 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
