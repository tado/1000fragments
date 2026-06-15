uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.84 + t * 2.46 + ph) + sin(p.y * 15.52 - t * 2.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(2.72) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.84, lr * 2.73 + time * 0.52); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.14 + time * 0.21, vec3(0.56, 0.50, 0.51), vec3(0.35, 0.49, 0.44), vec3(0.94, 1.16, 0.83), vec3(0.75, 0.18, 0.38));
	col = mod(col * 2.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
