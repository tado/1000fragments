uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.35 + t * 5.13 + ph) + sin(p.y * 11.02 - t * 4.73 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.37) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.77, lr * 1.99 + time * -0.21); }
	p = rot2(0.54) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.24), field(p, time, 2.48));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
