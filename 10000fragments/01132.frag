uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.15 + t * 1.16 + ph) + sin(p.y * 10.87 - t * 1.16 + ph)
        + sin((p.x + p.y) * 10.42 + t * 1.16 + ph) + sin(length(p) * 12.82 - t * 1.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	p = rot2(p.y * 3.53 + time * 0.88) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.37, lr * 1.28 + time * 0.80); }
	p += vec2(0.55, -0.60) * sin(length(p) * 4.07 - time * 1.81) * 0.12;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.74 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
