uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.66 - t * 2.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.45));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
