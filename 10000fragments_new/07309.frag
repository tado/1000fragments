uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 15.86 - t * 1.55 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 27.86 - t * 2.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p = rot2(0.98) * p;
	p = (floor(p * 7.1) + 0.5) / 7.1;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.52; p = rot2(2.01) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.20, lr * 1.24 + time * 0.60); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.22, 0.42), vec3(0.79, 0.69, 0.88), d);
	col = fract(col * 1.15);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
