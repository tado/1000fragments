uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.46 + t * 3.37 + ph) + sin(p.y * 7.90 - t * 3.37 + ph)
        + sin((p.x + p.y) * 9.69 + t * 3.37 + ph) + sin(length(p) * 15.00 - t * 3.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.91, -0.88) * sin(length(p) * 3.05 - time * 0.69) * 0.39;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.32));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.40);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
