uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.72 * sin(mf + 3.0) + ph), cos(t * 0.72 * cos(mf + 3.0) + ph));
        ms += 0.091 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.82;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(0.55) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.74, lr * 1.44 + time * -0.71); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.97 + time * 0.26);
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
