uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.57 * sin(mf + 3.0) + ph), cos(t * 0.57 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.34;
	p = abs(p) - 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.28 + time * 0.05, vec3(0.54, 0.44, 0.55), vec3(0.39, 0.37, 0.43), vec3(1.34, 1.02, 0.86), vec3(0.24, 0.26, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
