uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.93 + t * 4.80 + ph) + sin(p.y * 12.81 - t * 3.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	{ float fr = length(p); p *= 1.0 + -0.74 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
