uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.30 + sin(p.y * 1.56 + t * 4.26) * 4.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * -1.36 + time * 0.88) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.19, lr * 2.68 + time * -0.52); }
	p = rot2(time * -1.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.27 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
