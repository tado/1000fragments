uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 9.56 + vec2(t * 1.03, -t * 1.03) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(1.59) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.39, 0.35, 0.41), vec3(0.51, 0.71, 0.44), d);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
