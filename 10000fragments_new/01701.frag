uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.12 + t * 3.85 + ph) * 0.7;
    float wb = sin(p.y * 15.83 - t * 0.67 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.71;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.28));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
