uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.84 + t * 1.71 + ph) + sin(p.y * 7.40 - t * 1.71 + ph)
        + sin((p.x + p.y) * 11.57 + t * 1.71 + ph) + sin(length(p) * 12.75 - t * 1.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p = rot2(1.75) * p;
	p = rot2(p.y * -1.97 + time * 0.71) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.22, lr * 1.32 + time * -0.49); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.08);
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
