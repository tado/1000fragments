uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 15; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.63 * sin(mf + 3.0) + ph), cos(t * 1.63 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	p = abs(p) - 0.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.31 + time * 0.05, vec3(0.50, 0.53, 0.45), vec3(0.34, 0.32, 0.37), vec3(1.01, 1.07, 0.86), vec3(0.32, 0.74, 0.54));
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
