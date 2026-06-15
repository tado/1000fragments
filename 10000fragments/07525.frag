uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.51, 0.0)) * 29.93 - t * 3.86 + ph);
    float mb = sin(length(p + vec2(0.51, 0.0)) * 12.61 - t * 3.86 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.87;
	{ float fr = length(p); p *= 1.0 + 0.68 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 2.37, length(p) * 2.32 - time * 0.35); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.96), field(p, time, 1.91));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
