uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 8.73 + vec2(t * 0.64, -t * 2.53) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -1.60 + time * 0.80) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.04));
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.54, 0.98, 0.84) + vec3(0.02, 0.22, 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
