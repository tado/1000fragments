uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.16 + sin(p.y * 3.14 + t * 1.88) * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.84) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.89));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
