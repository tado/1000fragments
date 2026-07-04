uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.19 * sin(mf + 3.0) + ph), cos(t * 1.07 * cos(mf + 3.0) + ph));
        ms += 0.088 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = sin(p * 2.18 + time * 1.68) * 0.95;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.20, vec3(0.47, 0.45, 0.55), vec3(0.33, 0.49, 0.43), vec3(1.15, 0.73, 1.15), vec3(0.44, 0.57, 0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
