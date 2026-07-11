uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.93, t * 1.42 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = rot2(time * -0.67) * p;
	p = rot2(p.y * 1.10 + time * 0.22) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.36, lr * 1.32 + time * -0.22); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.14; p = rot2(1.72) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.42 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
