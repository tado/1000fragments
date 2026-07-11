uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.16 + vec2(t * 2.13, -t * 2.13) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 25.81 - t * 3.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(p.y * 2.11 + time * 0.29) * p;
	p = abs(p) - 0.25;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.75);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.10, vec3(0.55, 0.57, 0.42), vec3(0.34, 0.34, 0.40), vec3(1.23, 1.06, 0.94), vec3(0.39, 0.65, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
