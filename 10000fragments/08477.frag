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
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.08 * sin(mf + 3.0) + ph), cos(t * 2.08 * cos(mf + 3.0) + ph));
        ms += 0.022 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.56 - t * 6.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	p += vec2(-0.71, -0.02) * sin(length(p) * 3.65 - time * 1.34) * 0.24;
	p = rot2(time * -0.69) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = d1 * d2;
	vec3 col = palette(d * 0.56 + time * 0.10, vec3(0.58, 0.57, 0.59), vec3(0.35, 0.43, 0.36), vec3(1.03, 0.78, 0.91), vec3(0.43, 0.30, 0.89));
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
