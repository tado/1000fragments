uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 19.04 - t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 1.65 + time * -0.67); }
	p = rot2(p.y * -1.32 + time * 0.45) * p;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 3.07 - time * 0.35); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.52; p = rot2(1.48) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.59 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
