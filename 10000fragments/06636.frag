uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.75 * sin(mf + 3.0) + ph), cos(t * 2.17 * cos(mf + 3.0) + ph));
        ms += 0.022 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.72;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.62; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.61;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.44));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
