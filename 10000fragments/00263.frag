uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.72 + t * 1.11 + ph) + sin(p.y * 11.15 - t * 5.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	p += vec2(0.70, 0.70) * sin(length(p) * 3.82 - time * 1.07) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.00));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
