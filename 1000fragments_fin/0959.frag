uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 7.91 * sin(t * 0.79) + t * 4.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.70;
	float an = atan(p.y, p.x) + (time * 0.90) * 0.11;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.63 / 3.1415927, 0.50 / r + (time * 0.90) * 0.52);
	float d = field(tv, (time * 0.90), 0.0);
	vec3 col = vec3(0.984, 0.763, 0.537) * (0.08 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 1.20, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.039, 1.011, 0.933);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
