uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.55 + sin(p.y * 1.10 + t * 0.76) * 4.02 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.28, lr * 2.16 + time * -0.19); }
	p = rot2(length(p) * -4.00 + time * 0.41) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.99 + time * 0.00);
	col = mod(col * 2.48, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
