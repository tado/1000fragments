uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 18.45 - t * 2.85 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 14.23 - t * 2.85 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.86), field(p, time, 1.73));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
