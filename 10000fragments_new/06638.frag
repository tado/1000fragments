uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.16 + sin(p.y * 5.06 + t * 4.03) * 1.60 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.48) * p;
	p = rot2(p.y * -2.63 + time * 0.54) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.14, lr * 1.35 + time * 0.51); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.22, 0.50, 0.59), vec3(0.67, 0.67, 0.81), d);
	col *= 0.90 + 0.20 * sin(gl_FragCoord.y * 1.81 + time * 15.61);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
