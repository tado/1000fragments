uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.89 + vec2(t * 2.57, -t * 2.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	p = rot2(time * -0.50) * p;
	p = abs(p);
	p = rot2(length(p) * -2.31 + time * 0.62) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.18, 0.33, 0.22), vec3(0.76, 0.98, 0.82), d);
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
