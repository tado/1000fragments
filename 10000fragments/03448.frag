uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.43 + t * 0.92) - 0.5) * 2.0;
    v = sin((p.y * 7.60 + zx * 1.42 + t * 1.84) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.73));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
