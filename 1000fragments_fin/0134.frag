uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.66 + t * 0.77) - 0.5) * 2.0;
    v = sin((p.y * 7.97 + zx * 0.72 + t * 1.38) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.59;
	p *= 2.17;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.73;
	float d = field(p, (time * 0.92), 0.0);
	vec3 col = vec3(0.195, 0.258, 0.479) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.045, 0.994, 0.933);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
