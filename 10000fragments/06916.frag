uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.47 + vec2(t * 2.68, -t * 2.68) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.03 + t * 2.13 + ph) + sin(p.y * 2.14 - t * 2.13 + ph)
        + sin((p.x + p.y) * 10.13 + t * 2.13 + ph) + sin(length(p) * 13.59 - t * 2.13 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	{ p = vec2(atan(p.y, p.x) * 2.50, length(p) * 3.07 - time * 0.18); }
	p = rot2(0.37) * p;
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	p *= 1.84;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.42 + time * 0.03, vec3(0.56, 0.46, 0.57), vec3(0.37, 0.50, 0.49), vec3(1.23, 1.08, 1.25), vec3(0.60, 0.98, 0.08));
	col = mod(col * 2.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
