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
    for(int mi = 0; mi < 8; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.36 * sin(mf + 3.0) + ph), cos(t * 2.36 * cos(mf + 3.0) + ph));
        ms += 0.056 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -2.85 + time * 0.73) * p;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.25 + time * 0.01, vec3(0.56, 0.51, 0.49), vec3(0.47, 0.31, 0.50), vec3(1.34, 1.07, 0.78), vec3(0.50, 0.83, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
