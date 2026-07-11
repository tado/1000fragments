uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.50 + t * 4.97 + ph) + sin(p.y * 7.08 - t * 4.97 + ph)
        + sin((p.x + p.y) * 9.34 + t * 4.97 + ph) + sin(length(p) * 15.01 - t * 4.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	p += vec2(0.80, 0.63) * sin(length(p) * 2.32 - time * 1.02) * 0.25;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.59), field(p, time, 1.17));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
