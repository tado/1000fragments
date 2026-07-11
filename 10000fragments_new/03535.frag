uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.81 + vec2(t * 2.29, -t * 2.35) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 30.30 - t * 4.02 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 22.02 - t * 5.52 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.68;
	p += vec2(0.76, 0.24) * sin(length(p) * 3.66 - time * 1.72) * 0.15;
	p.y += sin(p.x * 5.39 + time * 3.80) * 0.25;
	{ float fr = length(p); p *= 1.0 + 0.63 * fr * fr; }
	p = rot2(p.y * 3.76 + time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.38);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.86 + time * 0.09, vec3(0.45, 0.56, 0.56), vec3(0.40, 0.48, 0.45), vec3(1.29, 1.18, 1.15), vec3(0.68, 0.11, 0.54));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
