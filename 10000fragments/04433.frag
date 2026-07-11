uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 31.71 - t * 4.48 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 16.68 - t * 4.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	p = fract(p * 3.00) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.30), field(p, time, 0.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
