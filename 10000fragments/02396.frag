uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.66 + t * 0.95 + ph) + sin(p.y * 2.51 - t * 0.95 + ph)
        + sin((p.x + p.y) * 4.61 + t * 0.95 + ph) + sin(length(p) * 13.89 - t * 0.95 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.54, lr * 2.53 + time * -0.22); }
	p += vec2(-0.08, -0.66) * sin(length(p) * 2.16 - time * 1.21) * 0.18;
	p = rot2(time * 1.33) * p;
	p = rot2(length(p) * -2.55 + time * 0.34) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
