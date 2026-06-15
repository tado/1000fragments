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
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.76 * sin(mf + 3.0) + ph), cos(t * 1.76 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.84 + sin(p.y * 2.84 + t * 4.20) * 4.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 2.69) - 0.5;
	p = rot2(length(p) * 3.36 + time * 0.84) * p;
	{ float fr = length(p); p *= 1.0 + -0.38 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 5.94 - time * 0.68); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.80);
	float d = d1 * d2;
	vec3 col = palette(d * 0.76 + time * 0.04, vec3(0.56, 0.50, 0.48), vec3(0.38, 0.43, 0.46), vec3(0.91, 1.20, 0.82), vec3(0.48, 0.43, 0.01));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
