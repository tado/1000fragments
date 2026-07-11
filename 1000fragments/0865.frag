uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 3.37 + vec2(t * 1.58, -t * 1.58) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	p = rot2(length(p) * -3.80 + time * 1.17) * p;
	p = rot2(time * 1.11) * p;
	p = abs(p) - 0.61;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.22, vec3(0.54, 0.51, 0.59), vec3(0.39, 0.40, 0.35), vec3(0.86, 1.32, 1.06), vec3(0.90, 0.04, 0.10));
	col = mod(col * 1.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
