uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.18 + vec2(t * 0.78, -t * 0.78) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 1.30 + time * 0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.19, vec3(0.57, 0.51, 0.45), vec3(0.37, 0.33, 0.32), vec3(1.11, 1.10, 0.84), vec3(0.95, 0.59, 0.25));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
