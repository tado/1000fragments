uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 32.75 - t * 4.07 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 26.87 - t * 4.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(0.94, 0.83) * sin(length(p) * 4.98 - time * 1.28) * 0.23;
	{ float fr = length(p); p *= 1.0 + -0.28 * fr * fr; }
	p *= 1.69;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.39), field(p, time, 0.78));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
