uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.89 * sin(mf + 3.0) + ph), cos(t * 0.84 * cos(mf + 3.0) + ph));
        ms += 0.033 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.42, length(p) * 2.60 - time * 0.50); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.83, 0.55, 0.27) * (0.20 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
