uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.94 + t * 0.65) - 0.5) * 2.0;
    v = sin((p.y * 2.04 + zx * 0.56 + t * 1.80) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.36));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
