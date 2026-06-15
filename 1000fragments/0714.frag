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
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.97 * sin(mf + 3.0) + ph), cos(t * 1.97 * cos(mf + 3.0) + ph));
        ms += 0.083 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.79) * p;
	p += vec2(-0.39, 0.92) * sin(length(p) * 4.18 - time * 0.88) * 0.11;
	p *= 2.87;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.22, vec3(0.44, 0.47, 0.48), vec3(0.39, 0.42, 0.36), vec3(1.07, 0.99, 0.78), vec3(0.87, 0.25, 0.70));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
