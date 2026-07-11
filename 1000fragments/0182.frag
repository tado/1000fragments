uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.87 + t * 4.52 + ph) + sin(p.y * 7.71 - t * 1.41 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.41;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
