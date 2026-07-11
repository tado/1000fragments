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
        vec2 mm = vec2(sin(t * 2.17 * sin(mf + 3.0) + ph), cos(t * 2.17 * cos(mf + 3.0) + ph));
        ms += 0.081 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.55) * p;
	p = rot2(length(p) * -1.34 + time * 0.95) * p;
	p = rot2(time * 0.98) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.76 + time * 0.20, vec3(0.49, 0.47, 0.55), vec3(0.37, 0.43, 0.41), vec3(0.92, 0.79, 0.97), vec3(0.13, 0.55, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
