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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.42 * sin(mf + 3.0) + ph), cos(t * 1.42 * cos(mf + 3.0) + ph));
        ms += 0.032 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.09;
	p = rot2(time * 0.55) * p;
	p = rot2(1.50) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.17, vec3(0.55, 0.54, 0.59), vec3(0.42, 0.35, 0.39), vec3(1.17, 1.13, 1.25), vec3(0.60, 0.13, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
