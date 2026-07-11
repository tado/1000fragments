uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 4.16 + t * 3.00 + ph) + sin(p.y * 13.72 - t * 3.00 + ph)
        + sin((p.x + p.y) * 6.49 + t * 3.00 + ph) + sin(length(p) * 14.25 - t * 3.00 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = (floor(p * 17.8) + 0.5) / 17.8;
	p += vec2(-0.94, 0.76) * sin(length(p) * 3.19 - time * 2.30) * 0.36;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.09));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
