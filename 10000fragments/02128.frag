uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 14; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.99 * sin(mf + 3.0) + ph), cos(t * 0.99 * cos(mf + 3.0) + ph));
        ms += 0.065 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.88;
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 4.27 - time * 0.27); }
	p = rot2(p.y * 2.42 + time * 0.57) * p;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
