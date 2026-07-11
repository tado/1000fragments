uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.37 * sin(mf + 3.0) + ph), cos(t * 0.37 * cos(mf + 3.0) + ph));
        ms += 0.045 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	p = rot2(length(p) * -2.17 + time * 0.90) * p;
	p += vec2(0.49, 0.77) * sin(length(p) * 2.87 - time * 0.92) * 0.21;
	p *= 1.74;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.51), field(p, time, 1.02));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.81, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
