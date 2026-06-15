uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.35, 0.0)) * 8.60 - t * 7.05 + ph);
    float mb = sin(length(p + vec2(0.35, 0.0)) * 34.16 - t * 7.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.69;
	{ float fr = length(p); p *= 1.0 + 0.32 * fr * fr; }
	p = fract(p * 2.88) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.64), field(p, time, 1.29));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
