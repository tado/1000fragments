uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.70 * sin(mf + 3.0) + ph), cos(t * 0.70 * cos(mf + 3.0) + ph));
        ms += 0.039 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.08;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.72, 1.44, 0.95) + vec3(0.25, 0.19, 0.20);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
