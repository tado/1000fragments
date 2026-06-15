uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.95 + t * 2.22 + ph) + sin(p.y * 5.51 - t * 2.22 + ph)
        + sin((p.x + p.y) * 2.17 + t * 2.22 + ph) + sin(length(p) * 5.56 - t * 2.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.06, lr * 2.83 + time * -0.49); }
	p = rot2(length(p) * 2.36 + time * 0.91) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.11 + time * 0.10);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
