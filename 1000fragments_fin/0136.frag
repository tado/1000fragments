uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.33 + sin(p.y * 5.44 + t * 1.79) * 1.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.87), 0.0);
	vec3 col = mix(vec3(0.071, 0.078, 0.045), vec3(0.982, 0.470, 0.442), d);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.008, 1.008, 1.004);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
