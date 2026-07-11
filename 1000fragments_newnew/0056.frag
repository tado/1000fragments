uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.57 + 0.21 * pow(abs(cos(ra * 3.0 + t * 1.98)), 2.71);
    v = sin((rr - pet) * 9.64 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 hx = p * 2.25;
    vec2 r1 = vec2(1.0, 1.7320508);
    vec2 h1 = r1 * 0.5;
    vec2 a1 = mod(hx, r1) - h1;
    vec2 b1 = mod(hx - h1, r1) - h1;
    vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
    float hd = max(abs(gv.x) * 0.8660254 + abs(gv.y) * 0.5, abs(gv.y));
    v = sin(hd * 22.55 - t * 5.34 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.40; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.65;
	{ float fr = length(p); p *= 1.0 + -0.54 * fr * fr; }
	float d1 = field(p, (time * 0.66), 0.0);
	float d2 = field2(p, (time * 0.66), 0.49);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.87 + (time * 0.66) * 0.05, vec3(0.39, 0.41, 0.41), vec3(0.22, 0.20, 0.21), vec3(0.89, 0.84, 0.78), vec3(0.65, 0.96, 0.36));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.003, 0.930) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
