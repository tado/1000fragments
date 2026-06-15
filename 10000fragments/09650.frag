uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.52 + t * 4.83 + ph) + sin(p.y * 4.86 - t * 2.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	p += vec2(0.01, 0.08) * sin(length(p) * 3.33 - time * 1.28) * 0.29;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.09));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.13 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
