uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.15 + t * 5.40 + ph) + sin(p.y * 6.06 - t * 4.12 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = rot2(p.y * -3.22 + time * 0.68) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.34; p = rot2(1.40) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.83, lr * 2.72 + time * -0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.46 + time * 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
