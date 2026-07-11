uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 14.41 + vec2(t * 0.54, -t * 0.54) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	p = rot2(length(p) * -2.38 + time * 0.77) * p;
	p = rot2(1.64) * p;
	p += vec2(-0.28, -0.97) * sin(length(p) * 4.30 - time * 1.83) * 0.14;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.21, 0.54), vec3(0.84, 0.99, 0.94), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
