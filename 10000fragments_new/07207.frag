uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.36 + t * 3.61 + ph) * 0.7;
    float wb = sin(p.y * 16.78 - t * 0.50 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.47;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	p *= 2.10;
	p = fract(p * 1.45) - 0.5;
	p.x += sin(p.y * 5.55 + time * 3.80) * 0.12;
	{ p = vec2(atan(p.y, p.x) * 1.19, length(p) * 5.38 - time * 0.77); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.10), field(p, time, 2.19));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
