uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.62 + t * 3.57 + ph) + sin(p.y * 8.01 - t * 3.57 + ph)
        + sin((p.x + p.y) * 5.87 + t * 3.57 + ph) + sin(length(p) * 17.14 - t * 3.57 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.07, lr * 1.11 + time * 0.41); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(1.82) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.20, 0.52, 0.68) + vec3(0.17, 0.05, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
