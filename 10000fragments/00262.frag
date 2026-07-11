uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.88 + t * 5.37 + ph) + sin(p.y * 16.20 - t * 4.86 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.02) - 0.5;
	p = abs(p) - 0.73;
	p *= 1.71;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
