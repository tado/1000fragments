uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.95 + t * 4.71 + ph) + sin(p.y * 6.37 - t * 4.91 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * 1.31) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.36) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 2.28 + time * -0.62); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.69 + time * 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
