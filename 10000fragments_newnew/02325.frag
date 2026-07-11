uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.89 + t * 0.75) - 0.5) * 2.0;
    v = sin((p.y * 7.72 + zx * 1.16 + t * 2.05) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.33;
	p *= 1.37;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.90, 0.98, 1.48) + vec3(0.02, 0.23, 0.28);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
