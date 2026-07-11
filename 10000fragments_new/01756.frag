uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 6.84 + t * 2.68 + ph) * 0.7;
    float wb = sin(p.y * 5.31 - t * 3.96 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.21;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.31, lr * 1.58 + time * 0.59); }
	p = fract(p * 1.62) - 0.5;
	p = rot2(p.y * 2.40 + time * 0.88) * p;
	p = rot2(length(p) * 2.11 + time * 1.35) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.08, 0.38, 0.03), vec3(0.66, 0.63, 0.75), d);
	col = fract(col * 2.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
