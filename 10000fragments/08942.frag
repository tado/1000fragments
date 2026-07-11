uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 5; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.13 * sin(mf + 3.0) + ph), cos(t * 1.13 * cos(mf + 3.0) + ph));
        ms += 0.080 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.33, lr * 1.35 + time * -0.44); }
	p = rot2(p.y * -3.95 + time * 0.83) * p;
	p = rot2(time * -0.59) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.32, 0.46), vec3(0.84, 0.61, 0.70), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
