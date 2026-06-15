uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.32 + vec2(t * 2.16, -t * 2.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	p *= 2.36;
	p = rot2(p.y * -2.82 + time * 0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.09, vec3(0.59, 0.45, 0.48), vec3(0.49, 0.38, 0.40), vec3(1.38, 0.74, 0.81), vec3(0.57, 0.28, 0.62));
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
