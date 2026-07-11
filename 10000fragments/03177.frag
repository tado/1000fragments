uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.24 + vec2(t * 0.67, -t * 0.67) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	p = rot2(3.04) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.02 + time * 0.08, vec3(0.58, 0.59, 0.41), vec3(0.48, 0.47, 0.32), vec3(0.91, 0.84, 1.23), vec3(0.18, 0.47, 0.21));
	col = clamp((col - 0.5) * 1.23 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
