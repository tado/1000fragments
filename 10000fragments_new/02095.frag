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
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.47 * sin(mf + 3.0) + ph), cos(t * 1.11 * cos(mf + 3.0) + ph));
        ms += 0.072 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.62) * p;
	p = abs(p) - 0.73;
	p.x += sin(p.y * 2.98 + time * 2.59) * 0.20;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.26, vec3(0.57, 0.56, 0.41), vec3(0.46, 0.48, 0.47), vec3(1.01, 0.80, 1.06), vec3(0.37, 0.94, 0.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
