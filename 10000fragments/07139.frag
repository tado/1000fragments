uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.10 + t * 2.17 + ph) + sin(p.y * 9.00 - t * 2.17 + ph)
        + sin((p.x + p.y) * 2.19 + t * 2.17 + ph) + sin(length(p) * 3.42 - t * 2.17 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	p += vec2(-0.93, 0.24) * sin(length(p) * 3.00 - time * 0.66) * 0.24;
	p = rot2(time * 0.30) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 1.73 + time * -0.49); }
	p = rot2(length(p) * 2.69 + time * 0.28) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.63 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
