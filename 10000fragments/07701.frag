uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.33;
    v = 0.5 * (sin(1.0 * cp.x + t * 0.58) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.44) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	p = sin(p * 2.44 + time * 1.19) * 0.61;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.28));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
