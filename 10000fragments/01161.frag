uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.82 + t * 3.92 + ph) + sin(p.y * 3.90 - t * 3.92 + ph)
        + sin((p.x + p.y) * 6.48 + t * 3.92 + ph) + sin(length(p) * 6.38 - t * 3.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.57, lr * 1.07 + time * -0.13); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.38; p = rot2(0.30) * p; }
	p = fract(p * 2.47) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.67 + time * 0.21);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
