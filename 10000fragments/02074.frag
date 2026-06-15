uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.40 + t * 2.51 + ph) + sin(p.y * 11.88 - t * 4.17 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.24 + vec2(t * 1.25, -t * 1.25) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.76 + time * 0.30) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.46);
	float d = d1 * d2;
	vec3 col = palette(d * 1.56 + time * 0.15, vec3(0.53, 0.50, 0.58), vec3(0.42, 0.39, 0.49), vec3(0.90, 1.10, 1.28), vec3(0.92, 0.56, 0.02));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
