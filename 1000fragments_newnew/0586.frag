uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.43 + t * 1.24) - 0.5) * 2.0;
    v = sin((p.y * 4.04 + zx * 0.64 + t * 1.96) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	float d = 0.5 + 0.5 * field(p, (time * 0.76), 0.0);
	vec3 col = mix(vec3(0.70, 0.74, 0.77), vec3(0.01, 0.06, 0.01), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.995, 1.039) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
