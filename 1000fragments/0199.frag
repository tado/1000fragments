uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.57 + vec2(t * 1.90, -t * 1.90) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.88 * sin(mf + 3.0) + ph), cos(t * 0.88 * cos(mf + 3.0) + ph));
        ms += 0.029 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.82;
	p = rot2(length(p) * 3.58 + time * 0.60) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.02 + time * 0.22, vec3(0.51, 0.40, 0.46), vec3(0.37, 0.30, 0.39), vec3(1.35, 0.95, 0.85), vec3(0.12, 0.83, 0.31));
	col = mod(col * 2.06, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
