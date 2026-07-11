uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.89 + t * 3.59 + ph) * 0.7;
    float wb = sin(p.y * 16.85 - t * 1.71 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.40;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(length(p) * 3.28 + time * 0.59) * p;
	p = abs(p) - 0.29;
	p = rot2(p.y * -2.94 + time * 0.72) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.18, vec3(0.45, 0.41, 0.49), vec3(0.41, 0.45, 0.43), vec3(1.32, 1.40, 0.94), vec3(0.17, 0.80, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
