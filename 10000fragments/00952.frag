uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.69 + t * 1.44 + ph) + sin(p.y * 2.41 - t * 1.44 + ph)
        + sin((p.x + p.y) * 9.50 + t * 1.44 + ph) + sin(length(p) * 3.64 - t * 1.44 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.48) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.72), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
