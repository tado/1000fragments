uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 6; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.28 * sin(mf + 3.0) + ph), cos(t * 1.28 * cos(mf + 3.0) + ph));
        ms += 0.069 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 1.00) * p;
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.29; p = rot2(1.67) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.79, 1.09, 1.18) + vec3(0.00, 0.09, 0.12);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.99));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
