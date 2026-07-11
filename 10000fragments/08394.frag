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
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.20 * sin(mf + 3.0) + ph), cos(t * 1.20 * cos(mf + 3.0) + ph));
        ms += 0.020 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(-0.70, -0.02) * sin(length(p) * 2.94 - time * 1.77) * 0.29;
	p = rot2(1.97) * p;
	p = rot2(p.y * 2.86 + time * 0.45) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.07, vec3(0.48, 0.58, 0.55), vec3(0.44, 0.30, 0.44), vec3(0.76, 1.35, 1.10), vec3(0.06, 0.93, 0.96));
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
