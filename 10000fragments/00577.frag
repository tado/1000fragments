uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.92 + t * 4.79 + ph) + sin(p.y * 6.74 - t * 4.79 + ph)
        + sin((p.x + p.y) * 8.69 + t * 4.79 + ph) + sin(length(p) * 18.00 - t * 4.79 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.23;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.31; p = rot2(0.97) * p; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = rot2(p.y * 1.14 + time * 0.33) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.59, lr * 2.08 + time * -0.19); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.54 + time * 0.00, vec3(0.60, 0.45, 0.60), vec3(0.37, 0.46, 0.33), vec3(0.70, 1.27, 1.15), vec3(0.18, 0.02, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
