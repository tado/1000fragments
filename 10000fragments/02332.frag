uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.72 + t * 3.37 + ph) + sin(p.y * 13.54 - t * 3.37 + ph)
        + sin((p.x + p.y) * 8.39 + t * 3.37 + ph) + sin(length(p) * 15.49 - t * 3.37 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.28 + t * 0.85 + ph) + sin(p.y * 13.20 - t * 0.85 + ph)
        + sin((p.x + p.y) * 8.21 + t * 0.85 + ph) + sin(length(p) * 6.12 - t * 0.85 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.00;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 1.97 + time * -0.14); }
	p = rot2(p.y * 1.60 + time * 0.89) * p;
	p *= 1.26;
	p = rot2(time * 0.61) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.95);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.22, vec3(0.54, 0.49, 0.56), vec3(0.48, 0.46, 0.31), vec3(1.25, 0.87, 0.85), vec3(0.64, 0.63, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
