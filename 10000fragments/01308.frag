uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.54 + t * 2.75 + ph) + sin(p.y * 2.02 - t * 2.75 + ph)
        + sin((p.x + p.y) * 6.76 + t * 2.75 + ph) + sin(length(p) * 7.44 - t * 2.75 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.25, lr * 1.19 + time * -0.76); }
	p = rot2(p.y * -1.50 + time * 0.61) * p;
	p *= 1.94;
	p = rot2(2.53) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.93));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
