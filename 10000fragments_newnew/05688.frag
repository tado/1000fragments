uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.67 * sin(mf + 3.0) + ph), cos(t * 1.27 * cos(mf + 3.0) + ph));
        ms += 0.046 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.28;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.98; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.51;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.72 + time * 0.09, vec3(0.48, 0.53, 0.40), vec3(0.49, 0.42, 0.42), vec3(1.39, 1.24, 0.98), vec3(0.39, 0.57, 0.38));
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.30 + time * 9.98);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
