uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.26 + t * 2.68 + ph) + sin(p.y * 7.99 - t * 4.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(0.33, 0.09) * sin(length(p) * 4.42 - time * 1.01) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.37), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.16, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
