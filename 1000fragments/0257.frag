uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 15.22 + t * 3.80 + ph) + sin(p.y * 16.66 - t * 3.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.24), field(p, time, 0.49));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
