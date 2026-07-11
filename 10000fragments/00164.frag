uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.49 + t * 2.23 + ph) + sin(p.y * 14.30 - t * 5.03 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	p = rot2(p.y * 1.48 + time * 0.82) * p;
	p = rot2(2.18) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.10, vec3(0.56, 0.55, 0.52), vec3(0.40, 0.42, 0.38), vec3(1.37, 1.18, 1.20), vec3(0.58, 0.22, 0.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
