uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 16.95 - t * 3.28 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 23.95 - t * 3.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.38) - 0.5;
	p = (floor(p * 22.3) + 0.5) / 22.3;
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.97, length(p) * 4.03 - time * 0.69); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.72));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
