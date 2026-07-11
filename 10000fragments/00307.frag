uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.72 + t * 5.23 + ph) + sin(p.y * 17.91 - t * 2.20 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = rot2(p.y * 2.49 + time * 0.90) * p;
	p = rot2(time * -0.76) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.29, lr * 2.01 + time * -0.54); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.32), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
