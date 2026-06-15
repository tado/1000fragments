uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.90 + t * 1.61 + ph) + sin(p.y * 4.64 - t * 4.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.89), field(p, time, 1.77));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
