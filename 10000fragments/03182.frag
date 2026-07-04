uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.33 + sin(p.y * 1.34 + t * 3.76) * 2.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.91));
	p = (floor(p * 8.1) + 0.5) / 8.1;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.41));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
