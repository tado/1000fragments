uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.37 * sin(mf + 3.0) + ph), cos(t * 2.37 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.46, t * 1.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	p = fract(p * 2.19) - 0.5;
	p = rot2(length(p) * -3.13 + time * 0.42) * p;
	p = abs(p);
	p += vec2(-0.69, 0.28) * sin(length(p) * 3.01 - time * 1.78) * 0.38;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.26);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.87 + time * 0.23, vec3(0.53, 0.52, 0.41), vec3(0.37, 0.35, 0.38), vec3(1.16, 1.16, 1.39), vec3(0.26, 0.24, 0.27));
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
