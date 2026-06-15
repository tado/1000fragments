uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.61 + t * 2.07 + ph) + sin(p.y * 13.44 - t * 2.07 + ph)
        + sin((p.x + p.y) * 7.09 + t * 2.07 + ph) + sin(length(p) * 4.97 - t * 2.07 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.18, lr * 1.96 + time * -0.66); }
	p = rot2(0.77) * p;
	{ float fr = length(p); p *= 1.0 + 0.71 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.35; p = rot2(1.64) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.32, 0.32, 0.25), vec3(0.80, 0.91, 0.63), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
