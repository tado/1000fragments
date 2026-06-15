uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.59 * sin(mf + 3.0) + ph), cos(t * 0.59 * cos(mf + 3.0) + ph));
        ms += 0.021 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.56 + time * 0.23, vec3(0.59, 0.46, 0.50), vec3(0.32, 0.49, 0.46), vec3(0.88, 1.39, 1.30), vec3(0.09, 0.58, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
