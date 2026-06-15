uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.13 + t * 4.18 + ph) + sin(p.y * 11.39 - t * 1.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	p += vec2(-0.28, -0.02) * sin(length(p) * 3.44 - time * 0.70) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.13));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
