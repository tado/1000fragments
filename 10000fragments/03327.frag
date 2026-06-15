uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.06 + t * 2.93 + ph) + sin(p.y * 5.20 - t * 2.93 + ph)
        + sin((p.x + p.y) * 7.37 + t * 2.93 + ph) + sin(length(p) * 17.11 - t * 2.93 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.52) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.02 + time * 0.80); }
	p = rot2(time * -1.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
