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
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.82 * sin(mf + 3.0) + ph), cos(t * 1.82 * cos(mf + 3.0) + ph));
        ms += 0.052 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	p = fract(p * 1.77) - 0.5;
	p = rot2(p.y * 3.34 + time * 0.66) * p;
	p = rot2(2.00) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.30 + time * 0.08, vec3(0.50, 0.43, 0.58), vec3(0.42, 0.40, 0.40), vec3(0.70, 0.85, 1.21), vec3(0.28, 0.39, 0.87));
	col = clamp((col - 0.5) * 1.40 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
