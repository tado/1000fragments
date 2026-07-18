uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.53 * sin(t * 0.46) + t * 5.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	p *= 1.0 + 0.37 * sin((time * 0.88) * 4.57);
	p = (floor(p * 29.2) + 0.5) / 29.2;
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.88), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.026, 0.039, 0.095), vec3(0.081, 0.434, 0.511), smoothstep(0.0, 0.43, d)), vec3(1.000, 0.811, 0.475), smoothstep(0.43, 1.0, d));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.988, 1.002, 0.948);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
