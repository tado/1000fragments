uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.14 * cos(sa * 4.0 + t * 2.36 + ph);
    v = sin((sr - petal) * 18.20);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.99 + (time * 0.75) * 0.41) * 0.14;
	p += vec2(sin((time * 0.75) * 0.89), cos((time * 0.75) * 0.96)) * 0.28;
	float an = atan(p.y, p.x) + (time * 0.75) * 0.68;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.77 / 3.1415927, 1.49 / r + (time * 0.75) * 1.15);
	float d = field(tv, (time * 0.75), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.043, 0.079, 0.141), vec3(0.995, 0.549, 0.265), cc);
	col *= clamp(r * 2.33, 0.0, 1.0);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.15 + (time * 0.75) * 6.58);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.014, 1.005, 0.986);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
