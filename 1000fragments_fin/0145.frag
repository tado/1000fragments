uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (0.93 + 0.17 * sin(t * 0.75)) + vec2(-0.73, -0.08) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 24; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 24.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.49 + (time * 0.88) * 1.17) * 0.15;
	p *= 1.56;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = rot2((time * 0.88) * 0.83) * p;
	p *= 1.0 + 0.26 * sin((time * 0.88) * 3.55);
	p = (floor(p * 28.0) + 0.5) / 28.0;
	p += vec2(0.24, 0.86) * sin(length(p) * 5.71 - (time * 0.88) * 1.12) * 0.31;
	float d = 0.5 + 0.5 * field(p, (time * 0.88), 0.0);
	vec3 col = mix(vec3(0.993, 0.835, 0.491), vec3(0.043, 0.047, 0.076), d);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.986, 1.019, 0.934);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
