uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.89 + t * 2.15 + ph) * 0.7;
    float wb = sin(p.y * 6.65 - t * 1.52 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.28;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.39));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
