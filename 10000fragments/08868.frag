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
        vec2 mm = vec2(sin(t * 0.33 * sin(mf + 3.0) + ph), cos(t * 0.33 * cos(mf + 3.0) + ph));
        ms += 0.064 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.78 + time * 0.12, vec3(0.48, 0.48, 0.55), vec3(0.31, 0.33, 0.38), vec3(0.97, 1.01, 1.30), vec3(0.47, 0.11, 0.67));
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
