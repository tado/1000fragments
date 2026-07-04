uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.78 + t * 3.68 + ph) + sin(p.y * 6.81 - t * 3.68 + ph)
        + sin((p.x + p.y) * 5.48 + t * 3.68 + ph) + sin(length(p) * 14.55 - t * 3.68 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.05;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.73 + time * -0.57); }
	p = rot2(2.36) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.22));
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.18, vec3(0.44, 0.55, 0.54), vec3(0.49, 0.38, 0.43), vec3(0.76, 0.74, 1.39), vec3(0.09, 0.69, 0.89));
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 1.14 + time * 9.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
