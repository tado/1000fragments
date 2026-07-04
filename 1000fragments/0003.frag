uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.47, t * 0.50 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.41 * sin(mf + 3.0) + ph), cos(t * 1.33 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.43));
	p = rot2(length(p) * 3.72 + time * 1.21) * p;
	p = rot2(time * 0.76) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.70);
	float d = d1 + d2;
	vec3 col = palette(d * 1.79 + time * 0.02, vec3(0.51, 0.47, 0.42), vec3(0.40, 0.30, 0.44), vec3(1.01, 1.40, 0.78), vec3(0.01, 0.59, 0.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
