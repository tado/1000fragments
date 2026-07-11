uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.20 + t * 2.23 + ph) + sin(p.y * 12.50 - t * 2.23 + ph)
        + sin((p.x + p.y) * 3.58 + t * 2.23 + ph) + sin(length(p) * 11.82 - t * 2.23 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.85 + vec2(t * 2.63, -t * 2.63) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.34 + time * 1.10) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.56; p = rot2(0.79) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.17);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.51 + time * 0.05, vec3(0.42, 0.55, 0.56), vec3(0.43, 0.39, 0.35), vec3(1.06, 1.01, 1.24), vec3(0.03, 0.76, 0.47));
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
