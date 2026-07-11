uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.64 + t * 4.21 + ph) + sin(p.y * 8.75 - t * 4.21 + ph)
        + sin((p.x + p.y) * 2.91 + t * 4.21 + ph) + sin(length(p) * 17.84 - t * 4.21 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p *= 1.94;
	p.x += sin(p.y * 3.46 + time * 2.54) * 0.36;
	p = rot2(p.y * -1.20 + time * 0.89) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.59, lr * 2.51 + time * -0.71); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.06, vec3(0.47, 0.43, 0.46), vec3(0.38, 0.44, 0.39), vec3(1.40, 0.70, 0.75), vec3(0.13, 0.12, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
