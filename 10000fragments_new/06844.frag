uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.08 + sin(p.y * 5.18 + t * 2.16) * 2.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.53;
	p = abs(p) - 0.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.23), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
