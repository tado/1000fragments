uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.17 + sin(p.y * 4.40 + t * 5.23) * 2.11 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p.y += sin(p.x * 5.48 + time * 1.38) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.61));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
