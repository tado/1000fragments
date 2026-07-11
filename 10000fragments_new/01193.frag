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
        vec2 mm = vec2(sin(t * 1.31 * sin(mf + 3.0) + ph), cos(t * 0.39 * cos(mf + 3.0) + ph));
        ms += 0.047 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.92 + time * 0.07, vec3(0.47, 0.42, 0.56), vec3(0.45, 0.38, 0.45), vec3(0.97, 0.91, 1.01), vec3(0.99, 0.48, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
