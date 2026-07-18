uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.60 + 0.11 * sin(t * 1.38)) + vec2(-0.45, 0.19) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 19; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 19.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.83) * 1.18), cos((time * 0.83) * 0.87)) * 0.17;
	p.x += p.y * -0.79;
	p *= 0.84;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.95; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.79;
	float d = field(p, (time * 0.83), 0.0);
	vec3 col = palette(d * 0.43 + (time * 0.83) * 0.08, vec3(0.27, 0.25, 0.43), vec3(0.39, 0.39, 0.50), vec3(1.04, 1.00, 1.03), vec3(0.62, 0.83, 0.10));
	col *= 0.85 + 0.10 * sin(gl_FragCoord.y * 0.81 + (time * 0.83) * 14.00);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.007, 1.004, 1.012);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
