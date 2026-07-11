uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 39.52 - t * 5.28 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 10.57 - t * 5.28 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.25; p = rot2(0.75) * p; }
	{ float fr = length(p); p *= 1.0 + 0.23 * fr * fr; }
	p = rot2(time * -0.89) * p;
	p *= 2.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.32, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
