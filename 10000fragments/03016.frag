uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.03 + sin(p.y * 3.86 + t * 4.39) * 3.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.65, 0.10) * sin(length(p) * 4.43 - time * 1.93) * 0.13;
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	{ p = vec2(atan(p.y, p.x) * 1.80, length(p) * 2.13 - time * 0.70); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
