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
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.59 * sin(mf + 3.0) + ph), cos(t * 1.59 * cos(mf + 3.0) + ph));
        ms += 0.042 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	p += vec2(-0.73, -0.66) * sin(length(p) * 5.14 - time * 1.10) * 0.20;
	p = rot2(length(p) * 2.68 + time * 0.64) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.01, vec3(0.45, 0.55, 0.54), vec3(0.46, 0.37, 0.36), vec3(0.81, 0.89, 0.88), vec3(0.98, 0.38, 0.83));
	col = mod(col * 2.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
