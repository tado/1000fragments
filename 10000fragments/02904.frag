uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.55 + vec2(t * 1.66, -t * 1.66) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.16 - t * 5.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.53; p = rot2(1.68) * p; }
	p = fract(p * 2.58) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = d1 * d2;
	vec3 col = palette(d * 1.13 + time * 0.25, vec3(0.54, 0.43, 0.49), vec3(0.35, 0.39, 0.49), vec3(0.82, 1.01, 0.71), vec3(0.17, 0.22, 0.79));
	col = fract(col * 2.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
