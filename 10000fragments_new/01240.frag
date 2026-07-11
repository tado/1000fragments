uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.54 + sin(p.y * 3.41 + t * 4.10) * 2.19 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 2.81 + time * -0.82); }
	{ float fr = length(p); p *= 1.0 + 0.79 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.80 + time * 0.26, vec3(0.58, 0.56, 0.60), vec3(0.34, 0.45, 0.34), vec3(0.98, 1.14, 1.31), vec3(0.11, 0.16, 0.41));
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.16 + time * 4.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
