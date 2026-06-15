uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 20.81 - t * 3.56 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.89, lr * 2.18 + time * 0.69); }
	p = rot2(time * -1.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.19, vec3(0.45, 0.46, 0.50), vec3(0.42, 0.47, 0.48), vec3(1.20, 1.21, 1.32), vec3(0.23, 0.83, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
