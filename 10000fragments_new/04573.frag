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
        vec2 mm = vec2(sin(t * 1.76 * sin(mf + 3.0) + ph), cos(t * 2.17 * cos(mf + 3.0) + ph));
        ms += 0.040 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -1.06 + time * 0.46) * p;
	{ p = vec2(atan(p.y, p.x) * 2.65, length(p) * 3.35 - time * 0.37); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.26, vec3(0.45, 0.46, 0.42), vec3(0.38, 0.34, 0.35), vec3(0.80, 1.35, 1.30), vec3(0.61, 0.97, 0.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
