uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 11.89 - t * 1.68 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 34.83 - t * 1.68 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.84 + vec2(t * 1.22, -t * 1.22) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.25) * p;
	p = rot2(p.y * 3.56 + time * 0.49) * p;
	{ float fr = length(p); p *= 1.0 + -0.71 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.39);
	float d = d1 * d2;
	vec3 col = palette(d * 1.19 + time * 0.08, vec3(0.51, 0.57, 0.56), vec3(0.50, 0.46, 0.39), vec3(0.75, 1.34, 0.85), vec3(0.19, 0.21, 0.16));
	col = mod(col * 2.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
