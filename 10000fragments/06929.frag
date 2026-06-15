uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.25 + sin(p.y * 4.41 + t * 4.88) * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.24;
	p = rot2(length(p) * 2.50 + time * 0.50) * p;
	p = rot2(p.y * 1.82 + time * 0.28) * p;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(1.99) * p; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.05);
	col = mod(col * 1.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
