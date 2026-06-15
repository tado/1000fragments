uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.62 + t * 5.36 + ph) + sin(p.y * 14.56 - t * 1.46 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.47;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.27), field(p, time, 0.54));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
