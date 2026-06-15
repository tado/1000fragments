uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 9.24 - t * 7.14 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.98;
	p = rot2(2.17) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.24, lr * 1.32 + time * -0.38); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.21; p = rot2(2.37) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.36, 0.11), vec3(0.57, 0.73, 0.82), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
