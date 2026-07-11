uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.49 + t * 2.89 + ph) + sin(p.y * 17.49 - t * 0.81 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 5.03;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 10.17 - t * 2.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.43;
	p *= 2.27;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	p = rot2(time * -0.68) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.92 + time * 0.23, vec3(0.49, 0.44, 0.57), vec3(0.34, 0.43, 0.33), vec3(1.23, 0.90, 0.95), vec3(0.85, 0.62, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
