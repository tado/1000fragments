uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.73) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 1.01 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * -2.86 + time * 0.41) * p;
	p += vec2(0.88, -0.60) * sin(length(p) * 2.63 - time * 0.84) * 0.24;
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.50, 0.50, 0.44), vec3(1.00, 0.90, 0.41), d);
	col = fract(col * 2.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
