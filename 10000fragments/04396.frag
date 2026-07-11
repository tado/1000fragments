uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 24.21 - t * 6.77 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 22.87 - t * 6.77 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.77 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.40, length(p) * 4.15 - time * 0.10); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.83), field(p, time, 1.66));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
