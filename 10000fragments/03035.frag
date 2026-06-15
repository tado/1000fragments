uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 12.30 + t * 2.41 + ph) + sin(p.y * 14.50 - t * 3.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.23));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
