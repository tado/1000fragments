uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.16 * sin(mf + 3.0) + ph), cos(t * 1.16 * cos(mf + 3.0) + ph));
        ms += 0.086 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	p = rot2(length(p) * -1.95 + time * 0.48) * p;
	p += vec2(-0.19, -0.96) * sin(length(p) * 5.50 - time * 0.87) * 0.29;
	p = abs(p) - 0.79;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
