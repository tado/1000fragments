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
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.32 * sin(mf + 3.0) + ph), cos(t * 0.70 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.04;
	p *= 1.31;
	p += vec2(-0.31, -0.60) * sin(length(p) * 2.32 - time * 1.80) * 0.38;
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	p = rot2(p.y * 1.12 + time * 0.35) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.15 + time * 0.09, vec3(0.41, 0.58, 0.60), vec3(0.42, 0.36, 0.41), vec3(1.24, 0.96, 1.37), vec3(0.61, 0.01, 0.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
