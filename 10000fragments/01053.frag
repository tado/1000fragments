uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.75 + t * 4.07 + ph) + sin(p.y * 17.22 - t * 1.27 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.31;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 2.44));
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
