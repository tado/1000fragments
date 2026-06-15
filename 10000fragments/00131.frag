uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.06 + t * 1.11 + ph) + sin(p.y * 9.23 - t * 1.11 + ph)
        + sin((p.x + p.y) * 3.57 + t * 1.11 + ph) + sin(length(p) * 12.45 - t * 1.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	p *= 2.87;
	p = rot2(length(p) * -1.33 + time * 0.33) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.23, lr * 3.00 + time * 0.45); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.06, vec3(0.55, 0.56, 0.54), vec3(0.45, 0.38, 0.31), vec3(0.98, 1.40, 1.38), vec3(0.87, 0.90, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
