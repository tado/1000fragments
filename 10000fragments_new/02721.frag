uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.56 + sr * 12.68 - t * 0.77 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.51, t * 0.66 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.19) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(2.49) * p; }
	p = rot2(length(p) * -3.66 + time * 1.14) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 1.27 + time * 0.18, vec3(0.57, 0.45, 0.58), vec3(0.47, 0.47, 0.31), vec3(0.84, 1.15, 1.18), vec3(0.89, 0.02, 0.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
