uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.74 + t * 3.82 + ph) + sin(p.y * 9.13 - t * 3.82 + ph)
        + sin((p.x + p.y) * 2.86 + t * 3.82 + ph) + sin(length(p) * 14.40 - t * 3.82 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.31;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.71, lr * 2.15 + time * -0.63); }
	p += vec2(1.00, 0.07) * sin(length(p) * 5.94 - time * 1.08) * 0.32;
	p = rot2(length(p) * -2.51 + time * 0.77) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.40 + time * 0.09);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
