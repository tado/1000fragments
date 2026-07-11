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
        vec2 mm = vec2(sin(t * 0.95 * sin(mf + 3.0) + ph), cos(t * 0.76 * cos(mf + 3.0) + ph));
        ms += 0.094 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.25, vec3(0.48, 0.49, 0.58), vec3(0.47, 0.48, 0.34), vec3(1.11, 0.86, 0.71), vec3(0.57, 0.22, 0.18));
	col = fract(col * 1.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
