uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.18 + sin(p.y * 2.27 + t * 1.33) * 1.40 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.28 + vec2(t * 2.62, -t * 2.62) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.54);
	float d = d1 * d2;
	vec3 col = palette(d * 1.59 + time * 0.24, vec3(0.44, 0.46, 0.42), vec3(0.38, 0.31, 0.49), vec3(1.05, 0.85, 0.84), vec3(0.24, 0.29, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
