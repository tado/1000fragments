uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 13; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.69 * sin(mf + 3.0) + ph), cos(t * 1.69 * cos(mf + 3.0) + ph));
        ms += 0.036 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.71;
	{ p = vec2(atan(p.y, p.x) * 1.81, length(p) * 4.09 - time * 0.50); }
	{ float fr = length(p); p *= 1.0 + 0.74 * fr * fr; }
	p = rot2(0.94) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
