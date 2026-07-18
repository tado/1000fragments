uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.68 + 0.16 * cos(sa * 3.0 + t * 2.01 + ph);
    v = sin((sr - petal) * 8.99);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.59) * 0.90), cos((time * 0.59) * 0.63)) * 0.20;
	p += vec2(sin((time * 0.59) * 1.48), cos((time * 0.59) * 1.10)) * 0.26;
	float an = atan(p.y, p.x) + (time * 0.59) * -0.16;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.08 / 3.1415927, 1.03 / r + (time * 0.59) * 0.50);
	tv.x += tv.y * 0.33;
	float d = field(tv, (time * 0.59), 0.0);
	vec3 col = vec3(0.223, 0.273, 0.457) * (0.14 / (abs((d)) + 0.06));
	col = col / (1.0 + col);
	col *= clamp(r * 2.91, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.010, 0.998, 0.957);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
