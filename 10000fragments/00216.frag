uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.90;
    v = 0.5 * (sin(5.0 * cp.x + t * 2.90) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.50) * sin(5.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.79;
	{ p = vec2(atan(p.y, p.x) * 2.04, length(p) * 3.73 - time * 0.36); }
	p *= 1.0 + 0.20 * sin(time * 2.18);
	p = sin(p * 2.23 + time * 2.35) * 0.61;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.85), field(p, time, 1.71));
	col = 0.5 + 0.5 * col;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.97 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
