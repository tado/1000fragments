uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.96 + t * 0.86) - 0.5) * 2.0;
    v = sin((p.y * 3.40 + zx * 1.08 + t * 0.78) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	p = fract(p * 2.70) - 0.5;
	p = sin(p * 1.41 + time * 0.65) * 1.31;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.43, 0.41, 0.59) * (0.25 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
