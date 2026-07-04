uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.42 + t * 4.97 + ph) + sin(p.y * 15.37 - t * 1.65 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.22 * sin(time * 1.29);
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	p += vec2(-0.17, 0.51) * sin(length(p) * 4.87 - time * 1.31) * 0.26;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.21), field(p, time, 0.42));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
