uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 16; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.92 * sin(mf + 3.0) + ph), cos(t * 0.92 * cos(mf + 3.0) + ph));
        ms += 0.083 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.56, 0.63, 1.27) + vec3(0.13, 0.00, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
