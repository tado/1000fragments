uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.05 + t * 3.36 + ph) + sin(p.y * 11.37 - t * 3.36 + ph)
        + sin((p.x + p.y) * 4.41 + t * 3.36 + ph) + sin(length(p) * 9.68 - t * 3.36 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 2.18 + time * -0.67); }
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	p = rot2(1.92) * p;
	p = rot2(p.y * -1.60 + time * 0.87) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.14));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
