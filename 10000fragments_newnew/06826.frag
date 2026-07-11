uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.01 + vec2(t * 2.10, -t * 0.32) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(0.54) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.15, vec3(0.42, 0.57, 0.50), vec3(0.38, 0.40, 0.49), vec3(0.71, 1.31, 1.03), vec3(0.18, 0.03, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
