uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.37, t * 1.27 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.46, 0.89) * sin(length(p) * 5.81 - time * 1.23) * 0.33;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.56, lr * 1.91 + time * 0.29); }
	p = fract(p * 1.20) - 0.5;
	p = rot2(p.y * 2.04 + time * 0.93) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.09);
	col = mod(col * 3.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
