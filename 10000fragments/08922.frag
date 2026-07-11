uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.77 * sin(mf + 3.0) + ph), cos(t * 1.77 * cos(mf + 3.0) + ph));
        ms += 0.060 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.94;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.04, vec3(0.41, 0.58, 0.58), vec3(0.31, 0.44, 0.30), vec3(1.19, 1.09, 0.70), vec3(0.51, 0.15, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
