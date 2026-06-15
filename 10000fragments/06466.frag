uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.55 + sin(p.y * 2.20 + t * 0.73) * 4.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.04;
	p = abs(p) - 0.35;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.22), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
