uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.05) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 0.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.96;
	p = rot2(p.y * -3.50 + (time * 0.83) * 1.17) * p;
	p *= 2.20;
	p *= 1.0 + 0.22 * sin((time * 0.83) * 4.65);
	float d = field(p, (time * 0.83), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.59, 0.68, 0.69) + vec3(0.02, 0.05, 0.03);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(1.016, 0.998, 1.011) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
