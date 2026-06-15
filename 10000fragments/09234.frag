uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.70 + 0.29 * cos(sa * 7 + t * 1.98 + ph);
    v = sin((sr - petal) * 8.69);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 10; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.85 * sin(mf + 3.0) + ph), cos(t * 0.85 * cos(mf + 3.0) + ph));
        ms += 0.087 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	p = rot2(length(p) * 2.06 + time * 0.86) * p;
	p += vec2(-0.16, 0.53) * sin(length(p) * 2.77 - time * 1.88) * 0.20;
	p = fract(p * 2.96) - 0.5;
	p = rot2(1.44) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.74);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.11, vec3(0.42, 0.50, 0.42), vec3(0.34, 0.36, 0.48), vec3(0.88, 1.29, 0.95), vec3(0.48, 0.25, 0.92));
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
