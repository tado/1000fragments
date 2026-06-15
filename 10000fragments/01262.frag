uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.02 + t * 2.03 + ph) + sin(p.y * 11.17 - t * 2.03 + ph)
        + sin((p.x + p.y) * 3.08 + t * 2.03 + ph) + sin(length(p) * 7.30 - t * 2.03 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.68));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
