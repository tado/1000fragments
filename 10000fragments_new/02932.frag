uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.44 + t * 1.19 + ph) + sin(p.y * 2.87 - t * 4.68 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.25, vec3(0.43, 0.43, 0.49), vec3(0.49, 0.39, 0.44), vec3(0.88, 0.78, 0.77), vec3(0.85, 0.65, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
