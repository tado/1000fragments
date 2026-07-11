uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 38.01 - t * 3.70 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 9.39 - t * 5.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = abs(p) - 0.48;
	{ float fr = length(p); p *= 1.0 + 0.64 * fr * fr; }
	p *= 1.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.73));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
