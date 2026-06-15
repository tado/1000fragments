uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.55 + t * 0.58 + ph) + sin(p.y * 4.41 - t * 0.58 + ph)
        + sin((p.x + p.y) * 11.95 + t * 0.58 + ph) + sin(length(p) * 16.65 - t * 0.58 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = fract(p * 2.09) - 0.5;
	p += vec2(-0.85, 0.46) * sin(length(p) * 5.76 - time * 1.86) * 0.15;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.39), field(p, time, 2.79));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
