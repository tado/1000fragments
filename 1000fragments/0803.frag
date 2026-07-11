uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 23.22 - t * 6.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.68;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.16), field(p, time, 2.33));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
