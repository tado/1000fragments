uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.20 - t * 6.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.99, lr * 2.43 + time * -0.53); }
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 5.17 - time * 0.79); }
	p = rot2(p.y * -3.32 + time * 0.39) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.41; p = rot2(0.37) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.63 + time * 0.00);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
