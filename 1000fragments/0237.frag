uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.24 * sin(mf + 3.0) + ph), cos(t * 1.24 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -3.42 + time * 0.66) * p;
	p = rot2(time * 1.39) * p;
	p = fract(p * 2.50) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.37);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
