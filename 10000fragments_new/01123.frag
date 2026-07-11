uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.00 + t * 0.91 + ph) + sin(p.y * 12.39 - t * 2.37 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.88;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.15), field(p, time, 2.30));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
