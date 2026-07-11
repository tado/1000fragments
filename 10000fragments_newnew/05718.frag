uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.42 + ga * 4.0 - t * 2.96 + ph);
    v = arm * exp(-gr * 0.98);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.17;
	p = rot2(length(p) * 2.07 + time * 0.95) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.88, lr * 1.87 + time * 0.48); }
	p = abs(p);
	p += vec2(0.73, -0.14) * sin(length(p) * 2.32 - time * 1.07) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.26 + time * 0.11);
	col *= 0.88 + 0.15 * sin(gl_FragCoord.y * 2.12 + time * 12.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
