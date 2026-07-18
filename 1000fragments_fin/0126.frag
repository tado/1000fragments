uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 6.17;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.26 + 0.06 * sin(t * 3.02 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.27;
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.67), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.071, 0.061, 0.047), vec3(0.706, 0.316, 0.168), smoothstep(0.0, 0.41, d)), vec3(1.000, 0.815, 0.664), smoothstep(0.41, 1.0, d));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.034, 0.986, 0.931);
	col += 0.024;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
