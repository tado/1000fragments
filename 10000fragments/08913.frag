uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.86 * sin(mf + 3.0) + ph), cos(t * 0.86 * cos(mf + 3.0) + ph));
        ms += 0.074 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.51;
	p *= 2.73;
	p = rot2(length(p) * 3.58 + time * 0.42) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.76 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
