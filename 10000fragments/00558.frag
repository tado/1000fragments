uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.74 * sin(mf + 3.0) + ph), cos(t * 0.74 * cos(mf + 3.0) + ph));
        ms += 0.082 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	p = abs(p) - 0.63;
	p += vec2(0.60, 0.22) * sin(length(p) * 2.01 - time * 1.67) * 0.29;
	p = fract(p * 1.94) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.98, length(p) * 2.47 - time * 0.45); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.51));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.45));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
